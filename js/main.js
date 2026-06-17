/**
 * Jefferson Photography — Main JavaScript
 */

const GALLERY_ITEMS = [
  { category: "school", label: "School Events", src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80&auto=format&fit=crop", alt: "Graduation ceremony — placeholder" },
  { category: "school", label: "School Events", src: "https://images.unsplash.com/photo-1427504490125-894ccf856f78?w=800&q=80&auto=format&fit=crop", alt: "Students in classroom — placeholder" },
  { category: "school", label: "School Events", src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80&auto=format&fit=crop", alt: "School hallway — placeholder" },
  { category: "sports", label: "Sports Events", src: "https://images.unsplash.com/photo-1461896836934-ff606aa5687d?w=800&q=80&auto=format&fit=crop", alt: "Track athlete — placeholder" },
  { category: "sports", label: "Sports Events", src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80&auto=format&fit=crop", alt: "Soccer action — placeholder" },
  { category: "sports", label: "Sports Events", src: "https://images.unsplash.com/photo-1546519638-68ebb0094bdd?w=800&q=80&auto=format&fit=crop", alt: "Basketball game — placeholder" },
  { category: "performances", label: "Performances", src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80&auto=format&fit=crop", alt: "Concert stage — placeholder" },
  { category: "performances", label: "Performances", src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80&auto=format&fit=crop", alt: "Dance performance — placeholder" },
  { category: "performances", label: "Performances", src: "https://images.unsplash.com/photo-1507676184212-d03ab07a099e?w=800&q=80&auto=format&fit=crop", alt: "Theater production — placeholder" },
  { category: "aviation", label: "Aviation Photography", src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&auto=format&fit=crop", alt: "Airplane wing at sunset — placeholder" },
  { category: "aviation", label: "Aviation Photography", src: "https://images.unsplash.com/photo-1464037860887-026267068ce6?w=800&q=80&auto=format&fit=crop", alt: "Aircraft on runway — placeholder" },
  { category: "aviation", label: "Aviation Photography", src: "https://images.unsplash.com/photo-1529078155058-f5f6f48120df?w=800&q=80&auto=format&fit=crop", alt: "Jet in flight — placeholder" },
  { category: "portraits", label: "Portraits", src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8b04?w=800&q=80&auto=format&fit=crop", alt: "Portrait with natural light — placeholder" },
  { category: "portraits", label: "Portraits", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop", alt: "Male portrait — placeholder" },
  { category: "portraits", label: "Portraits", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80&auto=format&fit=crop", alt: "Female portrait — placeholder" },
];

const header = document.getElementById("site-header");
const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const galleryGrid = document.getElementById("gallery-grid");
const filterBtns = document.querySelectorAll(".filter-btn");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

let visibleItems = [...GALLERY_ITEMS];
let currentLightboxIndex = 0;

/* ---- Gallery ---- */
function renderGallery(filter = "all") {
  galleryGrid.innerHTML = "";

  visibleItems = filter === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  visibleItems.forEach((item, index) => {
    const el = document.createElement("div");
    el.className = "gallery-item reveal";
    el.dataset.index = index;
    el.innerHTML = `
      <img src="${item.src}" alt="${item.alt}" loading="lazy" width="800" height="600">
      <span class="gallery-item-label">${item.label}</span>
    `;
    el.addEventListener("click", () => openLightbox(index));
    galleryGrid.appendChild(el);
  });

  observeReveal(galleryGrid.querySelectorAll(".reveal"));
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    renderGallery(btn.dataset.filter);
  });
});

/* ---- Lightbox ---- */
function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightboxImage();
  lightbox.hidden = false;
  requestAnimationFrame(() => lightbox.classList.add("open"));
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
  setTimeout(() => {
    lightbox.hidden = true;
  }, 400);
}

function updateLightboxImage() {
  const item = visibleItems[currentLightboxIndex];
  lightboxImg.src = item.src;
  lightboxImg.alt = item.alt;
  lightboxCaption.textContent = item.label;
}

function navigateLightbox(direction) {
  currentLightboxIndex =
    (currentLightboxIndex + direction + visibleItems.length) % visibleItems.length;
  updateLightboxImage();
}

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => navigateLightbox(-1));
lightboxNext.addEventListener("click", () => navigateLightbox(1));

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") navigateLightbox(-1);
  if (e.key === "ArrowRight") navigateLightbox(1);
});

/* ---- Navigation ---- */
navToggle.addEventListener("click", () => {
  const isOpen = navToggle.classList.toggle("open");
  siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("open");
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);

  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}, { passive: true });

/* ---- Scroll reveal ---- */
function observeReveal(elements) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

observeReveal(document.querySelectorAll(".reveal"));

/* ---- Stats counter ---- */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const isDecimal = el.dataset.decimal === "true";
  const duration = 2000;
  const start = performance.now();

  function formatValue(value) {
    if (isDecimal) return value.toFixed(1);
    if (target >= 1000) return Math.floor(value).toLocaleString();
    return Math.floor(value).toString();
  }

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = eased * target;
    el.textContent = formatValue(value);
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = isDecimal ? `${target.toFixed(1)}+` : `${formatValue(target)}+`;
    }
  }

  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".stat-number").forEach(animateCounter);
        statsObserver.disconnect();
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".stats");
if (statsSection) statsObserver.observe(statsSection);

/* ---- Contact form ---- */
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formStatus.textContent = "";
  formStatus.className = "form-status";

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const service = contactForm.service.value;
  const message = contactForm.message.value.trim();

  if (!name || !email || !service || !message) {
    formStatus.textContent = "Please fill in all fields.";
    formStatus.classList.add("error");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formStatus.textContent = "Please enter a valid email address.";
    formStatus.classList.add("error");
    return;
  }

  formStatus.textContent = "Thank you! Your message has been sent. I'll be in touch soon.";
  formStatus.classList.add("success");
  contactForm.reset();
});

/* ---- Footer year ---- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---- Init ---- */
renderGallery();
