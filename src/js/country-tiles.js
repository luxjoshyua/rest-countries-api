import { data } from "./countries-api";
import updateSingleCountry from "./update-single-country";
export let country2;

//   populate the country tiles
const countriesContainer = document.querySelector(".countries-inner");
const searchBar = document.querySelector(".search-inner");
const countrySecondScreen = document.querySelector(".country-second-screen");

export default (createCountry) => {
  // go through each country and populate it with the data
  data.forEach((country) => {
    const countryItem = document.querySelector(".country-single");
    const clone = countryItem.cloneNode(true);
    countriesContainer.appendChild(clone);
    // set the image here
    // clone.classList.add("country-" + `${country.alpha3Code}`);
    // add the region to the class so can access in the DOM
    let tRegion = country.region
      ? " region-" + country.region
      : " region-Not-specified";
    clone.setAttribute(
      "class",
      "country-single country-" + `${country.alpha3Code}` + tRegion
    );
    clone
      .querySelector(".country-image")
      .setAttribute("src", `${country.flag}`);
    clone.querySelector(".country-image").setAttribute("width", "100%");
    clone.querySelector(".country-name").innerHTML = `${country.name}`;

    clone.querySelector(
      ".population"
    ).innerHTML = `<strong>Population: </strong>${country.population.toLocaleString()}`;

    if (country.region === "") {
      clone.querySelector(
        ".region"
      ).innerHTML = `<strong>Region: </strong> Not Defined`;
    } else {
      clone.querySelector(
        ".region"
      ).innerHTML = `<strong>Region: </strong>${country.region}`;
    }

    if (country.capital === "") {
      clone.querySelector(
        ".capital"
      ).innerHTML = `<strong>Capital: </strong> Not Defined`;
    } else {
      clone.querySelector(
        ".capital"
      ).innerHTML = `<strong>Capital: </strong>${country.capital}`;
    }
    country2 = country;
    // show the country slide for a single country
    clone.addEventListener("click", (e) => {
      updateSingleCountry(country);
      //   window.scrollTo(0, 0);
      countriesContainer.style.display = "none";
      countrySecondScreen.style.display = "block";
      //   hide the searchbar on second screen
      searchBar.style.display = "none";
    });
  });
};
