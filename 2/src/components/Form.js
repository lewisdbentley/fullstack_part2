import React from 'react'

const Form = (props) => {
    return (    
            <form onSubmit={props.newPersonHandler}>
            <div>
                <p>Name: <input onChange={props.nameHandler}/></p>
                <p>Number: <input onChange={props.numberHandler}/></p>
                <button>add</button>
            </div>
            </form>
    )
}

export default Form