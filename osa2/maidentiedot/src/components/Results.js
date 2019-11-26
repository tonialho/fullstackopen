import React, {useState} from 'react'
import Country from './Country'

const Results = ({countries}) => {
    console.log("Results.js props: ", countries)

    const [ indexOfClicked, setIndexOfClicked ] = useState(0)

    const handleClick = (country) => {
        console.log("Clicked", country.name)
        setIndexOfClicked(countries.indexOf(country))
    }
    
    const checkIndex = countries.length > indexOfClicked
        ? countries[indexOfClicked]
        : countries[0]

    if(countries.length > 10) {
        return(
            <div>
                <h3>Results</h3>
                <p>Too many results, specify</p>
            </div>
        )
    }

    else if(countries.length > 1) {
        return(
            <div>
                <h3>Results</h3>
                <>
                    {countries.map(country => 
                        <p key={country.name}>
                            {country.name} 
                            <button  
                                onClick={() => handleClick(country)}>show
                            </button>
                        </p>
                        )
                    }
                    <Country country={checkIndex} />
                </>
            </div>
        )
    }

    else if(countries.length === 1) {
        return(
            <Country country={countries[0]} />
        )
    }

    else {
        return(
            <div>
                <h3>Results</h3>
                <p>No results</p>
            </div>
        ) 
    }
}

export default Results