import React from 'react'

const Person = (props) => {
    console.log("")
    console.log("Person.js BEGIN")
    console.log("Person props:", props)

    return (
        props.persons.map(person => 
            <li key={person.name}> 
                {person.name} {person.number} 
                <button onClick={() => props.handler(person)}>
                    delete
                </button>
            </li>)
    )
}

export default Person