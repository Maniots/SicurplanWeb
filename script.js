const EMAILJS_SERVICE_ID = "service_ce4c29d";
const EMAILJS_TEMPLATE_ID = "template_pjewq0k";
const EMAILJS_PUBLIC_KEY = "Jlk95krbrLBVFBt9q";

(function () {
  emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    const icon = mobileMenuButton.querySelector("i");
    if (mobileMenu.classList.contains("hidden")) {
      icon.className = "ri-menu-line ri-2x text-gray-800";
    } else {
      icon.className = "ri-close-line ri-2x text-gray-800";
    }
  });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = document.querySelector("header").offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Header Background on Scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("bg-white", "shadow-md");
    header.classList.remove("bg-opacity-95");
  } else {
    header.classList.remove("bg-white", "shadow-md");
    header.classList.add("bg-opacity-95");
  }
});

// Project Filter Functionality
const filterButtons = document.querySelectorAll(".project-filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => {
      btn.classList.remove("active", "bg-primary", "text-white");
      btn.classList.add("text-gray-700");
    });

    // Add active class to clicked button
    button.classList.add("active", "bg-primary", "text-white");
    button.classList.remove("text-gray-700");

    const filter = button.textContent.toLowerCase().trim();

    projectCards.forEach((card) => {
      if (filter === "tutti") {
        card.style.display = "block";
      } else {
        const category = card.getAttribute("data-category");
        if (
          category === filter ||
          (filter === "residenziale" && category === "residential") ||
          (filter === "commerciale" && category === "commercial") ||
          (filter === "industriale" && category === "industrial")
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      }
    });
  });
});

// Testimonials Carousel
class TestimonialsCarousel {
  constructor() {
    this.slider = document.querySelector(".testimonial-slider");
    this.track = document.querySelector(".testimonial-track");
    this.cards = document.querySelectorAll(".testimonial-card");
    this.prevBtn = document.querySelector(".testimonial-prev");
    this.nextBtn = document.querySelector(".testimonial-next");
    this.dotsContainer = document.querySelector(".testimonial-dots");

    this.currentIndex = 0;
    this.cardsPerView = this.getCardsPerView();
    this.totalSlides = Math.ceil(this.cards.length / this.cardsPerView);

    this.init();
  }

  getCardsPerView() {
    if (window.innerWidth >= 768) {
      return 3; // Desktop: mostra 3 card
    }
    return 1; // Mobile: mostra 1 card
  }

  init() {
    this.createDots();
    this.updateCarousel();
    this.bindEvents();

    // Auto-play
    this.startAutoPlay();
  }

  createDots() {
    this.dotsContainer.innerHTML = "";
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement("button");
      dot.className = `w-3 h-3 rounded-full transition-colors duration-300 ${
        i === 0 ? "bg-primary" : "bg-gray-300"
      }`;
      dot.addEventListener("click", () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  updateCarousel() {
    const translateX = -(this.currentIndex * (100 / this.cardsPerView));
    this.track.style.transform = `translateX(${translateX}%)`;

    // Update dots
    const dots = this.dotsContainer.querySelectorAll("button");
    dots.forEach((dot, index) => {
      dot.className = `w-3 h-3 rounded-full transition-colors duration-300 ${
        index === this.currentIndex ? "bg-primary" : "bg-gray-300"
      }`;
    });
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateCarousel();
  }

  prevSlide() {
    this.currentIndex =
      this.currentIndex === 0 ? this.totalSlides - 1 : this.currentIndex - 1;
    this.updateCarousel();
  }

  bindEvents() {
    this.nextBtn.addEventListener("click", () => {
      this.nextSlide();
      this.resetAutoPlay();
    });

    this.prevBtn.addEventListener("click", () => {
      this.prevSlide();
      this.resetAutoPlay();
    });

    // Handle resize
    window.addEventListener("resize", () => {
      const newCardsPerView = this.getCardsPerView();
      if (newCardsPerView !== this.cardsPerView) {
        this.cardsPerView = newCardsPerView;
        this.totalSlides = Math.ceil(this.cards.length / this.cardsPerView);
        this.currentIndex = 0;
        this.createDots();
        this.updateCarousel();
      }
    });

    // Pause auto-play on hover
    this.slider.addEventListener("mouseenter", () => this.pauseAutoPlay());
    this.slider.addEventListener("mouseleave", () => this.startAutoPlay());
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  resetAutoPlay() {
    this.pauseAutoPlay();
    this.startAutoPlay();
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TestimonialsCarousel();
});

// Service Cards Hover Effect
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
    card.style.boxShadow =
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow =
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
  });
});

// Back to Top Button
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.remove("opacity-0", "invisible");
    backToTopButton.classList.add("opacity-100", "visible");
  } else {
    backToTopButton.classList.add("opacity-0", "invisible");
    backToTopButton.classList.remove("opacity-100", "visible");
  }
});

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".service-card, .project-card, .testimonial-card"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// WhatsApp Click Tracking
document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
  link.addEventListener("click", () => {
    console.log("WhatsApp link clicked");
    // Qui potresti aggiungere tracking analytics se necessario
  });
});

// Loading Animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  // ESC key closes mobile menu
  if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
    mobileMenu.classList.add("hidden");
    const icon = mobileMenuButton.querySelector("i");
    icon.className = "ri-menu-line ri-2x text-gray-800";
  }
});

// Print Styles (for SEO and accessibility)
window.addEventListener("beforeprint", () => {
  document.body.classList.add("print-mode");
});

window.addEventListener("afterprint", () => {
  document.body.classList.remove("print-mode");
});

// Contact form handling with EmailJS
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById("submit-btn");
    const formMessage = document.getElementById("form-message");
    const originalBtnText = "Invia Richiesta";

    // Show loading state
    submitBtn.textContent = "Invio in corso...";
    submitBtn.disabled = true;
    formMessage.classList.add("hidden");

    // Get form data
    const formData = new FormData(this);
    const templateParams = {
      from_name: formData.get("from_name"),
      from_email: formData.get("from_email"),
      phone: formData.get("phone"),
      project_type: formData.get("project_type"),
      message: formData.get("message"),
      subject_title: formData.get("subject_title"),
    };

    // Send email using EmailJS
    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);

          // Show success message
          formMessage.innerHTML =
            '<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mt-6 rounded"><strong>Successo!</strong> Il tuo messaggio è stato inviato. Ti contatteremo presto.</div>';
          formMessage.classList.remove("hidden");

          // Reset form
          document.getElementById("contact-form").reset();
        },
        function (error) {
          console.log("FAILED...", error);

          // Show error message
          formMessage.innerHTML =
            '<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"><strong>Errore!</strong> Si è verificato un problema nell\'invio del messaggio. Riprova più tardi.</div>';
          formMessage.classList.remove("hidden");
        }
      )
      .finally(function () {
        // Reset button state
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;

        setTimeout(() => {
          formMessage.classList.add("hidden");
        }, 5000); // Hide message after 5 seconds
      });
  });

function initServiceAreaMap() {
  // Aspetta che il container sia visibile
  setTimeout(() => {
    // Coordinate di Milano (Via Sammartini 5)
    const milanCoords = [45.4842, 9.204];

    // Crea la mappa con più opzioni
    const map = L.map("map", {
      center: milanCoords,
      zoom: 8,
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      boxZoom: true,
      keyboard: true,
      dragging: true,
      touchZoom: true,
      preferCanvas: false,
      renderer: L.svg(),
    });

    // Prova con diversi provider di tile per evitare problemi di caricamento
    const osmLayer = L.tileLayer(
      "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
      {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        minZoom: 6,
        crossOrigin: true,
        tileSize: 256,
        zoomOffset: 0,
      }
    );
    // Aggiungi il layer principale
    osmLayer.addTo(map);

    // Forza il ridimensionamento quando la mappa è pronta
      setTimeout(() => {
        map.invalidateSize();
        map.setView(milanCoords, 8);
      }, 300);

    // Marker personalizzato per l'ufficio principale
    const officeIcon = L.divIcon({
      html: '<div style="background-color: #1e40af; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
      className: "custom-marker",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    const officeMarker = L.marker(milanCoords, { icon: officeIcon }).addTo(map);
    officeMarker.bindPopup(`
                    <div style="padding: 8px; min-width: 180px;">
                        <h3 style="color: #1e40af; font-weight: 600; margin: 0 0 8px 0;">🏢 Sicurplan.com</h3>
                        <p style="margin: 0; font-size: 14px; line-height: 1.4;">
                            📍 Via Sammartini 5<br>20124 Milano (MI)
                        </p>
                        <p style="margin: 4px 0 0 0; font-size: 14px; color: #059669;">
                            📞 +39 024 004 2454
                        </p>
                    </div>
                `);

    // Area di servizio principale (Lombardia) - più visibile
    const lombardiaArea = L.circle(milanCoords, {
      color: "#1e40af",
      weight: 3,
      fillColor: "#3b82f6",
      fillOpacity: 0.15,
      radius: 60000, // 80km di raggio
    }).addTo(map);

    lombardiaArea.bindPopup(`
                    <div style="padding: 8px; min-width: 200px;">
                        <h3 style="color: #1e40af; font-weight: 600; margin: 0 0 8px 0;">🎯 Area di Servizio Principale</h3>
                        <p style="margin: 0; font-size: 14px;">
                            <strong>Lombardia e zone limitrofe</strong><br>
                            Raggio: 80km da Milano<br>
                            Servizio completo per tutti i progetti
                        </p>
                    </div>
                `);

    // Area di servizio estesa (Emilia-Romagna) - più visibile
    const emiliaCoords = [45.033459983213426, 9.663743631965444]; // Piacenza
    const emiliaArea = L.circle(emiliaCoords, {
      color: "#0ea5e9",
      weight: 3,
      fillColor: "#38bdf8",
      fillOpacity: 0.15,
      radius: 25000, // 60km di raggio
    }).addTo(map);

    emiliaArea.bindPopup(`
                    <div style="padding: 8px; min-width: 200px;">
                        <h3 style="color: #0ea5e9; font-weight: 600; margin: 0 0 8px 0;">🎯 Area di Servizio Estesa</h3>
                        <p style="margin: 0; font-size: 14px;">
                            <strong>Emilia-Romagna</strong><br>
                            Raggio: 25km da Piacenza<br>
                            Progetti specializzati di media/grande dimensione
                        </p>
                    </div>
                    
                `);

    // Marker per Modena
    const modenaIcon = L.divIcon({
      html: '<div style="background-color: #0ea5e9; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
      className: "custom-marker",
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });

    L.marker(emiliaCoords, { icon: modenaIcon }).addTo(map).bindPopup(`
                        <div style="padding: 8px; min-width: 180px;">
                            <h3 style="color: #0ea5e9; font-weight: 600; margin: 0 0 8px 0;">🏢 Sicurplan.com</h3>
                            <p style="margin: 0; font-size: 14px; line-height: 1.4;">
                                📍 Via della Besurica 7<br>20124 Piacenza (PC)
                            </p>
                            <p style="margin: 4px 0 0 0; font-size: 14px; color: #059669;">
                                📞 +39 024 004 2454
                            </p>
                        </div>
                    `);

    // Legenda migliorata
    const legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "legend-control");
      div.innerHTML = `
                        <div style="font-size: 12px; font-weight: 600; margin-bottom: 6px; color: #374151;">
                            Aree di Servizio
                        </div>
                        <div style="display: flex; align-items: center; margin-bottom: 4px;">
                            <div style="width: 12px; height: 12px; background-color: #3b82f6; border-radius: 50%; margin-right: 6px; opacity: 0.6; border: 1px solid #1e40af;"></div>
                            <span style="font-size: 11px;">Lombardia (80km)</span>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <div style="width: 12px; height: 12px; background-color: #38bdf8; border-radius: 50%; margin-right: 6px; opacity: 0.6; border: 1px solid #0ea5e9;"></div>
                            <span style="font-size: 11px;">Emilia-Romagna (60km)</span>
                        </div>
                    `;
      return div;
    };
    legend.addTo(map);

    // Forza il ridimensionamento della mappa
    setTimeout(() => {
      map.invalidateSize();
      // Ridimensiona nuovamente dopo un po'
      setTimeout(() => {
        map.invalidateSize();
      }, 1000);
    }, 100);

    // Adatta la vista per mostrare entrambe le aree
    setTimeout(() => {
      const group = new L.featureGroup([
        lombardiaArea,
        emiliaArea,
        officeMarker,
      ]);
      map.fitBounds(group.getBounds().pad(0.1));
    }, 800);
  }, 200);
}

// Inizializza la mappa quando il DOM è caricato
document.addEventListener("DOMContentLoaded", initServiceAreaMap);

