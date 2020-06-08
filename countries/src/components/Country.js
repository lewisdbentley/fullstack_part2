import React, {useEffect, useState} from 'react'
import axios from 'axios'


const Country = ({data, searchHandler}) => {
    const [weather, setWeather] = useState({
        current: {
            temperature: null
        }
    })
    const API_KEY = process.env.REACT_APP_API_KEY

    const hook = () => {
        console.log('in effect')
        axios
            .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${data.name}`)
            .then((response) => {
                console.log(`get request success`)
                setWeather(response.data)
            })
            
    }

    console.log(weather.temperature)

    useEffect(hook, [])

    return (
        <>
            find countries: <input onChange={searchHandler}/>
            {console.log(data)}
            <h1>{data.name}</h1>
            <p>Capital: {data.capital}</p>
            <p>Population: {data.population}</p>
            <h2>Languages</h2>
            <ul>
                {data.languages.map(lan => {
                    return <li key={lan.iso639_1}>{lan.name} - {lan.nativeName}</li>
                })}
            </ul>
            <img src={data.flag} alt={data.name}></img>
            <h3>Weather in {data.name}</h3>
            <p>Temperature: {weather.current.temperature} celsius</p>
            <img src={weather.current.weather_icons} alt={data.name}></img>
            <p>Wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
        </>
    )
}

export default Country