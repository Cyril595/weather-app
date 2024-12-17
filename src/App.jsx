import React, { useState, useEffect } from 'react';

function App() {
  const [city, setCity] = useState('Kolkata');  // Default city set to Kolkata
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'a4721eaefce32ea5484cbda4f7ce4a04';  // Replace with your OpenWeatherMap API key
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  // This will run when the component mounts or when the city changes
  useEffect(() => {
    getWeather();
  }, [city]);  // Now it will run when the city changes

  const getWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(`${apiUrl}?q=${city}&units=metric&appid=${apiKey}`);
      const data = await response.json();
      console.log(data);

      if (data.cod !== 200) {
        setError(data.message);  // Error handling
        setWeather(null);
      } else {
        setWeather(data);  // Success
        setError('');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
        <h1 className="text-center text-3xl font-semibold text-indigo-600 mb-6">Weather App</h1>
        
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={getWeather}
            className="ml-3 p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-600 text-center">{error}</p>} {/* Display error if there is one */}

        {weather && (
          <div className="mt-6 text-center">
            <h2 className="text-5xl font-bold text-indigo-700 mb-2">{weather.main.temp}°C</h2>
            <p className="text-xl text-gray-700">{weather.name}, {weather.sys.country}</p>
            <p className="text-lg text-gray-600">Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
