import React, {useState, useEffect} from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import axios from 'axios'
import './index.css'
import Notification from './components/Notification'
import Footer from './components/Footer'


const App = (props) => {
    const [notes, setNotes] = useState(props.notes)
    const [newNote, setNewNote] = useState(
        'a new note...'
    )
    const [showAll, setShowAll] = useState(false)
    const [message, setMessage] = useState('something went wrong!')
    const [messageStyle, setMessageStyle] = useState(true)

    useEffect(() => {
        noteService
        .getAll()
        .then(initialNotes => {
            setNotes(initialNotes)
        })
    }, [])

    const toggleImportance = (id) => {
        // define the url of our note
        let url = `http://localhost:3001/notes/${id}`
        // find our note
        let note = notes.find(n => n.id === id)
        // store our note in a variable, and change important
        let changedNote = {...note, important: !note.important}
        // sent this PUT request to the server
        noteService
            .update(changedNote, id)
            .then(returnedNote => {
                console.log(`${changedNote.content} is now ${changedNote.important}`)
                setNotes(notes.map(note => note.id !== id ? note : changedNote))
            })
            .catch((error) => {
                setMessageStyle(false)
                setMessage(
                    `We tried to update ${note.content} but encountered an error`
                )
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    // console.log('You just created', notes.slice(-1)[0].content, 'which is', notes.slice(-1)[0].important === true)
    
    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            date: new Date().toISOString,
        }

        noteService
            .create(noteObject)
            .then(returnedNote => {
                console.log(`created ${returnedNote.content}`)
                setMessageStyle(true)
                setMessage(`Successfully created ${noteObject.content}`)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const successMessage = {
        color: 'green',
        fontSize: 16,
        fontStyle: 'italic',
        border: '20px dotted green'
    }

    const errorMessage = {
        color: 'red',
        fontSize: 16,
        fontStyle: 'italic',
        border: '20px dotted red'
    }

    const whichMessage = messageStyle
        ? successMessage
        : errorMessage


    return (
        <>
            <h1>Notes</h1>
            < Notification message={message} style={whichMessage}/>
            <ul>
                {notesToShow.map(note =>
                    < Note key={note.id} note={note} toggleImportance={toggleImportance}/>
                )}
            </ul>
            <button onClick={() => setShowAll(!showAll)}>
                    show { showAll ? 'important' : 'all'}
            </button>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">Save</button>
                < Footer style={successMessage}/>
            </form>
        </>
    )
}

export default App