var nav = document.querySelector("nav");
var start = document.querySelector("#getStarted");

window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    // Cambia questo valore in base a quando vuoi che avvenga il cambio di colore
    nav.classList.add("navScroll");
    start.style.backgroundColor = "green";
  } else {
    nav.classList.remove("navScroll");
    start.style.backgroundColor = "#191919";
  }
});
