import React from 'react'


const Results = ({personsToShow, removePerson}) => {
    return (
        <ul>
            {personsToShow.map(p =>
                <li key={p.name}>{p.name} - {p.number} - <button onClick={() => removePerson(p)}>delete</button></li>
            )}
        </ul>
    )
}

export default Results