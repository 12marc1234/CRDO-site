// Handle Get Started button
document.getElementById("getStartedBtn").addEventListener("click", () => {
    alert("Coming Soon! Stay tuned for CRDO’s official launch.");
  });
  
  // Handle CTA button
  document.getElementById("ctaBtn").addEventListener("click", () => {
    window.scrollTo({
      top: document.getElementById("contact").offsetTop,
      behavior: "smooth"
    });
  });
  
  // Handle contact form submission (for now, just alert)
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thanks! We'll get back to you soon.");
    this.reset();
  });  