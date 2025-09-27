export async function getWeatherData(location) {
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

function encodeLocation(locationSearch) {
  const encodedLocation = decodeURIComponent(locationSearch);
  return encodedLocation;
}
