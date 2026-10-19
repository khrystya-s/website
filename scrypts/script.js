
// /* -------------------- 1. БАЗА ДАНИХ (ГЛОБАЛЬНА) -------------------- */
// const toysDatabase = [
//     { id: 1, name: "Плюшевий ведмедик Тедді", age: "baby", type: "universal", desc: "М'який друг для найменших.", img: "images/teddy-bear.png" },
//     { id: 2, name: "Пірамідка веселкова", age: "baby", type: "universal", desc: "Розвиває моторику та сприйняття кольорів.", img: "images/piramide.png" },
//     { id: 3, name: "Лялька-принцеса", age: "preschool", type: "creative", desc: "Чарівна лялька у святковій сукні.", img: "images/princess.png" },
//     { id: 4, name: "Набір для малювання", age: "preschool", type: "creative", desc: "Олівці, фарби та альбом.", img: "images/paint.png" },
//     { id: 5, name: "Швидкісна машинка", age: "preschool", type: "active", desc: "Інерційна машинка для перегонів.", img: "images/speed-car.png" },
//     { id: 6, name: "Конструктор 'Замок'", age: "school", type: "creative", desc: "Великий набір для будівництва замку.", img: "images/castle.png" },
//     { id: 7, name: "Футбольний м'яч", age: "school", type: "active", desc: "Міцний м'яч для активних ігор.", img: "images/ball.png" },
//     { id: 8, name: "Настільна гра 'Монополія'", age: "school", type: "universal", desc: "Класична економічна гра.", img: "images/monopoly.png" },
//     { id: 9, name: "Робот на радіокеруванні", age: "school", type: "active", desc: "Сучасний робот зі світлом.", img: "images/robot.png" }
// ];

// /* -------------------- 2. ТАЙМЕР АКЦІЇ -------------------- */
// const endDate = new Date("Dec 31, 2025 23:59:59").getTime();

// function updateTimer() {
//     const timerElement = document.getElementById("countdown");
//     if (!timerElement) return; // Якщо таймера немає на сторінці, виходимо

//     const now = new Date().getTime();
//     const diff = endDate - now;

//     if (diff <= 0) {
//         timerElement.innerHTML = "<h3>Акцію завершено!</h3>";
//         return;
//     }

//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//     document.getElementById("days").innerText = days;
//     document.getElementById("hours").innerText = hours;
//     document.getElementById("minutes").innerText = minutes;
//     document.getElementById("seconds").innerText = seconds;
// }

// setInterval(updateTimer, 1000);
// updateTimer();

// /* -------------------- 3. МАГІЧНИЙ ПІДБІР (ГЛОБАЛЬНИЙ) -------------------- */
// function findRandomToy() {
//     const ageSelect = document.getElementById('ageSelect');
//     const typeSelect = document.getElementById('typeSelect');
    
//     if (!ageSelect || !typeSelect) return;

//     const selectedAge = ageSelect.value;
//     const selectedType = typeSelect.value;

//     const filteredToys = toysDatabase.filter(toy => {
//         return toy.age === selectedAge && (toy.type === selectedType || toy.type === "universal");
//     });

//     const resultBlock = document.getElementById('resultBlock');
//     const errorBlock = document.getElementById('errorBlock');

//     if (filteredToys.length > 0) {
//         const randomIndex = Math.floor(Math.random() * filteredToys.length);
//         const randomToy = filteredToys[randomIndex];

//         document.getElementById('toyName').innerText = randomToy.name;
//         document.getElementById('toyDesc').innerText = randomToy.desc;

//         resultBlock.classList.remove('d-none');
//         errorBlock.classList.add('d-none');
//     } else {
//         resultBlock.classList.add('d-none');
//         errorBlock.classList.remove('d-none');
//     }
// }

// /* -------------------- 4. ГЛОБАЛЬНА КОРЗИНА -------------------- */
// let cart = JSON.parse(localStorage.getItem("cart")) || [];

// function updateCartCount() {
//     const countEl = document.getElementById("cart-count");
//     if (countEl) countEl.textContent = cart.length;
// }

// function addToCart(toy) {
//     cart.push(toy);
//     localStorage.setItem("cart", JSON.stringify(cart));
//     updateCartCount();
// }

// // Функція відкриття вікна корзини
// function openCart() {
//     // Видаляємо стару корзину, якщо вона відкрита
//     const existingPopup = document.querySelector('.cart-popup');
//     if (existingPopup) existingPopup.remove();

//     let itemsHtml = cart.map((item, index) => `
//         <div class="d-flex justify-content-between align-items-center border-bottom py-2">
//             <div class="d-flex align-items-center gap-2">
//                 <img src="${item.img}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;">
//                 <span style="font-size: 14px;">${item.name}</span>
//             </div>
//             <button class="btn btn-danger btn-sm remove-from-cart" data-index="${index}">&times;</button>
//         </div>
//     `).join("");

//     if (itemsHtml === "") itemsHtml = `<p class="text-center text-muted">Кошик порожній</p>`;

//     const popup = document.createElement("div");
//     popup.className = "cart-popup";
//     popup.innerHTML = `
//         <div class="cart-popup-inner">
//             <h4 class="mb-3">Ваш кошик <i class="bi bi-cart-check"></i></h4>
//             <div style="max-height: 300px; overflow-y: auto;">
//                 ${itemsHtml}
//             </div>
//             <div class="mt-3 pt-2 border-top">
//                 <button class="btn btn-secondary w-100" id="close-cart">Закрити</button>
//             </div>
//         </div>
//     `;
//     document.body.appendChild(popup);

//     // Логіка закриття
//     document.getElementById("close-cart").onclick = () => popup.remove();
//     popup.onclick = (e) => {
//         if (e.target === popup) popup.remove();
//     };

//     // Логіка видалення
//     popup.querySelectorAll(".remove-from-cart").forEach(btn => {
//         btn.onclick = () => {
//             const index = btn.dataset.index;
//             cart.splice(index, 1); // Видаляємо по індексу
//             localStorage.setItem("cart", JSON.stringify(cart));
//             updateCartCount();
//             popup.remove();
//             openCart(); // Перерендеримо
//         };
//     });
// }

// /* -------------------- 5. ГЛОБАЛЬНИЙ ПОШУК (NAVBAR) -------------------- */
// document.addEventListener("DOMContentLoaded", () => {
//     // Ініціалізація лічильника корзини при завантаженні
//     updateCartCount();

//     // Клік по кнопці кошика
//     const cartBtn = document.getElementById("open-cart");
//     if (cartBtn) {
//         cartBtn.addEventListener("click", (e) => {
//             e.preventDefault();
//             openCart();
//         });
//     }

//     // --- Логіка Пошуку ---
//     const searchInput = document.querySelector("input[type='search']");
//     const searchForm = document.querySelector("form[role='search']");

//     if (!searchInput) return;

//     // Створюємо контейнер для результатів пошуку
//     const searchResults = document.createElement("div");
//     Object.assign(searchResults.style, {
//         position: "absolute",
//         background: "#fff",
//         border: "1px solid #ddd",
//         width: "300px", // Фіксована ширина або можна взяти searchInput.offsetWidth
//         maxHeight: "400px",
//         overflowY: "auto",
//         zIndex: "9999",
//         display: "none",
//         boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//         borderRadius: "8px",
//         top: "100%",
//         right: "0" // Вирівнювання по правому краю форми
//     });
    
//     // Додаємо контейнер до форми, щоб він позиціонувався відносно неї
//     searchForm.style.position = "relative";
//     searchForm.appendChild(searchResults);

//     // Функція оновлення результатів
//     function performGlobalSearch() {
//         const query = searchInput.value.trim().toLowerCase();
        
//         if (query === "") {
//             searchResults.style.display = "none";
//             return;
//         }

//         const matches = toysDatabase.filter(toy => toy.name.toLowerCase().includes(query));

//         if (matches.length === 0) {
//             searchResults.innerHTML = `<div class="p-3 text-center text-muted">Нічого не знайдено :(</div>`;
//             searchResults.style.display = "block";
//             return;
//         }

//         searchResults.innerHTML = matches.map(toy => `
//             <div class="d-flex align-items-center gap-2 p-2 border-bottom search-item" style="cursor: pointer;">
//                 <img src="${toy.img}" style="width:50px; height:50px; object-fit:cover; border-radius: 4px;">
//                 <div style="flex:1">
//                     <div style="font-weight:bold; font-size:14px;">${toy.name}</div>
//                     <div style="font-size:12px; color:#666;">${toy.desc.substring(0, 40)}...</div>
//                     <button class="btn btn-sm btn-success mt-1 add-to-cart-search" data-id="${toy.id}" style="font-size:10px;">
//                         В кошик
//                     </button>
//                 </div>
//             </div>
//         `).join("");

//         searchResults.style.display = "block";

//         // Додаємо обробники подій для кнопок у пошуку
//         searchResults.querySelectorAll(".add-to-cart-search").forEach(btn => {
//             btn.addEventListener("click", (e) => {
//                 e.stopPropagation(); // Щоб не спрацював клік по картці
//                 e.preventDefault();
//                 const id = btn.dataset.id;
//                 const toy = toysDatabase.find(t => t.id == id);
//                 addToCart(toy);
                
//                 const originalText = btn.textContent;
//                 btn.textContent = "Додано!";
//                 btn.classList.replace("btn-success", "btn-secondary");
//                 setTimeout(() => {
//                     btn.textContent = originalText;
//                     btn.classList.replace("btn-secondary", "btn-success");
//                 }, 1000);
//             });
//         });
//     }

//     // Слухачі подій пошуку
//     searchInput.addEventListener("input", performGlobalSearch);
//     searchInput.addEventListener("focus", performGlobalSearch);

//     // Закриття при кліку поза межами
//     document.addEventListener("click", (e) => {
//         if (!searchForm.contains(e.target)) {
//             searchResults.style.display = "none";
//         }
//     });

//     // Блокуємо стандартну відправку форми
//     searchForm.addEventListener("submit", (e) => e.preventDefault());
// });

/* -------------------- 1. БАЗА ДАНИХ (ГЛОБАЛЬНА) -------------------- */
const toysDatabase = [
    { id: 1, name: "Плюшевий ведмедик Тедді", age: "baby", type: "universal", desc: "М'який друг для найменших.", img: "images/teddy-bear.png" },
    { id: 2, name: "Пірамідка веселкова", age: "baby", type: "universal", desc: "Розвиває моторику та сприйняття кольорів.", img: "images/piramide.png" },
    { id: 3, name: "Лялька-принцеса", age: "preschool", type: "creative", desc: "Чарівна лялька у святковій сукні.", img: "images/princess.png" },
    { id: 4, name: "Набір для малювання", age: "preschool", type: "creative", desc: "Олівці, фарби та альбом.", img: "images/paint.png" },
    { id: 5, name: "Швидкісна машинка", age: "preschool", type: "active", desc: "Інерційна машинка для перегонів.", img: "images/speed-car.png" },
    { id: 6, name: "Конструктор 'Замок'", age: "school", type: "creative", desc: "Великий набір для будівництва замку.", img: "images/castle.png" },
    { id: 7, name: "Футбольний м'яч", age: "school", type: "active", desc: "Міцний м'яч для активних ігор.", img: "images/ball.png" },
    { id: 8, name: "Настільна гра 'Монополія'", age: "school", type: "universal", desc: "Класична економічна гра.", img: "images/monopoly.png" },
    { id: 9, name: "Робот на радіокеруванні", age: "school", type: "active", desc: "Сучасний робот зі світлом.", img: "images/robot.png" }
];

/* -------------------- 2. ТАЙМЕР АКЦІЇ -------------------- */
const endDate = new Date("Dec 31, 2025 23:59:59").getTime();

function updateTimer() {
    const timerElement = document.getElementById("countdown");
    if (!timerElement) return;

    const now = new Date().getTime();
    const diff = endDate - now;

    if (diff <= 0) {
        timerElement.innerHTML = "<h3>Акцію завершено!</h3>";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const dEl = document.getElementById("days");
    const hEl = document.getElementById("hours");
    const mEl = document.getElementById("minutes");
    const sEl = document.getElementById("seconds");

    if(dEl) dEl.innerText = days;
    if(hEl) hEl.innerText = hours;
    if(mEl) mEl.innerText = minutes;
    if(sEl) sEl.innerText = seconds;
}

setInterval(updateTimer, 1000);
updateTimer();

/* -------------------- 3. ГЛОБАЛЬНА КОРЗИНА -------------------- */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
    const countEl = document.getElementById("cart-count");
    if (countEl) countEl.textContent = cart.length;
}

function addToCart(toy) {
    cart.push(toy);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Функція відкриття вікна корзини
function openCart() {
    const existingPopup = document.querySelector('.cart-popup');
    if (existingPopup) existingPopup.remove();

    let itemsHtml = cart.map((item, index) => `
        <div class="d-flex justify-content-between align-items-center border-bottom py-2">
            <div class="d-flex align-items-center gap-2">
                <img src="${item.img}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;">
                <span style="font-size: 14px;">${item.name}</span>
            </div>
            <button class="btn btn-danger btn-sm remove-from-cart" data-index="${index}">&times;</button>
        </div>
    `).join("");

    if (itemsHtml === "") itemsHtml = `<p class="text-center text-muted">Кошик порожній</p>`;

    const popup = document.createElement("div");
    popup.className = "cart-popup";
    popup.innerHTML = `
        <div class="cart-popup-inner">
            <h4 class="mb-3">Ваш кошик <i class="bi bi-cart-check"></i></h4>
            <div style="max-height: 300px; overflow-y: auto;">
                ${itemsHtml}
            </div>
            <div class="mt-3 pt-2 border-top">
                <button class="btn btn-secondary w-100" id="close-cart">Закрити</button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);

    document.getElementById("close-cart").onclick = () => popup.remove();
    popup.onclick = (e) => {
        if (e.target === popup) popup.remove();
    };

    popup.querySelectorAll(".remove-from-cart").forEach(btn => {
        btn.onclick = () => {
            const index = btn.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            popup.remove();
            openCart();
        };
    });
}

/* -------------------- 4. МАГІЧНИЙ ПІДБІР (ДЛЯ ГОЛОВНОЇ) -------------------- */
// Ця функція має бути ГЛОБАЛЬНОЮ, щоб onclick працював
function findRandomToy() {
    const ageSelect = document.getElementById('ageSelect');
    const typeSelect = document.getElementById('typeSelect');
    
    // Якщо елементів немає (наприклад, ми на іншій сторінці), виходимо
    if (!ageSelect || !typeSelect) return;

    const selectedAge = ageSelect.value;
    const selectedType = typeSelect.value;

    const filteredToys = toysDatabase.filter(toy => {
        return toy.age === selectedAge && (toy.type === selectedType || toy.type === "universal");
    });

    const resultBlock = document.getElementById('resultBlock');
    const errorBlock = document.getElementById('errorBlock');
    const magicBtn = document.getElementById('magic-add-btn');

    if (filteredToys.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredToys.length);
        const randomToy = filteredToys[randomIndex];

        document.getElementById('toyName').innerText = randomToy.name;
        document.getElementById('toyDesc').innerText = randomToy.desc;

        // Зберігаємо ID в кнопці
        if(magicBtn) {
            magicBtn.dataset.id = randomToy.id;
            magicBtn.textContent = "Додати цей товар у кошик";
            magicBtn.classList.remove("btn-added");
            magicBtn.disabled = false;
        }

        resultBlock.classList.remove('d-none');
        errorBlock.classList.add('d-none');
    } else {
        resultBlock.classList.add('d-none');
        errorBlock.classList.remove('d-none');
    }
}


/* -------------------- 5. ЗАВАНТАЖЕННЯ СТОРІНКИ (ПОДІЇ) -------------------- */
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Оновлення лічильника
    updateCartCount();

    // 2. Відкриття кошика
    const cartBtn = document.getElementById("open-cart");
    if (cartBtn) {
        cartBtn.addEventListener("click", (e) => {
            e.preventDefault();
            openCart();
        });
    }

    // 3. Кнопка "Додати в кошик" з магічного підбору
    const magicBtn = document.getElementById('magic-add-btn');
    if (magicBtn) {
        magicBtn.addEventListener("click", () => {
            const id = magicBtn.dataset.id;
            if (id) {
                const toy = toysDatabase.find(t => t.id == id);
                addToCart(toy);

                magicBtn.textContent = "У кошику!";
                magicBtn.classList.add("btn-added"); // Клас для рожевого кольору
                magicBtn.disabled = true;

                setTimeout(() => {
                    magicBtn.textContent = "Додати ще раз";
                    magicBtn.classList.remove("btn-added");
                    magicBtn.disabled = false;
                }, 2000);
            }
        });
    }

    // 4. Пошук у навігації
    const searchInput = document.querySelector("input[type='search']");
    const searchForm = document.querySelector("form[role='search']");

    if (searchInput && searchForm) {
        const searchResults = document.createElement("div");
        Object.assign(searchResults.style, {
            position: "absolute",
            background: "#fff",
            border: "1px solid #ddd",
            width: "300px",
            maxHeight: "400px",
            overflowY: "auto",
            zIndex: "9999",
            display: "none",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            top: "100%",
            right: "0"
        });
        
        searchForm.style.position = "relative";
        searchForm.appendChild(searchResults);

        function performGlobalSearch() {
            const query = searchInput.value.trim().toLowerCase();
            
            if (query === "") {
                searchResults.style.display = "none";
                return;
            }

            const matches = toysDatabase.filter(toy => toy.name.toLowerCase().includes(query));

            if (matches.length === 0) {
                searchResults.innerHTML = `<div class="p-3 text-center text-muted">Нічого не знайдено :(</div>`;
                searchResults.style.display = "block";
                return;
            }

            searchResults.innerHTML = matches.map(toy => `
                <div class="d-flex align-items-center gap-2 p-2 border-bottom search-item" style="cursor: pointer;">
                    <img src="${toy.img}" style="width:50px; height:50px; object-fit:cover; border-radius: 4px;">
                    <div style="flex:1">
                        <div style="font-weight:bold; font-size:14px;">${toy.name}</div>
                        <div style="font-size:12px; color:#666;">${toy.desc.substring(0, 40)}...</div>
                        <button class="btn btn-sm btn-success mt-1 add-to-cart-search" data-id="${toy.id}" style="font-size:10px;">
                            В кошик
                        </button>
                    </div>
                </div>
            `).join("");

            searchResults.style.display = "block";

            searchResults.querySelectorAll(".add-to-cart-search").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    const id = btn.dataset.id;
                    const toy = toysDatabase.find(t => t.id == id);
                    addToCart(toy);
                    
                    const originalText = btn.textContent;
                    btn.textContent = "Додано!";
                    btn.classList.replace("btn-success", "btn-secondary");
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.classList.replace("btn-secondary", "btn-success");
                    }, 1000);
                });
            });
            
            // Клік по самому товару (для переходу, або просто закрити)
            searchResults.querySelectorAll(".search-item").forEach((item, index) => {
                 item.addEventListener("click", (e) => {
                    if(!e.target.classList.contains('add-to-cart-search')) {
                         // Тут можна зробити перехід на сторінку товару, якщо буде
                         alert("Ви вибрали: " + matches[index].name);
                         searchResults.style.display = "none";
                         searchInput.value = "";
                    }
                 });
            });
        }

        searchInput.addEventListener("input", performGlobalSearch);
        searchInput.addEventListener("focus", performGlobalSearch);

        document.addEventListener("click", (e) => {
            if (!searchForm.contains(e.target)) {
                searchResults.style.display = "none";
            }
        });
        
        searchForm.addEventListener("submit", (e) => e.preventDefault());
    }
});