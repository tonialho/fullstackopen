const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

if (process.argv.length === 4) {
    console.log("Name and number required")
    process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://tonimerkki:${password}@cluster0-fvmxh.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    console.log('')
    console.log('===Phonebook===')
    Person.find({}).then(res => {
        res.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}

if (process.argv.length === 5) {
    const newName = process.argv[3]
    const newNumber = process.argv[4]
    console.log('newName', newName)
    console.log('newNumber', newNumber)
  
    const newPerson = new Person({
        name: newName,
        number: newNumber
    })

    newPerson.save().then(res => {
        console.log('New person saved ', newPerson)
        mongoose.connection.close()
    })
}