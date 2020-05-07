const darkModeElement = document.querySelector(".dark-mode");
const colourInvert = () => {
  // check  the function is running
  console.log("function reached");
  // find the body tag, assign it to a variable (bodyTag)
  const bodyTag = document.getElementsByTagName("body");
  // check our elements have been assigned correctly
  //   console.log(darkModeElement);
  console.log(bodyTag);

  // element.length checks there is something there, if there is, do something
  if (darkModeElement.length > 0) {
    if (bodyTag[0].getAttribute("class", "inverted")) {
      bodyTag[0].setAttribute("class", "");
    } else {
      bodyTag[0].setAttribute("class", "inverted");
    }
  }
};

darkModeElement.addEventListener("click", (e) => {
  //   console.log("here is my click", e);
  colourInvert();
});
