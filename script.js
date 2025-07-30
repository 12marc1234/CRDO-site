// Smooth scroll to preorder button
document.getElementById("preorderBtn").addEventListener("click", () => {
  document.getElementById("preorder").scrollIntoView({ behavior: "smooth" });
});

// Preorder button selection logic
const preorderOptions = document.querySelectorAll('.preorder-option');
const priceDisplay = document.getElementById("priceDisplay");
const preorderButton = document.getElementById("preorderButton");
let selectedMonths = null;

preorderOptions.forEach(option => {
  option.addEventListener('click', function() {
    // Remove selected class from all options
    preorderOptions.forEach(opt => opt.classList.remove('selected'));
    
    // Add selected class to clicked option
    this.classList.add('selected');
    
    // Get the selected data
    selectedMonths = parseInt(this.getAttribute('data-months'));
    const selectedPrice = parseFloat(this.getAttribute('data-price'));
    
    // Update price display with animation
    const prev = parseFloat(priceDisplay.textContent.replace(/[^0-9.]/g, "")) || 0;
    let start = prev, end = selectedPrice, duration = 300;
    let startTime = null;

    function animatePrice(time) {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const current = start + (end - start) * progress;
      priceDisplay.textContent = `Total: $${current.toFixed(2)}`;
      if (progress < 1) requestAnimationFrame(animatePrice);
    }
    requestAnimationFrame(animatePrice);
    
    // Enable the preorder button
    preorderButton.disabled = false;
  });
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

// FAQ Accordion functionality
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', function() {
    const faqItem = this.parentElement;
    const answer = this.nextElementSibling;
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
      if (item !== faqItem) {
        item.classList.remove('active');
      }
    });
    
    // Toggle current FAQ item
    faqItem.classList.toggle('active');
  });
});

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
  3: "https://buy.stripe.com/14A5kC0IkeYh3hn6OD5wI09", 
  6: "https://buy.stripe.com/28E28q76IeYh4lrgpd5wI06", 
  12: "https://buy.stripe.com/bJeeVc76I9DX6tz8WL5wI00"
};

function redirectToStripe() {
  if (!selectedMonths) {
    alert("Please select a plan first.");
    return;
  }
  
  const url = priceLinks[selectedMonths];
  if (!url) {
    alert("Payment link for this selection is not configured yet.");
    return;
  }
  window.location.href = url;
}
