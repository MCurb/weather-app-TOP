import { getWeatherData } from './get-weather-data';
const inputSearch = document.querySelector('.input-search');
let locationSearch = 'Holguin Cuba';

const tempCheckbox = document.querySelector('.temp-checkbox');
const currentScale = document.querySelector('.current-scale');

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

  //Weather Overview
  locationAddress.textContent = paths.location;
  temp.textContent = `${paths.temperature}°F`;
  feels.textContent = `Feels like: ${paths.feelsLike}°F`;
  condition.textContent = paths.conditionStatus;

  // Make temp values to be data values
  temp.dataset.value = paths.temperature;
  feels.dataset.value = paths.feelsLike;

  //Weather Details
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

export function handleTemperatureToggle() {
  const newTemp = tempCheckbox.checked
    ? convertTemperature(temp.dataset.value, 'fahrenheit')
    : convertTemperature(temp.dataset.value, 'celcius');

  const newFeelsLikeTemp = tempCheckbox.checked
    ? convertTemperature(feels.dataset.value, 'fahrenheit')
    : convertTemperature(feels.dataset.value, 'celcius');

  const tempToChange = [temp, feels];

  tempToChange.forEach((elem) => {
    if (!tempCheckbox.checked) {
      currentScale.textContent = '°F';

      switch (elem) {
        case temp:
          temp.textContent = `${newTemp}°F`;
          temp.dataset.value = newTemp;
          break;
        case feels:
          feels.textContent = `Feels like: ${newFeelsLikeTemp}°F`;
          feels.dataset.value = newFeelsLikeTemp;
          break;
        default:
          break;
      }
      return;
    }
    currentScale.textContent = '°C';

    switch (elem) {
      case temp:
        temp.textContent = `${newTemp}°C`;
        temp.dataset.value = newTemp;
        break;
      case feels:
        feels.textContent = `Feels like: ${newFeelsLikeTemp}°C`;
        feels.dataset.value = newFeelsLikeTemp;
        break;
      default:
        break;
    }
  });
}

function convertTemperature(temp, scale) {
  if (scale === 'fahrenheit') {
    const newTemp = (temp - 32) / 1.8;
    return newTemp;
  } else if (scale === 'celcius') {
    const newTemp = temp * 1.8 + 32;
    return newTemp;
  }
}
