document.addEventListener("DOMContentLoaded", () => {

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

  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));


  const heroImg = document.querySelector(".hero-bg-img");

  window.addEventListener("scroll", () => {
    if (heroImg) {
      const y = window.scrollY;
      heroImg.style.transform = `translateY(${y * 0.3}px) scale(1.1)`;
    }
  });


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

  if (section) {
    counterObserver.observe(section);
  }
  const scrollContainer = document.getElementById("blogScroll");

  document.getElementById("scrollLeft").addEventListener("click", () => {
    scrollContainer.scrollBy({
      left: -320,
      behavior: "smooth"
    });
  });

  document.getElementById("scrollRight").addEventListener("click", () => {
    scrollContainer.scrollBy({
      left: 320,
      behavior: "smooth"
    });
  });
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

  form.addEventListener("submit", function (e) {
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
});