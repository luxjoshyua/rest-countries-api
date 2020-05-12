import "./search-function";
import createCountry from "./country-tiles";
const apiURL = "https://restcountries.eu/rest/v2/all";

// let offset = 0;
// let data = [];
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
    // createCountry(res);
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

function updateRegionFilter() {
  // store all potential regions first
  let regionsArr = [];
  let nonRegionStr = "Not-specified";
  data.forEach((country) => {
    if (
      !regionsArr.includes(country.region) &&
      !regionsArr.includes(nonRegionStr)
    ) {
      if (country.region === "") {
        regionsArr.push(nonRegionStr);
      } else {
        regionsArr.push(country.region);
        regionsArr.sort();
      }
    }
  });

  //update the dom
  let filterDOM = document.querySelector(".dropdown-content");
  filterDOM.innerHTML = "";

  regionsArr.forEach((region) => {
    // console.log("here is what my region looks like= ", region);
    let tDOM = document.createElement("a");
    tDOM.setAttribute("href", "#");
    tDOM.setAttribute("id", region);
    tDOM.innerText = region;
    filterDOM.appendChild(tDOM);
  });

  filterDOM.addEventListener("click", (e) => {
    filterCountriesRegion(e.target.getAttribute("id"));
  });
}

const filterCountriesRegion = (regionStr) => {
  // select each country in the first screen in the DOM
  const countryDOM = document.getElementsByClassName("country-single");
  // get the data, and loop through each country
  Array.from(countryDOM).forEach(function (country) {
    // select the country according to the region class
    let tRegionStr = "region-" + regionStr;
    country.classList.add("hidden");

    if (country.classList.contains(tRegionStr)) {
      country.classList.add("visible");
      country.classList.remove("hidden");
    } else {
      country.classList.remove("visible");
    }
  });
};
