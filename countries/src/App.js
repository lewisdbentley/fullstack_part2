import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Country from './components/Country'


const App = () => {
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])

    const hook = () => {
        console.log('in effect')
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then((response)=> {
                console.log('get request success')
                setCountries(response.data)
            })
    }

    useEffect(hook, [])

    console.log('there are ', countries.length ,' countries in state.')

    const searchHandler = (e) => {
        setSearch(e.currentTarget.value)
    }

    const data = search
        ? countries.filter(country => country.name.toUpperCase().includes(search.toUpperCase()))
        : countries.slice(5, 10)


    if (data.length > 10 ) {
        return (
            <>
                find countries: <input onChange={searchHandler}/>
                <p>Too many countries - please be more specific</p>
            </>
        )
    }

    if (data.length < 10 && data.length > 1) {
        return (
            <>
                find countries: <input onChange={searchHandler}/>
                <ul>
                    {data.map((country)=>
                    <>
                        <li key={country.alpha2Code}>{country.name}</li>
                        <button onClick={() => setSearch(country.name)}>Show</button>                 
                    </>
                    )}
                </ul>
            </>
        )
    }

    if (data.length === 1) {
        return (
            < Country data={data[0]} searchHandler={searchHandler}/>
        )
    }

    return (
        <>
            find countries: <input onChange={searchHandler}/>
        </>
    )
    
}

export default App