// Resources Page JavaScript

class ResourcesManager {
    constructor() {
        this.resources = [];
        this.favorites = JSON.parse(localStorage.getItem('favoriteResources')) || [];
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.resourceDetails = this.initResourceDetails();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadResources();
        this.updateFavoriteButtons();
        this.setupKeyboardShortcuts();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('resourceSearch');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce((e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.filterResources();
            }, 300));
        }

        // Filter tabs
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.setActiveFilter(e.target.dataset.category);
            });
        });

        // Favorite buttons
        const favoriteButtons = document.querySelectorAll('.btn-favorite');
        favoriteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleFavorite(btn.dataset.resource);
            });
        });

        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreResources();
            });
        }

        // Modal close events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeResourceModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeResourceModal();
            }
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search focus
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('resourceSearch');
                if (searchInput) {
                    searchInput.focus();
                }
            }

            // Number keys for filter tabs
            if (e.key >= '1' && e.key <= '6' && !e.ctrlKey && !e.metaKey) {
                const filterTabs = document.querySelectorAll('.filter-tab');
                const index = parseInt(e.key) - 1;
                if (filterTabs[index]) {
                    filterTabs[index].click();
                }
            }
        });
    }

    loadResources() {
        const resourceCards = document.querySelectorAll('.resource-card');
        this.resources = Array.from(resourceCards).map(card => {
            return {
                element: card,
                category: card.dataset.category,
                level: card.dataset.level,
                title: card.querySelector('h3').textContent.toLowerCase(),
                description: card.querySelector('.card-description').textContent.toLowerCase(),
                id: card.querySelector('.btn-favorite').dataset.resource
            };
        });
    }

    setActiveFilter(category) {
        this.currentFilter = category;
        
        // Update active tab
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        this.filterResources();
    }

    filterResources() {
        const grid = document.getElementById('resourcesGrid');
        grid.classList.add('loading');
        
        setTimeout(() => {
            this.resources.forEach(resource => {
                const matchesCategory = this.currentFilter === 'all' || resource.category === this.currentFilter;
                const matchesSearch = this.searchQuery === '' || 
                    resource.title.includes(this.searchQuery) || 
                    resource.description.includes(this.searchQuery);
                
                if (matchesCategory && matchesSearch) {
                    resource.element.classList.remove('hidden');
                    resource.element.style.display = 'block';
                } else {
                    resource.element.classList.add('hidden');
                    resource.element.style.display = 'none';
                }
            });
            
            grid.classList.remove('loading');
            this.updateResultsCount();
        }, 150);
    }

    updateResultsCount() {
        const visibleResources = this.resources.filter(resource => 
            !resource.element.classList.contains('hidden')
        ).length;
        
        // You can add a results counter here if needed
        console.log(`Showing ${visibleResources} resources`);
    }

    toggleFavorite(resourceId) {
        const index = this.favorites.indexOf(resourceId);
        const button = document.querySelector(`[data-resource="${resourceId}"]`);
        
        if (index === -1) {
            this.favorites.push(resourceId);
            button.classList.add('active');
            button.querySelector('i').classList.remove('far');
            button.querySelector('i').classList.add('fas');
            this.showNotification('Ресурс додано до улюблених', 'success');
        } else {
            this.favorites.splice(index, 1);
            button.classList.remove('active');
            button.querySelector('i').classList.remove('fas');
            button.querySelector('i').classList.add('far');
            this.showNotification('Ресурс видалено з улюблених', 'info');
        }
        
        localStorage.setItem('favoriteResources', JSON.stringify(this.favorites));
    }

    updateFavoriteButtons() {
        this.favorites.forEach(resourceId => {
            const button = document.querySelector(`[data-resource="${resourceId}"]`);
            if (button) {
                button.classList.add('active');
                button.querySelector('i').classList.remove('far');
                button.querySelector('i').classList.add('fas');
            }
        });
    }

    showFavorites() {
        if (this.favorites.length === 0) {
            this.showNotification('У вас немає збережених ресурсів', 'info');
            return;
        }
        
        // Filter to show only favorites
        this.resources.forEach(resource => {
            if (this.favorites.includes(resource.id)) {
                resource.element.classList.remove('hidden');
                resource.element.style.display = 'block';
            } else {
                resource.element.classList.add('hidden');
                resource.element.style.display = 'none';
            }
        });
        
        // Update filter tab
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        this.showNotification(`Показано ${this.favorites.length} улюблених ресурсів`, 'success');
    }

    loadMoreResources() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        const originalText = loadMoreBtn.innerHTML;
        
        loadMoreBtn.innerHTML = '<div class="loading-spinner"></div> Завантаження...';
        loadMoreBtn.disabled = true;
        
        // Simulate loading more resources
        setTimeout(() => {
            const additionalResources = this.generateAdditionalResources();
            this.addResourcesToGrid(additionalResources);
            
            loadMoreBtn.innerHTML = originalText;
            loadMoreBtn.disabled = false;
            
            this.showNotification('Завантажено додаткові ресурси', 'success');
        }, 1500);
    }

    generateAdditionalResources() {
        return [
            {
                category: 'courses',
                level: 'advanced',
                title: 'CS231n: Convolutional Neural Networks',
                description: 'Курс Стенфордського університету з згорткових нейронних мереж для візуального розпізнавання.',
                icon: 'fas fa-graduation-cap',
                badges: ['Просунутий', 'Безкоштовно'],
                details: ['16 тижнів', '4.8/5', 'Stanford'],
                link: 'http://cs231n.stanford.edu/',
                id: 'cs231n'
            },
            {
                category: 'tools',
                level: 'intermediate',
                title: 'PyTorch',
                description: 'Відкрита бібліотека машинного навчання, розроблена Facebook AI Research.',
                icon: 'fas fa-tools',
                badges: ['Середній', 'Безкоштовно'],
                details: ['Python', '77k ⭐', 'Facebook'],
                link: 'https://pytorch.org/',
                id: 'pytorch'
            }
        ];
    }

    addResourcesToGrid(resources) {
        const grid = document.getElementById('resourcesGrid');
        
        resources.forEach(resource => {
            const cardHTML = this.createResourceCardHTML(resource);
            grid.insertAdjacentHTML('beforeend', cardHTML);
        });
        
        // Re-initialize event listeners for new cards
        this.loadResources();
        this.updateFavoriteButtons();
    }

    createResourceCardHTML(resource) {
        return `
            <div class="resource-card" data-category="${resource.category}" data-level="${resource.level}">
                <div class="card-header">
                    <div class="card-icon ${resource.category}">
                        <i class="${resource.icon}"></i>
                    </div>
                    <div class="card-meta">
                        <h3>${resource.title}</h3>
                        <div class="card-badges">
                            ${resource.badges.map(badge => `<span class="badge">${badge}</span>`).join('')}
                        </div>
                    </div>
                    <button class="btn-favorite" data-resource="${resource.id}">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
                <p class="card-description">${resource.description}</p>
                <div class="card-details">
                    ${resource.details.map(detail => `
                        <div class="detail-item">
                            <i class="fas fa-info-circle"></i>
                            <span>${detail}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="card-actions">
                    <a href="${resource.link}" class="btn btn-primary" target="_blank">
                        <i class="fas fa-external-link-alt"></i>
                        Перейти
                    </a>
                    <button class="btn btn-secondary" onclick="showResourceDetails('${resource.id}')">
                        Детальніше
                    </button>
                </div>
            </div>
        `;
    }

    showResourceDetails(resourceId) {
        const details = this.resourceDetails[resourceId];
        if (!details) {
            this.showNotification('Деталі ресурсу не знайдено', 'error');
            return;
        }
        
        const modal = document.getElementById('resourceModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        modalTitle.textContent = details.title;
        modalBody.innerHTML = this.createModalContent(details);
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    createModalContent(details) {
        return `
            <div class="modal-resource-details">
                <div class="modal-resource-header">
                    <img src="${details.image || 'https://via.placeholder.com/400x200?text=Resource+Image'}" 
                         alt="${details.title}" class="modal-resource-image">
                    <div class="modal-resource-meta">
                        <div class="modal-badges">
                            ${details.badges.map(badge => `<span class="badge">${badge}</span>`).join('')}
                        </div>
                        <div class="modal-rating">
                            <div class="stars">
                                ${this.generateStars(details.rating)}
                            </div>
                            <span class="rating-text">${details.rating}/5 (${details.reviews} відгуків)</span>
                        </div>
                    </div>
                </div>
                
                <div class="modal-description">
                    <h4>Опис</h4>
                    <p>${details.fullDescription}</p>
                </div>
                
                <div class="modal-features">
                    <h4>Особливості</h4>
                    <ul>
                        ${details.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-requirements">
                    <h4>Вимоги</h4>
                    <ul>
                        ${details.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-actions">
                    <a href="${details.link}" class="btn btn-primary" target="_blank">
                        <i class="fas fa-external-link-alt"></i>
                        Перейти до ресурсу
                    </a>
                    <button class="btn btn-secondary" onclick="resourcesManager.toggleFavorite('${details.id}')">
                        <i class="fas fa-heart"></i>
                        ${this.favorites.includes(details.id) ? 'Видалити з улюблених' : 'Додати до улюблених'}
                    </button>
                </div>
            </div>
        `;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    closeResourceModal() {
        const modal = document.getElementById('resourceModal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    initResourceDetails() {
        return {
            'coursera-ml': {
                id: 'coursera-ml',
                title: 'Machine Learning - Coursera',
                image: 'https://via.placeholder.com/400x200?text=Coursera+ML',
                badges: ['Початковий', 'Безкоштовно'],
                rating: 4.9,
                reviews: 150000,
                fullDescription: 'Цей курс надає широке введення в машинне навчання, інтелектуальний аналіз даних та статистичне розпізнавання образів. Курс також охоплює останні застосування машинного навчання, такі як розпізнавання мови, комп\'ютерний зір, медичні інформатика та веб-пошук.',
                features: [
                    'Математичні основи машинного навчання',
                    'Практичні завдання на Octave/MATLAB',
                    'Реальні приклади застосування',
                    'Сертифікат після завершення',
                    'Гнучкий графік навчання'
                ],
                requirements: [
                    'Базові знання математики (лінійна алгебра, обчислення)',
                    'Програмування на будь-якій мові (бажано)',
                    'Мотивація до навчання'
                ],
                link: 'https://www.coursera.org/learn/machine-learning'
            },
            'fastai-dl': {
                id: 'fastai-dl',
                title: 'Practical Deep Learning for Coders',
                image: 'https://via.placeholder.com/400x200?text=Fast.ai',
                badges: ['Середній', 'Безкоштовно'],
                rating: 4.8,
                reviews: 50000,
                fullDescription: 'Практичний курс глибокого навчання, який навчає створювати сучасні моделі для комп\'ютерного зору, обробки природної мови та табличних даних. Курс зосереджений на практичному застосуванні, а не на теорії.',
                features: [
                    'Практичний підхід до навчання',
                    'Сучасні методи та бібліотеки',
                    'Проекти з реальними даними',
                    'Спільнота підтримки',
                    'Безкоштовні GPU ресурси'
                ],
                requirements: [
                    'Рік досвіду програмування',
                    'Знання Python',
                    'Базове розуміння математики'
                ],
                link: 'https://course.fast.ai/'
            },
            'hands-on-ml': {
                id: 'hands-on-ml',
                title: 'Hands-On Machine Learning',
                image: 'https://via.placeholder.com/400x200?text=Hands-On+ML',
                badges: ['Середній', 'Платно'],
                rating: 4.7,
                reviews: 25000,
                fullDescription: 'Ця книга використовує конкретні приклади, мінімальну теорію та готовий до виробництва код Python для допомоги у вивченні ряду методів машинного навчання та глибокого навчання.',
                features: [
                    'Практичні приклади на Python',
                    'Scikit-Learn та TensorFlow',
                    'Повний цикл ML проектів',
                    'Оновлене 2-е видання',
                    'Код доступний на GitHub'
                ],
                requirements: [
                    'Знання Python',
                    'Базова математика та статистика',
                    'Досвід програмування'
                ],
                link: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/'
            },
            'deep-learning-book': {
                id: 'deep-learning-book',
                title: 'Deep Learning Book',
                image: 'https://via.placeholder.com/400x200?text=Deep+Learning',
                badges: ['Просунутий', 'Безкоштовно'],
                rating: 4.6,
                reviews: 15000,
                fullDescription: 'Підручник з глибокого навчання призначений для допомоги студентам та практикам увійти в сферу машинного навчання загалом та глибокого навчання зокрема.',
                features: [
                    'Фундаментальні концепції',
                    'Математичні основи',
                    'Сучасні методи досліджень',
                    'Безкоштовний онлайн доступ',
                    'Авторитетні автори'
                ],
                requirements: [
                    'Сильна математична підготовка',
                    'Знання лінійної алгебри',
                    'Розуміння ймовірності та статистики'
                ],
                link: 'https://www.deeplearningbook.org/'
            },
            'google-colab': {
                id: 'google-colab',
                title: 'Google Colaboratory',
                image: 'https://via.placeholder.com/400x200?text=Google+Colab',
                badges: ['Початковий', 'Безкоштовно'],
                rating: 4.5,
                reviews: 100000,
                fullDescription: 'Colaboratory - це безкоштовне середовище Jupyter notebook, яке працює в хмарі та не потребує налаштування для використання.',
                features: [
                    'Безкоштовний доступ до GPU',
                    'Попередньо встановлені бібліотеки',
                    'Інтеграція з Google Drive',
                    'Спільна робота в реальному часі',
                    'Підтримка TPU'
                ],
                requirements: [
                    'Google акаунт',
                    'Інтернет з\'єднання',
                    'Веб-браузер'
                ],
                link: 'https://colab.research.google.com/'
            },
            'tensorflow': {
                id: 'tensorflow',
                title: 'TensorFlow',
                image: 'https://via.placeholder.com/400x200?text=TensorFlow',
                badges: ['Середній', 'Безкоштовно'],
                rating: 4.4,
                reviews: 75000,
                fullDescription: 'TensorFlow - це відкрита платформа для машинного навчання. Вона має комплексну, гнучку екосистему інструментів, бібліотек та ресурсів спільноти.',
                features: [
                    'Гнучка архітектура',
                    'Підтримка мобільних пристроїв',
                    'Масштабування на кластери',
                    'TensorBoard для візуалізації',
                    'Велика спільнота'
                ],
                requirements: [
                    'Python 3.7-3.11',
                    'pip 19.0 або новіший',
                    'Базові знання машинного навчання'
                ],
                link: 'https://tensorflow.org/'
            },
            'kaggle-datasets': {
                id: 'kaggle-datasets',
                title: 'Kaggle Datasets',
                image: 'https://via.placeholder.com/400x200?text=Kaggle+Datasets',
                badges: ['Початковий', 'Безкоштовно'],
                rating: 4.6,
                reviews: 200000,
                fullDescription: 'Kaggle Datasets - це платформа для пошуку та публікації наборів даних, дослідження та створення проектів в одному місці.',
                features: [
                    'Понад 50,000 наборів даних',
                    'Різноманітні категорії',
                    'API для завантаження',
                    'Спільнота дослідників',
                    'Інтеграція з Kaggle Notebooks'
                ],
                requirements: [
                    'Kaggle акаунт',
                    'Базові знання аналізу даних'
                ],
                link: 'https://www.kaggle.com/datasets'
            },
            'reddit-ml': {
                id: 'reddit-ml',
                title: 'r/MachineLearning',
                image: 'https://via.placeholder.com/400x200?text=Reddit+ML',
                badges: ['Всі рівні', 'Безкоштовно'],
                rating: 4.3,
                reviews: 50000,
                fullDescription: 'Субреддіт, присвячений машинному навчанню, штучному інтелекту та пов\'язаним темам. Місце для обговорення досліджень, новин та питань.',
                features: [
                    'Останні дослідження',
                    'Обговорення з експертами',
                    'Питання та відповіді',
                    'Новини індустрії',
                    'Кар\'єрні поради'
                ],
                requirements: [
                    'Reddit акаунт',
                    'Інтерес до машинного навчання'
                ],
                link: 'https://www.reddit.com/r/MachineLearning/'
            },
            'ai-jobs': {
                id: 'ai-jobs',
                title: 'AI Jobs Board',
                image: 'https://via.placeholder.com/400x200?text=AI+Jobs',
                badges: ['Всі рівні', 'Безкоштовно'],
                rating: 4.2,
                reviews: 10000,
                fullDescription: 'Спеціалізована платформа для пошуку роботи в сфері штучного інтелекту, машинного навчання та науки про дані.',
                features: [
                    'Фільтри за навичками',
                    'Віддалена робота',
                    'Різні рівні досвіду',
                    'Компанії з усього світу',
                    'Сповіщення про нові вакансії'
                ],
                requirements: [
                    'Резюме',
                    'Навички в сфері ШІ/ML'
                ],
                link: 'https://aijobs.app/'
            }
        };
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove
        setTimeout(() => this.removeNotification(notification), 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    debounce(func, wait) {
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
}

// Global functions for HTML onclick events
function showResourceDetails(resourceId) {
    window.resourcesManager.showResourceDetails(resourceId);
}

function closeResourceModal() {
    window.resourcesManager.closeResourceModal();
}

function showFavorites() {
    window.resourcesManager.showFavorites();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.resourcesManager = new ResourcesManager();
});

// Add notification styles to head
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 10px;
    padding: 15px 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    transform: translateX(400px);
    opacity: 0;
    transition: all 0.3s ease;
    max-width: 400px;
    border-left: 4px solid #667eea;
}

.notification.show {
    transform: translateX(0);
    opacity: 1;
}

.notification-success {
    border-left-color: #10b981;
}

.notification-error {
    border-left-color: #ef4444;
}

.notification-warning {
    border-left-color: #f59e0b;
}

.notification-info {
    border-left-color: #3b82f6;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.notification-content i {
    font-size: 1.2rem;
}

.notification-success .notification-content i {
    color: #10b981;
}

.notification-error .notification-content i {
    color: #ef4444;
}

.notification-warning .notification-content i {
    color: #f59e0b;
}

.notification-info .notification-content i {
    color: #3b82f6;
}

.notification-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.notification-close:hover {
    background: #f3f4f6;
    color: #374151;
}

.modal-resource-details {
    padding: 20px 0;
}

.modal-resource-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 20px;
}

.modal-resource-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.modal-badges {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.modal-rating {
    display: flex;
    align-items: center;
    gap: 10px;
}

.stars {
    color: #fbbf24;
}

.rating-text {
    color: #6b7280;
    font-size: 0.9rem;
}

.modal-description,
.modal-features,
.modal-requirements {
    margin-bottom: 25px;
}

.modal-description h4,
.modal-features h4,
.modal-requirements h4 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: #1f2937;
}

.modal-features ul,
.modal-requirements ul {
    list-style: none;
    padding: 0;
}

.modal-features li,
.modal-requirements li {
    padding: 8px 0;
    border-bottom: 1px solid #f3f4f6;
    position: relative;
    padding-left: 20px;
}

.modal-features li:before,
.modal-requirements li:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #10b981;
    font-weight: bold;
}

.modal-actions {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    padding-top: 20px;
    border-top: 1px solid #e5e7eb;
}

@media (max-width: 768px) {
    .notification {
        right: 10px;
        left: 10px;
        max-width: none;
        transform: translateY(-100px);
    }
    
    .notification.show {
        transform: translateY(0);
    }
    
    .modal-actions {
        flex-direction: column;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);