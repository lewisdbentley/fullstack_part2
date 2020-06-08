import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Notes from './components/Notes'


const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    const hook = () => {
        console.log('effect')
        axios
            .get('http://localhost:3001/notes')
            .then(response => {                
                console.log('promise fulfilled')
                setNotes(response.data)
            })
    }

    useEffect(hook, [])

    console.log('render ', notes.length, ' notes')

    return (
        <>
            <h1>Notes</h1>
            < Notes notes={notes} />
        </>
    )
}

export default App