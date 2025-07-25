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
  1: "https://buy.stripe.com/test_dRmaEWeztaPLdtG4xr3VC00", 
  2: "https://buy.stripe.com/test_aFaeVc4YT3nj9dqfc53VC02", 
  3: "https://buy.stripe.com/test_3cI6oG0ID2jfahu3tn3VC03", 
  4: "https://buy.stripe.com/test_6oU5kC1MH9LH61e3tn3VC04", 
  5: "https://buy.stripe.com/test_eVq6oG0ID9LH61e6Fz3VC05", 
  6: "https://buy.stripe.com/test_dRmaEW2QLaPL61ebZT3VC06", 
  7: "https://buy.stripe.com/test_dRm9AS1MHbTPbly1lf3VC07", 
  8: "https://buy.stripe.com/test_3cIfZg3UPcXT61e3tn3VC08", 
  9: "https://buy.stripe.com/test_9B628q8b50b72P2gg93VC09", 
  10: "https://buy.stripe.com/test_8x29ASgHBaPLdtGbZT3VC0a", 
  11: "https://buy.stripe.com/test_6oUcN4bnhaPLgFSd3X3VC0b", 
  12: "https://buy.stripe.com/test_9B6aEWajd8HD89m1lf3VC0c"
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

// (Custom scroll inertia removed; using native browser scrolling)

// Mobile nav: show only one nav link at a time while scrolling
(function() {
  function isMobile() {
    return window.innerWidth <= 700 || /Mobi|Android/i.test(navigator.userAgent);
  }
  var navLinks = document.querySelectorAll('.nav-links a');
  if (!navLinks.length) return;
  function updateNavOnScroll() {
    if (!isMobile()) {
      navLinks.forEach(function(link) { link.style.display = ''; });
      return;
    }
    var scrollY = window.scrollY;
    var docHeight = document.body.scrollHeight - window.innerHeight;
    var section = Math.floor((scrollY / docHeight) * navLinks.length);
    navLinks.forEach(function(link, i) {
      link.style.display = (i === section) ? 'block' : 'none';
    });
  }
  window.addEventListener('scroll', updateNavOnScroll);
  window.addEventListener('resize', updateNavOnScroll);
  document.addEventListener('DOMContentLoaded', updateNavOnScroll);
})();

// Collapsible FAQ
(function() {
  var faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.closest('.faq-item');
      // Close all others
      document.querySelectorAll('.faq-item').forEach(function(i) {
        if (i !== item) i.classList.remove('active');
      });
      item.classList.toggle('active');
    });
  });
})();

// Dynamically shrink subtitle if about to clip off the screen
(function() {
  function shrinkSubtitle() {
    var desc = document.querySelector('.header-desc');
    if (!desc) return;
    desc.style.fontSize = '';
    let minFont = 0.7;
    let font = 1.1;
    desc.style.fontSize = font + 'rem';
    while (desc.scrollWidth > desc.offsetWidth && font > minFont) {
      font -= 0.05;
      desc.style.fontSize = font + 'rem';
    }
  }
  window.addEventListener('resize', shrinkSubtitle);
  window.addEventListener('DOMContentLoaded', shrinkSubtitle);
})();
