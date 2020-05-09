const apiURL = "https://restcountries.eu/rest/v2/all";

// let offset = 0;
let data = [];

fetch(apiURL)
  .then((data) => {
    return data.json();
  })
  .then((res) => {
    // check the api is pulling expected data
    // console.log("this is what res looks like", res);
    data = res;
    createCountry(res);
    // remove class loading here
    // showAfricaCountries(res);
  })
  .catch((error) => {
    console.log(
      "Our apologies but there is a" +
        error +
        " with our API, it will be back up and running shortly"
    );
  });

//   populate the country tiles
const countriesContainer = document.querySelector(".countries-inner");
const searchBar = document.querySelector(".search-inner");
const createCountry = (data) => {
  // go through each country and populate it with the data
  data.forEach((country) => {
    const countryItem = document.querySelector(".country-single");
    const clone = countryItem.cloneNode(true);
    countriesContainer.appendChild(clone);
    // set the image here
    clone.classList.add("country-" + `${country.alpha3Code}`);
    // add the region to the class so can access in the DOM
    clone.classList.add("country-" + `${country.region}`);
    clone
      .querySelector(".country-image")
      .setAttribute("src", `${country.flag}`);
    clone.querySelector(".country-image").setAttribute("width", "100%");
    clone.querySelector(".country-name").innerHTML = `${country.name}`;
    clone.querySelector(
      ".population"
    ).innerHTML = `<strong>Population: </strong>${country.population}`;
    clone.querySelector(
      ".region"
    ).innerHTML = `<strong>Region: </strong>${country.region}`;
    clone.querySelector(
      ".capital"
    ).innerHTML = `<strong>Capital: </strong>${country.capital}`;

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

// Search function
// add event listener to the search input field
const searchInputField = document.getElementById("site-search");
// e is the event object
searchInputField.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  //   loop through each country
  data.forEach((country) => {
    // console.log("this is my data here", data);
    //   if the entered search matches the country name
    let tCountryName = country.name.toLowerCase();
    let countryDOM = document.querySelector(".country-" + country.alpha3Code);
    // console.log("searchString = ", searchString);
    if (tCountryName.includes(searchString)) {
      //   add a class of visible to the relevant country
      countryDOM.classList.add("visible");
      countryDOM.classList.remove("hidden");
    }
    //   if it doesn't match the search
    else {
      //   add a class of hidden to all the not-matching countries
      countryDOM.classList.add("hidden");
      countryDOM.classList.remove("visible");
    }
  });
});

// Single country second screen view
// Select the second screen view
const countrySecondScreen = document.querySelector(".country-second-screen");

const updateSingleCountry = (country) => {
  //   set the flag image
  const countryFlagImage = countrySecondScreen.querySelector(".flag-image img");
  countryFlagImage.setAttribute("src", `${country.flag}`);
  countryFlagImage.setAttribute("width", "100%");
  //   set the country name
  const countryName = countrySecondScreen.querySelector(".country-name");
  countryName.innerHTML = `${country.name}`;
  //  set the native name
  const nativeName = countrySecondScreen.querySelector(".native-name");
  nativeName.innerHTML = `<strong>Native Name: </strong>${country.nativeName}`;
  //   set the population
  const population = countrySecondScreen.querySelector(".population");
  population.innerHTML = `<strong>Population: </strong>${country.population}`;
  //   set the region
  const region = countrySecondScreen.querySelector(".region");
  region.innerHTML = `<strong>Region: </strong>${country.region}`;
  //   set the subregion
  const subRegion = countrySecondScreen.querySelector(".sub-region");
  subRegion.innerHTML = `<strong>Sub Region: </strong>${country.subregion}`;
  //   set the capital
  const capital = countrySecondScreen.querySelector(".capital");
  capital.innerHTML = `<strong>Capital: </strong>${country.capital}`;
  //   set the domain name
  const domainName = countrySecondScreen.querySelector(".domain-name");
  domainName.innerHTML = `<strong>Top Level Domain: </strong>${country.topLevelDomain}`;

  //   set the currency
  const currency = countrySecondScreen.querySelector(".currencies");
  let currenciesStr = "";
  country.currencies.forEach((currency, key) => {
    if (key > 0) {
      currenciesStr += ", ";
    }
    currenciesStr += currency.name;
  });
  currency.innerHTML = `<strong>Currencies: </strong> ${currenciesStr}`;

  //   set the languages
  const languages = countrySecondScreen.querySelector(".languages");
  let languagesStr = "";
  country.languages.forEach((language, key) => {
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
  if (country.borders.length <= 0) {
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
  country.borders.forEach((border) => {
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
};

// getCountryDetails
// params
// countryQuery (France, FRA, FR, etc)
// idType (name, alpha2Code, alpha3Code, etc)
let returnVal;
function getCountryDetails(countryQuery, idType) {
  data.some(function (country) {
    if (country[idType] === countryQuery) {
      returnVal = country;
    }
  });
  return returnVal;
}

// Show the regions function
const dropDown = document.querySelector(".dropdown-content");

dropDown.addEventListener("click", (e) => {
  if (e.target.matches("#africa")) {
    console.log("africa has been successfully clicked");
    showAfricaCountries(data);
  }

  if (e.target.matches("#america")) {
    console.log("america has been successfully clicked");
  }

  if (e.target.matches("#asia")) {
    console.log("asia has been successfully clicked");
  }

  if (e.target.matches("#europe")) {
    console.log("europe has been successfully clicked");
  }

  if (e.target.matches("#oceania")) {
    console.log("oceania has been successfully clicked");
  }
});

const showAfricaCountries = (data) => {
  console.log("Show Africa function has been reached");
  data.forEach((country) => {
    const countrySingle = document.querySelector(".country-single");
    // console.log("here is my country single", countrySingle); // countrySingle is an array of 251 elements

    let countryRegionDOM = document.querySelector(".country-" + country.region);
    console.log(countryRegionDOM);
    if (countrySingle.classList.contains("country-Africa")) {
      console.log("Only show Africa countries");
      countryRegionDOM.classList.add("visible");
      countryRegionDOM.classList.remove("hidden");
    } else {
      countryRegionDOM.classList.add("hidden");
      countryRegionDOM.classList.remove("visible");
    }

    // if (countryRegion.includes(searchString)) {
    //   //   add a class of visible to the relevant country
    //   countryRegionDOM.classList.add("visible");
    //   countryRegionDOM.classList.remove("hidden");
    // }
    // //   if it doesn't match the search
    // else {
    //   //   add a class of hidden to all the not-matching countries
    //   countryRegionDOM.classList.add("hidden");
    //   countryRegionDOM.classList.remove("visible");
    // }
  });
};
