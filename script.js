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

// Stripe payment redirect
const priceLinks = {
  1: "https://buy.stripe.com/7sI7t0ekM3dEcD6dR2", 
  2: "https://buy.stripe.com/14kcOhekw5bM9hS28e", 
  3: "https://buy.stripe.com/14k6ohekw7rAdhS14b", 
  4: "https://buy.stripe.com/28obI3g6k6lS4Ji5km", 
  5: "https://buy.stripe.com/00gcOhekw3dE3mAeUV", 
  6: "https://buy.stripe.com/00g8zJg6kbLY7kA9AE", 
  7: "https://buy.stripe.com/eVa7t0ekMbLY2RG3cd", 
  8: "https://buy.stripe.com/dR65nZ4vY5bM3mAeV8", 
  9: "https://buy.stripe.com/eVa16D7cEcWQcD6cMO", 
  10: "https://buy.stripe.com/28odT08owd1IdhS3ce", 
  11: "https://buy.stripe.com/00gbI3g6k1KO7kAbMP", 
  12: "https://buy.stripe.com/4gw6ohekM1KOfxC4gk"
};

function redirectToStripe() {
  const months = parseInt(document.getElementById("months").value, 10);
  const url = priceLinks[months];
  if (!url) {
    alert("Payment link for this selection is not configured yet.");
    return;
  }
  window.location.href = url;
}
