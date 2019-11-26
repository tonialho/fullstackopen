import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  console.log("")
  console.log("App.js BEGIN")

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('+358')
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ notificationColor, setNotificationColor ] = useState(true)

  useEffect(() => {
    console.log("useEffect begin")
    personService
      .getAll()
      .then(initialPersons => {
        console.log("promise fufilled")
        setPersons(initialPersons)
      })
  }, [])

  const Notification = ({message}) => {
    console.log("Notification message: ", message)
    console.log("Notification color: ", notificationColor)
    
    const color = notificationColor === true
      ? "notification" 
      : "error"

    if (message === null) {
      return null
    }

    else{
      setTimeout(() => {
        setNotification(null)
       }, 2000)
      return (
        <div className={color}>
          {message} <br/>
        </div>
      )
    }
  }

  const handleRefresh = () => {
    setNewName('')
    setNewNumber('')
    return (
      personService.getAll()
                  .then(initialPersons => {
                    console.log("promise fufilled")
                    setPersons(initialPersons)
                  })
    )
  }

  const handleNoteChange = (event)  => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleRemove = (person) => {
    console.log("handleRemove begin")
    if(window.confirm("Remove " + person.name + "?")){
        personService
            .remove(person.id)
            .then(handleRefresh)
    }
    return(
        console.log("Remove " + person.name),
        setNotificationColor(true),
        setNotification("Person " + person.name + " removed succesfully")
    )
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log("addPerson begin")
    console.log("event props", event.target.value)

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const names = persons.map(person => person.name)
    const numbers = persons.map(person => person.number)

    if (names.includes(newName) && numbers.includes(newNumber)) {
      console.log("Duplicate spotted")
      alert(`${newName} with this number is already added`) 
    }

    else if (names.includes(newName)) {
      console.log("New number spotted")
      const person = persons.find(p => p.name === newName)
      const changedPerson = {...person, number: newNumber}
      if(window.confirm("This person is already added, update the number to " + newNumber + "?" )) {
        personService
          .update(person.id, changedPerson)
          .then(handleRefresh)
          .catch(error => {
            console.log(error)
            setNotificationColor(false)
            setNotification("Information of " + newName + " has already been removed")
            handleRefresh()
          })
        setNotificationColor(true)
        setNotification("Number changed")
      }
    }

    else {
      personService
        .create(newPerson)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setNewName('')
          setNewNumber('')
        })
      setNotificationColor(true)
      setNotification("Added " + newName)
      console.log("new name added")
    }
  }

  const personsToShow = searchTerm === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().match(searchTerm.toLowerCase()) )

  return (
    <div className="phonebook">
      <h2>Phonebook</h2>

      <Notification message={notification}/>

      <Filter onChange={handleSearch} value={searchTerm} />

      <h3>Add a new person</h3>

      <PersonForm onSubmit={addPerson} 
      nameValue={newName} nameOnChange={handleNoteChange}
      numberValue={newNumber} numberOnChange={handleNumberChange} />

      <Persons persons={personsToShow} handler={handleRemove}/>
    </div>
  )
}

export default App