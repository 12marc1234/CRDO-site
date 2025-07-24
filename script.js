// Smooth scroll to contact form from header button
document.getElementById("preorderBtn").addEventListener("click", () => {
    const contactSection = document.getElementById("preorder");
    contactSection.scrollIntoView({ behavior: "smooth" });
  });
  
  // Discounted pricing table
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
  
  // Disable form handling demo alert for real use
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thanks! We'll get back to you soon.");
    this.reset();
  });  
