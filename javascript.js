(function () {
  const protocol = "https://";
  const url = "api.weatherapi.com/v1/current.json?";
  const apiStart = "key=";

  // In order for the following line of code to work, you need to
  // create an account with https://www.weatherapi.com and request
  // your own api key, then store it in a data.js file in the same
  // directory as this one, in a variable called "key"
  const apiKey = key;

  const itemStart = "&q=";

  async function getWeather(location) {
    const response = await fetch(
      protocol + url + apiStart + apiKey + itemStart + location,
      {
        mode: "cors",
      }
    );
    const searchData = await response.json();
    if (searchData.error) {
      throw new Error(searchData.error.message);
    } else {
      return searchData;
    }
  }

  function processInfo(response) {
    result = {};
    result.icon = response.current.condition.icon;
    result.text = response.current.condition.text;
    result.feelsLikeC = response.current.feelslike_c;
    result.feelsLikeF = response.current.feelslike_f;
    result.humidity = response.current.humidity;
    result.lastSearch = response.current.last_updated;
    result.tempC = response.current.temp_c;
    result.tempF = response.current.temp_f;
    result.windDir = response.current.wind_dir;
    result.windKPH = response.current.wind_kph;
    result.windMPH = response.current.wind_mph;
    result.country = response.location.country;
    result.localTime = response.location.localtime;
    result.name = response.location.name;
    result.region = response.location.region;
    return result;
  }

  function processUserInput(location) {
    getWeather(location)
      .then(function (response) {
        console.log(processInfo(response));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  processUserInput("garland");
})();
