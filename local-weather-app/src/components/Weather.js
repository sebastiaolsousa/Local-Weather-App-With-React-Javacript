import React from "react";
import * as fa from 'react-icons/fa';

const Weather = ({ city, temperature, description, weatherType, humidity, windSpeed }) => {
    let weatherIcon;

    if (weatherType === 'cloudy') {
        weatherIcon = <fa.FaCloud/>;
    } else if (weatherType === 'sunny') {
        weatherIcon = <fa.FaSun/>;
    } else {
        weatherIcon = <fa.FaCloudSun/>;
    }
    
    return (
        <div>
            <h2>{city}</h2>
            {weatherIcon}
            <p>Temperature: {Math.floor(temperature-273)} ºC</p>
            <p>Humidity: {humidity}%</p>
            <p>Wind Speed: {windSpeed} Km/H</p>
            <p>Description: {description}</p>
        </div>
    );
};

export default Weather;