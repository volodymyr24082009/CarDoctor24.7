document.addEventListener("DOMContentLoaded", () => {
  const servicesList = document.getElementById("services-list");
  const mastersList = document.getElementById("masters-list");
  const contactForm = document.getElementById("contact-form");
  const navLinks = document.querySelector(".nav-links");
  const burger = document.querySelector(".burger");
  const nav = document.querySelector("nav");
  const header = document.querySelector("header");

  // Послуги
  const services = [
    { name: "Діагностика автомобіля", icon: "fa-car" },
    { name: "Ремонт двигуна", icon: "fa-cogs" },
    { name: "Ремонт електрики", icon: "fa-bolt" },
    { name: "Заміна масла", icon: "fa-oil-can" },
    { name: "Ремонт ходової частини", icon: "fa-car-crash" },
  ];

  services.forEach((service) => {
    const div = document.createElement("div");
    div.className = "service-card";
    div.innerHTML = `
      <i class="fas ${service.icon} service-icon"></i>
      <h3 class="service-title">${service.name}</h3>
    `;
    servicesList.appendChild(div);
  });
  document.addEventListener("DOMContentLoaded", () => {
    // ... (existing code remains unchanged) ...

    // AI Helper functionality
    const aiInput = document.getElementById("ai-input");
    const aiSubmit = document.getElementById("ai-submit");
    const aiResponse = document.getElementById("ai-response");

    aiSubmit.addEventListener("click", async () => {
        const problem = aiInput.value;
        if (problem) {
            aiResponse.textContent = "Аналізую вашу проблему...";
            try {
                const response = await fetch("/api/ai-helper", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ problem }),
                });

                const result = await response.json();

                if (response.ok) {
                    aiResponse.textContent = result.solution;
                } else {
                    throw new Error(result.error || "Помилка при отриманні відповіді від AI");
                }
            } catch (error) {
                aiResponse.textContent = "Виникла помилка при обробці вашого запиту. Будь ласка, спробуйте ще раз пізніше.";
                console.error("Помилка:", error);
            }
        }
    });

    // Update contact form submission
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/api/submit-request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message + " Ми зв'яжемося з вами протягом 15 хвилин.");
                contactForm.reset();
            } else {
                throw new Error(result.error || "Помилка при відправці заявки");
            }
        } catch (error) {
            alert(
                "Виникла помилка при відправці заявки. Будь ласка, спробуйте ще раз пізніше."
            );
            console.error("Помилка:", error);
        }
    });

    // ... (rest of the existing code remains unchanged) ...
});
  // Майстри
  const masters = [
    {
      name: "Іван Петренко",
      specialization: "Двигуни",
      image: "https://media.istockphoto.com/id/1285071153/uk/%D1%84%D0%BE%D1%82%D0%BE/%D1%83%D1%81%D0%BC%D1%96%D1%85%D0%BD%D0%B5%D0%BD%D0%B8%D0%B9-%D1%89%D0%B0%D1%81%D0%BB%D0%B8%D0%B2%D0%B8%D0%B9-%D0%B1%D0%BE%D1%80%D0%BE%D0%B4%D0%B0%D1%82%D0%B8%D0%B9-%D1%82%D0%B0%D1%82%D1%83%D0%B9%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B9-%D1%80%D0%BE%D0%B1%D1%96%D1%82%D0%BD%D0%B8%D0%BA-%D0%B2-%D0%BA%D0%BE%D0%BC%D0%B1%D1%96%D0%BD%D0%B5%D0%B7%D0%BE%D0%BD%D1%96-%D1%81%D1%82%D0%BE%D1%97%D1%82%D1%8C-%D0%BF%D0%BE%D1%80%D1%83%D1%87-%D0%B7-%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D1%96%D0%B2%D0%BA%D0%BE%D1%8E-%D0%B7%D1%96.jpg?s=612x612&w=0&k=20&c=fhdmhOd0XDnyZRzgFzwCQ72Y8j_vdevGSKmofksE__Y=",
    },
    {
      name: "Сергій Сергійович",
      specialization: "Електрика",
      image: "https://img.freepik.com/premium-photo/young-man-mechanic-working-car-engine_251859-2118.jpg"
    },
    {
      name: "Олексій Володимирович",
      specialization: "Ходова частина",
      image: "https://st2.depositphotos.com/5697382/50226/i/450/depositphotos_502261268-stock-photo-professional-car-mechanic-looking-camera.jpg"
    },
  ];

  masters.forEach((master) => {
    const div = document.createElement("div");
    div.className = "master-card";
    div.innerHTML = `
      <img src="${master.image}" alt="${master.name}" class="master-image">
      <div class="master-info">
        <h3 class="master-name">${master.name}</h3>
        <p class="master-specialization">${master.specialization}</p>
      </div>
    `;
    mastersList.appendChild(div);
  });

  // Обробка форми контактів
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/submit-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message + " Ми зв'яжемося з вами протягом 15 хвилин.");
        contactForm.reset();
      } else {
        throw new Error(result.error || "Помилка при відправці заявки");
      }
    } catch (error) {
      alert(
        "Виникла помилка при відправці заявки. Будь ласка, спробуйте ще раз пізніше."
      );
      console.error("Помилка:", error);
    }
  });

  // Навігація для мобільних пристроїв
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");
    burger.classList.toggle("toggle");
  });

  // Анімація появи елементів при прокручуванні
  const faders = document.querySelectorAll(".fade-in");
  const sliders = document.querySelectorAll(".slide-in");

  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px",
  };

  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });

  sliders.forEach((slider) => {
    appearOnScroll.observe(slider);
  });

  // Зміна стилю хедера при прокручуванні
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Плавна прокрутка до секцій
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const districtSelect = document.getElementById("district");
  const streetSelect = document.getElementById("street");

  let streetsData = {}; // Об'єкт для збереження завантажених даних

  // Функція для завантаження JSON
  async function loadStreets() {
    try {
      const response = await fetch('streets.json'); // Завантаження файлу
      streetsData = await response.json(); // Збереження даних у змінну
    } catch (error) {
      console.error("Помилка завантаження JSON:", error);
    }
  }

  // Викликаємо функцію завантаження при завантаженні сторінки
  loadStreets();

  // Подія при зміні району
  districtSelect.addEventListener("change", () => {
    const selectedDistrict = districtSelect.value;

    // Очищення списку вулиць
    streetSelect.innerHTML = '<option value="">Спочатку оберіть вулицю</option>';

    if (selectedDistrict && streetsData[selectedDistrict]) {
      // Додавання вулиць у список
      streetsData[selectedDistrict].forEach((street) => {
        const option = document.createElement("option");
        option.value = street;
        option.textContent = street;
        streetSelect.appendChild(option);
      });
    }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  // Кнопка для редагування профілю
  const editProfileBtn = document.getElementById('edit-profile-btn');
  const editProfileForm = document.getElementById('edit-profile-form');
  const userName = document.getElementById('user-name');
  const userEmail = document.getElementById('user-email');
  const userPhone = document.getElementById('user-phone');

  // Перемикач між переглядом профілю і його редагуванням
  editProfileBtn.addEventListener('click', function() {
    editProfileForm.style.display = 'block';
    // Оскільки ми починаємо редагування, приховуємо профіль
    editProfileBtn.style.display = 'none';
  });

  // Обробка форми редагування профілю
  const editProfile = document.getElementById('edit-profile');
  editProfile.addEventListener('submit', function(e) {
    e.preventDefault();
    // Оновлюємо дані на сторінці
    userName.textContent = document.getElementById('edit-name').value;
    userEmail.textContent = document.getElementById('edit-email').value;
    userPhone.textContent = document.getElementById('edit-phone').value;

    // Приховуємо форму редагування та повертаємо кнопку "Редагувати профіль"
    editProfileForm.style.display = 'none';
    editProfileBtn.style.display = 'block';
  });
});
