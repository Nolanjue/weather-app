/*you can select queries here from html using query selector method, 
you can note specific items like buttons by specifying class name and then element name
*/
//this is to make the website easier to access using these calls to the containers.

//fetch url:


const body = document.querySelector('body')
const container = document.querySelector('.container');
const error = document.querySelector('.not-found');
const search = document.querySelector('.search-box button');


const title = document.querySelector('.title');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const other_info= document.querySelector('.other-info')
const min_max = document.querySelector('.min-max')

//when you click the search button
search.addEventListener('click', async () => {
    const APIkey = window.env.API_KEY;
    const city = document.querySelector('.search-box input').value; 

    //quick note: don't use include unless you want it if given value
    if (city === '') return;

    //fetching the data, will return a response with all the data in json, we can then return as json format called as json

    try {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
            .then(response => response.json())
            .then((json) => {

                if (json.cod == '404') {//cod is response type, 404 is error
                    container.style.height = '700px';
                    title.style.display = 'none';
                    weatherBox.style.display = 'none';
                    weatherDetails.style.display = 'none';
                    other_info.style.display = 'none';
                    min_max.style.display = 'none';
                    body.style.overflow = 'auto';
                    error.style.display = 'block';
                    body.style.background = 'red';
                    error.classList.add('fadeIn');
                    return;
                }

                error.style.display = 'none';
                error.classList.remove('fadeIn');

                const image = document.querySelector('.weather-box img');
                const temperature = document.querySelector('.temperature');
                const description = document.querySelector('.description');
                const humidity = document.querySelector(' .humidity  span');
                const wind = document.querySelector(' .wind span');
                const Fahrenheit = document.querySelector('.Fahrenheit span');
                const longCoordinates = document.querySelector('.long');
                const latCoordinates = document.querySelector('.lat');
                const minTemperature = document.querySelector('.min');
                const maxTemperature = document.querySelector('.max');
                const display_city = document.querySelector('.city');
                const display_country = document.querySelector('.country');


            
                
                switch (json.weather[0].main) {
                    case 'Clear': 
                        image.src = 'images/clear.png';
                        body.style.backgroundImage = 'url("images/cleargif.gif")';
                        body.style.backgroundSize= 'cover';
                        break;

                    case 'Clouds': 
                        image.src = 'images/cloud.png';
                        body.style.backgroundImage = 'url("images/cloudgif.gif")';
                        body.style.backgroundSize= 'cover';
                        break;

                    case 'Rain': 
                        image.src = 'images/raining.png';
                        body.style.backgroundImage = 'url("images/raingif.gif")';
                        body.style.backgroundSize= 'cover';
                        break;

                    case 'Snow': 
                        image.src = 'images/snow.png';
                        body.style.backgroundImage = 'url("images/snowgif.gif")';
                        body.style.backgroundSize= 'cover';
                        break;

                    case 'Haze': 
                        image.src = 'images/mist.png';
                        body.style.backgroundImage = 'url("images/mistgif.gif")';
                        body.style.backgroundSize= 'cover';
                        break;
                    
                        
                    default:
                        image.src = '';

                }
                
                //insert the values in the p or b tag, format: json.object.key and returning value.
                display_city.innerHTML = `${json.name},`;

                display_country.innerHTML = `${json.sys.country}`;
                temperature.innerHTML = `${parseInt(json.main.temp)}°c`; //inner html means the value or classname
                description.innerHTML = `${json.weather[0].description}`;//dictionary with one array value
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML =  `${parseInt(json.wind.speed)}km/h`;
                Fahrenheit.innerHTML = `${(1.8 * parseFloat(json.main.temp) + 32).toFixed(2)}°F`;
                longCoordinates.innerHTML = `${parseInt(json.coord.lon)}`;
                latCoordinates.innerHTML = `${parseInt(json.coord.lat)}`;
                minTemperature.innerHTML = `${(1.8 * parseFloat(json.main.temp_min) + 32).toFixed(2)}°F`
                maxTemperature.innerHTML = `${(1.8 * parseFloat(json.main.temp_max) + 32).toFixed(2)}°F`

                



                title.style.display = 'flex';
                weatherBox.style.display = 'flex';
                weatherDetails.style.display = 'flex';
                other_info.style.display = 'flex';
                min_max.style.display = 'flex';
                body.style.overflow = 'auto';

                title.classList.add('fadeIn');
                weatherBox.classList.add('fadeIn');
                weatherDetails.classList.add('fadeIn');
                other_info.classList.add('fadeIn');
                min_max.classList.add('fadeIn');

                container.style.height = '950px';

            })
            .catch(err => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
});