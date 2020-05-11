import { data } from "./countries-api";

// Search function
// add event listener to the search input field
const searchInputField = document.getElementById("site-search");
// e is the event object
searchInputField.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  //   loop through each country
  data.forEach((country) => {
    //   if the entered search matches the country name
    let tCountryName = country.name.toLowerCase();
    let countryDOM = document.querySelector(".country-" + country.alpha3Code);
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
