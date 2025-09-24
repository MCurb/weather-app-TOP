import './styles.css';

async function getWeatherData() {
  const data = await fetch(
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/puruaran?unitGroup=us&key=U5HZWJR4494LWKE6UNTJY7PK2&contentType=json',
  );
  const dataContent = await data.json();

  return dataContent;
}

async function takeTheDataINeed() {
  const jsonData = await getWeatherData();
  const temperature = jsonData.currentConditions.temp;
  const icon = jsonData.currentConditions.icon;
  const feelsLike = jsonData.days[0].feelslike;
  return { temperature, icon, feelsLike };
}

async function displayData() {
  const temp = document.querySelector('.temp');
  const feels = document.querySelector('.feels-like');
  const icn = document.querySelector('.icon');
  const { temperature, icon, feelsLike } = await takeTheDataINeed();
  temp.textContent = temperature;
  feels.textContent = feelsLike;
  icn.textContent = icon;
}

displayData();
