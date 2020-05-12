const darkModeElement = document.querySelector(".dark-mode");
const colourInvert = () => {
  const bodyTag = document.querySelector("body");
  // check our elements have been assigned correctly
  bodyTag.classList.toggle("inverted");
};

darkModeElement.addEventListener("click", (e) => {
  colourInvert();
});
