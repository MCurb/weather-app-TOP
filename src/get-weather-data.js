
export async function getWeatherData() {
  const data = await fetch(
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/puruaran?unitGroup=us&key=U5HZWJR4494LWKE6UNTJY7PK2&contentType=json',
  );
  const dataContent = await data.json();
  const temperature = dataContent.currentConditions.temp;
  const icon = dataContent.currentConditions.icon;
  const feelsLike = dataContent.days[0].feelslike;
  console.log(temperature);
  console.log(`Feels like: ${feelsLike}`);
  console.log(icon);
}
