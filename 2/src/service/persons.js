import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

//GET
const getAll = () => {
    return axios.get(baseUrl)
}

//POST
const createPerson = (newPerson) => {
    console.log(`created new person called ${newPerson.name}`)
    return axios.post(baseUrl, newPerson)
}

//PUT
const updatePersonNumber = (id, updatedPerson) => {
    console.log(`updated the number of person with id: ${id}`)
    return axios.put(`${baseUrl}/${id}`, updatedPerson)
}

//DEL
const removePerson = (id) => {
    console.log(`deleted person with id: ${id}`)
    return axios.delete(`${baseUrl}/${id}`)
}

export default { 
    getAll: getAll,
    removePerson: removePerson,
    updatePersonNumber: updatePersonNumber,
    createPerson: createPerson
}