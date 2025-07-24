// Scroll from preorder button to contact form
document.getElementById("preorderBtn").addEventListener("click", () => {
    const contactSection = document.getElementById("contact");
    contactSection.scrollIntoView({ behavior: "smooth" });
  });
  
  // Scroll from CTA to contact form
  document.getElementById("ctaBtn").addEventListener("click", () => {
    const contactSection = document.getElementById("contact");
    contactSection.scrollIntoView({ behavior: "smooth" });
  });
  
  // Handle contact form submission (demo only)
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thanks! We'll get back to you soon.");
    this.reset();
  });  
