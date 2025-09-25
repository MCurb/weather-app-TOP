import { getWeatherData } from './get-weather-data';
const inputSearch = document.querySelector('.input-search');
let locationSearch = 'Holguin Cuba';

// Weather Overview
const locationAddress = document.querySelector('.location');
const temp = document.querySelector('.current-temp');
const feels = document.querySelector('.feels-like');
const condition = document.querySelector('.condition-status');

// Weather Details
const wind = document.querySelector('.wind-data');
const uv = document.querySelector('.uv-index-data');
const humidityData = document.querySelector('.humidity-data');
const rain = document.querySelector('.rain-chance-data');
const sunriseTime = document.querySelector('.sunrise-data');
const sunsetTime = document.querySelector('.sunset-data');

export async function displayData() {
  const { paths } = await takeTheDataINeed();

  locationAddress.textContent = paths.location;
  temp.textContent = `${paths.temperature}°F`;
  feels.textContent = `Feels like: ${paths.feelsLike}°F`;
  condition.textContent = paths.conditionStatus;
  wind.textContent = `${paths.windSpeed} mph`;
  uv.textContent = paths.uvIndex;
  humidityData.textContent = `${paths.humidity}%`;
  rain.textContent = `${paths.rainChance}%`;
  sunriseTime.textContent = paths.sunrise;
  sunsetTime.textContent = paths.sunset;
}

export function handleFormData(e) {
  e.preventDefault();
  locationSearch = inputSearch.value;
  displayData();
}

async function takeTheDataINeed() {
  const jsonData = await getWeatherData(locationSearch);
  const currentConditions = jsonData.currentConditions;
  const paths = {
    location: jsonData.resolvedAddress,
    temperature: currentConditions.temp,
    feelsLike: currentConditions.feelslike,
    conditionStatus: currentConditions.conditions,
    windSpeed: currentConditions.windspeed,
    uvIndex: currentConditions.uvindex,
    humidity: currentConditions.humidity,
    rainChance: currentConditions.precipprob,
    sunrise: currentConditions.sunrise,
    sunset: currentConditions.sunset,
  };
  return {
    paths,
  };
}
