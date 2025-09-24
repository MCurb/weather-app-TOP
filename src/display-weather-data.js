import { getWeatherData } from './get-weather-data';

const inputSearch = document.querySelector('.input-search');
let locationSearch = 'Holguin Cuba';

const temp = document.querySelector('.temp');
const feels = document.querySelector('.feels-like');
const icn = document.querySelector('.icon');
const locationAddress = document.querySelector('.location');

export async function displayData() {
  const { temperature, icon, feelsLike, location } = await takeTheDataINeed();

  //   temp.textContent = temperature;
  //   feels.textContent = feelsLike;
  //   icn.textContent = icon;
  //   locationAddress.textContent = location;
}

export function handleFormData(e) {
  e.preventDefault();
  locationSearch = inputSearch.value;
  displayData();
}

async function takeTheDataINeed() {
  const jsonData = await getWeatherData(locationSearch);

  const temperature = jsonData.currentConditions.temp;
  const icon = jsonData.currentConditions.icon;
  const feelsLike = jsonData.days[0].feelslike;
  const location = jsonData.resolvedAddress;
  return { temperature, icon, feelsLike, location };
}
