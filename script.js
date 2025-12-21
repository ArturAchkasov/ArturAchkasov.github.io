document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех слайдеров
    initSliders();
    
    // Модальное окно для просмотра изображений
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalCounter = document.getElementById('modalCounter');
    const prevModalBtn = document.getElementById('prevModalBtn');
    const nextModalBtn = document.getElementById('nextModalBtn');
    
    let currentImages = [];
    let currentIndex = 0;
    let currentProjectName = '';

    // Функция для инициализации всех слайдеров
    function initSliders() {
        const sliders = document.querySelectorAll('.slider-container');
        
        sliders.forEach(slider => {
            const sliderId = slider.id;
            const images = slider.querySelectorAll('.slider-image');
            const prevBtn = document.querySelector(`.prev-btn[data-slider="${sliderId}"]`);
            const nextBtn = document.querySelector(`.next-btn[data-slider="${sliderId}"]`);
            const indicatorsContainer = document.getElementById(`indicators${sliderId.replace('slider', '')}`);
            
            let currentIndex = 0;
            let autoSlideInterval;
            
            console.log(`Initializing slider: ${sliderId}`);
            console.log(`Images found: ${images.length}`);
            console.log(`Prev button:`, prevBtn);
            console.log(`Next button:`, nextBtn);
            console.log(`Indicators container:`, indicatorsContainer);
            
            // Инициализация - скрываем все изображения кроме первого
            images.forEach((img, index) => {
                if (index !== 0) {
                    img.style.display = 'none';
                }
            });
            
            // Очищаем контейнер индикаторов
            if (indicatorsContainer) {
                indicatorsContainer.innerHTML = '';
                
                // Создание индикаторов
                images.forEach((_, index) => {
                    const indicator = document.createElement('div');
                    indicator.classList.add('slider-indicator');
                    if (index === 0) indicator.classList.add('active');
                    indicator.addEventListener('click', () => {
                        goToSlide(index);
                    });
                    indicatorsContainer.appendChild(indicator);
                });
            }
            
            // Обработчик клика на изображения для открытия модального окна
            images.forEach((img, index) => {
                img.addEventListener('click', function() {
                    const projectCard = this.closest('.portfolio-item');
                    const projectName = projectCard.querySelector('.card-title').textContent;
                    
                    // Собираем все изображения текущего проекта
                    currentImages = Array.from(images).map(img => ({
                        src: img.src,
                        alt: img.alt
                    }));
                    
                    // Находим индекс текущего изображения
                    currentIndex = index;
                    currentProjectName = projectName;
                    
                    openModal();
                });
            });
            
            // Функция для перехода к определенному слайду
            function goToSlide(index) {
                if (index < 0 || index >= images.length) return;
                
                // Скрыть все изображения
                images.forEach(img => {
                    img.style.display = 'none';
                });
                
                // Показать выбранное изображение
                images[index].style.display = 'block';
                
                // Обновить индикаторы
                const indicators = indicatorsContainer.querySelectorAll('.slider-indicator');
                indicators.forEach(indicator => {
                    indicator.classList.remove('active');
                });
                if (indicators[index]) {
                    indicators[index].classList.add('active');
                }
                
                currentIndex = index;
                
                // Перезапускаем автослайдинг
                restartAutoSlide();
            }
            
            // Функция для перехода к следующему слайду
            function nextSlide() {
                let newIndex = currentIndex + 1;
                if (newIndex >= images.length) {
                    newIndex = 0;
                }
                goToSlide(newIndex);
            }
            
            // Функция для перехода к предыдущему слайду
            function prevSlide() {
                let newIndex = currentIndex - 1;
                if (newIndex < 0) {
                    newIndex = images.length - 1;
                }
                goToSlide(newIndex);
            }
            
            // Функция для перезапуска автослайдинга
            function restartAutoSlide() {
                if (autoSlideInterval) {
                    clearInterval(autoSlideInterval);
                }
                autoSlideInterval = setInterval(nextSlide, 5000);
            }
            
            // Добавление обработчиков событий для кнопок
            if (prevBtn) {
                prevBtn.addEventListener('click', prevSlide);
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', nextSlide);
            }
            
            // Останавливаем автослайдинг при наведении
            slider.addEventListener('mouseenter', () => {
                if (autoSlideInterval) {
                    clearInterval(autoSlideInterval);
                }
            });
            
            // Возобновляем автослайдинг когда убираем курсор
            slider.addEventListener('mouseleave', () => {
                restartAutoSlide();
            });
            
            // Запускаем автослайдинг
            restartAutoSlide();
            
            // Инициализация первого слайда
            goToSlide(0);
        });
    }

    function openModal() {
        if (currentImages.length === 0) return;
        
        updateModalImage();
        modal.show();
    }

    function updateModalImage() {
        const currentImg = currentImages[currentIndex];
        modalImage.src = currentImg.src;
        modalImage.alt = currentImg.alt;
        modalTitle.textContent = currentProjectName;
        modalCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
        
        // Обновляем состояние кнопок
        prevModalBtn.disabled = currentIndex === 0;
        nextModalBtn.disabled = currentIndex === currentImages.length - 1;
        
        // Добавляем анимацию
        modalImage.classList.add('modal-fade-enter');
        setTimeout(() => {
            modalImage.classList.remove('modal-fade-enter');
        }, 300);
    }

    // Обработчики для кнопок навигации в модальном окне
    prevModalBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateModalImage();
        }
    });

    nextModalBtn.addEventListener('click', function() {
        if (currentIndex < currentImages.length - 1) {
            currentIndex++;
            updateModalImage();
        }
    });

    // Навигация с помощью клавиатуры
    document.addEventListener('keydown', function(e) {
        if (modal._element.classList.contains('show')) {
            if (e.key === 'ArrowLeft') {
                prevModalBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextModalBtn.click();
            } else if (e.key === 'Escape') {
                modal.hide();
            }
        }
    });

    // Свайпы для мобильных устройств
    let touchStartX = 0;
    let touchEndX = 0;

    modalImage.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    modalImage.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Свайп влево - следующее изображение
                nextModalBtn.click();
            } else {
                // Свайп вправо - предыдущее изображение
                prevModalBtn.click();
            }
        }
    }

    // Сброс состояния при закрытии модального окна
    document.getElementById('imageModal').addEventListener('hidden.bs.modal', function() {
        currentImages = [];
        currentIndex = 0;
        currentProjectName = '';
    });
});

// Получаем элементы формы
const form = document.getElementById('contactForm');
const formAlert = document.getElementById('formAlert');
const submitBtn = document.getElementById('submitBtn');
const submitText = document.getElementById('submitText');
const submitSpinner = document.getElementById('submitSpinner');

// Обработчик отправки формы
form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Отменяем стандартную отправку
    
    // Показываем спиннер загрузки
    submitText.textContent = 'Отправка...';
    submitSpinner.style.display = 'inline-block';
    submitBtn.disabled = true;
    
    // Скрываем предыдущее уведомление
    formAlert.style.display = 'none';
    
    try {
        // Отправляем данные на Formspree
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        // Обрабатываем ответ
        if (response.ok) {
            showAlert('Сообщение успешно отправлено! Я скоро с вами свяжусь.', 'success');
            form.reset(); // Очищаем форму
        } else {
            showAlert('Что-то пошло не так. Пожалуйста, попробуйте еще раз или напишите напрямую на email.', 'danger');
            console.error('Formspree error:', await response.json());
        }
    } catch (error) {
        // Обрабатываем ошибки сети
        showAlert('Ошибка сети. Проверьте соединение и попробуйте снова.', 'danger');
        console.error('Network error:', error);
    } finally {
        // Восстанавливаем кнопку
        submitText.textContent = 'Отправить сообщение';
        submitSpinner.style.display = 'none';
        submitBtn.disabled = false;
    }
});

// Функция для показа уведомлений
function showAlert(message, type) {
    formAlert.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show mt-3" role="alert">
            ${message}
            <button type="button" class="btn-close" onclick="this.parentElement.parentElement.style.display='none'"></button>
        </div>
    `;
    formAlert.style.display = 'block';
    
    // Автоматически скрываем уведомление через 5 секунд (только для успешных)
    if (type === 'success') {
        setTimeout(() => {
            if (formAlert.style.display !== 'none') {
                formAlert.style.display = 'none';
            }
        }, 5000);
    }
}
