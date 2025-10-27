"use client";
import React, { useState, useEffect } from "react";
import styles from "./app.module.css";

function getCurrentDate() {
  const currentDate = new Date();
  const options = { month: "long" };
  const monthName = currentDate.toLocaleString("en-US", options);
  const date = new Date().getDate() + " " + monthName;
  return date;
}

const Home = () => {
  const date = getCurrentDate();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Sialkot");

  async function fetchData(cityName) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/weather?address=" + cityName
      );
      const jsonData = (await response.json()).data;
      setWeatherData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchDataByCoordinates(latitude, longitude) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/weather?lat=${latitude}&lon=${longitude}`
      );
      const jsonData = (await response.json()).data;
      setWeatherData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
   
    if (navigator.geolocation) {
 
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchDataByCoordinates(lat, lon); 
        },
        () => {
          console.log("Unable to get location ");
        }
      );
    } else {
      console.log("Geolocation  not supported by this browser ");
    }
  }, []);
  

  return (
    <main className={styles.main}>
  
  <h1 className={styles.h1}>
  Weather App
</h1>

    <div className={styles.widget}>
      <form
        className={styles.weatherLocation}
        onSubmit={(e) => {
          e.preventDefault();
          fetchData(city);
        }}
      >
        <input
          className={styles.input_field}
          placeholder="Enter city name"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className={styles.search_button} type="submit">
          Search
        </button>
      </form>
  
      {weatherData ? (
        <>
          <div className={styles.weatherInfo}>
            <div className={styles.temperature}>
              {Math.round(weatherData.main?.temp)}°C
            </div>
            <div className={styles.weatherCondition}>
              
              {weatherData.weather?.[0]?.description?.toUpperCase()}
            </div>
          </div>
  
          <div className={styles.place}>{weatherData.name}</div>
          <div className={styles.date}>{date}</div>
        </>
      ) : (
        <div className={styles.place}>Load HO RAHA HU WAIT KRO</div>
      )}
    </div>
    <div>

    </div>
  </main>
  
  );
};

export default Home;
