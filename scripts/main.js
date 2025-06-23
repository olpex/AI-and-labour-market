// Main JavaScript file for AI Career Development website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeProgressTracking();
    initializeAnimations();
    initializeLevelSelection();
    initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links (only for anchor links)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for anchor links (starting with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Progress tracking functionality
function initializeProgressTracking() {
    const progressData = {
        totalLessons: 48,
        completedLessons: 12,
        practicalTasks: 8,
        testsCompleted: 3
    };
    
    updateProgressDisplay(progressData);
    
    // Simulate progress updates
    setInterval(() => {
        if (Math.random() > 0.7) {
            progressData.completedLessons = Math.min(progressData.completedLessons + 1, progressData.totalLessons);
            updateProgressDisplay(progressData);
        }
    }, 10000);
}

function updateProgressDisplay(data) {
    const progressPercentage = Math.round((data.completedLessons / data.totalLessons) * 100);
    const progressCircle = document.querySelector('.progress-ring-circle.progress');
    const progressText = document.querySelector('.progress-text');
    
    if (progressCircle && progressText) {
        const circumference = 2 * Math.PI * 52; // radius = 52
        const offset = circumference - (progressPercentage / 100) * circumference;
        
        progressCircle.style.strokeDashoffset = offset;
        progressText.textContent = `${progressPercentage}%`;
    }
    
    // Update stats
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length >= 3) {
        stats[0].textContent = data.completedLessons;
        stats[1].textContent = data.practicalTasks;
        stats[2].textContent = data.testsCompleted;
    }
}

// Animation initialization
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.path-card, .feature-card, .section-title');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .path-card, .feature-card, .section-title {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Level selection functionality
function initializeLevelSelection() {
    const levelCards = document.querySelectorAll('.path-card');
    
    levelCards.forEach(card => {
        card.addEventListener('click', function() {
            const level = this.dataset.level;
            selectLevel(level);
        });
    });
}

function selectLevel(level) {
    const levelData = {
        beginner: {
            title: 'Початківець',
            description: 'Ви обрали рівень для початківців. Почнемо з основ!',
            modules: [
                'Вступ до штучного інтелекту',
                'Основні концепції машинного навчання',
                'Інструменти та технології',
                'Перші кроки в AI кар\'єрі'
            ]
        },
        intermediate: {
            title: 'Середній',
            description: 'Відмінний вибір! Поглибимо ваші знання в AI.',
            modules: [
                'Алгоритми машинного навчання',
                'Обробка та аналіз даних',
                'Нейронні мережі',
                'Практичні AI проекти'
            ]
        },
        advanced: {
            title: 'Експерт',
            description: 'Ви готові до експертного рівня! Вивчаємо передові технології.',
            modules: [
                'Deep Learning та CNN',
                'Natural Language Processing',
                'AI стратегії для бізнесу',
                'Лідерство в AI командах'
            ]
        }
    };
    
    const selectedData = levelData[level];
    if (selectedData) {
        showLevelModal(selectedData);
        
        // Store user preference
        localStorage.setItem('selectedLevel', level);
        
        // Update UI to reflect selection
        document.querySelectorAll('.path-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelector(`[data-level="${level}"]`).classList.add('selected');
    }
}

function showLevelModal(data) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('levelModal');
    if (!modal) {
        modal = createLevelModal();
    }
    
    // Update modal content
    modal.querySelector('.modal-title').textContent = data.title;
    modal.querySelector('.modal-description').textContent = data.description;
    
    const modulesList = modal.querySelector('.modules-list');
    modulesList.innerHTML = '';
    data.modules.forEach(module => {
        const li = document.createElement('li');
        li.textContent = module;
        modulesList.appendChild(li);
    });
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function createLevelModal() {
    const modal = document.createElement('div');
    modal.id = 'levelModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title"></h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p class="modal-description"></p>
                <h4>Модулі курсу:</h4>
                <ul class="modules-list"></ul>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="startLearning()">Почати навчання</button>
                    <button class="btn btn-secondary" onclick="closeModal()">Переглянути інші рівні</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 2000;
            align-items: center;
            justify-content: center;
        }
        
        .modal-content {
            background: white;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6b7280;
        }
        
        .modal-body {
            padding: 1.5rem;
        }
        
        .modules-list {
            list-style: none;
            margin: 1rem 0;
        }
        
        .modules-list li {
            padding: 0.5rem 0;
            border-bottom: 1px solid #f3f4f6;
            position: relative;
            padding-left: 1.5rem;
        }
        
        .modules-list li::before {
            content: '📚';
            position: absolute;
            left: 0;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
            flex-wrap: wrap;
        }
        
        .path-card.selected {
            border-color: #667eea;
            background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%);
        }
    `;
    document.head.appendChild(style);
    
    // Add event listeners
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.body.appendChild(modal);
    return modal;
}

function closeModal() {
    const modal = document.getElementById('levelModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function startLearning() {
    closeModal();
    
    // Scroll to theory section
    const theorySection = document.getElementById('theory');
    if (theorySection) {
        theorySection.scrollIntoView({ behavior: 'smooth' });
    } else {
        // If theory section doesn't exist, show a message
        showNotification('Розділ "Теорія" буде доступний незабаром!', 'info');
    }
}

// Scroll effects
function initializeScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Header background opacity
        if (scrolled > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Update active navigation link based on scroll position
        updateActiveNavLink();
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                z-index: 3000;
                min-width: 300px;
                animation: slideIn 0.3s ease;
            }
            
            .notification-info {
                border-left: 4px solid #667eea;
            }
            
            .notification-success {
                border-left: 4px solid #10b981;
            }
            
            .notification-warning {
                border-left: 4px solid #f59e0b;
            }
            
            .notification-error {
                border-left: 4px solid #ef4444;
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.2rem;
                cursor: pointer;
                color: #6b7280;
                margin-left: 1rem;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize user preferences
function initializeUserPreferences() {
    const savedLevel = localStorage.getItem('selectedLevel');
    if (savedLevel) {
        const levelCard = document.querySelector(`[data-level="${savedLevel}"]`);
        if (levelCard) {
            levelCard.classList.add('selected');
        }
    }
}

// Call initialization functions
document.addEventListener('DOMContentLoaded', function() {
    initializeUserPreferences();
});

// Export functions for global access
window.selectLevel = selectLevel;
window.startLearning = startLearning;
window.closeModal = closeModal;
window.showNotification = showNotification;