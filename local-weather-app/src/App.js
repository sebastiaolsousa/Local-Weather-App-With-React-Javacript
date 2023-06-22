import { useState } from "react";
import axios from 'axios';
import Weather from "./components/Weather";
import './App.css'

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

  const mainElement = document.querySelector('main');

  const generateForecast = () => {
    if (cityName && apiKey) {
      fetchData();
      mainElement.classList.add('expand')
    } else {
      window.alert('Please enter the city name and API key');
    }
  }

  const resetForm = () => {
    setCityName('');
    setApiKey('');
    setWeatherData(null);
    setShowResult(false);
    mainElement.classList.remove('expand');
  }

  return (
    <body>
      <main>
        <div className="local-weather-app">
          <h1>Local Weather App</h1>
          {showResult ? (
            <>
              <div className="weather-result">
                <Weather
                  city={weatherData.name}
                  weathericon={weatherData.icon}
                  temperature={weatherData.main.temp}
                  humidity={weatherData.main.humidity}
                  windSpeed={weatherData.wind.speed}
                  description={weatherData.weather[0].description}
                />
              </div>
                <button onClick={resetForm} id="resetButton">Reset</button>
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
              <button onClick={generateForecast} id="generateForecastButton">Generate Weather Forecast</button>
              <br/>
              <p>To create an API Key <a href="https://openweathermap.org/" target="blank">click here</a></p>
            </>
          )}
        </div>
      </main>
    </body>
  );
};

export default App;