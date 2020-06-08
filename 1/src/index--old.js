import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'


const notes = [
  {
    id: '1',
    content: 'this is a new note',
    date: '17-05-2020',
    Important: true
  },
  {
    id: '2',
    content: 'tussle',
    date: '17-05-2020',
    Important: false
  },
  {
    id: '3',
    content: 'Hebrew note',
    date: '17-05-2020',
    Important: true
  },
  {
    id: '4',
    content: 'Delicious!!!',
    date: '17-05-2020',
    Important: true
  },
]

ReactDOM.render(< App notes={notes}/>, document.getElementById('root'))