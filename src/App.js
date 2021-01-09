import React, { useState } from 'react';
const api = {
  key : "e3a2c3284d8807758d70640b0c90bcca",
  base: "https://api.openweathermap.org/data/2.5/" 
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
        
      });
  }
}


  const dateBuilder = (d) => { 
    let months = ["January","Feburary","March", "April", "May", "June", "July", "August",
                  "September","October","November","December"];
    let days =   ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];              
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date} ${year}`
  }

  return (
  <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16 ) ? 'app warm' : 'app') : 'app'}>
    <main>
      <div className="search-box">
          <input type="text" 
                 className="search-bar" 
                 placeholder="Enter here"
                 onChange = {e => setQuery(e.target.value)}
                 value = {query}
                 onKeyPress = {search}/>

      </div>

        {(typeof weather.main !== "undefined") ? (
          <div>
        <div className="loction-box">
          <div className="location">{weather.name},{weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>  
        </div>
        <div className="weather-box">
          <div className = "temp">
            {Math.round(weather.main.temp * 9/5)+32}°F
          </div>
          <div className="weather">
            {weather.weather[0].main}
          </div>
          </div>
        </div>

        ) : ('')};

    </main>    
  </div>
  );
  

}

export default App;
