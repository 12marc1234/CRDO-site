# 🏃 CRDO — Discipline Built Differently

CRDO is a beautifully designed landing page for a gamified running app that transforms fitness into achievement, accountability, and connection. This page showcases CRDO's features, offers discounted pre-orders via Stripe, and informs users about the product launch.

Here is a link to the website: https://crdo-fitness.vercel.app/

---

## 📁 Project Structure


---

## 🌟 Features

- ✨ **Modern Glassmorphism UI** with gradients, shadows, and responsive layout  
- 🧠 **Pre-order Selector** with dynamic pricing and Stripe redirect  
- 🧾 **Privacy Policy Modal** with fade-in effect  
- 📱 **Mobile-First Design** with header image hiding and adaptive typography  
- ❓ **Expandable FAQ Accordion**  
- 🔗 **Smooth Scroll & Section Highlighting** via Intersection Observers  

---

## 🧠 Tech Stack

- HTML5 + CSS3 (with blur effects, custom typography, and layout)
- JavaScript ES6 (DOM manipulation, Stripe logic, scroll tracking)
- Stripe Checkout (via hardcoded `data-months` Stripe links)

---

## 💳 Pre-order Integration (Stripe)

When users select a plan, the corresponding button enables and redirects to Stripe. Pricing is defined as:

```js
const priceLinks = {
  3: "https://buy.stripe.com/00wcN49eQ5nH6tz6OD5wI0c", 
  6: "https://buy.stripe.com/28EcN4fDe3fz19fc8X5wI0d", 
  12: "https://buy.stripe.com/cNi3cu1MobM57xD0qf5wI0e"
};
