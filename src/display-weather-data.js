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
const conditionIcon = document.querySelector('.condition-status-icon');

// Weather Details
const wind = document.querySelector('.wind-data');
const uv = document.querySelector('.uv-index-data');
const humidityData = document.querySelector('.humidity-data');
const rain = document.querySelector('.rain-chance-data');
const sunriseTime = document.querySelector('.sunrise-data');
const sunsetTime = document.querySelector('.sunset-data');

async function displayData() {
  const { paths } = await takeTheDataINeed();

  //Weather Overview
  locationAddress.textContent = paths.location;
  temp.textContent = tempCheckbox.checked
    ? `${convertTemperature(paths.temperature, 'fahrenheit')}°C`
    : `${paths.temperature}°F`;
  feels.textContent = tempCheckbox.checked
    ? `Feels like: ${convertTemperature(paths.feelsLike, 'fahrenheit')}°C`
    : `Feels like: ${paths.feelsLike}°F`;
  condition.textContent = paths.conditionStatus;
  conditionIcon.icon = findCorrectIcon(paths.conditionsIcon);

  // Make temp values to be data values
  temp.dataset.value = tempCheckbox.checked
    ? convertTemperature(paths.temperature, 'fahrenheit')
    : paths.temperature;
  feels.dataset.value = tempCheckbox.checked
    ? convertTemperature(paths.feelsLike, 'fahrenheit')
    : paths.feelsLike;

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
    conditionsIcon: currentConditions.icon,
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
  currentScale.textContent = tempCheckbox.checked ? '°C' : '°F';

  temp.textContent = tempCheckbox.checked
    ? `${convertTemperature(temp.dataset.value, 'fahrenheit')}°C`
    : `${convertTemperature(temp.dataset.value, 'celcius')}°F`;

  feels.textContent = tempCheckbox.checked
    ? `Feels like: ${convertTemperature(feels.dataset.value, 'fahrenheit')}°C`
    : `Feels like: ${convertTemperature(feels.dataset.value, 'celcius')}°F`;

  temp.dataset.value = tempCheckbox.checked
    ? convertTemperature(temp.dataset.value, 'fahrenheit')
    : convertTemperature(temp.dataset.value, 'celcius');

  feels.dataset.value = tempCheckbox.checked
    ? convertTemperature(feels.dataset.value, 'fahrenheit')
    : convertTemperature(feels.dataset.value, 'celcius');
}

function convertTemperature(temp, scale) {
  if (scale === 'fahrenheit') {
    const newTemp = Math.floor((temp - 32) / 1.8);
    return newTemp;
  } else if (scale === 'celcius') {
    const newTemp = Math.floor(temp * 1.8 + 32);
    return newTemp;
  }
}

function findCorrectIcon(icon) {
  const simpleIcons = {
    'clear-day': 'emojione:sun',
    'clear-night': 'emojione:full-moon',
    'partly-cloudy-day': 'emojione:sun-behind-cloud',
    'partly-cloudy-night': 'emojione:cloud',
    cloudy: 'emojione:cloud',
    rain: 'emojione:cloud-with-rain',
    'showers-day': 'emojione:sun-behind-rain-cloud',
    'showers-night': 'emojione:cloud-with-rain',
    snow: 'emojione:cloud-with-snow',
    sleet: 'emojione:cloud-with-snow',
    hail: 'emojione:cloud-with-snow',
    fog: 'emojione:fog',
    wind: 'emojione:leaf-fluttering-in-wind',
    'thunder-rain': 'emojione:cloud-with-lightning-and-rain',
    'thunder-showers-day': 'emojione:cloud-with-lightning-and-rain',
    'thunder-showers-night': 'emojione:cloud-with-lightning-and-rain',
  };
  const iconPath = simpleIcons[icon] || 'emojione:zzz';

  return iconPath;
}
