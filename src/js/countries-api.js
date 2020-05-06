const apiURL = "https://restcountries.eu/rest/v2/all";

const limit = 20;
let offset = 0;
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
    clone.querySelector(".country-image").innerHTML =
      "<img src=`${country.flag}`";
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

// createCountry();

// data.forEach((airport) => {
//   // select each airport item entry, specifically the parent content div, as its children is what you need
//   // to dynamically change each time
//   const airportItem = document
//     .getElementById("airport-list-item")
//     .querySelector(".content");
//   // clone the div setup that contains my first screen content
//   const clone = airportItem.cloneNode(true);
//   // console.log(clone);
//   airportContainer.appendChild(clone);
//   // access the api airportName dataset using dot notation
//   clone.querySelector(".name").innerHTML = `${airport.airportName}`;
//   // access the api countryName dataset using dot notation
//   clone.querySelector(".country").innerHTML = `${airport.country.countryName}`;

//   // setup an event listener for each airport,
//   // if the user clicks on the right arrow,
//   // show the individual airport screen
//   clone.addEventListener("click", (e) => {
//     updateSingleAirport(airport);
//     window.scrollTo(0, 0);
//     // checks if the click was registered on the more details box
//     airportContainer.style.display = "none";
//     singleAirportContainer.style.display = "block";
//   });
// });
