import React, { useState } from 'react'
import './styles/weatherStyles.css'

export const WheatherApp = () => {
    const [weatherData, setWeatherData] = useState(null)
    const [city, setCity] = useState('')

    let urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    let api_key = 'aa2c8b2aa06c7e42d7c52542bd91d824'

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchWeatherData()
    }

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${city}&appid=${api_key}`)
            const data = await response.json()
            setWeatherData(data)
        } catch (error) {
            console.error('Ocurrio un error :', error)
        }
    }

    const handleCityChange = (e) => {
        setCity(e.target.value)
    }

    return (
        <div className="container">
            <h1>Aplicacion del Clima de ciudades del mundo</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={handleCityChange}
                />
                <button type="submit">Get Weather</button>
            </form>
            <div className="weather-info">
                <h2>Weather Details</h2>
                {weatherData ? (
                    <>
                        <p>Temperature: {weatherData.main ? (weatherData.main.temp - 273.15).toFixed(2) : 'N/A'}°C</p>
                        <p>Condition: {weatherData.weather ? weatherData.weather[0].main : 'N/A'}</p>
                    </>
                ) : (
                    <p>No data</p>
                )}
            </div>
        </div>
    )
}
