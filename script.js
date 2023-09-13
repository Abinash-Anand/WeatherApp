"strict-mode";
const currentTime = document.querySelector(".current-time");
const currentTemperature = document.querySelector(".current-temperature");

//getting all the sub updating weather elements
const moisture = document.querySelector("#moisture");
const precipitationToday = document.querySelector("#precipitation");
const windSpeed = document.querySelector("#current-winds");
const visibilityIndex = document.querySelector("#visibility");
console.log(moisture, precipitation, windSpeed, visibilityIndex);

//-------------------Current temperature element----------------
currentTemperature.style.fontSize = "2rem";
currentTemperature.style.fontWeight = "800";
// Global variable for API data received

//APi Call
const url =
  "https://api.open-meteo.com/v1/forecast?latitude=18.5204&longitude=11.5820&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,visibility,windspeed_10m,windspeed_80m,windspeed_120m,uv_index,uv_index_clear_sky,is_day&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,windspeed_10m_max,windgusts_10m_max&timezone=auto";
//getting time
const time = new Date();
const currentHour = parseInt(time.toLocaleTimeString());
//getting the date and reversing the   string
let dateVal = time.toLocaleDateString();
const dateString = dateVal.replaceAll("/", "-");
const componentDate = dateString.split("-");
console.log(componentDate);
const day = componentDate[0].padStart(2, "0");
const month = componentDate[1].padStart(2, "0");
const year = componentDate[2];

const reverseDate = year + "-" + month + "-" + day;
console.log(reverseDate);

const timeObject = {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};
const formattedTime = time.toLocaleTimeString(undefined, timeObject);

//Making api call to get the weather data
async function weatherApi() {
  const response = await fetch(url);
  try {
    weatherData = await response.json();
    console.log(weatherData);

    // console.log(weatherData.daily.time);
    const hourlyTemperature = weatherData.hourly.temperature_2m;

    //--------------------loop to iterate the temperature on hourly basis--------------------
    hourlyTemperature.forEach((temp, index) => {
      if (currentHour === index) {
        console.log(
          `The temperature ${temp}°C was found at time ${time.toLocaleTimeString()} `
        );
        currentTime.innerHTML = formattedTime;
        currentTemperature.innerHTML = `${temp}°C`;
      }
    });

    console.log(weatherData.daily.precipitation_sum);

    //stored values of the sub updates section
    const precipitation = weatherData.daily.precipitation_sum;
    const windVelocity = weatherData.daily.windspeed_10m_max;
    const humidity = weatherData.hourly.relativehumidity_2m;
    const visibilityDistance = weatherData.hourly.visibility;

    const timeString = weatherData.hourly.time;
    const weekDays = weatherData.daily.time;
    console.log(
      precipitation,
      windVelocity,
      humidity,
      visibilityDistance,
      timeString,
      weekDays
    );

    //looping to put humidity
    humidity.forEach((humidityValue, index) => {
      if (currentHour === index) {
        moisture.innerHTML = humidityValue;
        moisture.style.fontSize = "12px";
      }
    });
    //looping array to put precipitation vlaue
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

        windSpeed.innerHTML = `${speed} m/s`;
        windSpeed.style.fontSize = "12px";
      }
    });
    // console.log(visibilityDistance);
    //looping to insert visibilityDistance
    visibilityDistance.forEach((distance, index) => {
      if (currentHour === index) {
        let distanceInKm = distance / 1000;
        visibilityIndex.innerHTML = ` ${Math.floor(distanceInKm)} km`;
        visibilityIndex.style.fontSize = "12px";
      }
    });
    // console.log(weatherData);
    // console.log(weatherData);
  } catch (error) {}
}
weatherApi();
