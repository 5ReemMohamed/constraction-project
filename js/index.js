document.addEventListener("DOMContentLoaded", () => {

  // ================= MOBILE MENU =================
  const menuBtn = document.getElementById("menuBtn");
  const closeMenu = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const header = document.getElementById("header");
  const menuLinks = document.querySelectorAll(".menu-links a");

  menuBtn?.addEventListener("click", () => {
    mobileMenu.classList.add("open");
  });

  closeMenu?.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
  });

  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  });

  window.addEventListener("scroll", () => {
    mobileMenu?.classList.remove("open");

    if (window.scrollY > 60) {
      header?.classList.add("nav-blur");
    } else {
      header?.classList.remove("nav-blur");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 992) {
      mobileMenu?.classList.remove("open");
    }
  });

  // ================= REVEAL =================
  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  // ================= HERO PARALLAX =================
  const heroImg = document.querySelector(".hero-bg-img");

  window.addEventListener("scroll", () => {
    if (heroImg) {
      const y = window.scrollY;
      heroImg.style.transform = `translateY(${y * 0.3}px) scale(1.1)`;
    }
  });

  // ================= COUNTERS =================
  const counters = document.querySelectorAll(".counter");
  const section = document.querySelector("#why-us");
  let started = false;

  function startCounter() {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const speed = target / 100;

      const update = () => {
        count += speed;

        if (count < target) {
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };

      update();
    });
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        startCounter();
      }
    });
  }, {
    threshold: 0,
    rootMargin: "0px 0px -150px 0px"
  });

  if (section) counterObserver.observe(section);

  // ================= BLOG SCROLL =================
  const scrollContainer = document.getElementById("blogScroll");

  document.getElementById("scrollLeft")?.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: -320, behavior: "smooth" });
  });

  document.getElementById("scrollRight")?.addEventListener("click", () => {
    scrollContainer.scrollBy({ left: 320, behavior: "smooth" });
  });

  // ================= CONTACT FORM =================
  const form = document.getElementById("contactForm");
  const successMsg = document.getElementById("successMsg");
  const formCard = document.getElementById("formCard");

  function showError(input, message) {
    let error = input.parentElement.querySelector(".error-msg");

    if (!error) {
      error = document.createElement("p");
      error.className = "error-msg text-danger small mt-1";
      input.parentElement.appendChild(error);
    }

    error.innerText = message;
  }

  function clearError(input) {
    const error = input.parentElement.querySelector(".error-msg");
    if (error) error.remove();
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9]{10,15}$/;

  form?.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const service = document.getElementById("service");
    const message = document.getElementById("message");

    [name, email, phone, service, message].forEach(clearError);

    if (name.value.trim() === "") {
      showError(name, "الاسم لا يجب أن يكون فارغ");
      valid = false;
    }

    if (email.value.trim() === "") {
      showError(email, "الإيميل لا يجب أن يكون فارغ");
      valid = false;
    } else if (!emailRegex.test(email.value)) {
      showError(email, "الإيميل غير صحيح");
      valid = false;
    }

    if (phone.value.trim() === "") {
      showError(phone, "رقم الهاتف لا يجب أن يكون فارغ");
      valid = false;
    } else if (!phoneRegex.test(phone.value)) {
      showError(phone, "رقم الهاتف غير صحيح");
      valid = false;
    }

    if (service.value.trim() === "") {
      showError(service, "اختر نوع الخدمة");
      valid = false;
    }

    if (message.value.trim() === "") {
      showError(message, "تفاصيل المشروع مطلوبة");
      valid = false;
    }

    if (!valid) return;

    const whatsappNumber = "966545645603";

    const text = `
📌 طلب جديد:
👤 الاسم: ${name.value}
📧 الإيميل: ${email.value}
📞 الهاتف: ${phone.value}
🛠 الخدمة: ${service.value}
📝 التفاصيل: ${message.value}
`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");

    successMsg.classList.remove("d-none");
    formCard.querySelector("form").style.display = "none";

    setTimeout(() => {
      successMsg.style.opacity = "0";

      setTimeout(() => {
        successMsg.classList.add("d-none");
        successMsg.style.opacity = "1";

        formCard.querySelector("form").style.display = "block";
        form.reset();
      }, 500);

    }, 12000);
  });

  // ================= LANGUAGE SYSTEM =================
  const savedLang = localStorage.getItem("lang") || "ar";
  setLanguage(savedLang);
});


// ================= GLOBAL LANGUAGE =================
window.setLanguage = function (lang) {

  const html = document.documentElement;
  const btn = document.getElementById("langBtn");

  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-ar]").forEach(el => {
    el.innerText = el.getAttribute(`data-${lang}`);
  });

  document.querySelectorAll("[data-ar-placeholder]").forEach(el => {
    el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
  });

  if (btn) btn.innerText = lang === "ar" ? "EN" : "AR";

  localStorage.setItem("lang", lang);

  // 🔥 update modal title if open
  updateServiceModalLanguage();
};

window.toggleLang = function () {
  const current = localStorage.getItem("lang") || "ar";
  const newLang = current === "ar" ? "en" : "ar";
  window.setLanguage(newLang);
};


// ================= SERVICE MODAL =================
const serviceData = {
  landscaping: {
    title: { ar: "أعمال اللاند سكيب", en: "Landscaping Works" },
    images: [
      "../imgs/landscape-1.jpg",
      "../imgs/landscape-2.jpg",
      "../imgs/landscape-3.jpg",
      "../imgs/landscape-5.jpg",
      "../imgs/landscape-6.jpg",
      "../imgs/landscape-7.jpg",
      "../imgs/landscape-8.jpg",
      "../imgs/landscape-9.jpg",
      "../imgs/landscape-10.jpg",
      "../imgs/landscape-11.jpg",
      "../imgs/landscape-12.jpg",
      "../imgs/landscape-13.jpg",
      "../imgs/landscape-14.jpg",
      "../imgs/landscape-14.webp",
      "../imgs/landscape-15.jpeg",
      "../imgs/landscape-16.webp",
      "../imgs/landscape-17.webp",
      "../imgs/landscape-18.jpg",
      "../imgs/landscape-19.jpg",
      "../imgs/landscape-20.jpg",
      "../imgs/landscape-21.jpg",
      "../imgs/landscape-22.jpg"
    ]
  },

  infrastructure: {
    title: { ar: "البنية التحتية", en: "Infrastructure" },
    images: [
      "../imgs/infrastruction-1.jpg",
      "../imgs/infrastruction-2.jpg",
      "../imgs/infrastruction-3.jpg",
      "../imgs/infrastruction-4.jpg",
      "../imgs/infrastruction-5.jpg",
      "../imgs/infrastruction-6.jpg",
      "../imgs/infrastruction-7.jpg",
      "../imgs/infrastruction-8.jpg",
      "../imgs/infrastruction-9.jpg",
      "../imgs/infrastruction-10.jpg",
      "../imgs/infrastruction.webp",
      "../imgs/infrastruction2.webp",
    ]
  },

  insulation: {
    title: { ar: "أعمال العزل", en: "Insulation Works" },
    images: [
      "../imgs/insulation1.jpg",
      "../imgs/insulation-2.jpg",
      "../imgs/insulation-3.jpeg",
      "../imgs/insulation-4.jpeg",
      "../imgs/isulation5.webp",
      "../imgs/isulation-6jpg.jpg",
      "../imgs/isulation-7.webp",
      "../imgs/insulation-8.jpg",
      "../imgs/insulation-9.jpg",
      "../imgs/insulation10.jpg",
      "../imgs/insultion-11.jpg",
      "../imgs/insulation-12.jpg",
    ]
  },

  construction: {
    title: { ar: "الإنشاءات", en: "Construction" },
    images: [
      "../imgs/vella-1.jpg",
      "../imgs/vella-2.png",
      "../imgs/vella-3.jpg",
      "../imgs/vella-4.webp",
      "../imgs/vella-5.png",
      "../imgs/vella-6.avif",
      "../imgs/vella-7.png",
      "../imgs/vella-9.png",
      "../imgs/vella-10.jpg",
      "../imgs/vella-11.webp",
      "../imgs/vella-12.jpg",
      "../imgs/vella-13.jpg",
      "../imgs/vella-14.jpg",
      "../imgs/vella-15.png",
   
    ]
  },

  finishing: {
    title: { ar: "التشطيب والصيانة", en: "Finishing & Maintenance" },
    images: [
      "../imgs/finishing-2.webp",
      "../imgs/finishing-3.webp",
      "../imgs/finishing-3.jpg",
      "../imgs/finishing-4.jpg",
      "../imgs/finishing-5.png",
      "../imgs/finishing-6.jpg",
      "../imgs/finishing-8.jpg",
      "../imgs/finishing-12.jpg",
      "../imgs/finishing-13.webp",
      "../imgs/finishing-14.webp",
      "../imgs/finishing-15.webp",
      "../imgs/finishing-15.webp",
      "../imgs/finishing-16.webp",
      "../imgs/finishing-17.png",
     
    ]
  }
};

let currentIndex = 0;
let currentImages = [];
let currentServiceKey = null;

// فتح المودال
function openService(key) {

  currentServiceKey = key;

  const service = serviceData[key];

  currentImages = service.images;
  currentIndex = 0;

  document.getElementById("modalTitle").innerText =
    service.title[localStorage.getItem("lang") || "ar"];

  updateImage();
  renderThumbs();

  const modal = new bootstrap.Modal(document.getElementById("serviceModal"));
  modal.show();
}

// تحديث الصورة
function updateImage() {
  document.getElementById("modalImage").src = currentImages[currentIndex];

  document.querySelectorAll("#thumbContainer img").forEach((img, i) => {
    img.classList.toggle("active", i === currentIndex);
  });
}

// thumbnails
function renderThumbs() {
  const container = document.getElementById("thumbContainer");
  if (!container) return;

  container.innerHTML = "";

  currentImages.forEach((img, i) => {
    const el = document.createElement("img");
    el.src = img;
    el.onclick = () => {
      currentIndex = i;
      updateImage();
    };
    container.appendChild(el);
  });
}

// next / prev
document.getElementById("nextImg")?.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateImage();
});

document.getElementById("prevImg")?.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateImage();
});

// update modal language live
function updateServiceModalLanguage() {
  if (!currentServiceKey) return;

  const lang = localStorage.getItem("lang") || "ar";

  const modalTitle = document.getElementById("modalTitle");
  if (modalTitle) {
    modalTitle.innerText = serviceData[currentServiceKey].title[lang];
  }
}