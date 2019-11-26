import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = (city) => {
    console.log("Weather.js props:", city)

    let [ weather, setWeather] = useState([])

    useEffect(() => {
        console.log("Weather useEffect begin")
        const params = {
            access_key: '4b07df231fdaf962ee262eb1d6c92622',
            query: {city}
        }
        axios
          .get("http://api.weatherstack.com/current", {params})
          .then(response => {
            console.log("promise fulfilled w/ query", params.query)
            setWeather(response.data)
          })
          .catch(err => {
              console.log(err)
              return null;
          })
      }, [city])

    console.log("Weather", weather)
    console.log("Weather.current", weather.current)

    if(weather.length !== 0) {

        return (
            <div>
                <b>Temperature </b> {weather.current.temperature} Celsius <br/>
                <img src={weather.current.weather_icons} alt=''/> <br/>
                <b>Wind </b> {weather.current.wind_speed} kph, direction {weather.current.wind_dir}
            </div>
        )
    }

    else return <p>loading weather</p>
}


export default Weather