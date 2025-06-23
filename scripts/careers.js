// Careers Page JavaScript

class CareersManager {
    constructor() {
        this.careers = [];
        this.filteredCareers = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.modal = null;
        this.salaryChart = null;
        
        this.init();
    }

    init() {
        this.loadCareers();
        this.setupEventListeners();
        this.renderCareers();
        this.initSalaryChart();
        this.setupModal();
    }

    loadCareers() {
        this.careers = [
            {
                id: 1,
                title: 'Data Scientist',
                category: 'technical',
                description: 'Аналізує великі обсяги даних для виявлення закономірностей та створення прогнозних моделей.',
                icon: 'fas fa-chart-line',
                tags: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'],
                salary: '$70,000 - $150,000',
                experience: 'Middle',
                responsibilities: [
                    'Збір та очищення даних з різних джерел',
                    'Створення та валідація статистичних моделей',
                    'Візуалізація даних та результатів аналізу',
                    'Співпраця з бізнес-командами для вирішення задач'
                ],
                skills: ['Python', 'R', 'SQL', 'Pandas', 'Scikit-learn', 'TensorFlow', 'Tableau', 'Statistics'],
                growth: 'Можливість росту до Senior Data Scientist, Lead Data Scientist або Chief Data Officer'
            },
            {
                id: 2,
                title: 'Machine Learning Engineer',
                category: 'technical',
                description: 'Розробляє та впроваджує ML моделі в продакшн системи.',
                icon: 'fas fa-cogs',
                tags: ['Python', 'TensorFlow', 'PyTorch', 'Docker', 'Kubernetes'],
                salary: '$80,000 - $160,000',
                experience: 'Senior',
                responsibilities: [
                    'Розробка та оптимізація ML алгоритмів',
                    'Впровадження моделей у виробничі системи',
                    'Моніторинг та підтримка ML pipeline',
                    'Співпраця з Data Scientists та DevOps командами'
                ],
                skills: ['Python', 'TensorFlow', 'PyTorch', 'Docker', 'Kubernetes', 'AWS/GCP', 'MLOps'],
                growth: 'Розвиток до ML Architect, Principal ML Engineer або Head of ML Engineering'
            },
            {
                id: 3,
                title: 'AI Research Scientist',
                category: 'research',
                description: 'Проводить фундаментальні дослідження в галузі штучного інтелекту.',
                icon: 'fas fa-microscope',
                tags: ['Deep Learning', 'Research', 'Publications', 'Mathematics'],
                salary: '$90,000 - $200,000',
                experience: 'Senior',
                responsibilities: [
                    'Проведення наукових досліджень в AI',
                    'Публікація результатів у наукових журналах',
                    'Розробка нових алгоритмів та методів',
                    'Участь у конференціях та семінарах'
                ],
                skills: ['Deep Learning', 'Mathematics', 'Statistics', 'Research Methods', 'Academic Writing'],
                growth: 'Кар\'єра в академічних установах або провідних tech компаніях'
            },
            {
                id: 4,
                title: 'AI Product Manager',
                category: 'business',
                description: 'Керує розробкою AI продуктів від концепції до запуску.',
                icon: 'fas fa-tasks',
                tags: ['Product Strategy', 'AI/ML', 'Analytics', 'Leadership'],
                salary: '$85,000 - $170,000',
                experience: 'Senior',
                responsibilities: [
                    'Визначення стратегії AI продуктів',
                    'Координація між технічними та бізнес командами',
                    'Аналіз ринку та конкурентів',
                    'Управління roadmap продукту'
                ],
                skills: ['Product Management', 'AI/ML Understanding', 'Analytics', 'Leadership', 'Communication'],
                growth: 'Розвиток до Senior PM, Director of Product або Chief Product Officer'
            },
            {
                id: 5,
                title: 'Computer Vision Engineer',
                category: 'technical',
                description: 'Розробляє системи комп\'ютерного зору для обробки зображень та відео.',
                icon: 'fas fa-eye',
                tags: ['OpenCV', 'Deep Learning', 'Image Processing', 'Python'],
                salary: '$75,000 - $155,000',
                experience: 'Middle',
                responsibilities: [
                    'Розробка алгоритмів обробки зображень',
                    'Створення моделей розпізнавання об\'єктів',
                    'Оптимізація продуктивності CV систем',
                    'Інтеграція з камерами та сенсорами'
                ],
                skills: ['OpenCV', 'TensorFlow', 'PyTorch', 'Image Processing', 'Deep Learning', 'C++'],
                growth: 'Спеціалізація в autonomous vehicles, robotics або medical imaging'
            },
            {
                id: 6,
                title: 'NLP Engineer',
                category: 'technical',
                description: 'Створює системи обробки природної мови та розуміння тексту.',
                icon: 'fas fa-comments',
                tags: ['NLP', 'BERT', 'Transformers', 'Python', 'Linguistics'],
                salary: '$70,000 - $145,000',
                experience: 'Middle',
                responsibilities: [
                    'Розробка NLP моделей та алгоритмів',
                    'Обробка та аналіз текстових даних',
                    'Створення chatbots та voice assistants',
                    'Робота з великими мовними моделями'
                ],
                skills: ['NLP', 'BERT', 'GPT', 'spaCy', 'NLTK', 'Transformers', 'Linguistics'],
                growth: 'Спеціалізація в conversational AI, machine translation або text analytics'
            },
            {
                id: 7,
                title: 'AI Ethics Specialist',
                category: 'research',
                description: 'Забезпечує етичне використання AI технологій та відповідність регуляторним вимогам.',
                icon: 'fas fa-balance-scale',
                tags: ['Ethics', 'Policy', 'Compliance', 'Philosophy'],
                salary: '$65,000 - $130,000',
                experience: 'Middle',
                responsibilities: [
                    'Розробка етичних принципів для AI',
                    'Аудит AI систем на предмет bias',
                    'Створення політик та процедур',
                    'Навчання команд етичним практикам'
                ],
                skills: ['AI Ethics', 'Policy Development', 'Risk Assessment', 'Communication', 'Philosophy'],
                growth: 'Розвиток до Chief Ethics Officer або AI Policy Director'
            },
            {
                id: 8,
                title: 'Robotics Engineer',
                category: 'technical',
                description: 'Проектує та програмує роботів з використанням AI технологій.',
                icon: 'fas fa-robot',
                tags: ['Robotics', 'ROS', 'C++', 'Control Systems', 'AI'],
                salary: '$75,000 - $150,000',
                experience: 'Senior',
                responsibilities: [
                    'Проектування робототехнічних систем',
                    'Програмування контролерів та сенсорів',
                    'Інтеграція AI алгоритмів в роботів',
                    'Тестування та налагодження систем'
                ],
                skills: ['ROS', 'C++', 'Python', 'Control Systems', 'Mechanical Engineering', 'AI'],
                growth: 'Спеціалізація в industrial automation, autonomous vehicles або service robots'
            },
            {
                id: 9,
                title: 'AI Consultant',
                category: 'business',
                description: 'Консультує компанії щодо впровадження AI рішень та стратегій.',
                icon: 'fas fa-handshake',
                tags: ['Consulting', 'Strategy', 'AI/ML', 'Business Analysis'],
                salary: '$80,000 - $180,000',
                experience: 'Senior',
                responsibilities: [
                    'Аналіз бізнес потреб клієнтів',
                    'Розробка AI стратегій та roadmaps',
                    'Управління проектами впровадження',
                    'Навчання та менторинг команд клієнтів'
                ],
                skills: ['Business Analysis', 'AI/ML', 'Project Management', 'Communication', 'Strategy'],
                growth: 'Розвиток власної консалтингової практики або перехід до executive ролей'
            },
            {
                id: 10,
                title: 'AI Artist/Designer',
                category: 'creative',
                description: 'Створює мистецтво та дизайн з використанням AI інструментів.',
                icon: 'fas fa-palette',
                tags: ['Generative AI', 'Design', 'Creativity', 'Digital Art'],
                salary: '$45,000 - $100,000',
                experience: 'Junior',
                responsibilities: [
                    'Створення цифрового мистецтва за допомогою AI',
                    'Розробка креативних концепцій',
                    'Експериментування з новими AI tools',
                    'Співпраця з маркетинговими командами'
                ],
                skills: ['Generative AI', 'Adobe Creative Suite', 'Design Thinking', 'Creativity', 'Digital Art'],
                growth: 'Розвиток до Creative Director або Art Director з AI спеціалізацією'
            }
        ];
        
        this.filteredCareers = [...this.careers];
    }

    setupEventListeners() {
        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilterChange(e.target.dataset.category);
            });
        });

        // Search input
        const searchInput = document.getElementById('careerSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                searchInput?.focus();
            }
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    handleFilterChange(category) {
        this.currentFilter = category;
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        this.filterCareers();
        this.renderCareers();
    }

    handleSearch(term) {
        this.searchTerm = term.toLowerCase();
        this.filterCareers();
        this.renderCareers();
    }

    filterCareers() {
        this.filteredCareers = this.careers.filter(career => {
            const matchesCategory = this.currentFilter === 'all' || career.category === this.currentFilter;
            const matchesSearch = this.searchTerm === '' || 
                career.title.toLowerCase().includes(this.searchTerm) ||
                career.description.toLowerCase().includes(this.searchTerm) ||
                career.tags.some(tag => tag.toLowerCase().includes(this.searchTerm));
            
            return matchesCategory && matchesSearch;
        });
    }

    renderCareers() {
        const container = document.getElementById('careersContainer');
        if (!container) return;

        if (this.filteredCareers.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search" style="font-size: 3rem; color: #64748b; margin-bottom: 1rem;"></i>
                    <h3>Професії не знайдено</h3>
                    <p>Спробуйте змінити фільтри або пошуковий запит</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.filteredCareers.map(career => `
            <div class="career-card" data-career-id="${career.id}" tabindex="0">
                <div class="career-header">
                    <div class="career-icon ${career.category}">
                        <i class="${career.icon}"></i>
                    </div>
                    <div class="career-info">
                        <h3>${career.title}</h3>
                        <div class="career-category">${this.getCategoryName(career.category)}</div>
                    </div>
                </div>
                <p class="career-description">${career.description}</p>
                <div class="career-tags">
                    ${career.tags.slice(0, 4).map(tag => `<span class="tag">${tag}</span>`).join('')}
                    ${career.tags.length > 4 ? `<span class="tag">+${career.tags.length - 4}</span>` : ''}
                </div>
                <div class="career-footer">
                    <div class="salary-range">${career.salary}</div>
                    <div class="experience-level">${career.experience}</div>
                </div>
            </div>
        `).join('');

        // Add click listeners to career cards
        container.querySelectorAll('.career-card').forEach(card => {
            card.addEventListener('click', () => {
                const careerId = parseInt(card.dataset.careerId);
                this.showCareerDetails(careerId);
            });
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const careerId = parseInt(card.dataset.careerId);
                    this.showCareerDetails(careerId);
                }
            });
        });
    }

    getCategoryName(category) {
        const names = {
            'technical': 'Технічні',
            'research': 'Дослідницькі',
            'business': 'Бізнес',
            'creative': 'Креативні'
        };
        return names[category] || category;
    }

    showCareerDetails(careerId) {
        const career = this.careers.find(c => c.id === careerId);
        if (!career) return;

        // Update modal content
        document.getElementById('modalTitle').textContent = career.title;
        document.getElementById('careerDescription').textContent = career.description;
        
        const responsibilitiesList = document.getElementById('careerResponsibilities');
        responsibilitiesList.innerHTML = career.responsibilities.map(resp => `<li>${resp}</li>`).join('');
        
        const skillsContainer = document.getElementById('careerSkills');
        skillsContainer.innerHTML = career.skills.map(skill => `<span class="tag">${skill}</span>`).join('');
        
        document.getElementById('careerSalary').textContent = career.salary;
        document.getElementById('careerGrowth').textContent = career.growth;

        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    setupModal() {
        this.modal = document.getElementById('careerModal');
        if (!this.modal) return;

        // Close button
        const closeBtn = this.modal.querySelector('.modal-close');
        closeBtn?.addEventListener('click', () => this.closeModal());

        // Click outside to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Action buttons
        const learnMoreBtn = document.getElementById('learnMoreBtn');
        learnMoreBtn?.addEventListener('click', () => {
            // Redirect to resources or learning materials
            window.location.href = 'resources.html';
        });

        const saveCareerBtn = document.getElementById('saveCareerBtn');
        saveCareerBtn?.addEventListener('click', () => {
            this.saveCareer();
        });
    }

    closeModal() {
        if (this.modal) {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    saveCareer() {
        const title = document.getElementById('modalTitle').textContent;
        let savedCareers = JSON.parse(localStorage.getItem('savedCareers') || '[]');
        
        if (!savedCareers.includes(title)) {
            savedCareers.push(title);
            localStorage.setItem('savedCareers', JSON.stringify(savedCareers));
            this.showNotification('Професію збережено!', 'success');
        } else {
            this.showNotification('Професія вже збережена', 'info');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        if (type === 'success') {
            notification.style.background = '#10b981';
        } else if (type === 'info') {
            notification.style.background = '#3b82f6';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    initSalaryChart() {
        const canvas = document.getElementById('salaryChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Sample salary data
        const salaryData = {
            labels: ['Data Scientist', 'ML Engineer', 'AI Researcher', 'Product Manager', 'CV Engineer', 'NLP Engineer'],
            datasets: [
                {
                    label: 'Junior (0-2 роки)',
                    data: [70, 80, 90, 85, 75, 70],
                    backgroundColor: '#3b82f6',
                    borderRadius: 4
                },
                {
                    label: 'Middle (2-5 років)',
                    data: [110, 120, 145, 125, 115, 105],
                    backgroundColor: '#8b5cf6',
                    borderRadius: 4
                },
                {
                    label: 'Senior (5+ років)',
                    data: [150, 160, 200, 170, 155, 145],
                    backgroundColor: '#10b981',
                    borderRadius: 4
                }
            ]
        };

        this.salaryChart = new Chart(ctx, {
            type: 'bar',
            data: salaryData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false // We have custom legend
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: $${context.parsed.y}k`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value + 'k';
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
}

// Utility function for debouncing
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CareersManager();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CareersManager;
}