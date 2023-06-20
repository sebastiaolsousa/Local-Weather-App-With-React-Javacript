import { useEffect, useState } from "react";
import axios from 'axios';
import Weather from "./components/Weather";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather?lat=-48.50444&lon=-1.45583&appid=c06c15f02eff0811952e167b212c4286'
      );
      setWeatherData(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="local-weather-app">
      <h1>Local Weather App</h1>
      {weatherData ? (
        <Weather
          city={weatherData.name}
          temperature={weatherData.main.temp}
          description={weatherData.weather[0].description}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;