import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './index.css'


const list = [
  {
    name: 'David Bellham',
    number: '02084250531'
  },
  {
    name: 'Ada Lovelace',
    number: '02084250531'
  },
  {
    name: 'Arto Hellas',
    number: '02084250531'
  }
]

ReactDOM.render(<App />, document.getElementById('root'))