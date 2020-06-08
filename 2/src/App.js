import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Search from './components/Search'
import Form from './components/Form'
import Persons from './components/Persons'
import personService from './service/persons'
import Notification from './components/Notification'


const App = (props) => {
    const [persons, setPersons] = useState([])
    const [name, setName] = useState('')
    const [number, setNumber] = useState(null)
    const [search, setSearch] = useState('')
    const [message, setMessage] = useState('')
    const [messageStyle, setMessageStyle] = useState({
        color: 'green',
        fontSize: 30
    })


    console.log('there are', persons.length, 'persons in memory')

    useEffect(() => {
        personService
            .getAll()
            .then((response) => {
                setPersons(response.data)
            })
        }, [])

    const nameHandler = (e) => {
        setName(e.currentTarget.value)
    }

    const numberHandler = (e) => {
        setNumber(e.currentTarget.value)
    }

    const searchHandler = (e) => {
        setSearch(e.currentTarget.value)
    }

    const personsToShow = search
        // new array containing any person with a name matching search
        ? persons.filter(p => (p.name.toUpperCase()).includes((search.toUpperCase())))
        : persons

    const newPersonHandler = (s) => {
        s.preventDefault()
        const newPerson = {
            name: name,
            number: number
        }
        let foundPerson = persons.find(element => element.name === newPerson.name)
        if(foundPerson) {
            if (window.confirm(`${newPerson.name} is already in the phone book. Would you like to update their number?`)) {
                alert(`you are a naughty bugger to update ${foundPerson.name}'s number!!!`)
                const updatedPerson = newPerson
                personService
                    .updatePersonNumber(foundPerson.id, updatedPerson)
                    .then((response) => {
                        //find and replace updated person
                        setPersons(persons
                            .filter((person) => {
                                return person.id !== foundPerson.id
                            })
                            .concat(response.data))
                        setName('')
                        setNumber(null)
                        const changedStyle = { ...messageStyle, color: 'green'}
                        setMessageStyle(changedStyle)
                        setMessage(`successfully updated the number of ${updatedPerson.name}`)
                    })
                    .catch((response) => {
                        const changedStyle = { ...messageStyle, color: 'red'}
                        setMessageStyle(changedStyle)
                        setMessage(`the information for ${foundPerson.name} has already been removed from the server.`)
                    })
            }
        } else {
            //make a POST request to http://localhost:3001/persons
            personService
                .createPerson(newPerson)
                .then((response) => {
                    console.log(`we posted data and got this back: ${response}`)
                    // rerender persons
                    setPersons(persons.concat(response.data))
                    setName('')
                    setNumber(null)
                })
        }        
    }

    const removePerson = (person) => {
        const id = person.id
        if (window.confirm(`Are you sure you would like to delete ${person.name}?`)) {
            personService
                .removePerson(person.id)
                .then((response) => {
                    setPersons(persons.filter((person) => {
                        return person.id !== id
                    }))
                    setName('')
                    setNumber(null)
                })
        }   
    }



    return (
        <>
            <h1>Phonebook</h1>
            < Notification message={message} style={messageStyle}/>
            < Search searchHandler={searchHandler} />
            <h2>Add</h2>
            < Form nameHandler={nameHandler} numberHandler={numberHandler} newPersonHandler={newPersonHandler} />
            <h2>Contacts</h2>
            < Persons personsToShow={personsToShow} removePerson={removePerson}/>
            <div>debug: {name}</div>
            <div>debug: {number}</div>
            <div>debug: {search}</div>
        </>
    )
}

export default App

// [{name: 'searching...', number: '404' }]