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
    // console.log("This is my first data", data);
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
// console.log("Here test two", data);
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

// add event listener to the search input field
const searchInputField = document.getElementById("site-search");
// e is the event object
searchInputField.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  console.log(searchString);
  //   console.log("This is the country name", data);

  if (searchString !== "") {
    //   loop through each country
    data.forEach((country) => {
      console.log("this is my data here", data);
      console.log("this is what country looks like", country);
      //   if the entered search matches the country name
      if (searchString.includes(country.name)) {
        //   add a class of visible to the relevant country
        country.classList.add("visible");
      }
      //   if it doesn't match the search
      else if (!searchString.includes(country.name)) {
        //   add a class of hidden to all the not-matching countries
        country.classList.add("hidden");
      }
    });
  }
});
