// ========================
// PUBLIC API (exports)
// ========================

export async function takeTheDataINeed(locationSearch) {
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

// ========================
// PRIVATE HELPERS
// ========================

// Fetch weather data from the API
async function getWeatherData(location) {
  try {
    const encodedLocation = encodeLocation(location);
    const data = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedLocation}?unitGroup=us&key=U5HZWJR4494LWKE6UNTJY7PK2&contentType=json`,
    );
    const dataContent = await data.json();
    console.log(dataContent);

    return dataContent;
  } catch (error) {
    console.log(`There was an error ${error}`);
    return undefined;
  }
}

// Encode URI component to handle spaces and special characters
function encodeLocation(locationSearch) {
  const encodedLocation = decodeURIComponent(locationSearch);
  return encodedLocation;
}
