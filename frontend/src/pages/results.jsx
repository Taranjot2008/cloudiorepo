import React from "react";
import CurrentForecast from "../components/current_forecast";
import DailyForecast from "../components/daily_forecast";

import Navbar from "../components/Navbar";

export default function Results() {
  const params = new URLSearchParams(window.location.search);
  const lat = params.get("lat");
  const lng = params.get("lng");

  const [weatherData, setWeatherData] = React.useState(null);

  const API_URL = `https://cloudiorepo.onrender.com/results?lat=${lat}&lng=${lng}`;


  React.useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(API_URL);
        
        const data = await response.json();

        setWeatherData(data);
        console.log("Weather data:", data);


      } catch (err) {
        console.error("Error fetching weather data:", err);
      }
    };

    fetchWeatherData();
  }, [API_URL]);

  const initDate =
  weatherData?.list?.[0]?.dt_txt
    ? new Date(weatherData.list[0].dt_txt)
    : null;

  console.log("Init date:", initDate);

  return (
    <div className="result-page relative">

      <Navbar />
      
      <section className="forecast-section w-full h-screen flex items-center gap-2 mt-60 max-lg:flex-col max-lg:mt-20">
        <CurrentForecast 
        weatherData = {weatherData}
        />

        <DailyForecast 
        weatherData = {weatherData}
        initDate = {initDate}
        />
      </section>
      

    </div>
  );
}
