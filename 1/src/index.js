import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'


const notes = [
    {
      id: '1',
      content: 'this is a new note',
      date: '17-05-2020',
      important: true
    },
    {
      id: '2',
      content: 'tussle',
      date: '17-05-2020',
      important: false
    },
    {
      id: '3',
      content: 'Hebrew note',
      date: '17-05-2020',
      important: true
    },
    {
      id: '4',
      content: 'Delicious!!!',
      date: '17-05-2020',
      important: true
    },
  ]

ReactDOM.render(< App notes={notes}/>, document.getElementById('root'))