# NexusDesk — Digital & Document Center Commercial Website Template

> **NexusDesk** is a modern, responsive, commercial-grade website template designed for digital service centers, cyber cafés, computer workstations, laser printing studios, and online documentation assistance businesses.

---

## 🌟 Key Highlights

- **Aesthetic Direction**: Contemporary technology-inspired digital lounge aesthetic. Clean, deep navy, pure white, and cool slate grey palette accented with electric blue and cyan. Avoids outdated gaming-café tropes and cluttered computer-shop layouts.
- **Two Complete Homepages**:
  - **Home 1 (`index.html`)**: Digital Service Center with workstation photography, 3 service pillars, deep-freeze privacy showcase, customer testimonials, and operating hours.
  - **Home 2 (`home-2.html`)**: Express Tech & Rate Hub featuring a terminal hero, asymmetric Bento-grid layout, instant visit cost estimator, and audience workflow cards.
- **15 Categorized Services (`services.html`)**:
  - **Internet & Computer Services (4)**: High-Speed Internet Browsing, Workstation Access, Email/Online Account Assistance, Online Research.
  - **Printing & Document Services (6)**: Black & White Laser Printing, High-Definition Color Printing, Duplex Photocopying (Xerox), Document Scanning, PDF Conversion & Optimization, Document Formatting.
  - **Online Application Services (5)**: Online Form Filling, Government Application Assistance, Job Application Assistance, Exam & Admission Registrations, Resume Printing & Documentation Support.
- **Transparent Rates & Pricing in INR (`rates.html`)**:
  - 8 organized rate tables with editable sample prices in Indian Rupees (`₹`).
  - Clear guidelines on additional charges (specialty paper, heavy toner coverage, statutory fees).
  - Prominent independent service non-affiliation compliance notice.
- **Interactive INR Visit Cost Estimator**:
  - Dynamic JavaScript calculator on both Home 2 and Rates pages.
  - Automatically calculates real-time estimate with volume discounts (e.g. bulk B&W discount at 50+ pages).
  - One-click button to export the calculated estimate directly to WhatsApp.
- **Location, Schedule & Validated Contact (`contact.html`)**:
  - Ground-floor address, Google Maps navigation, phone links, and WhatsApp queue.
  - Interactive OpenStreetMap embed with dark-mode filter compatibility.
  - Live weekly schedule that dynamically highlights the current day of the week.
  - Validated enquiry form with client-side feedback and WhatsApp/Phone handover.
- **Theme Engine**:
  - Functional Light & Dark theme toggle with persistent storage in `localStorage`.
- **Zero Dead Links**:
  - All telephone links (`tel:`), emails (`mailto:`), WhatsApp buttons (`wa.me`), and directions are active and configurable.

---

## 📁 File Structure

```text
Cyber_Cafe_Internet_Center/
├── index.html              # Home 1: Classic Digital Service Center
├── home-2.html             # Home 2: Express Tech & Rate Hub
├── services.html           # Full catalog of 15 services with filter pills
├── rates.html              # 8 categorized INR (₹) rate tables + cost calculator
├── about.html              # Business story, equipment specs, and facility tour
├── contact.html            # Location map, hours schedule, and validated enquiry form
├── assets/
│   ├── css/
│   │   └── style.css       # Design system, CSS variables & theme styling
│   └── js/
│       └── main.js         # Theme toggle, config, dropdowns, estimator & validation
└── README.md               # Documentation & customization guide
```

---

## ⚙️ Quick Customization Guide

### 1. Central Business Configuration (`assets/js/main.js`)
All contact details, WhatsApp numbers, email addresses, and map URLs are maintained in a single configuration object at the top of `assets/js/main.js`:

```javascript
const SITE_CONFIG = {
  businessName: "NexusDesk Digital & Document Center",
  phoneDisplay: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  landlineDisplay: "+91 80 2345 6789",
  landlineHref: "tel:+918023456789",
  whatsappNumber: "919876543210", // International format without '+'
  whatsappDefaultText: "Hello NexusDesk Center, I would like to enquire about your services.",
  emailDisplay: "desk@nexusdesk-center.in",
  emailHref: "mailto:desk@nexusdesk-center.in",
  addressText: "Shop No. 14 & 15, Ground Floor, Metro Plaza Commercial Complex, MG Road, Bengaluru, Karnataka 560001",
  mapsDirectionsUrl: "https://www.google.com/maps/search/?api=1&query=MG+Road+Bengaluru+Karnataka+560001"
};
```
Updating these values automatically updates all dynamic links across the website.

### 2. Customizing Service Rates (`rates.html` & `home-2.html`)
All rate prices are enclosed within `.rate-price-badge` elements for easy search-and-replace:
```html
<span class="rate-price-badge">₹25 <span class="rate-unit">/ hour</span></span>
```

### 3. Adjusting Theme Colors (`assets/css/style.css`)
The website is powered by CSS custom properties in `:root`:
```css
:root, [data-theme="light"] {
  --bg-body: #F8FAFC;
  --bg-surface: #FFFFFF;
  --accent-primary: #0066FF;
  --accent-cyan: #0891B2;
}

[data-theme="dark"] {
  --bg-body: #070E1A;
  --bg-surface: #0F1B2E;
  --accent-primary: #3B82F6;
  --accent-cyan: #22D3EE;
}
```

---

## 🚀 Dependencies

- **Bootstrap 5.3.3**: Layout grid, utilities, and offcanvas collapse navigation.
- **Bootstrap Icons 1.11.3**: Crisp vector icons.
- **GSAP 3.12.5 & ScrollTrigger**: Performance-conscious micro-interactions.
- **Google Fonts**: `Plus Jakarta Sans`, `Inter`, and `JetBrains Mono`.

---

## 📱 Tested Responsive Resolutions

- **Mobile Viewports**: 360×800 (Android standard), 390×844 (iPhone 12/13/14).
- **Tablet Viewports**: 768×1024 (iPad portrait), 800×1280.
- **Desktop & High-DPI**: 1366×768, 1440×900, 1920×1080 and larger.
- **Validation**: Zero horizontal scrolling, fluid pricing tables, and accessible touch targets (≥ 44px).

