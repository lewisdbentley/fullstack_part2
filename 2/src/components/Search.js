import React from 'react'


const Search = ({searchHandler}) => {
    return (
        <>
            <p>Search: <input onChange={searchHandler}/></p>
        </>
    )
}

export default Search