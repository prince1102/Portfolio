// ===== Elements =====
const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const typedTagline = document.getElementById("typedTagline");

// ===== Theme helper =====
function applyTheme(isNight) {
  if (isNight) {
    document.body.classList.add("night");
    if (themeIcon) themeIcon.className = "fa-solid fa-sun";
    if (themeBtn) themeBtn.classList.add("active");
  } else {
    document.body.classList.remove("night");
    if (themeIcon) themeIcon.className = "fa-solid fa-moon";
    if (themeBtn) themeBtn.classList.remove("active");
  }
}

// Try load saved preference; fallback to OS preference
try {
  const saved = localStorage.getItem("kapil_theme");
  if (saved === "night") applyTheme(true);
  else if (saved === "light") applyTheme(false);
  else {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark);
  }
} catch (e) {
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark);
}

// Toggle theme on button click; persist
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const isNight = document.body.classList.toggle("night");
    if (themeIcon)
      themeIcon.className = isNight ? "fa-solid fa-sun" : "fa-solid fa-moon";
    try {
      localStorage.setItem("kapil_theme", isNight ? "night" : "light");
    } catch (e) {
      // ignore
    }
  });
}

// ===== Hamburger Menu =====
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// close nav when link clicked (mobile)
if (navLinks) {
  navLinks
    .querySelectorAll("a")
    .forEach((link) =>
      link.addEventListener("click", () => navLinks.classList.remove("show"))
    );
}

// ===== Fade-in on Scroll =====
const faders = document.querySelectorAll(".fade-in");
const appearOptions = { threshold: 0.18 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);
faders.forEach((fader) => appearOnScroll.observe(fader));

// ===== Typing Effect =====
const text =
  "🚀 I work with Node.js, Express.js, and MongoDB to build modern, secure web solutions.";
let idx = 0;
function typingReset() {
  if (typedTagline) typedTagline.innerHTML = "";
  idx = 0;
}
function typing() {
  if (!typedTagline) return;
  if (idx < text.length) {
    typedTagline.innerHTML += text[idx];
    idx++;
    setTimeout(typing, 28);
  }
}
typingReset();
typing();

// ===== Back to Top =====
const backToTop = document.createElement("div");
backToTop.id = "backTop";
backToTop.innerHTML = "⬆";
backToTop.setAttribute("role", "button");
backToTop.setAttribute("aria-label", "Back to top");
document.body.appendChild(backToTop);
backToTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) backToTop.classList.add("show");
  else backToTop.classList.remove("show");
});

// ===== Cursor Trail (disable small screens) =====
const cursor = document.createElement("div");
cursor.id = "cursorTrail";
document.body.appendChild(cursor);

function updateCursor(e) {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
}

function setCursorListeners() {
  if (window.innerWidth <= 420) {
    cursor.style.display = "none";
    document.removeEventListener("mousemove", updateCursor);
  } else {
    cursor.style.display = "block";
    document.addEventListener("mousemove", updateCursor);
  }
}
setCursorListeners();
window.addEventListener("resize", setCursorListeners);

// ===== Accessibility: close nav on Escape =====
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks) {
    navLinks.classList.remove("show");
  }
});
