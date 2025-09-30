import { takeTheDataINeed } from './get-weather-data';

// ========================
// MODULE STATE
// ========================
let locationSearch = 'Holguin Cuba';

// ========================
// DOM REFERENCES
// ========================
const body = document.querySelector('body');

const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input-search');

const tempCheckbox = document.querySelector('.temp-checkbox');
const currentScale = document.querySelector('.current-scale');

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

// ========================
// PUBLIC API (exports)
// ========================

export function displayData() {
  toggleLoadingSpinner(true);
  takeTheDataINeed(locationSearch).then((result) => {
    const paths = result.paths;
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
  });
  toggleLoadingSpinner(false);
}

export function setupAppListeners() {
  form.addEventListener('submit', handleFormData);

  tempCheckbox.addEventListener('click', handleTemperatureToggle);
}

// ========================
// EVENT HANDLERS
// ========================

function handleFormData(e) {
  e.preventDefault();
  locationSearch = inputSearch.value;
  displayData();
}

function handleTemperatureToggle() {
  currentScale.textContent = tempCheckbox.checked ? '°C' : '°F';

  convertTemp(temp.dataset.value, 'fahrenheit', 'celcius');

  convertFeelsLike(feels.dataset.value, 'fahrenheit', 'celcius');
}

// ========================
// PRIVATE HELPERS
// ========================

// Temperature conversion

function convertTemperatureScale(temp, scale) {
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
    ? `${convertTemperatureScale(value, scaleIfTrue)}°C`
    : `${convertTemperatureScale(value, scaleIfFalse)}°F`;

  temp.dataset.value = tempCheckbox.checked
    ? convertTemperatureScale(value, scaleIfTrue)
    : convertTemperatureScale(value, scaleIfFalse);
}

function convertFeelsLike(value, scaleIfTrue, scaleIfFalse) {
  feels.textContent = tempCheckbox.checked
    ? `Feels like: ${convertTemperatureScale(value, scaleIfTrue)}°C`
    : `Feels like: ${convertTemperatureScale(value, scaleIfFalse)}°F`;

  feels.dataset.value = tempCheckbox.checked
    ? convertTemperatureScale(value, scaleIfTrue)
    : convertTemperatureScale(value, scaleIfFalse);
}

// Toggle UI elements visibility
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

// Find correct icon for the weather condition
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
