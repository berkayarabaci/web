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
    (currentPage === "home" && href === "/") ||
    (currentPage === "about" && href === "/about/") ||
    (currentPage === "portfolio" && href === "/portfolio/") ||
    (currentPage === "schulte" && href === "/schulte/")
  ) {
    link.classList.add("active");
  }
});

// Schulte Table Game
const schulteGrid = document.getElementById("schulteGrid");
const schulteNext = document.getElementById("schulteNext");
const schulteTime = document.getElementById("schulteTime");
const schulteBest = document.getElementById("schulteBest");
const schulteRestart = document.getElementById("schulteRestart");
const schulteMessage = document.getElementById("schulteMessage");

if (schulteGrid && schulteNext && schulteTime && schulteBest && schulteMessage) {
  let nextNumber = 1;
  let startTime = null;
  let timer = null;
  const totalNumbers = 25;

  const bestTime = localStorage.getItem("schulteBestTime");
  if (bestTime) {
    schulteBest.textContent = `${Number(bestTime).toFixed(2)}s`;
  }

  function shuffleNumbers() {
    const numbers = Array.from({ length: totalNumbers }, (_, i) => i + 1);

    for (let i = numbers.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[randomIndex]] = [numbers[randomIndex], numbers[i]];
    }

    return numbers;
  }

  function startTimer() {
    startTime = Date.now();

    timer = setInterval(() => {
      const seconds = (Date.now() - startTime) / 1000;
      schulteTime.textContent = `${seconds.toFixed(2)}s`;
    }, 50);
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function finishGame() {
    stopTimer();

    const finalTime = (Date.now() - startTime) / 1000;
    schulteTime.textContent = `${finalTime.toFixed(2)}s`;
    schulteMessage.textContent = `Finished in ${finalTime.toFixed(2)} seconds. Great job!`;

    const savedBest = localStorage.getItem("schulteBestTime");

    if (!savedBest || finalTime < Number(savedBest)) {
      localStorage.setItem("schulteBestTime", finalTime);
      schulteBest.textContent = `${finalTime.toFixed(2)}s`;
      schulteMessage.textContent = `New best time: ${finalTime.toFixed(2)} seconds!`;
    }
  }

  function createSchulteTable() {
    schulteGrid.innerHTML = "";
    nextNumber = 1;
    startTime = null;
    stopTimer();

    schulteNext.textContent = "1";
    schulteTime.textContent = "0.00s";
    schulteMessage.textContent = "Start by clicking number 1.";

    const numbers = shuffleNumbers();

    numbers.forEach((number) => {
      const button = document.createElement("button");
      button.className = "schulte-cell";
      button.type = "button";
      button.textContent = number;
      button.setAttribute("aria-label", `Number ${number}`);

      button.addEventListener("click", () => {
        if (number !== nextNumber) {
          schulteMessage.textContent = `Find number ${nextNumber}.`;
          return;
        }

        if (!startTime) {
          startTimer();
        }

        button.classList.add("done");
        button.disabled = true;

        nextNumber++;

        if (nextNumber > totalNumbers) {
          schulteNext.textContent = "Done";
          finishGame();
        } else {
          schulteNext.textContent = nextNumber;
          schulteMessage.textContent = `Good. Now find ${nextNumber}.`;
        }
      });

      schulteGrid.appendChild(button);
    });
  }

  if (schulteRestart) {
    schulteRestart.addEventListener("click", createSchulteTable);
  }

  createSchulteTable();
}