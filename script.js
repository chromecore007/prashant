/* ============================================================
   PREMIUM PORTFOLIO — MAIN SCRIPT
   Particles, Custom Cursor, 3D Tilt, Scroll Reveals, etc.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

  // ============================================================
  // 1. PARTICLE CANVAS (lightweight, GPU-friendly)
  // ============================================================
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let mouse = { x: -1000, y: -1000 };
  let animFrame;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.hue = Math.random() > 0.7 ? 230 : 260;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.x += (dx / dist) * force * 1.5;
        this.y += (dy / dist) * force * 1.5;
      }

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 70%, 70%, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }
  initParticles();

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(129, 140, 248, ${0.06 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    animFrame = requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ============================================================
  // 2. CUSTOM CURSOR
  // ============================================================
  const cursorDot = document.getElementById("cursor-dot");
  const cursorRing = document.getElementById("cursor-ring");
  let ringX = 0, ringY = 0;
  let dotX = 0, dotY = 0;

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    dotX = e.clientX;
    dotY = e.clientY;
  });

  function animateCursor() {
    ringX += (dotX - ringX) * 0.12;
    ringY += (dotY - ringY) * 0.12;
    cursorDot.style.left = dotX + "px";
    cursorDot.style.top = dotY + "px";
    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll("a, button, .btn, .proj-btn, .social-icons a, .tag, .menu-toggle");
  hoverTargets.forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursorDot.classList.add("hovering");
      cursorRing.classList.add("hovering");
    });
    el.addEventListener("mouseleave", () => {
      cursorDot.classList.remove("hovering");
      cursorRing.classList.remove("hovering");
    });
  });

  // ============================================================
  // 3. HEADER SCROLL EFFECT
  // ============================================================
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  // ============================================================
  // 4. ACTIVE NAV LINK (Scroll Spy)
  // ============================================================
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 180;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // ============================================================
  // 5. MOBILE MENU
  // ============================================================
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll("#nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // ============================================================
  // 6. TYPING ANIMATION
  // ============================================================
  const words = [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "MERN Stack Developer",
    "Problem Solver",
    "UI/UX Enthusiast"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedText = document.getElementById("typed-text");

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 90;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 400;
    }

    setTimeout(typeEffect, speed);
  }
  typeEffect();

  // ============================================================
  // 7. SCROLL REVEAL (Staggered)
  // ============================================================
  const revealElements = document.querySelectorAll(
    ".skill-card, .project-card, .edu-item, .about-card, .about-img-wrapper, .stat-item, .contact-left, .contact-form, .section-header"
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Find sibling index for stagger
        const parent = entry.target.parentElement;
        const siblings = Array.from(parent.children).filter(c =>
          c.classList.contains("skill-card") || c.classList.contains("project-card") ||
          c.classList.contains("edu-item") || c.classList.contains("stat-item")
        );
        const idx = siblings.indexOf(entry.target);
        const delay = idx >= 0 ? idx * 80 : 0;

        setTimeout(() => {
          entry.target.classList.add("reveal", "active");
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealElements.forEach(el => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });

  // ============================================================
  // 8. 3D TILT on project cards and hero image
  // ============================================================
  const tiltElements = document.querySelectorAll("[data-tilt-card], [data-tilt]");

  tiltElements.forEach(el => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      el.style.transition = "transform 0.1s ease-out";
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
      el.style.transition = "transform 0.5s var(--ease)";
    });
  });

  // ============================================================
  // 9. SMOOTH SCROLL for anchor links
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ============================================================
  // 10. CONTACT FORM
  // ============================================================
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim()
      };

      try {
        const res = await fetch("https://portbackend-sg6b.onrender.com/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        const data = await res.json();
        if (data.success) {
          showAlert("Message sent successfully!", "success");
          form.reset();
        } else {
          showAlert("Failed to send: " + data.message, "error");
        }
      } catch (err) {
        console.error("Error:", err);
        showAlert("Error connecting to server", "error");
      }
    });
  }

}); // end DOMContentLoaded

// ============================================================
// ALERT FUNCTIONS
// ============================================================
function showAlert(message, type = "success") {
  const alertBox = document.getElementById("customAlert");
  const alertMsg = document.getElementById("alertMessage");
  alertMsg.textContent = message;
  alertBox.className = "custom-alert" + (type === "error" ? " error" : "");
  alertBox.style.display = "flex";
  setTimeout(() => { alertBox.style.display = "none"; }, 4000);
}

function closeAlert() {
  document.getElementById("customAlert").style.display = "none";
}
