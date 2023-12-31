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

  function processResponse(response) {
    result = {};
    result.text = response.current.condition.text;
    result.feelsLikeC = response.current.feelslike_c;
    result.feelsLikeF = response.current.feelslike_f;
    result.humidity = response.current.humidity;
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

  const container = document.querySelector(".container");
  const info = document.querySelector(".info");
  const nameHeader = document.getElementById("name");
  const timeHeader = document.getElementById("time");
  const regionHeader = document.getElementById("region");
  const countryHeader = document.getElementById("country");
  const condition = document.getElementById("condition");
  const temp = document.getElementById("temp");
  const feelTemp = document.getElementById("feelTemp");
  const windSpeed = document.getElementById("windSpeed");
  const windDir = document.getElementById("windDir");
  const humidity = document.getElementById("humidity");
  const errorP = document.querySelector("p");
  const footer = document.getElementById("footer");

  function processUserInput(location) {
    getWeather(location)
      .then(function (response) {
        const result = processResponse(response);
        displayLocationInfo(
          result.name,
          result.localTime,
          result.region,
          result.country
        );
        displaySingleMeasurements(result.text, result.windDir, result.humidity);
        displayDoubleMeasurements(
          result.tempC,
          result.feelsLikeC,
          result.windKPH,
          result.tempF,
          result.feelsLikeF,
          result.windMPH
        );
        displayWeatherCondition(result.text);
        errorP.textContent = "";
      })
      .catch(function (error) {
        if (error.message === "Parameter q is missing.") {
          errorP.textContent = "Error: Empty search";
        } else {
          errorP.textContent = error;
        }
      });
  }

  function displayLocationInfo(name, time, region, country) {
    nameHeader.textContent = `Location: ${name}`;
    timeHeader.textContent = `Local time: ${time.substring(
      result.localTime.indexOf(" ") + 1
    )}`;
    regionHeader.textContent = `Region: ${region}`;
    countryHeader.textContent = `Country: ${country}`;
  }

  function displaySingleMeasurements(conditionInfo, direction, humidityInfo) {
    condition.textContent = conditionInfo;
    windDir.textContent = `Wind Direction: ${direction}`;
    humidity.textContent = `Humidity: ${humidityInfo}%`;
  }

  function displayDoubleMeasurements(
    internationalTemp,
    internationalFeel,
    internationalWind,
    imperialTemp,
    imperialFeel,
    imperialWind
  ) {
    temp.textContent = `Temp: ${internationalTemp}\xB0C (${imperialTemp}\xB0F)`;
    feelTemp.textContent = `Feels Like: ${internationalFeel}\xB0C (${imperialFeel}\xB0F)`;
    windSpeed.textContent = `Wind Speed: ${internationalWind}KPH (${imperialWind}MPH)`;
  }

  function displayWeatherCondition(description) {
    container.className = "container";
    footer.replaceChildren();
    footer.textContent = "Image by ";
    const pictureLink = document.createElement("a");
    if (description === "Sunny") {
      container.classList.add("sunny");
      pictureLink.setAttribute(
        "href",
        "https://unsplash.com/photos/zjoydJb17mE"
      );
      pictureLink.textContent = "Grooveland Designs";
      footer.appendChild(pictureLink);
    } else if (description === "Clear") {
      container.classList.add("clear");
      pictureLink.setAttribute(
        "href",
        "https://www.pexels.com/photo/green-tree-268533/"
      );
      pictureLink.textContent = "Pixabay";
      footer.appendChild(pictureLink);
    } else if (description === "Partly cloudy") {
      container.classList.add("partly-cloudy");
      pictureLink.setAttribute(
        "href",
        "https://www.pexels.com/photo/brown-field-and-blue-sky-46160/"
      );
      pictureLink.textContent = "Pixabay";
      footer.appendChild(pictureLink);
    } else if (description === "Cloudy") {
      container.classList.add("cloudy");
      pictureLink.setAttribute(
        "href",
        "https://www.pexels.com/photo/gray-rolled-asphalt-road-under-cloudy-sky-52531/"
      );
      pictureLink.textContent = "Pixabay";
      footer.appendChild(pictureLink);
    } else if (description === "Overcast") {
      container.classList.add("overcast");
      pictureLink.setAttribute(
        "href",
        "https://unsplash.com/photos/o4u8pFwSiQE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
      );
      pictureLink.textContent = "Antoine Barrès on Unsplash";
      footer.appendChild(pictureLink);
    } else if (
      description === "Mist" ||
      description === "Fog" ||
      description === "Freezing fog"
    ) {
      container.classList.add("mist");
      pictureLink.setAttribute(
        "href",
        "https://unsplash.com/photos/6tfO1M8_gas?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
      );
      pictureLink.textContent = "Chris Lawton on Unsplash";
      footer.appendChild(pictureLink);
    } else if (
      description === "Patchy rain possible" ||
      description === "Patchy freezing drizzle possible" ||
      description === "Patchy light drizzle" ||
      description === "Light drizzle" ||
      description === "Freezing drizzle" ||
      description === "Heavy freezing drizzle" ||
      description === "Patchy light rain" ||
      description === "Light rain" ||
      description === "Moderate rain at times" ||
      description === "Moderate rain" ||
      description === "Heavy rain at times" ||
      description === "Heavy rain" ||
      description === "Light freezing rain" ||
      description === "Moderate or heavy freezing rain" ||
      description === "Light rain shower" ||
      description === "Moderate or heavy rain shower" ||
      description === "Torrential rain shower"
    ) {
      container.classList.add("rain");
      pictureLink.setAttribute(
        "href",
        "https://unsplash.com/photos/F-t5EpfQNpk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
      );
      pictureLink.textContent = "Eutah Mizushima on Unsplash";
      footer.appendChild(pictureLink);
    } else if (
      description === "Patchy snow possible" ||
      description === "Blowing snow" ||
      description === "Blizzard" ||
      description === "Patchy light snow" ||
      description === "Light snow" ||
      description === "Patchy moderate snow" ||
      description === "Moderate snow" ||
      description === "Patchy heavy snow" ||
      description === "Heavy snow" ||
      description === "Light snow showers" ||
      description === "Moderate or heavy snow showers"
    ) {
      container.classList.add("snow");
      pictureLink.setAttribute(
        "href",
        "https://www.pexels.com/photo/photo-of-snowy-field-3462588/"
      );
      pictureLink.textContent = "Simon Berger";
      footer.appendChild(pictureLink);
    } else if (
      description === "Patchy sleet possible" ||
      description === "Light sleet" ||
      description === "Moderate or heavy sleet" ||
      description === "Ice pellets" ||
      description === "Light sleet showers" ||
      description === "Moderate or heavy sleet showers" ||
      description === "Light showers of ice pellets" ||
      description === "Moderate or heavy showers of ice pellets"
    ) {
      container.classList.add("sleet");
      pictureLink.setAttribute(
        "href",
        "https://www.pexels.com/photo/dry-grass-covered-with-ice-in-sunny-day-4338012/"
      );
      pictureLink.textContent = "ArtHouse Studio";
      footer.appendChild(pictureLink);
    } else if (description === "Thundery outbreaks possible") {
      container.classList.add("thunder");
      pictureLink.setAttribute(
        "href",
        "https://www.pexels.com/photo/lightning-and-gray-clouds-1162251/"
      );
      pictureLink.textContent = "Andre Furtado";
      footer.appendChild(pictureLink);
    } else if (
      description === "Patchy light rain with thunder" ||
      description === "Moderate or heavy rain with thunder"
    ) {
      container.classList.add("rain-thunder");
      pictureLink.setAttribute(
        "href",
        "https://unsplash.com/photos/KmsDi5XH__0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
      );
      pictureLink.textContent = "Basil Smith on Unsplash";
      footer.appendChild(pictureLink);
    } else if (
      description === "Patchy light snow with thunder" ||
      description === "Moderate or heavy snow with thunder"
    ) {
      container.classList.add("snow-thunder");
      pictureLink.setAttribute(
        "href",
        "https://pixabay.com/users/kellepics-4893063/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3412305"
      );
      pictureLink.textContent = "Stefan Keller from Pixabay";
      footer.appendChild(pictureLink);
    }
    info.className = "info flex";
  }

  const input = document.querySelector("input");
  const button = document.querySelector("button");

  button.addEventListener("click", (event) => {
    event.preventDefault();
    processUserInput(input.value);
    input.value = "";
  });
})();
