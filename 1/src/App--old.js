import React from 'react'
import ReactDOM from 'react-dom'
import Note from './components/Note'


const App = ({ notes }) => {

    return (
      <>
        <h1>These are the current notes.</h1>
        <ul>
          {notes.map((note, id) =>
            < Note key={id} content={note.content} />
          )}
        </ul>        
      </>
    )
}

export default App