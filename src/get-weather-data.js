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
    //Handle spaces and special characters
    const encodedLocation = encodeURIComponent(location);
    const data = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedLocation}?unitGroup=us&key=U5HZWJR4494LWKE6UNTJY7PK2&contentType=json`,
    );
    const dataContent = await data.json();

    return dataContent;
  } catch {
    return undefined;
  }
}
