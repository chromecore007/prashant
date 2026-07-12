const text = "PRASHANT";
let index = 0;

const loadingText = document.getElementById("loading-text");
const progressBar = document.querySelector(".progress");

function typeAndLoad() {
  if (index < text.length) {
    loadingText.innerHTML += text.charAt(index);
    index++;
    progressBar.style.width = ((index / text.length) * 100) + "%";
    setTimeout(typeAndLoad, 100);
  } else {
    progressBar.style.width = "100%";
    setTimeout(flyLetters, 400);
  }
}

function flyLetters() {
  const letters = loadingText.innerText.split("");
  loadingText.innerHTML = "";

  letters.forEach((letter, i) => {
    const span = document.createElement("span");
    span.innerText = letter;
    if (i === 0 || i === letters.length - 1) {
      span.classList.add("letter-accent");
    }
    loadingText.appendChild(span);
  });

  const spans = loadingText.querySelectorAll("span");
  spans.forEach((span, i) => {
    setTimeout(() => {
      span.classList.add("fly");
    }, (spans.length - i) * 60);
  });

  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("fade-out");
    setTimeout(() => { preloader.style.display = "none"; }, 600);
  }, 600);
}

window.addEventListener("load", typeAndLoad);
