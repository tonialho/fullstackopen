/**
 * Full Stack Open 2019 exercise
 * Puhelinluettelo 
 * Backend
 */

require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./models/person')

// Include & define middleware 
app.use(express.static('build'))
app.use(bodyParser.json())
morgan.token('req', function (req) {return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req'))
app.use(cors())

// GETs for different paths
app.get('/', (req, res) => {
    console.log('GET root')
    res.send("Persons found at ./api/persons <br> <br> Info at ./info")
})

app.get('/info', async (req, res) => {
    console.log('GET info')
    const numberOfDocuments = await Person.countDocuments({}, function(err, count) {})
    const date = Date()
    console.log('numberOfDocuments: ', numberOfDocuments)
    res.send('Phonebook has info for ' + numberOfDocuments + ' people <br> <br> ' + date)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(person => {
        res.json(person)
    })
})

// GET for specific person
app.get('/api/persons/:id', (req, res, next) => {
    console.log('GET person by ID')
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person.toJSON())
            }
            else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

// DELETE person by ID
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

// PUT a new number for an existing person
app.put('/api/persons/:id', (req, res, next) => {
    console.log('PUT')
    const newPerson = req.body
    Person.findByIdAndUpdate(req.params.id, newPerson, {new: true})
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

// POST a new person to the persons
app.post('/api/persons', async (req, res, next) => {
    console.log('POST a new person')

    const newPerson = req.body
    console.log('newPerson', newPerson)

    const person = new Person({
        name: newPerson.name,
        number: newPerson.number
    })

    if(!newPerson.name) {
        console.log('Name missing')
        return res.status(400).json({
            error: 'Give a name'
        })
    }

    if(!newPerson.number) {
        console.log('Number missing')
        return res.status(400).json({
            error: 'Give a number'
        })
    }

    const exists = await Person.exists({name: newPerson.name})
    console.log('exists', exists)

    if(exists) {
        console.log('Error, duplicate')
        return res.status(400).send("Error, duplicate name")
    }

    else {
        person.save()
            .then(savedPerson => {
                res.json(savedPerson.toJSON())
            })
            .catch(error => next(error))
    }
})

// Unknown endpoint handler
const unknowEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknowEndpoint)

// Error handler
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message})
    }
  
    next(error)
  }
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)
)