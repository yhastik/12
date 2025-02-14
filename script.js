// Инициализация карточек при первом запуске
function initializeCards() {
    const defaultCards = [
        { image: "./image1.png", title: "Холоа", description: "Комедия" },
        { image: "./image1.png", title: "Холоа", description: "Комедия" },
        { image: "./image1.png", title: "Холоа", description: "Комедия" },
        { image: "./image1.png", title: "Холоа", description: "Комедия" },
        { image: "./image1.png", title: "Холоа", description: "Комедия" },
        { image: "./image1.png", title: "Холоа", description: "Комедия" },
        { image: "./image1.png", title: "Холоа", description: "Комедия" },
        { image: "./image1.png", title: "Холоа", description: "Комедия" },
        { image: "./image1.png", title: "Холоа", description: "Комедия" },
        { image: "./image1.png", title: "Холоа", description: "Комедия" },
    ];

    if (!localStorage.getItem('cards')) {
        localStorage.setItem('cards', JSON.stringify(defaultCards));
    }
}

// Функция для отрисовки карточек
function renderCards(cards) {
    const slider = document.getElementById('slider');
    if (slider) {
        slider.innerHTML = '';
        cards.forEach((card) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.innerHTML = `
                <img src="${card.image}" alt="${card.title}">
                <h2>${card.title}</h2>
                <p>${card.description}</p>
            `;
            slider.appendChild(cardElement);
        });
    }
}


// Функции для слайдера
let currentIndex = 0;

function updateSliderPosition() {
    const slider = document.getElementById('slider');
    if (slider) {
        const cardWidth = document.querySelector('.card').offsetWidth + 20; // 20px margin
        slider.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    }
}
const mediaQuery1440 = window.matchMedia('(max-width: 1440px)');
const mediaQuery1024 = window.matchMedia('(max-width: 1024px)');
const mediaQuery768 = window.matchMedia('(max-width: 768px)');
function nextSlide() {
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    if (cards.length === 0) return; // Если карточек нет, ничего не делаем
    const a768 = mediaQuery768;
    const a1024 = mediaQuery1024;
    const a1440 = mediaQuery1440;
    countslideIndex = 4;
    if (a768.matches) {
        countslideIndex = 1;
    } else if (a1024.matches) {
        countslideIndex = 2;
    } else if (a1440.matches) {
        countslideIndex = 3
    }
    if (currentIndex < cards.length - countslideIndex) {
        currentIndex++;
    } else {
        // Если достигнут конец, переходим на первую карточку
        currentIndex = 0;
    }
    updateSliderPosition();
}

function prevSlide() {
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    if (cards.length === 0) return; // Если карточек нет, ничего не делаем
    const a768 = mediaQuery768;
    const a1024 = mediaQuery1024;
    const a1440 = mediaQuery1440;
    countslideIndex = 4;
    if (a768.matches) {
        countslideIndex = 1;
    } else if (a1024.matches) {
        countslideIndex = 2;
    } else if (a1440.matches) {
        countslideIndex = 3
    }
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        // Если достигнуто начало, переходим на последнюю карточку
        currentIndex = cards.length - countslideIndex;
    }
    updateSliderPosition();
}

// Автоматическое перелистывание при достижении конца слайдера
function checkSliderPosition() {
    const slider = document.getElementById('slider');
    if (slider) {
        const cards = JSON.parse(localStorage.getItem('cards')) || [];
        const cardWidth = document.querySelector('.card').offsetWidth + 20; // 20px margin
        const sliderWidth = slider.offsetWidth;
        const maxScroll = (cards.length * cardWidth) - sliderWidth;

        if (-currentIndex * cardWidth >= maxScroll) {
            // Если достигнут конец, переходим на первую карточку
            currentIndex = 0;
            updateSliderPosition();
        }
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initializeCards(); // Добавляем 10 карточек, если их нет
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    renderCards(cards);

    // Проверка позиции слайдера при изменении размера окна
    window.addEventListener('resize', checkSliderPosition);
});
// Обновление слайдера при изменении размера окна
window.addEventListener('resize', () => {
    updateSliderPosition();
});





// Функция для добавления карточки
function addCard() {
    const title = document.getElementById('cardTitle').value.trim();
    const description = document.getElementById('cardDescription').value.trim();
    const image = document.getElementById('cardImage').value.trim();

    if (title && description && image) {
        const cards = JSON.parse(localStorage.getItem('cards')) || [];
        cards.push({ image, title, description });
        localStorage.setItem('cards', JSON.stringify(cards));
        alert('Карточка успешно добавлена!');
        document.getElementById('cardTitle').value = '';
        document.getElementById('cardDescription').value = '';
        document.getElementById('cardImage').value = '';
    } else {
        alert('Пожалуйста, заполните все поля!');
    }
}

// Функция для сброса всех карточек
function resetCards() {
    localStorage.removeItem('cards');
}



function updateSliderPosition() {
    const slider = document.getElementById('slider');
    if (slider) {
        const cardWidth = document.querySelector('.card').offsetWidth + 20; // 20px margin
        slider.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initializeCards(); // Добавляем 10 карточек, если их нет
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    renderCards(cards);
});

resetCards();