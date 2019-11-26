import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Search from './components/Search'
import Results from './components/Results'

const App = () => {
  console.log('')
  console.log("App.js begin")

  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    console.log("useEffect begin")
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log("promise fulfilled")
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    console.log('')
    console.log("handleSearch event:", event.target.value)
    setSearchTerm(event.target.value)
  }

  const countriesToShow = searchTerm === ''
    ? 0
    : countries.filter(country => 
        country.name.toLowerCase().match(searchTerm.toLowerCase()) 
      )

  return(
    <div>
      <p>Find countries:</p>
      <Search onChange={handleSearch} value={searchTerm} />

      <Results countries={countriesToShow} />
    </div>
  )
}

export default App;