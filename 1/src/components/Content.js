import React from 'react'
import Part from './Part'


const Content = ({course}) => {
    const parts = course.parts

    const total = parts.reduce( (accumulator, currentValue) => {
        return accumulator + currentValue.exercises
    }, 0)

    return (
        <>
            <ul>
                {/* render parts array in Part using a map method */}
                {course.parts.map((part) =>          
                    < Part key={part.id} part={part}/>            
                )}
            </ul>
                <p>The total number of exercises is <strong>{total}</strong></p>
        </>
    )
}

export default Content