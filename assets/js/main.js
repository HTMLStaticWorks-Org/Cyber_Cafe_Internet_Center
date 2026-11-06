/**
 * NexusDesk Digital & Document Center — Main Application Script
 * Handles: Central Business Config, Light/Dark Theme Persistence,
 * Desktop Hover+Click Dropdowns, Mobile Navbar, Interactive INR Rate Estimator,
 * Live Schedule Highlight, URL Service Pre-selection, Form Validation, and GSAP.
 */

const SITE_CONFIG = {
  businessName: "NexusDesk Digital & Document Center",
  phoneDisplay: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  landlineDisplay: "+91 80 2345 6789",
  landlineHref: "tel:+918023456789",
  whatsappNumber: "919876543210", // International format without '+'
  whatsappDefaultText: "Hello NexusDesk Center, I would like to enquire about your digital / printing services.",
  emailDisplay: "desk@nexusdesk-center.in",
  emailHref: "mailto:desk@nexusdesk-center.in",
  addressText: "Shop No. 14 & 15, Ground Floor, Metro Plaza Commercial Complex, MG Road, Bengaluru, Karnataka 560001",
  mapsDirectionsUrl: "https://www.google.com/maps/search/?api=1&query=MG+Road+Bengaluru+Karnataka+560001"
};

(function () {
  "use strict";

  /* ========================================================================
     1. Theme Engine (Light / Dark Mode with localStorage persistence)
     ======================================================================== */
  const THEME_STORAGE_KEY = "nexusdesk_theme_pref";

  function getSavedTheme() {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "dark" || saved === "light") {
        return saved;
      }
    } catch (e) {
      // Fallback if storage blocked
    }
    return "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      // Ignore storage error
    }

    const toggles = document.querySelectorAll(".js-theme-toggle");
    toggles.forEach((btn) => {
      const icon = btn.querySelector("i");
      if (icon) {
        icon.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
      }
      btn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
      btn.setAttribute(
        "title",
        theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
      );
    });
  }

  // Apply immediately on script load
  applyTheme(getSavedTheme());

  document.addEventListener("DOMContentLoaded", () => {
    // Re-sync toggle buttons after DOM ready
    applyTheme(getSavedTheme());

    document.querySelectorAll(".js-theme-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "light";
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
      });
    });

    /* ======================================================================
       2. Bind Configurable Contact & Location Links
       ====================================================================== */
    document.querySelectorAll('[data-config="whatsapp"]').forEach((el) => {
      const customMsg = el.getAttribute("data-whatsapp-msg") || SITE_CONFIG.whatsappDefaultText;
      const encoded = encodeURIComponent(customMsg);
      el.setAttribute("href", `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encoded}`);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });

    document.querySelectorAll('[data-config="phone"]').forEach((el) => {
      el.setAttribute("href", SITE_CONFIG.phoneHref);
    });

    document.querySelectorAll('[data-config="email"]').forEach((el) => {
      el.setAttribute("href", SITE_CONFIG.emailHref);
    });

    document.querySelectorAll('[data-config="directions"]').forEach((el) => {
      el.setAttribute("href", SITE_CONFIG.mapsDirectionsUrl);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });

    /* ======================================================================
       3. Sticky Header, Desktop Hover+Click Dropdown & Mobile Navbar
       ====================================================================== */
    const header = document.querySelector(".site-header");
    const backToTopBtn = document.querySelector(".js-back-to-top");

    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      if (header) {
        header.classList.toggle("scrolled", scrollY > 16);
      }
      if (backToTopBtn) {
        backToTopBtn.classList.toggle("visible", scrollY > 360);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // Desktop Hover + Click Dropdown harmonization
    const dropdownItems = document.querySelectorAll(".navbar-custom .nav-item.dropdown");
    dropdownItems.forEach((item) => {
      const toggle = item.querySelector(".dropdown-toggle");
      const menu = item.querySelector(".dropdown-menu");

      if (!toggle || !menu) return;

      // Allow click toggle on both desktop and mobile
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = menu.classList.contains("show");
        // Close any other open dropdowns
        document.querySelectorAll(".navbar-custom .dropdown-menu.show").forEach((m) => {
          m.classList.remove("show");
          if (m.parentElement) m.parentElement.classList.remove("show");
        });
        if (!isOpen) {
          menu.classList.add("show");
          item.classList.add("show");
          toggle.setAttribute("aria-expanded", "true");
        } else {
          menu.classList.remove("show");
          item.classList.remove("show");
          toggle.setAttribute("aria-expanded", "false");
        }
      });

      // On desktop, also support hover cleanly
      item.addEventListener("mouseenter", () => {
        if (window.innerWidth >= 992) {
          menu.classList.add("show");
          item.classList.add("show");
          toggle.setAttribute("aria-expanded", "true");
        }
      });

      item.addEventListener("mouseleave", () => {
        if (window.innerWidth >= 992) {
          menu.classList.remove("show");
          item.classList.remove("show");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Close dropdowns and mobile menu when clicking outside
    const navbarCollapse = document.getElementById("mainNavbarCollapse");
    const navbarToggler = document.querySelector(".navbar-toggler-custom");

    document.addEventListener("click", (e) => {
      // Close open dropdowns if click is outside dropdown
      if (!e.target.closest(".nav-item.dropdown")) {
        document.querySelectorAll(".navbar-custom .dropdown-menu.show").forEach((m) => {
          m.classList.remove("show");
          if (m.parentElement) m.parentElement.classList.remove("show");
        });
      }

      // Close mobile navbar if open and click is outside navbar
      if (
        navbarCollapse &&
        navbarCollapse.classList.contains("show") &&
        !e.target.closest(".navbar-custom")
      ) {
        if (window.bootstrap && bootstrap.Collapse) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) bsCollapse.hide();
        } else {
          navbarCollapse.classList.remove("show");
          if (navbarToggler) navbarToggler.setAttribute("aria-expanded", "false");
        }
      }
    });

    // Close mobile menu when pressing Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".navbar-custom .dropdown-menu.show").forEach((m) => {
          m.classList.remove("show");
          if (m.parentElement) m.parentElement.classList.remove("show");
        });
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          if (window.bootstrap && bootstrap.Collapse) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) bsCollapse.hide();
          } else {
            navbarCollapse.classList.remove("show");
          }
        }
      }
    });

    /* ======================================================================
       4. Weekly Schedule Current Day Highlight & Live Status
       ====================================================================== */
    const todayIndex = new Date().getDay(); // 0 = Sunday, 1 = Monday, ...
    document.querySelectorAll(".schedule-row[data-day]").forEach((row) => {
      const dayAttr = parseInt(row.getAttribute("data-day"), 10);
      if (dayAttr === todayIndex) {
        row.classList.add("current-day");
        const dayLabel = row.querySelector(".js-day-name");
        if (dayLabel && !dayLabel.textContent.includes("(Today)")) {
          dayLabel.textContent += " (Today)";
        }
      }
    });

    /* ======================================================================
       5. Interactive Service Filter Pills (Services & Rates Pages)
       ====================================================================== */
    const filterButtons = document.querySelectorAll("[data-filter-target]");
    if (filterButtons.length > 0) {
      filterButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const targetCategory = btn.getAttribute("data-filter-target");
          if (!targetCategory) return;

          e.preventDefault();
          filterButtons.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");

          const sections = document.querySelectorAll("[data-category-section]");
          sections.forEach((sec) => {
            const cat = sec.getAttribute("data-category-section");
            if (targetCategory === "all" || cat === targetCategory) {
              sec.style.display = "";
            } else {
              sec.style.display = "none";
            }
          });
        });
      });
    }

    /* ======================================================================
       6. Interactive INR Cost Estimator (Rates & Home 2)
       ====================================================================== */
    const estimatorForm = document.getElementById("rateEstimatorForm");
    if (estimatorForm) {
      const inputs = estimatorForm.querySelectorAll(".js-calc-input");
      const totalEl = document.getElementById("calcTotalAmount");
      const breakdownEl = document.getElementById("calcBreakdownText");
      const whatsappEstimateBtn = document.getElementById("calcWhatsappBtn");
      const resetCalcBtn = document.getElementById("calcResetBtn");

      function updateEstimate() {
        let total = 0;
        const selectedItems = [];

        inputs.forEach((input) => {
          const unitRate = parseFloat(input.getAttribute("data-rate") || "0");
          const label = input.getAttribute("data-label") || "Service";
          const qty = Math.max(0, parseInt(input.value || "0", 10));

          if (qty > 0 && unitRate > 0) {
            // Apply automatic bulk discount for B&W printing if 50+ pages
            let effectiveRate = unitRate;
            if (input.id === "calcBwPages" && qty >= 50) {
              effectiveRate = 2;
            }
            const sub = qty * effectiveRate;
            total += sub;
            selectedItems.push(`${label} (×${qty}): ₹${sub}`);
          }
        });

        if (totalEl) {
          totalEl.textContent = `₹${total.toLocaleString("en-IN")}`;
        }

        if (breakdownEl) {
          breakdownEl.textContent =
            selectedItems.length > 0
              ? selectedItems.join("  •  ")
              : "Adjust quantities above to calculate an instant estimate in INR (₹).";
        }

        if (whatsappEstimateBtn) {
          const msg =
            selectedItems.length > 0
              ? `Hello NexusDesk Center, I calculated an estimate on your website: ${selectedItems.join(", ")} — Total Estimate: ₹${total}. Please confirm availability.`
              : SITE_CONFIG.whatsappDefaultText;
          whatsappEstimateBtn.setAttribute(
            "href",
            `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`
          );
        }
      }

      inputs.forEach((input) => {
        input.addEventListener("input", updateEstimate);
        input.addEventListener("change", updateEstimate);
      });

      if (resetCalcBtn) {
        resetCalcBtn.addEventListener("click", () => {
          inputs.forEach((inp) => {
            inp.value = inp.getAttribute("data-default") || "0";
          });
          updateEstimate();
        });
      }

      updateEstimate();
    }

    /* ======================================================================
       7. URL Query Parameter Service Pre-Selection & Contact Form Validation
       ====================================================================== */
    const contactForm = document.getElementById("nexusContactForm");
    const serviceSelect = document.getElementById("contactService");

    if (serviceSelect) {
      const params = new URLSearchParams(window.location.search);
      const preselectedService = params.get("service");
      if (preselectedService) {
        const matchingOption = Array.from(serviceSelect.options).find(
          (opt) => opt.value.toLowerCase() === preselectedService.toLowerCase()
        );
        if (matchingOption) {
          serviceSelect.value = matchingOption.value;
        }
      }
    }

    if (contactForm) {
      const feedbackBox = document.getElementById("contactFormFeedback");
      const nameInput = document.getElementById("contactName");
      const phoneInput = document.getElementById("contactPhone");
      const emailInput = document.getElementById("contactEmail");
      const messageInput = document.getElementById("contactMessage");

      function validateField(field, condition) {
        if (!field) return true;
        if (!condition) {
          field.classList.add("is-invalid");
          field.setAttribute("aria-invalid", "true");
          return false;
        } else {
          field.classList.remove("is-invalid");
          field.setAttribute("aria-invalid", "false");
          return true;
        }
      }

      [nameInput, phoneInput, emailInput, serviceSelect, messageInput].forEach((el) => {
        if (!el) return;
        el.addEventListener("input", () => {
          el.classList.remove("is-invalid");
        });
        el.addEventListener("change", () => {
          el.classList.remove("is-invalid");
        });
      });

      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nameVal = nameInput ? nameInput.value.trim() : "";
        const phoneVal = phoneInput ? phoneInput.value.trim() : "";
        const emailVal = emailInput ? emailInput.value.trim() : "";
        const serviceVal = serviceSelect ? serviceSelect.value.trim() : "";
        const msgVal = messageInput ? messageInput.value.trim() : "";

        const isNameValid = validateField(nameInput, nameVal.length >= 2);
        const isPhoneValid = validateField(
          phoneInput,
          /^[+\d][\d\s-]{7,16}$/.test(phoneVal)
        );
        const isEmailValid = validateField(
          emailInput,
          emailVal === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)
        );
        const isServiceValid = validateField(serviceSelect, serviceVal !== "");
        const isMsgValid = validateField(messageInput, msgVal.length >= 8);

        if (isNameValid && isPhoneValid && isEmailValid && isServiceValid && isMsgValid) {
          if (feedbackBox) {
            const waText = `Hello NexusDesk, my name is ${nameVal} (${phoneVal}). Service Enquiry: ${serviceVal}. Details: ${msgVal}`;
            const waUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`;

            feedbackBox.innerHTML = `
              <div class="p-4 rounded-3 mt-3" style="background-color: var(--accent-success-soft); border: 1px solid var(--accent-success);">
                <div class="d-flex align-items-start gap-3">
                  <i class="bi bi-check-circle-fill fs-4" style="color: var(--accent-success);"></i>
                  <div>
                    <h5 class="mb-1" style="color: var(--text-primary);">Enquiry Validated & Ready</h5>
                    <p class="mb-2 small" style="color: var(--text-secondary);">
                      Thank you, <strong>${nameVal.replace(/</g, "&lt;")}</strong>. Your enquiry for <strong>${serviceVal.replace(/</g, "&lt;")}</strong> has been prepared on this static demo template. For immediate response or to attach documents directly, click below to send via WhatsApp or call our desk.
                    </p>
                    <div class="d-flex flex-wrap gap-2 mt-2">
                      <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp btn-sm py-2 px-3">
                        <i class="bi bi-whatsapp"></i> Send Enquiry on WhatsApp
                      </a>
                      <a href="${SITE_CONFIG.phoneHref}" class="btn-outline-brand btn-sm py-2 px-3">
                        <i class="bi bi-telephone-fill"></i> Call ${SITE_CONFIG.phoneDisplay}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            `;
            feedbackBox.style.display = "block";
            contactForm.reset();
          }
        }
      });
    }

    /* ======================================================================
       8. Subtle GSAP Scroll Animations (Progressive & Performance-Conscious)
       ====================================================================== */
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion && window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      const revealElements = document.querySelectorAll(".js-reveal");
      revealElements.forEach((el) => {
        gsap.from(el, {
          y: 22,
          opacity: 0,
          duration: 0.65,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        });
      });
    }
  });
})();

