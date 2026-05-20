const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (e) => {
    const clickedInsideNav = siteNav.contains(e.target);
    const clickedToggle = menuToggle.contains(e.target);

    if (!clickedInsideNav && !clickedToggle) {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Typing effect
const roles = [
  "Back-End Web Developer",
  "API Developer",
  "Back-End Developer",
  "Web Application Developer",
  "Data Automation Developer",
  "Lifetime Learner"
];

const typedText = document.getElementById("typedText");

if (typedText) {
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      charIndex++;
      typedText.textContent = currentRole.slice(0, charIndex);

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typedText.textContent = currentRole.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeLoop, isDeleting ? 45 : 85);
  }

  typeLoop();
}

// Reveal on scroll
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

// Active nav link
const currentPage = document.body.dataset.page;
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  const href = link.getAttribute("href");

  if (
    (currentPage === "home" && href === "index.html") ||
    (currentPage === "about" && href === "about.html") ||
    (currentPage === "portfolio" && href === "portfolio.html")
  ) {
    link.classList.add("active");
  }
});