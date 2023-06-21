import { useState } from "react";
import axios from 'axios';
import Weather from "./components/Weather";

const App = () => {
  const [cityName, setCityName] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [showResult, setShowResult] = useState(false);

 
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      );
      setWeatherData(response.data);
      setShowResult(true);
    } catch (error) {
      console.error(error);
    }
  }

  const generateForecast = () => {
    if (cityName && apiKey) {
      fetchData();
    } else {
      window.alert('Please enter the city name and API key')
    }
  }

  const resetForm = () => {
    setCityName('');
    setApiKey('');
    setWeatherData(null);
    setShowResult(false);
  }

  return (
    <div className="local-weather-app">
      <h1>Local Weather App</h1>
      {showResult ? (
        <>
          <Weather
            city={weatherData.name}
            weathericon={weatherData.icon}
            temperature={weatherData.main.temp}
            humidity={weatherData.main.humidity}
            windSpeed={weatherData.wind.speed}
            description={weatherData.weather[0].description}
          />
          <button onClick={resetForm}>Reset</button>
        </>
      ) : (
        <>
          <label htmlFor="cityNameInput">City Name: </label>
          <input
            type="text"
            id="cityNameInput"
            value={cityName}
            placeholder="Ex: New York,US"
            onChange={(e) => setCityName(e.target.value)}
          />
          <br/>
          <label htmlFor="apiKeyInput">API Key: </label>
          <input
            type="text"
            id="apiKeyInput"
            value={apiKey}
            placeholder="Register for free in the link bellow"
            onChange={(e) => setApiKey(e.target.value)}
          />
          <br/>
          <button onClick={generateForecast}>Generate Weather Forecast</button>
          <br/>
          <p>To create an API Key <a href="https://openweathermap.org/" target="blank">click here</a></p>
        </>
      )}
    </div>
  );
};

export default App;