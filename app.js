window.addEventListener('load',()=>{
 let long;
 let lat;

 let locationTimezone = document.querySelector('.location-timezone');
 let locationIcon = document.querySelector('.weather-icon');

 let temperatureDegree = document.querySelector('.temperature-degree');
 let temperatureDescription = document.querySelector('.temperature-description');

 let temperatureSection = document.querySelector('.degree-section');
 let temeperatureSpan = document.querySelector('.degree-section span');


 if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition (position => {
        long = position.coords.longitude;
        lat =  position.coords.latitude;

        const APIkey = `7fe5f5ecb7ac8fedaed593da3e271bdd`;
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIkey}`;

        fetch(api)
      .then(response =>{
          return response.json();
      })
      .then(data =>{
          console.log(data);
          const {icon} = data.weather[0];

          //Convert temperature in Kelvin from API to Celcius/Farenheit
          let farenheitTemp = (data.main.temp * (9/5) - 459.67).toFixed(1);
          let degreeCelsiusTemp = (data.main.temp - 273.15).toFixed(1);

          locationTimezone.textContent = data.name +','+ data.sys.country;
          locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
          temperatureDegree.textContent = farenheitTemp;
          temperatureDescription.textContent =  data.weather[0].description;

          //Change temperature to Celcius/Farenheit or viceversa
          temperatureSection.addEventListener('click',()=>{
              if(temeperatureSpan.textContent === 'F'){
                temeperatureSpan.textContent = 'C';
                temperatureDegree.textContent = degreeCelsiusTemp;

              } else{
                temeperatureSpan.textContent = 'F';
                temperatureDegree.textContent = farenheitTemp;
              }
          })
      })
    }) ; 
    
 }
});
