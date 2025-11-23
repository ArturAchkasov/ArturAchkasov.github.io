document.addEventListener('DOMContentLoaded', function() {
        // Инициализация всех слайдеров
        initSliders();
        
        // Функция для инициализации всех слайдеров
        function initSliders() {
            const sliders = document.querySelectorAll('.slider-container');
            
            sliders.forEach(slider => {
                const sliderId = slider.id;
                const images = slider.querySelectorAll('.slider-image');
                const prevBtn = document.querySelector(`.prev-btn[data-slider="${sliderId}"]`);
                const nextBtn = document.querySelector(`.next-btn[data-slider="${sliderId}"]`);
                const indicatorsContainer = document.getElementById(`indicators${sliderId.slice(-1)}`);
                
                let currentIndex = 0;
                
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
                
                // Функция для перехода к определенному слайду
                function goToSlide(index) {
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
                    indicators[index].classList.add('active');
                    
                    currentIndex = index;
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
                
                // Добавление обработчиков событий для кнопок
                prevBtn.addEventListener('click', prevSlide);
                nextBtn.addEventListener('click', nextSlide);
                
                // Автоматическое переключение слайдов каждые 5 секунд
                setInterval(nextSlide, 5000);
                
                // Инициализация первого слайда
                goToSlide(0);
            });
        }
    });