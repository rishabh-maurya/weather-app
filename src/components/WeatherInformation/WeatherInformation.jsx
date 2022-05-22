import React, { useState, useEffect } from 'react';
import './WeatherInformation.css';
import { FaStreetView } from "react-icons/fa";
import moment from 'moment';

const Input = () => {
    const apiKey = '45ac959e478773cb8c78fb9f9d94c5be';
    const [inputValue, setInputValue] = useState('Mumbai');
    const [weatherData, setWeatherData] = useState(null);
    const [coords, setCoords] = useState({
        latitude: '',
        longitude: ''
    });

    // getting latitude and longitude
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        });
    }, []);

    // when latitude and longitude updated
    useEffect(() => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}`;
        const getCurrentLocation = async () => {
            const response = await fetch(url);
            const currentLocation = await response.json();
            setInputValue(currentLocation.name);
        }

        if (coords.latitude && coords.longitude) {
            getCurrentLocation();
        }

    }, [coords]);

    useEffect(() => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
        const weatherAPI = async () => {
            const response = await fetch(url);
            const weatherData = await response.json();
            if (weatherData.cod === 200) {
                setWeatherData(weatherData);
            } else {
                setWeatherData(null);
            }
        }

        weatherAPI();
    }, [inputValue]);

    return (
        <div className=''>
            <div className="weatherInformation__container">
                <input
                    type="search"
                    placeholder='City Name...'
                    onChange={(event) => {
                        const value = event.target.value;
                        setInputValue(value);
                    }}
                />
                {weatherData !== null && <div className="weatherInformation__img">
                    <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather img" />
                </div>}
                <div className="weatherInformation__showTemp">
                    <h1 className='pt-2'><FaStreetView /> {inputValue}, {weatherData !== null && weatherData.sys.country}</h1>
                    <p className='pb-2'>{moment().format('dddd')} | {moment().format("MMM Do YY")} | {moment().format('h:mm:ss a')}</p>
                    {weatherData !== null ?
                        <div>
                            <h2>{weatherData.main.temp}°C</h2>
                            <p>Min {weatherData.main.temp_min}°C | Max {weatherData.main.temp_max}°C</p>
                        </div>
                        : <h1 className='text-danger'>No data found!</h1>}
                </div>
            </div>
        </div>
    )
}

export default Input