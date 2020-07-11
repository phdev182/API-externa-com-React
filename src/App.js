import React, { Fragment, useState, useEffect } from 'react';

import axios from 'axios';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid:process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: "pt",
        units:'metric'
      }
    });
    setWeather(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])
  if (location === false) {
    return (
      <Fragment>
        Por favor habilite a sua localização no browser...0/
      </Fragment>
    )
  } else if (weather === false){
    return (
      <Fragment>
        Carregando Clima...
      </Fragment>
    )
  } else{
    return(
      <Fragment>
        <h3> Clima nas suas Cordenadas ({weather['main'][0]})</h3>
        <hr />
        <ul>
    <li>Temperatura Atual: {weather['main']['temp']}°</li>
          <li>Temperatura Máxima: {weather['main']['temp_max']}°</li>
          <li>Temperatura Minima: {weather['main']['temp_min']}°</li>
          <li>Pressão: {weather['main']['pressure']} hpa</li>
          <li>Umidade : {weather['main']['humidity']}°</li>
        </ul>
      </Fragment>
    );
  }
}
export default App;
