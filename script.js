document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            message: form.message.value.trim()
        };

        try {
            const res = await fetch("https://portbackend-fe4u.onrender.com/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (data.success) {
                showAlert("✅ Message sent for Prashant Thakur!", "success");
                form.reset();
            } else {
                showAlert("❌ Failed to send message: " + data.message, "error");
            }
        } catch (err) {
            console.error("Error:", err);
            showAlert("❌ Error connecting to server", "error");
        }
    });
});

const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

const words = [
  "Web Developer",
  "Frontend Developer",
  "Backend Developer",
  "MERN Stack Developer",
  "Programmer"
];

let i = 0;
const textSpan = document.getElementById("typed-text");

// helper: wrap letters in spans
function wrapLetters(word) {
  return word
    .split("")
    .map(letter => `<span>${letter}</span>`)
    .join("");
}

// initial load
textSpan.innerHTML = wrapLetters(words[0]);

function showWord() {
  const letters = textSpan.querySelectorAll("span");

  // 🔥 Step 1: last se ek ek letter fly out
  letters.forEach((span, index) => {
    setTimeout(() => {
      span.classList.add("fly-out-letter");
    }, (letters.length - index) * 50);
  });

  // 🔥 Step 2: new word after old gone
  setTimeout(() => {
    i = (i + 1) % words.length;
    textSpan.innerHTML = wrapLetters(words[i]);

    const newLetters = textSpan.querySelectorAll("span");

    // 🔥 Step 3: new letters fly in
    newLetters.forEach((span, index) => {
      span.classList.add("fly-in-letter");
      span.style.animationDelay = `${index * 90}ms`;
    });

  }, letters.length * 60);
}

// repeat
setInterval(showWord, 4000);

function showAlert(message, type = "success") {
    const alertBox = document.getElementById("customAlert");
    const alertMsg = document.getElementById("alertMessage");

    alertMsg.textContent = message;

    if (type === "error") {
        alertBox.classList.add("error");
    } else {
        alertBox.classList.remove("error");
    }

    alertBox.style.display = "flex"; 
    setTimeout(() => {
        alertBox.style.display = "none";
    }, 4000);
}

function closeAlert() {
    document.getElementById("customAlert").style.display = "none";
}
