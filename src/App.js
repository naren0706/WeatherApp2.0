import React,{useState} from 'react';

import './style.css'

const api={
  key:"ffc34d8e57305adce9c009fa96ad2e38",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query,setQuery] = useState('');
  const [weather,setWeather] = useState({});


  const search = evt =>{
    if(evt.key==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res =>res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January","February","March","April","May","June","July","August","September",
  "October","November","December"];
  let days = ["Sunday","Monday","Tuesday","Wednessday","Thursday","Friday","Saturday"]

  let day=days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
  }
  
  return (
    
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 25) ? 'app warm' : 'app') : 'app'}>
      
    
      <main>
        <div className="search-box">
            <input 
            type="text"
            className="search-bar"
            placeholder="search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
        </div>
        
      
        {(typeof weather.main != "undefined")?(
        <div>
          <div className="location-box">
              <div className="location"><b>{weather.name}</b>,{weather.sys.country} </div>
              <br/>
              <div className="date">{dateBuilder(new Date())}</div>
              <br/>
          </div>
          <div className="weatherBox">
            <div className="temp"> {Math.round(weather.main.temp)}°c
            
            

            </div>
            <br/>
            <div className="weather">{weather.weather[0].description}</div>
          </div>
        </div>
        ):('')}
      </main>
      
      </div>

  );
}

export default App;
