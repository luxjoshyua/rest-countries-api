const darkModeElement = document.querySelector(".dark-mode");
const colourInvert = () => {
  // check  the function is running
  //   console.log("DARK MODE function reached");
  const bodyTag = document.querySelector("body");
  // check our elements have been assigned correctly
  //   console.log(bodyTag);
  bodyTag.classList.toggle("inverted");
};

darkModeElement.addEventListener("click", (e) => {
  //   console.log("here is my click", e);
  colourInvert();
});
