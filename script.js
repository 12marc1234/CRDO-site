// Smooth scroll to preorder button
document.getElementById("preorderBtn").addEventListener("click", () => {
  document.getElementById("preorder").scrollIntoView({ behavior: "smooth" });
});

// Pricing logic
const pricing = {
  1: 5.00,
  2: 9.50,
  3: 13.50,
  4: 17.60,
  5: 21.50,
  6: 25.20,
  7: 28.70,
  8: 32.00,
  9: 35.10,
  10: 38.00,
  11: 40.70,
  12: 42.00
};

const monthSelect = document.getElementById("months");
const priceDisplay = document.getElementById("priceDisplay");

monthSelect.addEventListener("change", function () {
  const months = parseInt(this.value);
  const price = pricing[months];
  const prev = parseFloat(priceDisplay.textContent.replace(/[^0-9.]/g, "")) || 0;
  let start = prev, end = price, duration = 300;
  let startTime = null;

  function animatePrice(time) {
    if (!startTime) startTime = time;
    const progress = Math.min((time - startTime) / duration, 1);
    const current = start + (end - start) * progress;
    priceDisplay.textContent = `Total: $${current.toFixed(2)}`;
    if (progress < 1) requestAnimationFrame(animatePrice);
}
requestAnimationFrame(animatePrice);

});

// Smooth scroll for nav links
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const id = link.getAttribute("href").substring(1);
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  });
});

// Intersection Observer for fade-in animation
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll(".fade-in").forEach(el => {
  fadeObserver.observe(el);
});

// Active nav link highlight on scroll
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("nav a");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        const match = link.getAttribute("href").substring(1) === entry.target.id;
        link.classList.toggle("active", match);
      });
    }
  });
}, { threshold: 0.6 });

sections.forEach(section => sectionObserver.observe(section));

// Privacy Policy Modal
const modal = document.getElementById("privacyModal");
const privacyLink = document.getElementById("privacyLink");
privacyLink.addEventListener("click", e => {
  e.preventDefault();
  modal.style.display = "block";
});

const closeBtn = document.querySelector(".modal .close");

privacyLink.addEventListener("click", e => {
  e.preventDefault();
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }

});
