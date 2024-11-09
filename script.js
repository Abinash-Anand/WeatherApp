"strict-mode";
//---------------------------------------Html Elements----------------------------------------
const currentTime = document.querySelector(".current-time");
const currentTemperature = document.querySelector(".current-temperature");
const background = document.querySelector(".background").style;
const weather = document.querySelector(".weather");
//getting all the sub updating weather elements
const moisture = document.querySelector("#moisture");
const precipitationToday = document.querySelector("#precipitation");
const windSpeed = document.querySelector("#current-winds");
const visibilityIndex = document.querySelector("#visibility");
// console.log(moisture, precipitation, windSpeed, visibilityIndex);

//collecting forecast elements
const forecastElements = document.querySelectorAll(".forecast-data");
// console.log(forecastElements);
const forecastData = document.querySelectorAll(".data");
const minTempData = document.querySelectorAll(".min-temp");
const dateElement = document.querySelectorAll(".date");
const weekForecastData = document.querySelectorAll(".week-forecast");
// document.body.style.background = url("/rainyBackground.gif");
const bodyElement = document.querySelector("body");

const weatherIcon = document.querySelectorAll(".forecast-icon");
// console.log(weatherIcon);
/*


WMO Weather interpretation codes (WW)
    -------------------------------------------------------------------------- 
    | Code 	     Description
    | 0 	         Clear sky
    | 1, 2, 3 	   Mainly clear, partly cloudy, and overcast
    | 45, 48 	     Fog and depositing rime fog
    | 51, 53, 55 	 Drizzle: Light, moderate, and dense      intensity
    | 56, 57 	     Freezing Drizzle: Light and dense intensity
    | 61, 63, 65 	 Rain: Slight, moderate and heavy intensity
    | 66, 67 	     Freezing Rain: Light and heavy intensity
    | 71, 73, 75 	 Snow fall: Slight, moderate, and heavy intensity
    | 77 	         Snow grains
    | 80, 81, 82 	 Rain showers: Slight, moderate, and violent
    | 85, 86 	     Snow showers slight and heavy
    | 95 * 	       Thunderstorm: Slight or moderate
    | 96, 99 * 	   Thunderstorm with slight and heavy hail
    ------------------------------------------------------------------------------

*/

//-------------------Current temperature element----------------
currentTemperature.style.fontSize = "2rem";
currentTemperature.style.fontWeight = "800";
// Global variable for API data received

//-------------------------------------getting time---------------------------------------------
const time = new Date();
// const currentHour = parseInt(time.toLocaleTimeString());
//getting the date and reversing the   string
let dateVal = time.toLocaleDateString();
const monthNumber = time.getMonth();
const weekDayNumber = time.getDay();
const dayNumber = time.getDate();

console.log(dayNumber);
const dateString = dateVal.replaceAll("/", "-");
const componentDate = dateString.split("-");

const day = componentDate[0].padStart(2, "0");
const month = componentDate[1].padStart(2, "0");
const year = componentDate[2];
const reverseDate = year + "-" + month + "-" + day;
// console.log(reverseDate);
//-------------------------------------------- Create a new Date object---------------------------------------
const now = new Date();

// Get the current hours and minutes
const hours = now.getHours();
const minutes = now.getMinutes();

// Format the hours and minutes with leading zeros if needed
const formattedHours = String(hours).padStart(2, "0");
const formattedMinutes = String(minutes).padStart(2, "0");

// Combine hours and minutes to get the time in 24-hour format
const timeIn24HourFormat = `${formattedHours}:${formattedMinutes}`;
const currentHour = timeIn24HourFormat.slice(0, 2);
// console.log(currentHour);
//--------------------------------------------------------------------------------------

const timeObject = {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};
const formattedTime = time.toLocaleTimeString(undefined, timeObject);

//-------------------Background change according to time--------------
// const backgorundEffect = function (time24hourList) {};
//------------------- Week days array--------------------

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const daysWeeksMonths = {};
// console.log(dayNumber);
//

// for (const day of weekDays) {

// }

for (let i = 0; i < weekDays.length; i++) {
  daysWeeksMonths[i] = [];
  daysWeeksMonths[i].push(
    `${dayNumber - (weekDayNumber - i)} ${months[monthNumber]},${weekDays[i]}`
  );
}

const weekForecast = Object.values(daysWeeksMonths);
// console.log(weekForecast);

//--------------------------Making api call to get the weather data---------------------------
let url =
  "https://api.open-meteo.com/v1/forecast?latitude=18.5196&longitude=73.8554&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,pressure_msl,surface_pressure,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapor_pressure_deficit,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,winddirection_10m,winddirection_80m,winddirection_120m,winddirection_180m,windgusts_10m,temperature_80m,temperature_120m,temperature_180m,uv_index,uv_index_clear_sky,is_day,freezinglevel_height&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=auto";

async function weatherApi() {
  const response = await fetch(url);
  try {
    weatherData = await response.json();
    // console.log(weatherData);

    // console.log(weatherData.daily.time);
    const hourlyTemperature = weatherData.hourly.temperature_2m;

    //--------------------loop to iterate the temperature on hourly basis--------------------

    const currentTime24hour = weatherData.hourly.time;
    console.log("current time", currentTime24hour);
    //----time string for dynamic time clock -----------------
    // for (const time of currentTime24hour) {
    //   const timeSlice = time.slice(11, 13);
    //   time24hourList.push(timeSlice);
    // }
    const globalTime = new Date();
    const globalTimeClock = globalTime.toLocaleTimeString();
    console.log("Current time", globalTimeClock);

    const time24hourList = [];
    for (const time of currentTime24hour) {
      const timeSlice = time.slice(11, 13);
      time24hourList.push(timeSlice);
    }
    console.log(currentHour);

    console.log("show", time24hourList);
    // let timeIn24Hour = currentTime24hour.slice(11, 13);
    hourlyTemperature.forEach((temp, index) => {
      if (currentHour === time24hourList[index]) {
        console.log(`currentHour === time24hourList`);
        currentTime.innerHTML = formattedTime;
        currentTemperature.innerHTML = `${Math.floor(temp)}°C`;
      }

      if (time24hourList[index] <= 6 && time24hourList[index] > 12) {
        bodyElement.style.backgroundImage = 'url("/assets/weather2.svg")';
      } else if (time24hourList[index] >= 12 && time24hourList[index] < 18) {
        // bodyElement.style.backgroundImage = 'url("/assets/rainyday.jpg")';
        // bodyElement.style.transition = ".2s 0.4s ease-in-out";
      } else if (time24hourList[index] >= 18) {
        console.log(time24hourList[index]);
        // bodyElement.style.backgroundImage = 'url("/assets/rainyday.jpg")';
      }
    });

    //calling backgorundEffect()

    console.log(weatherData.daily.precipitation_sum);

    //stored values of the sub updates section
    const precipitation = weatherData.daily.precipitation_sum;
    const windVelocity = weatherData.daily.windspeed_10m_max;
    const humidity = weatherData.hourly.relativehumidity_2m;
    const visibilityDistance = weatherData.hourly.visibility;

    // const timeString = weatherData.hourly.time;
    const weekDays = weatherData.daily.time;

    //looping to put humidity
    humidity.forEach((humidityValue, index) => {
      if (currentHour === time24hourList[index]) {
        moisture.innerHTML = humidityValue;
        moisture.style.fontSize = "12px";
      }
    });
    //looping array to put precipitation value
    console.log(reverseDate, weekDays);
    precipitation.forEach((precipitationAmount, index) => {
      if (reverseDate === weekDays[index]) {
        precipitationToday.innerText = precipitationAmount;
        console.log(`the prec amount is ${precipitationAmount} `);
        precipitationToday.style.fontSize = "12px";
        precipitationToday.style.marginLeft = "16px";
      }
    });
    //looping to put wind speed
    windVelocity.forEach((speed, index) => {
      if (reverseDate === weekDays[index]) {
        const windSpeed = document.querySelector("#current-winds");

        windSpeed.innerHTML = `${Math.floor(speed)}km/h`;
        windSpeed.style.fontSize = "12px";
      }
    });
    // console.log(visibilityDistance);
    //looping to insert visibilityDistance
    visibilityDistance.forEach((distance, index) => {
      if (currentHour === time24hourList[index]) {
        let distanceInKm = distance / 1000;
        visibilityIndex.innerHTML = ` ${Math.floor(distanceInKm)}km`;
        visibilityIndex.style.fontSize = "10px";
      }
    });

    //Forecasting a week data
    const maxTempInDay = weatherData.daily.temperature_2m_max;
    const minTempInDay = weatherData.daily.temperature_2m_min;
    const tempUnit = weatherData.daily_units.temperature_2m_max;
    const tempDegree = tempUnit.slice(0, 1);
    // console.log(maxTempInDay, minTempInDay, tempUnit, tempDegree);
    //max temperature
    maxTempInDay.forEach((maxTemp, index) => {
      forecastData[index].innerText = `${Math.floor(maxTemp)}${tempDegree}`;
    });
    //min temperature
    minTempInDay.forEach((minTemp, index) => {
      minTempData[index].innerText = `/ ${Math.floor(minTemp)}${tempDegree} `;
    });

    //day-month-dayName
    weekForecast.forEach((element, index) => {
      weekForecastData[index].innerText = element;
    });

    //Weather icon
    const weatherCode = weatherData.daily.weathercode;

    // Assuming weatherIcon is an array of HTML img elements
    weatherIcon.forEach((img, index) => {
      if (weatherCode[index] >= 0 && weatherCode[index] < 1) {
        img.src = "assets/sunnyDay.png";
      } else if (weatherCode[index] >= 1 && weatherCode[index] <= 3) {
        img.src = "assets/cloudyDay.png";
      } else if (weatherCode[index] >= 61) {
        img.src = "assets/rainyDay.png";
      }
    });

    // console.log(daysWeeksMonths);
    // console.log(weatherData);
    // console.log(weatherData);
  } catch (error) {
    console.log("Error:", error);
  }
}
weatherApi();
const intervalTime = 60 * 60 * 1000;
setInterval(function () {
  intervalTime();
}, intervalTime);

//-------------------------GeoCoding------------------------------------------------------------

// const cityName = document.querySelector("#search-form");
// const cityNameInput = document.querySelector("#search-bar");

// cityName.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const placeName = cityNameInput.value;
//   console.log(placeName);
//   // geocodeAndLog(placeName);
//   getLatLongFromPlaceName(placeName);
// });
// // console.log(coordsLat, coordsLng);
// // function geocodeAndLog(placeName) {
// //   var requestOptions = {
// //     method: "GET",
// //   };

// //   const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
// //     placeName
// //   )}&apiKey=61d707dd048e4e3782cb2a0716af0142`;

// //   fetch(url, requestOptions)
// //     .then((response) => response.json())
// //     .then((data) => {
// //       const location = data.results[0].geometry.location;
// //       const latitude = location.lat;
// //       const longitude = location.lng;
// //       console.log(latitude, longitude); // For debugging
// //       updateMapWithLatLong(latitude, longitude); // Update the map
// //     })
// //     .catch((error) => console.log("error", error));
// // }

// // Call the function with a specific placeName
// // const placeName =
// //   "38 Upper Montagu Street, Westminster W1H 1LJ, United Kingdom";

// //----------------------GeoCoding-------------------------------------------
// async function getLatLongFromPlaceName(placeName) {
//   const geocodingAPIUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
//     placeName
//   )}&apiKey=61d707dd048e4e3782cb2a0716af0142`;
//   try {
//     const response = await fetch(geocodingAPIUrl);
//     const data = await response.json();
//     const location = data.results[0].geometry.location;
//     const latitude = location.lat;
//     const longitude = location.lng;
//     console.log(latitude, longitude); // For debugging
//     updateMapWithLatLong(latitude, longitude); // Update the map
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }
// //--------------------Leaflet map api------------------------------------
// // Create the map
// const map = L.map("map").setView([18.5204, 73.8567], 13);
// L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   maxZoom: 19,
//   attribution:
//     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// }).addTo(map);

// // Initialize marker and circle variables
// let marker, circle, zoomed;

// // Function to update the map with latitude and longitude
// function updateMapWithLatLong(latitude, longitude) {
//   if (marker) {
//     map.removeLayer(marker);
//     map.removeLayer(circle);
//   }
//   marker = L.marker([latitude, longitude]).addTo(map);
//   circle = L.circle([latitude, longitude], { radius: 100 }).addTo(map); // Adjust the radius as needed
//   if (!zoomed) {
//     zoomed = map.fitBounds(circle.getBounds());
//   }
//   map.setView([latitude, longitude]);
// }

// function containsOnlyAlphabets(cityName) {
//   const regex = /^[a-zA-Z]+$/;
//   if (regex.test(cityName)) {
//     cityNameInput.style.backgroundColor = "green";
//     return regex.test(inputString);
//   } else {
//     cityNameInput.style.backgroundColor = "red";
//     return;
//   }
// }\

// Leaflet map setup
var map = L.map("map").setView([18.5204, 73.8567], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Initialize marker and circle variables
let marker, circle, zoomed;

// Function to update the map with latitude and longitude
function updateMapWithLatLong(latitude, longitude) {
  if (marker) {
    map.removeLayer(marker);
    map.removeLayer(circle);
  }
  marker = L.marker([latitude, longitude]).addTo(map);
  circle = L.circle([latitude, longitude], { radius: 100 }).addTo(map); // Adjust the radius as needed
  if (!zoomed) {
    zoomed = map.fitBounds(circle.getBounds());
  }
  map.setView([latitude, longitude]);
}

// Function to handle the geocoding request
async function geocodePlace(placeName) {
  const geocodingAPIKey = "6d43007eb4f943e494f28ce54e1591c3"; // Replace with your API key
  const geocodingAPIUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    placeName
  )}&key=${geocodingAPIKey}`;

  try {
    const response = await fetch(geocodingAPIUrl);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry;
      const latitude = location.lat;
      const longitude = location.lng;
      url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,pressure_msl,surface_pressure,cloudcover,cloudcover_low,cloudcover_mid,cloudcover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapor_pressure_deficit,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,winddirection_10m,winddirection_80m,winddirection_120m,winddirection_180m,windgusts_10m,temperature_80m,temperature_120m,temperature_180m,uv_index,uv_index_clear_sky,is_day,freezinglevel_height&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=auto`;
      weatherApi(url);
      updateMapWithLatLong(latitude, longitude);
    } else {
      console.error("Geocoding API request failed");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Event listener for the search button
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-bar");

searchButton.addEventListener("click", () => {
  const placeName = searchInput.value;
  console.log(placeName);
  geocodePlace(placeName);
});
