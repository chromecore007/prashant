const text = "PRASHANT";
let index = 0;

const loadingText = document.getElementById("loading-text");
const progressBar = document.querySelector(".progress");

function typeAndLoad() {
  if (index < text.length) {
    loadingText.innerHTML += text.charAt(index);
    index++;

  
    let percent = (index / text.length) * 100;
    progressBar.style.width = percent + "%";

    setTimeout(typeAndLoad, 200); 
  } else {
    // ensure 100%
    progressBar.style.width = "100%";

    setTimeout(() => {
      flyLetters();
    }, 300);
  }
}


function flyLetters() {
  const letters = loadingText.innerText.split("");
  loadingText.innerHTML = "";

  letters.forEach((letter) => {
    const span = document.createElement("span");
    span.innerText = letter;
    loadingText.appendChild(span);
  });

  const spans = loadingText.querySelectorAll("span");

  spans.forEach((span, i) => {
    setTimeout(() => {
      span.classList.add("fly");
    }, (spans.length - i) * 100);
  });

  setTimeout(() => {
    document.getElementById("preloader").classList.add("fade-out");

    setTimeout(() => {
      document.getElementById("preloader").style.display = "none";
    }, 800);
  }, 1000);
}


window.addEventListener("load", () => {
  typeAndLoad();
});