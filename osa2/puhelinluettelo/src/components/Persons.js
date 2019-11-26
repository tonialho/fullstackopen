import React from 'react'
import Person from './Person'

const Persons = (props) => {
    console.log('')
    console.log("Persons.js BEGIN")
    console.log("persons props: ", props.persons)


    if (props.persons.length === 0) {
        console.log("no results")
      return (
        <div>
          <h2>
            Numbers
          </h2>
          <p>Not found</p>
        </div>
      )
    }
  
    else {  
      return (
        <div>
          <h3>
            Numbers
          </h3>
          <ul>
           <Person persons={props.persons} handler={props.handler} /> 
          </ul>
        </div>
      )
    }
  }

export default Persons