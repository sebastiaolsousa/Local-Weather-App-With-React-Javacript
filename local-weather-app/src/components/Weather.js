import React from "react";

const Weather = ({ city, temperature, description}) => {
    return (
        <div>
            <h2>{city}</h2>
            <p>Temperature: {temperature}</p>
            <p>Description: {description}</p>
        </div>
    );
};

export default Weather;