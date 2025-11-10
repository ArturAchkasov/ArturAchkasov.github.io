document.addEventListener('DOMContentLoaded', function() {
    // Cookie counter functionality
    const cookieJar = document.getElementById('cookie-jar');
    const counter = document.getElementById('counter');
    
    if (cookieJar && counter) {
        let cookieCount = parseInt(localStorage.getItem('cookieCount')) || 0;
        counter.textContent = cookieCount;
        
        cookieJar.addEventListener('click', function() {
            cookieCount++;
            counter.textContent = cookieCount;
            localStorage.setItem('cookieCount', cookieCount);
            
            // Add animation effect
            cookieJar.style.transform = 'scale(0.95)';
            setTimeout(() => {
                cookieJar.style.transform = 'scale(1)';
            }, 150);
            
            // Add confetti effect on every 5th cookie
            if (cookieCount % 5 === 0) {
                createConfetti();
            }
        });
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-item, .project-card, .work-experience__unit');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    };
    
    // Initialize animations
    animateOnScroll();
    
    // Add hover effects to tech tags
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Section hover effects
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Confetti effect function
    function createConfetti() {
        const colors = ['#88c0d0', '#81a1c1', '#5e81ac', '#bf616a', '#d08770', '#ebcb8b', '#a3be8c', '#b48ead'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.top = '0';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.opacity = '0';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            
            document.body.appendChild(confetti);
            
            const animation = confetti.animate([
                { 
                    transform: 'translateY(0) rotate(0deg)',
                    opacity: 1
                },
                { 
                    transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`,
                    opacity: 0
                }
            ], {
                duration: 1000 + Math.random() * 2000,
                easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
            });
            
            animation.onfinish = () => {
                confetti.remove();
            };
        }
    }
    
    // Add loading animation
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.display = 'block';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 2000);
        }, 1000);
    }
    
    // Theme switcher (optional future feature)
    const themeToggle = document.createElement('button');
    themeToggle.textContent = '🌙';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.zIndex = '1000';
    themeToggle.style.background = 'var(--nord10)';
    themeToggle.style.color = 'var(--nord6)';
    themeToggle.style.border = 'none';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.width = '50px';
    themeToggle.style.height = '50px';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.fontSize = '1.2em';
    themeToggle.style.boxShadow = 'var(--shadow)';
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        this.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    });
    
    document.body.appendChild(themeToggle);
});


