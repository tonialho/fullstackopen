import React from 'react'
import Weather from './Weather'

const Country = ({country}) => {
    console.log("Country.js props", country)

    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>
                Languages
            </h3>
            <ul>
                {country.languages.map(language => 
                    <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} width="200" alt="" />
            <h3>
                Weather in {country.capital}
            </h3>
            <Weather city={country.capital} />
        </div>
    )
}

export default Country