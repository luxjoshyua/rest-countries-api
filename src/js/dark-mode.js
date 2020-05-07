const darkModeElement = document.querySelector(".dark-mode");
const colourInvert = () => {
  // check  the function is running
  console.log("DARK MODE function reached");
  // find the body tag, assign it to a variable (bodyTag)
  // const bodyTag = document.getElementsByTagName("body");
  const bodyTag = document.querySelector("body");
  // check our elements have been assigned correctly
  //   console.log(darkModeElement);
  console.log(bodyTag);

  bodyTag.classList.toggle("inverted");

};

darkModeElement.addEventListener("click", (e) => {
  //   console.log("here is my click", e);
  colourInvert();
});
