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
  priceDisplay.textContent = `Total: $${price.toFixed(2)}`;
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

// Intersection Observer for fade-in
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll(".fade-in").forEach(el => {
  observer.observe(el);
});
