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
  1: "https://buy.stripe.com/8x24gycr27vP9FLb4T5wI0b", 
  2: "https://buy.stripe.com/eVqaEWgHicQ98BHeh55wI0a", 
  3: "https://buy.stripe.com/14A5kC0IkeYh3hn6OD5wI09", 
  4: "https://buy.stripe.com/cNibJ00IkeYh2djfl95wI08", 
  5: "https://buy.stripe.com/fZu14m4YA4jD3hna0P5wI07", 
  6: "https://buy.stripe.com/28E28q76IeYh4lrgpd5wI06", 
  7: "https://buy.stripe.com/eVqdR8bmY6rL3hna0P5wI05", 
  8: "https://buy.stripe.com/6oUfZg1MoeYh6tzc8X5wI04", 
  9: "https://buy.stripe.com/dRm14maiU3fz4lrc8X5wI03", 
  10: "https://buy.stripe.com/aFa3cu1MoaI18BH1uj5wI02", 
  11: "https://buy.stripe.com/9B6cN41Mo6rL3hna0P5wI01", 
  12: "https://buy.stripe.com/bJeeVc76I9DX6tz8WL5wI00"
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
