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
    console.log("This is my first data", data);
    createCountry(res);
    // loadMoreAirports();
    // remove class loading here
  })
  .catch((error) => {
    console.log(
      "Our apologies but there is a" +
        error +
        "with our API, it will be back up and running shortly"
    );
  });

//   populate the country tiles
const countriesContainer = document.querySelector(".countries-inner");
// const singleCountryContainer = document.querySelector(".country-single");
console.log("Here test two", data);
const createCountry = (data) => {
  // go through each country and populate it with the data
  //   console.log("This is what data looks like here", data);
  data.forEach((country) => {
    const countryItem = document.querySelector(".country-single");

    const clone = countryItem.cloneNode(true);
    countriesContainer.appendChild(clone);
    // set the image here
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
  });
};

// Search function
