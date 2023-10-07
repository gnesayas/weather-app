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

  const container = document.querySelector(".container");
  const errorP = document.querySelector("p");
  const footer = document.querySelector("h3");

  function processUserInput(location) {
    getWeather(location)
      .then(function (response) {
        const result = processResponse(response);
        console.log(result.text);
        container.className = "container";
        footer.replaceChildren();
        footer.textContent = "Image by ";
        const pictureLink = document.createElement("a");
        if (result.text === "Sunny") {
          container.classList.add("sunny");
          pictureLink.setAttribute(
            "href",
            "https://unsplash.com/photos/zjoydJb17mE"
          );
          pictureLink.textContent = "Grooveland Designs";
          footer.appendChild(pictureLink);
        } else if (result.text === "Clear") {
          container.classList.add("clear");
          pictureLink.setAttribute(
            "href",
            "https://www.pexels.com/photo/green-tree-268533/"
          );
          pictureLink.textContent = "Pixabay";
          footer.appendChild(pictureLink);
        } else if (result.text === "Partly cloudy") {
          container.classList.add("partly-cloudy");
          pictureLink.setAttribute(
            "href",
            "https://www.pexels.com/photo/brown-field-and-blue-sky-46160/"
          );
          pictureLink.textContent = "Pixabay";
          footer.appendChild(pictureLink);
        } else if (result.text === "Cloudy") {
          container.classList.add("cloudy");
          pictureLink.setAttribute(
            "href",
            "https://www.pexels.com/photo/gray-rolled-asphalt-road-under-cloudy-sky-52531/"
          );
          pictureLink.textContent = "Pixabay";
          footer.appendChild(pictureLink);
        } else if (result.text === "Overcast") {
          container.classList.add("overcast");
          pictureLink.setAttribute(
            "href",
            "https://unsplash.com/photos/o4u8pFwSiQE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          );
          pictureLink.textContent = "Antoine Barrès on Unsplash";
          footer.appendChild(pictureLink);
        } else if (
          result.text === "Mist" ||
          result.text === "Fog" ||
          result.text === "Freezing fog"
        ) {
          container.classList.add("mist");
          pictureLink.setAttribute(
            "href",
            "https://unsplash.com/photos/6tfO1M8_gas?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          );
          pictureLink.textContent = "Chris Lawton on Unsplash";
          footer.appendChild(pictureLink);
        } else if (
          result.text === "Patchy rain possible" ||
          result.text === "Patchy freezing drizzle possible" ||
          result.text === "Patchy light drizzle" ||
          result.text === "Light drizzle" ||
          result.text === "Freezing drizzle" ||
          result.text === "Heavy freezing drizzle" ||
          result.text === "Patchy light rain" ||
          result.text === "Light rain" ||
          result.text === "Moderate rain at times" ||
          result.text === "Moderate rain" ||
          result.text === "Heavy rain at times" ||
          result.text === "Heavy rain" ||
          result.text === "Light freezing rain" ||
          result.text === "Moderate or heavy freezing rain" ||
          result.text === "Light rain shower" ||
          result.text === "Moderate or heavy rain shower" ||
          result.text === "Torrential rain shower"
        ) {
          container.classList.add("rain");
          pictureLink.setAttribute(
            "href",
            "https://unsplash.com/photos/F-t5EpfQNpk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          );
          pictureLink.textContent = "Eutah Mizushima on Unsplash";
          footer.appendChild(pictureLink);
        } else if (
          result.text === "Patchy snow possible" ||
          result.text === "Blowing snow" ||
          result.text === "Blizzard" ||
          result.text === "Patchy light snow" ||
          result.text === "Light snow" ||
          result.text === "Patchy moderate snow" ||
          result.text === "Moderate snow" ||
          result.text === "Patchy heavy snow" ||
          result.text === "Heavy snow" ||
          result.text === "Light snow showers" ||
          result.text === "Moderate or heavy snow showers"
        ) {
          container.classList.add("snow");
          pictureLink.setAttribute(
            "href",
            "https://www.pexels.com/photo/photo-of-snowy-field-3462588/"
          );
          pictureLink.textContent = "Simon Berger";
          footer.appendChild(pictureLink);
        } else if (
          result.text === "Patchy sleet possible" ||
          result.text === "Light sleet" ||
          result.text === "Moderate or heavy sleet" ||
          result.text === "Ice pellets" ||
          result.text === "Light sleet showers" ||
          result.text === "Moderate or heavy sleet showers" ||
          result.text === "Light showers of ice pellets" ||
          result.text === "Moderate or heavy showers of ice pellets"
        ) {
          container.classList.add("sleet");
          pictureLink.setAttribute(
            "href",
            "https://www.pexels.com/photo/dry-grass-covered-with-ice-in-sunny-day-4338012/"
          );
          pictureLink.textContent = "ArtHouse Studio";
          footer.appendChild(pictureLink);
        } else if (result.text === "Thundery outbreaks possible") {
          container.classList.add("thunder");
          pictureLink.setAttribute(
            "href",
            "https://www.pexels.com/photo/lightning-and-gray-clouds-1162251/"
          );
          pictureLink.textContent = "Andre Furtado";
          footer.appendChild(pictureLink);
        } else if (
          result.text === "Patchy light rain with thunder" ||
          result.text === "Moderate or heavy rain with thunder"
        ) {
          container.classList.add("rain-thunder");
          pictureLink.setAttribute(
            "href",
            "https://unsplash.com/photos/KmsDi5XH__0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
          );
          pictureLink.textContent = "Basil Smith on Unsplash";
          footer.appendChild(pictureLink);
        } else if (
          result.text === "Patchy light snow with thunder" ||
          result.text === "Moderate or heavy snow with thunder"
        ) {
          container.classList.add("snow-thunder");
          pictureLink.setAttribute(
            "href",
            "https://pixabay.com/users/kellepics-4893063/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3412305"
          );
          pictureLink.textContent = "Stefan Keller from Pixabay";
          footer.appendChild(pictureLink);
        }
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

  const input = document.querySelector("input");
  const button = document.querySelector("button");

  button.addEventListener("click", (event) => {
    event.preventDefault();
    processUserInput(input.value);
    input.value = "";
  });
})();
