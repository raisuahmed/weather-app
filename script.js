const inputCity = document.querySelector('.inputCity input');
const submitBtn = document.querySelector('.submit-btn');

// when click input field,it becomes empty
inputCity.addEventListener('click',() => {
    inputCity.value = '';
})


// when we input any city, after clicking we get the result
submitBtn.addEventListener('click',() => {
   const cityName = inputCity.value;
   const apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=47369454a09d47e4010cf7345d30bee2`
   fetch(apiLink)
      .then(response => response.json())
      .then(json => {
          setName(json)
          displayData(json);
        })
      .catch(json => {
          alert('Hai dude, you entered wrong city name!!Plz enter the actual name with correct spelling');
          forCatch(json)
        })
})

// change the city Name and Country Name
function setName(json){
    const city = document.querySelector('.cityName');
    const setCountry = document.querySelector('.countryName');
    city.innerText = inputCity.value;
    setCountry.innerText = json.sys.country.toUpperCase()
}


displayData = (data) => {
    console.log(data);
        //set flag image src attribute dynamically
    const countryImg = document.querySelector('.country img');
    const countryName = data.sys.country.toLowerCase();
    const flagLink = `https://flagpedia.net/data/flags/h80/${countryName}.webp`;
    countryImg.setAttribute('src',flagLink);
    
    // set lat and lon of the city
    const lat = document.querySelector('.lat span');
    const lon = document.querySelector('.lon span');
    lat.innerText = data.coord.lat;
    lon.innerText = data.coord.lon;

    // set the sunrise and sunset time;
    const sunrisePara = document.querySelector('.sunrise p');
    const sunsetPara = document.querySelector('.sunset p');

    const sunriseConvert = new Date((data.sys.sunrise)*1000);
    const sunrise = sunriseConvert.toLocaleTimeString();
    sunrisePara.innerText = sunrise;

    const sunsetConvert = new Date ((data.sys.sunset)*1000);
    const sunset = sunsetConvert.toLocaleTimeString();
    sunsetPara.innerText = sunset;


    // set the temperature and weather name and it's picture
    const main = data.weather[0].icon;
    const weatherReview = data.weather[0].description;
    elementCreate(main,weatherReview);


    // set temperature 
    const temperature = document.querySelector('.temperatureContainer h1 span');
    const temp = data.main.temp;
    temperature.innerText = temp;


    //set other temperature details 
    const maxTemp = document.querySelector('.maxTemp span');
    const minTemp = document.querySelector('.minTemp span');
    const feelTemp = document.querySelector('.feelTemp span');
    maxTemp.innerText = data.main.temp_max;
    minTemp.innerText = data.main.temp_min;
    feelTemp.innerText = data.main.feels_like;


    //set other details;
    const humidity = document.querySelector('.humidity span');
    const pressure = document.querySelector('.pressure span');
    const wind = document.querySelector('.wind span');
    humidity.innerText = data.main.humidity;
    pressure.innerText = data.main.pressure;
    wind.innerText = data.wind.speed;
}

// create a function for setting image and description dynamically
function elementCreate(main,review){
    const tempImg = document.querySelector('.tempImg img');
    tempImg.setAttribute('src',`http://openweathermap.org/img/wn/${main}.png`);
    
    const temp = document.querySelector('.tempImg h3');
    temp.innerText = review;
}

// create a function for set date
function setDate() {
    const h3 = document.querySelector('.currentDate h3');
    const p = document.querySelector('.currentDate p');
    const days = ["Sunday","Monday","Tuesday","WednesDay","Thursday","Friday","Saturday"];
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    const d = new Date();
    const month = d.getMonth();
    const year = d.getFullYear();
    const date = d.getDate();
    const day = d.getDay();
    const fullDate = `${date} ${months[month]} ${year}`;

    h3.innerText = days[day];
    p.innerText = fullDate;
}

setDate();



function forCatch(json){
        const city = document.querySelector('.cityName');
        const setCountry = document.querySelector('.countryName');
        city.innerText = "City";
        setCountry.innerText = "Country"

        //set flag image src attribute dynamically
        const countryImg = document.querySelector('.country img');
        countryImg.setAttribute('src','./images/flag.jpg');
        
        // set lat and lon of the city
        const lat = document.querySelector('.lat span');
        const lon = document.querySelector('.lon span');
        lat.innerText = "00";
        lon.innerText = "00";
    
        // set the sunrise and sunset time;
        const sunrisePara = document.querySelector('.sunrise p');
        const sunsetPara = document.querySelector('.sunset p');
        sunrisePara.innerText = `Hour : Min : Sec AM`;
        sunsetPara.innerText = `Hour : Min : Sec PM`;
    
    
        // set the temperature and weather name and it's picture
        const tempImg = document.querySelector('.tempImg img');
        tempImg.setAttribute('src',"./images/no1.png");
        
        const temp = document.querySelector('.tempImg h3');
        temp.innerText = "Weather Review";
    
    
        // set temperature 
        const temperature = document.querySelector('.temperatureContainer h1 span');
        temperature.innerText = "00";
    
    
        //set other temperature details 
        const maxTemp = document.querySelector('.maxTemp span');
        const minTemp = document.querySelector('.minTemp span');
        const feelTemp = document.querySelector('.feelTemp span');
        maxTemp.innerText = "00";
        minTemp.innerText = "00";
        feelTemp.innerText = "00";
    
    
        //set other details;
        const humidity = document.querySelector('.humidity span');
        const pressure = document.querySelector('.pressure span');
        const wind = document.querySelector('.wind span');
        humidity.innerText = "00";
        pressure.innerText = "00";
        wind.innerText = "00";
}