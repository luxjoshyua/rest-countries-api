import { data } from "./countries-api";

export default function updateRegionFilter() {
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
  //   console.log("What does regions array look like, = ", regionsArr);

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
    console.log(e.target.getAttribute("id"));
    //   add the active region to the dropdown menu
    const dropdownParent = document.querySelector(".dropdown");
    const activeRegionSpan = document.createElement("span");
    const activeRegion = e.target.getAttribute("id");
    activeRegionSpan.classList.add("active-region");
    activeRegionSpan.innerHTML = "<span>Active: </span>" + activeRegion;

    dropdownParent.appendChild(activeRegionSpan);
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
