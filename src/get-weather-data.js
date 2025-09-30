// ========================
// PUBLIC API (exports)
// ========================

export function takeTheDataINeed(locationSearch) {
  return getWeatherData(locationSearch).then((dataJson) => {
    if (dataJson === undefined) {
      const paths = {
        error: true,
      };
      return { paths };
    }
    const currentConditions = dataJson.currentConditions;
    const paths = {
      location: dataJson.resolvedAddress,
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
  });
}

// ========================
// PRIVATE HELPERS
// ========================

// Fetch weather data from the API
function getWeatherData(location) {
  const encodedLocation = encodeLocation(location);
  return fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedLocation}?unitGroup=us&key=U5HZWJR4494LWKE6UNTJY7PK2&contentType=json`,
  )
    .then((data) => {
      return data.json();
    })
    .catch(() => {
      return undefined;
    });
}

// Encode URI component to handle spaces and special characters
function encodeLocation(locationSearch) {
  const encodedLocation = encodeURIComponent(locationSearch);
  return encodedLocation;
}
