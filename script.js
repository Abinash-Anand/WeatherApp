// // // "strict-mode";
// // // console.log("working");
// const hitestImage = document.querySelector(".hitesh-img");
// const hiteshFollowerCount = document.querySelector(".follower");
// const personName = document.querySelector(".person-name");
// // // //creating an Ajax request
// // // const xhr = new XMLHttpRequest();
// // // const requestUrl = "https://api.github.com/users/hiteshchoudhary";
// // // xhr.open("GET", requestUrl);
// // // xhr.onreadystatechange = function () {
// // //   if (xhr.readyState === 4) {
// // //     const hiteshObj = JSON.parse(this.responseText);
// // //     console.log(hiteshObj.avatar_url);
// // //     personName.innerHTML = hiteshObj.name;
// // //     hitestImage.src = hiteshObj.avatar_url;
// // //     hiteshFollowerCount.innerHTML = `${hiteshObj.name}'s Followers: ${hiteshObj.followers}`;
// // //   }
// // //   //   console.log(xhr.readyState);
// // // };

// // // xhr.send();

// // // //create HTML element function
// // // const containerElement = function (indexImg, charName) {
// // //   const div = document.createElement("div");
// // //   const image = document.createElement("img");
// // //   const pTag = document.createElement("p");
// // //   div.style.border = "1px solid white";
// // //   image.style.border = "1px solid blue";
// // //   div.className = "user";
// // //   image.className = "userImage";
// // //   pTag.className = "description";
// // //   pTag.innerHTML = charName;
// // //   image.src = indexImg;
// // //   image.style.height = "20rem";
// // //   image.style.widht = "20rem";
// // //   div.appendChild(image);
// // //   div.appendChild(pTag);
// // //   //   const parentElement = hitestImage.parentNode;
// // //   //   parentElement.insertBefore(div, hitestImage);
// // //   document.body.appendChild(div);
// // // };
// // // const nameArray = ["Harry", "Ginny", "Hermoine", "Ron", "Luna"];
// // // const urlArray = [
// // //   "https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/Harry_Potter_character_poster.jpg/220px-Harry_Potter_character_poster.jpg",
// // //   "https://imgix.ranker.com/user_node_img/50115/1002288236/original/1002288236-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=375",
// // //   "https://m0.joe.ie/wp-content/uploads/2017/06/19171526/hermione.jpg",
// // //   "https://images.ctfassets.net/usf1vwtuqyxm/5Xpzr1HK3TCNJOTBvD2okc/a16952f5548e490a91e9f78e1be97caa/HP-F6-half-blood-prince-ron-pyjamas-smirking-love-potion-web-landscape?fm=jpg&q=70&w=2560",
// // //   "https://images.ctfassets.net/usf1vwtuqyxm/Mam68Vfou2OO6kqEcyW8W/41657e4dbb7d42d2cab591276105bcc1/LunaLovegood_WB_F6_LunaLovegoodInQuibblerSpecsOnHogwartsExpress_Still_080615_Port.jpg?w=1200&fit=fill&f=top",
// // // ];
// // // for (let element = 0; element < 5; element++) {
// // //   containerElement(urlArray[element], nameArray[element]);
// // // }

// // //MY CHEAT SHEET FOR DOM

// // //1: SELECTING ELEMENTS
// // // const hiteshDiv = document.querySelector(".hitesh-choudary");
// // // const hiteshDiv = document.getElementById("mi7");
// // const li = document.getElementsByTagName("li");
// // // const div = document.getElementsByClassName("hitesh-choudary");
// // const ul = document.getElementsByClassName("un-orderedList");
// // const array = Array.prototype.slice.call(li);
// // const liItems = document.querySelector(".un-orderedList");
// // console.log(array);
// // console.log(liItems.firstElementChild);
// // console.log(liItems.lastElementChild.innerHTML);
// // console.log(liItems.parentElement.parentElement);
// // console.log(liItems.nextElementSibling);
// // console.log(liItems.childNodes);
// // const newElement = document.createElement("form");
// // const text = document.createTextNode("dynamically created element");
// // newElement.appendChild(text);
// // document.body.appendChild(newElement);
// // document.body.removeChild(newElement);
// // //new element
// // const newElement2 = document.createElement("div");
// // const textElement = document.createTextNode("2nd element");
// // newElement2.appendChild(textElement);

// // document.body.appendChild(newElement);
// // document.body.replaceChild(newElement2, newElement);
// // newElement2.innerHTML = "This is INNERHTML";
// // newElement2.style.color = "green";
// // // newElement2.outerHTML = "<h1>Converted to H1 tag</h1>";
// // // console.log((newElement2.outerHTML = "<h1>Converted to H1 tag</h1>"));

// // newElement2.setAttribute("title", "mi7");
// // console.log(newElement2.getAttribute("title"));
// // console.log(newElement2.hasAttribute("title"));
// // newElement2.removeAttribute("title");
// // console.log(newElement2.hasAttribute("title"));
// // newElement2.className = "broBro";
// // newElement2.classList.add("value");
// // console.log(newElement2.className);
// // newElement2.classList.remove("broBro");
// // console.log(newElement2.className);
// // newElement2.classList.toggle("broBro");
// // console.log(newElement2);

// //=================Promises in javascript=====================
// const promiseOne = new Promise(function (resolve, reject) {
//   let error = true;

//   if (!error) {
//     resolve("Response recieved");
//   } else {
//     reject("Error Something went wrong");
//   }
// });

// fetch("https://api.github.com/users/hiteshchoudhary")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//     hitestImage.src = data.avatar_url;
//     hiteshFollowerCount.innerHTML = `Github followers ${data.followers}`;
//     personName.innerHTML = data.name;
//   })
//   .catch((error) => console.log(error));

// async function requestOne() {
//   const response = await fetch("https://api.github.com/users/hiteshchoudhary");

//   try {
//     const data = response.json();
//     console.log(data);
//   } catch (error) {
//     console.log("Error: ", error);
//   }
// }

// requestOne();
//==============Api project testing================
//api link: https://api.open-meteo.com/v1/forecast?latitude=19.0728&longitude=72.8826&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,precipitation,rain,cloudcover_low,cloudcover_mid,cloudcover_high,windspeed_10m,windspeed_80m,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Asia%2FSingapore&start_date=2023-09-06&end_date=2023-09-07

//Selecting html elements
const weatherElements = document.querySelectorAll(".weather-data");
// console.log(weather);

async function weatherApi() {
  const reponse = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=19.0728&longitude=72.8826&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,precipitation,rain,cloudcover_low,cloudcover_mid,cloudcover_high,windspeed_10m,windspeed_80m,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Asia%2FSingapore&start_date=2023-09-06&end_date=2023-09-07"
  );
  try {
    const weatherData = await reponse.json();
    const { temperature, windspeed, winddirection, weathercode, is_day, time } =
      weatherData.current_weather;
    const value = weatherData.current_weather;
    console.log(value);
    const weatherArray = Object.values(value);
    console.log(weatherArray);
    weatherArray.forEach((data) => {
      console.log(data);
      weatherArray.forEach((data, index) => {
        // Update each weather element's innerText with the corresponding value

        weatherElements[index].innerText = data;
      });
    });
    //windspeed , time, winddirection, windspeed, is_day
    //timezone
    console.log(
      temperature,
      windspeed,
      winddirection,
      weathercode,
      is_day,
      time
    );
  } catch (error) {
    console.log("Error: ", error);
  }
}

weatherApi();
console.log(weatherArray);
