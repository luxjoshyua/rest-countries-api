import { country2 } from "./country-tiles";
import { data } from "./countries-api";
let returnVal;

// Single country second screen view
// Select the second screen view
const countrySecondScreen = document.querySelector(".country-second-screen");
const countriesContainer = document.querySelector(".countries-inner");
const searchBar = document.querySelector(".search-inner");

export default function updateSingleCountry( country2 ) {
  //   set the flag image
  console.log("What does my country look like, = ", country2);
  const countryFlagImage = countrySecondScreen.querySelector(".flag-image img");
  countryFlagImage.setAttribute("src", `${country2.flag}`);
  countryFlagImage.setAttribute("width", "100%");
  //   set the country name
  const countryName = countrySecondScreen.querySelector(".country-name");
  countryName.innerHTML = `${country2.name}`;
  //  set the native name
  const nativeName = countrySecondScreen.querySelector(".native-name");
  nativeName.innerHTML = `<strong>Native Name: </strong>${country2.nativeName}`;
  //   set the population
  const population = countrySecondScreen.querySelector(".population");
  population.innerHTML = `<strong>Population: </strong>${country2.population.toLocaleString()}`;
  //   set the region
  const region = countrySecondScreen.querySelector(".region");
  if (country2.region === "") {
    region.innerHTML = `<strong>Region: </strong>Not defined`;
  } else {
    region.innerHTML = `<strong>Region: </strong>${country2.region}`;
  }
  //   set the subregion
  const subRegion = countrySecondScreen.querySelector(".sub-region");
  if (country2.subregion === "") {
    subRegion.innerHTML = `<strong>Sub Region: </strong>Not defined`;
  } else {
    subRegion.innerHTML = `<strong>Sub Region: </strong>${country2.subregion}`;
  }
  //   set the capital
  const capital = countrySecondScreen.querySelector(".capital");
  if (country2.capital === "") {
    capital.innerHTML = `<strong>Capital: </strong>Not defined`;
  } else {
    capital.innerHTML = `<strong>Capital: </strong>${country2.capital}`;
  }
  //   set the domain name
  const domainName = countrySecondScreen.querySelector(".domain-name");
  domainName.innerHTML = `<strong>Top Level Domain: </strong>${country2.topLevelDomain}`;
  //   set the currency
  const currency = countrySecondScreen.querySelector(".currencies");
  let currenciesStr = "";
  country2.currencies.forEach((currency, key) => {
    if (key > 0) {
      currenciesStr += ", ";
    }
    currenciesStr += currency.name;
  });
  currency.innerHTML = `<strong>Currencies: </strong> ${currenciesStr}`;

  //   set the languages
  const languages = countrySecondScreen.querySelector(".languages");
  let languagesStr = "";
  country2.languages.forEach((language, key) => {
    if (key > 0) {
      languagesStr += ", ";
    }
    languagesStr += language.name;
  });
  languages.innerHTML = `<strong>Languages: </strong> ${languagesStr}`;

  // set the border countries
  const borderCountries = countrySecondScreen.querySelector(
    ".border-countries"
  );
  const borderTitlesAll = countrySecondScreen.querySelectorAll(
    ".border-countries .border-title"
  );
  // remove the pre-existing border titles append to the DOM when user goes to new country
  borderTitlesAll.forEach((borderTitle) => {
    borderTitle.remove();
  });

  //   check if there are border countries, remove or add depending
  const borderTitles = document.createElement("p");
  borderTitles.classList.add("border-title");
  const borderHeading = document.querySelector(".border-heading");
  if (country2.borders.length <= 0) {
    if (borderHeading) {
      borderHeading.remove();
    }
  } else {
    if (!borderHeading) {
      const borderHeading = document.createElement("h4");
      borderHeading.classList.add("border-heading");
      borderHeading.innerText = "Border Countries:";
      borderCountries.appendChild(borderHeading);
    }
  }
  // loop through each border and show the clicked country/s
  country2.borders.forEach((border) => {
    const clone = borderTitles.cloneNode(true);
    let borderCountry = getCountryDetails(border, "alpha3Code");
    clone.innerHTML = borderCountry.name;
    clone.addEventListener("click", (e) => {
      updateSingleCountry(borderCountry);
    });
    borderCountries.appendChild(clone);
  });

  //   go back button
  const goBackButton = document.querySelector(".back-button");
  goBackButton.addEventListener("click", (e) => {
    countrySecondScreen.style.display = "none";
    countriesContainer.style.display = "flex";
    searchBar.style.display = "flex";
  });

  // getCountryDetails
  // params
  // countryQuery (France, FRA, FR, etc)
  // idType (name, alpha2Code, alpha3Code, etc)

  function getCountryDetails(countryQuery, idType) {
    data.some(function (country) {
      if (country[idType] === countryQuery) {
        returnVal = country;
      }
    });
    return returnVal;
  }
};
