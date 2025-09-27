import { getWeatherData } from './get-weather-data';
const inputSearch = document.querySelector('.input-search');
let locationSearch = 'Holguin Cuba';

const tempCheckbox = document.querySelector('.temp-checkbox');
const currentScale = document.querySelector('.current-scale');

const body = document.querySelector('body');
const errorMsg = document.querySelector('.error-msg');
const loadingContainer = document.querySelector('.loading-container');

// Weather Overview
const overviewContainer = document.querySelector('.overview');
const locationAddress = document.querySelector('.location');
const temp = document.querySelector('.current-temp');
const feels = document.querySelector('.feels-like');
const condition = document.querySelector('.condition-status');
const conditionIcon = document.querySelector('.condition-status-icon');

// Weather Details
const detailsContainer = document.querySelector('.details');
const wind = document.querySelector('.wind-data');
const uv = document.querySelector('.uv-index-data');
const humidityData = document.querySelector('.humidity-data');
const rain = document.querySelector('.rain-chance-data');
const sunriseTime = document.querySelector('.sunrise-data');
const sunsetTime = document.querySelector('.sunset-data');

async function displayData() {
  toggleLoadingSpinner(true);
  const { paths } = await takeTheDataINeed();
  toggleLoadingSpinner(false);

  if (paths.error) {
    toggleErrorMsg(true);
    return;
  }

  toggleErrorMsg(false);

  //Weather Overview
  locationAddress.textContent = paths.location;

  convertTemp(paths.temperature, 'fahrenheit', 'do-not-convert');
  convertFeelsLike(paths.feelsLike, 'fahrenheit', 'do-not-convert');

  condition.textContent = paths.conditionStatus;
  conditionIcon.icon = findCorrectIcon(paths.conditionsIcon);

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
  if (jsonData === undefined) {
    const paths = {
      error: true,
    };
    return { paths };
  }
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
    error: false,
  };
  return {
    paths,
  };
}

export function handleTemperatureToggle() {
  currentScale.textContent = tempCheckbox.checked ? '°C' : '°F';

  convertTemp(temp.dataset.value, 'fahrenheit', 'celcius');

  convertFeelsLike(feels.dataset.value, 'fahrenheit', 'celcius');
}

function convertTemperature(temp, scale) {
  if (scale === 'fahrenheit') {
    const newTemp = Math.round((temp - 32) / 1.8);
    return newTemp;
  } else if (scale === 'celcius') {
    const newTemp = Math.round(temp * 1.8 + 32);
    return newTemp;
  } else if (scale === 'do-not-convert') {
    const newTemp = temp;
    return newTemp;
  }
}

function convertTemp(value, scaleIfTrue, scaleIfFalse) {
  temp.textContent = tempCheckbox.checked
    ? `${convertTemperature(value, scaleIfTrue)}°C`
    : `${convertTemperature(value, scaleIfFalse)}°F`;

  temp.dataset.value = tempCheckbox.checked
    ? convertTemperature(value, scaleIfTrue)
    : convertTemperature(value, scaleIfFalse);
}

function convertFeelsLike(value, scaleIfTrue, scaleIfFalse) {
  feels.textContent = tempCheckbox.checked
    ? `Feels like: ${convertTemperature(value, scaleIfTrue)}°C`
    : `Feels like: ${convertTemperature(value, scaleIfFalse)}°F`;

  feels.dataset.value = tempCheckbox.checked
    ? convertTemperature(value, scaleIfTrue)
    : convertTemperature(value, scaleIfFalse);
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

function toggleErrorMsg(boolean) {
  errorMsg.style.display = boolean ? 'block' : 'none';

  togglePageSections(boolean);
}

function toggleLoadingSpinner(stillWating) {
  loadingContainer.style.display = stillWating ? 'grid' : 'none';

  togglePageSections(stillWating);
}

function togglePageSections(boolean) {
  overviewContainer.style.display = boolean ? 'none' : 'grid';
  detailsContainer.style.display = boolean ? 'none' : 'grid';

  body.style.alignItems = boolean ? 'start' : 'center';
}
