document.addEventListener("DOMContentLoaded", function() {
    const catalogContainer = document.getElementById("catalog-container");
    
    // Якщо ми не на сторінці каталогу, нічого не робимо
    if (!catalogContainer) return;

    let selectedAge = "all";
    let selectedType = "all";

    /* -------------------- РЕНДЕР КАТАЛОГУ -------------------- */
    function renderCatalog() {
        catalogContainer.innerHTML = "";

        // Використовуємо toysDatabase, який оголошено в script.js
        const filtered = toysDatabase.filter(toy =>
            (selectedAge === "all" || toy.age === selectedAge) &&
            (selectedType === "all" || toy.type === selectedType)
        );

        if (filtered.length === 0) {
            catalogContainer.innerHTML = `<h4 class="text-center w-100 my-5">На жаль, таких іграшок поки немає</h4>`;
            return;
        }

        // 1. Спочатку малюємо всі картки
        filtered.forEach(toy => {
            const cardWrapper = document.createElement("div");
            cardWrapper.className = "col-sm-6 col-md-4 col-lg-3";

            cardWrapper.innerHTML = `
                <div class="card toy-card h-100">
                    <div class="img-wrapper bg-light d-flex align-items-center justify-content-center">
                        <img src="${toy.img}" class="card-img-top" alt="${toy.name}">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${toy.name}</h5>
                        <p class="card-text small text-muted flex-grow-1">${toy.desc}</p>

                        <div class="mb-2">
                            <span class="badge bg-primary">${toy.age}</span>
                            <span class="badge bg-success">${toy.type}</span>
                        </div>

                        <button class="btn btn-outline-primary w-100 mt-auto add-to-cart-catalog" data-id="${toy.id}">
                            Додати в кошик
                        </button>
                    </div>
                </div>
            `;
            catalogContainer.appendChild(cardWrapper);
        });

        // 2. Тільки ПІСЛЯ того, як картки намальовані, вішаємо події на кнопки
        // Цей код має бути ВСЕРЕДИНІ функції renderCatalog
        document.querySelectorAll(".add-to-cart-catalog").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.dataset.id;
                const toy = toysDatabase.find(t => t.id == id);
                addToCart(toy); // Функція з script.js

                // Ваша нова логіка зміни кольору
                btn.textContent = "У кошику!";
                btn.classList.add("btn-added"); // Додаємо ваш кастомний клас
                
                setTimeout(() => {
                    btn.textContent = "Додати в кошик";
                    btn.classList.remove("btn-added"); // Прибираємо клас
                }, 1000);
            });
        });
    } // <--- ОСЬ ЦЯ ДУЖКА БУЛА ПРОПУЩЕНА!

    /* -------------------- ОБРОБНИКИ ФІЛЬТРІВ -------------------- */
    document.querySelectorAll(".age-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".age-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            selectedAge = btn.dataset.age;
            renderCatalog();
        });
    });

    document.querySelectorAll(".type-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".type-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            selectedType = btn.dataset.type;
            renderCatalog();
        });
    });

    // Запуск першого рендеру
    renderCatalog();
});