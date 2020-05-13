import "./search-function";
import createCountry from "./country-tiles";
import updateRegionFilter from "./regional-filter";
const apiURL = "https://restcountries.eu/rest/v2/all";

// need to export the data so is accessible in our search-function.js
export let data = [];

fetch(apiURL)
  .then((data) => {
    return data.json();
  })
  .then((res) => {
    // check the api is pulling expected data
    // console.log("this is what res looks like", res);
    data = res;
    createCountry();
    updateRegionFilter();
    // remove class loading here
  })
  .catch((error) => {
    console.log(
      "Our apologies but there is a" +
        error +
        " with our API, it will be back up and running shortly"
    );
  });
