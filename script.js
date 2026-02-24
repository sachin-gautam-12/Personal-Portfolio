'use strict';

//===================================
// ELEMENT TOGGLE FUNCTION
//===================================
const elementToggleFunc = function (elem) {
  if (elem) elem.classList.toggle("active");
};

//===================================
// SIDEBAR TOGGLE
//===================================
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

//===================================
// PAGE NAVIGATION - UPDATED FOR CERTIFICATIONS
//===================================
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

function switchPage(pageName) {
  pages.forEach(page => {
    page.classList.remove("active");
  });

  const activePage = document.querySelector(`[data-page="${pageName}"]`);
  if (activePage) {
    activePage.classList.add("active");
  }

  navigationLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("data-nav-link") === pageName) {
      link.classList.add("active");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

if (navigationLinks.length > 0) {
  navigationLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const pageName = this.getAttribute("data-nav-link");
      if (pageName) {
        switchPage(pageName);
      }
    });
  });
}

//===================================
// PORTFOLIO FILTER
//===================================
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  if (!filterItems.length) return;

  filterItems.forEach(item => {
    if (selectedValue === "all") {
      item.classList.add("active");
    } else {
      const category = item.dataset.category;
      if (category && category.toLowerCase() === selectedValue.toLowerCase()) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    }
  });
};

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

if (selectItems.length > 0) {
  selectItems.forEach(item => {
    item.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase().trim();

      if (selectValue) {
        selectValue.innerText = this.innerText;
      }

      if (select) {
        elementToggleFunc(select);
      }

      filterFunc(selectedValue);

      if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
          btn.classList.remove("active");
          if (btn.innerText.toLowerCase().trim() === selectedValue) {
            btn.classList.add("active");
          }
        });
      }
    });
  });
}

if (filterBtns.length > 0) {
  let lastClickedBtn = filterBtns[0];

  filterBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase().trim();

      if (selectValue) {
        selectValue.innerText = this.innerText;
      }

      filterFunc(selectedValue);

      if (lastClickedBtn) {
        lastClickedBtn.classList.remove("active");
      }
      this.classList.add("active");
      lastClickedBtn = this;
    });
  });
}

//===================================
// CERTIFICATION FILTER (Optional - if you want to filter certifications)
//===================================
const certFilterBtns = document.querySelectorAll("[data-cert-filter]");
const certItems = document.querySelectorAll("[data-cert-item]");

if (certFilterBtns.length > 0) {
  certFilterBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-cert-filter");

      certFilterBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");

      certItems.forEach(item => {
        if (filterValue === "all") {
          item.style.display = "flex";
        } else {
          const category = item.getAttribute("data-cert-category");
          if (category === filterValue) {
            item.style.display = "flex";
          } else {
            item.style.display = "none";
          }
        }
      });
    });
  });
}

//===================================
// CONTACT FORM
//===================================
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formInputs.length > 0 && formBtn) {
  formInputs.forEach(input => {
    input.addEventListener("input", function () {
      let isFormValid = true;

      formInputs.forEach(field => {
        if (!field.value.trim()) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("✅ Thank you for your message! I will get back to you within 24 hours.");
    this.reset();
    if (formBtn) {
      formBtn.setAttribute("disabled", "");
    }
  });
}

//===================================
// THEME SWITCHER
//===================================
const themeToggle = document.getElementById('theme-toggle');

function setTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.remove('light-theme');
    localStorage.setItem('theme', 'dark');
  }
}

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  setTheme('light');
} else {
  setTheme('dark');
}

// Theme toggle click event
if (themeToggle) {
  themeToggle.addEventListener('click', function() {
    if (document.body.classList.contains('light-theme')) {
      setTheme('dark');
    } else {
      setTheme('light');
    }

    // Animation effect
    this.style.transform = 'rotate(180deg)';
    setTimeout(() => {
      this.style.transform = 'rotate(0)';
    }, 300);
  });
}

//===================================
// INITIALIZATION
//===================================
document.addEventListener("DOMContentLoaded", function() {
  // Set active page
  let activePageFound = false;

  pages.forEach(page => {
    if (page.classList.contains("active")) {
      activePageFound = true;
    }
  });

  if (!activePageFound && pages.length > 0) {
    const aboutPage = document.querySelector('[data-page="about"]');
    if (aboutPage) {
      aboutPage.classList.add("active");
    }

    navigationLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("data-nav-link") === "about") {
        link.classList.add("active");
      }
    });
  }

  // Initialize filter
  filterFunc("all");

  // Show all certifications by default
  if (certItems.length > 0) {
    certItems.forEach(item => {
      item.style.display = "flex";
    });
  }

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 50
    });
  }

  console.log("✅ Portfolio loaded successfully! (Certifications section ready)");
});

//===================================
// MOBILE SIDEBAR CLOSE
//===================================
if (navigationLinks.length > 0 && sidebar) {
  navigationLinks.forEach(link => {
    link.addEventListener("click", function() {
      if (window.innerWidth < 768) {
        sidebar.classList.remove("active");
      }
    });
  });
}

window.addEventListener("resize", function() {
  if (window.innerWidth >= 768 && sidebar) {
    sidebar.classList.remove("active");
  }
});

//===================================
// TYPING ANIMATION
//===================================
const titleElement = document.querySelector('.info-content .title');
if (titleElement) {
  const text = titleElement.textContent;
  titleElement.textContent = '';
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      titleElement.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  setTimeout(typeWriter, 800);
}

//===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
//===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

//===================================
// CERTIFICATION CARD ANIMATIONS
//===================================
const certCards = document.querySelectorAll('.cert-card');

certCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) translateX(5px)';
  });

  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) translateX(0)';
  });
});

//===================================
// ACTIVE NAVIGATION HIGHLIGHTING
//===================================
function highlightActiveNav() {
  const currentPage = window.location.hash.replace('#', '') || 'about';

  navigationLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-nav-link') === currentPage) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('hashchange', highlightActiveNav);
