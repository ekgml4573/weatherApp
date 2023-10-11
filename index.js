//es6로 시작
const API_Key = '129f98e16e94729194ca5d5a37f002d6';

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

const mapImageSrc = (main) => {
    let imageSrc;
    switch (main) {
        case "Clear" : 
        imageSrc = "./images/clear.png";
            break;

        case "Cloud" : 
        imageSrc = "./images/cloud.png";
            break;
        
        case "Rain" : 
        imageSrc = "./images/rain.png";
            break;

        case "Snow" : 
        imageSrc = "./images/snow.png";
            break;

        case "Mist" : 
        imageSrc = "./images/mist.png";
            break;

        default :
        imageSrc = "";
    }
    return imageSrc;
}

search.addEventListener("click", async() => {
    const city = document.querySelector(".search-box input").value;

    if(city.length === 0) {
        console.warn("empty");
        return;
    }
    
    try {
        //요청 성공 시
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_Key}`);

        const data = await response.json();
        const {cod} = data;

        //만약 데이터가 없다면
        //404 화면을 띄움
        if(cod === "404") {
            console.log("404에 도달함");
            container.style.height = "400px";
            weatherBox.style.display = "none";
            weatherDetails.style.display = "none";
            error404.style.display = "block";
            error404.classList.add("fadeIn");

            return;
        }

        error404.style.display = "none";
        error404.classList.remove("fadeIn");

        const img = document.querySelector(".weather-box img");

        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");

        const humidity = document.querySelector(".weather-details .humidity span");
        const wind = document.querySelector(".weather-details .wind span");

        const {
            main = {},
            weather = [],
            wind : windData,
        } = data;

        img.src = mapImageSrc(weather[0].main);

        temperature.innerHTML = `${main.temp} C`;
        description.innerHTML = `${weather[0].description}`;
        humidity.innerHTML = `${main.humidity} %`;
        wind.innerHTML = `${windData.speed} km`;
        
        weatherBox.style.display = "";
        weatherDetails.style.display = "";
        weatherBox.classList.add("fadeIn");
        weatherDetails.classList.add("fadeIn");
        container.style.height = "590px";

    }
    catch(error) {
        //요청 실패 시
        console.warn(error);
    }
    
});
