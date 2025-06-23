// Education Page JavaScript

class EducationManager {
    constructor() {
        this.educationData = [];
        this.currentCategory = 'universities';
        this.currentFilters = {
            level: 'all',
            duration: 'all',
            price: 'all',
            search: ''
        };
        this.certifications = JSON.parse(localStorage.getItem('certifications') || '[]');
        this.learningProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
        this.wishlist = JSON.parse(localStorage.getItem('educationWishlist') || '[]');
        this.displayedItems = 9;
        this.progressChart = null;
        
        this.init();
    }

    init() {
        this.loadEducationData();
        this.setupEventListeners();
        this.renderEducationItems();
        this.updateCertificationStats();
        this.renderCertifications();
        this.updateLearningProgress();
        this.generateRecommendations();
        this.setupModals();
        this.initProgressChart();
    }

    loadEducationData() {
        this.educationData = {
            universities: [
                {
                    id: 'stanford-ai',
                    title: 'Stanford CS229: Machine Learning',
                    provider: 'Stanford University',
                    description: 'Комплексний курс машинного навчання від провідного університету світу',
                    level: 'advanced',
                    duration: '16 тижнів',
                    price: 'Безкоштовно',
                    priceCategory: 'free',
                    rating: 4.9,
                    students: 50000,
                    curriculum: [
                        'Supervised Learning',
                        'Unsupervised Learning',
                        'Deep Learning',
                        'Reinforcement Learning',
                        'Neural Networks',
                        'Support Vector Machines'
                    ],
                    skills: ['Machine Learning', 'Python', 'Mathematics', 'Statistics'],
                    url: 'https://cs229.stanford.edu/'
                },
                {
                    id: 'mit-intro-ai',
                    title: 'MIT 6.034: Introduction to Artificial Intelligence',
                    provider: 'MIT',
                    description: 'Вступ до штучного інтелекту від MIT',
                    level: 'intermediate',
                    duration: '12 тижнів',
                    price: 'Безкоштовно',
                    priceCategory: 'free',
                    rating: 4.8,
                    students: 35000,
                    curriculum: [
                        'Search Algorithms',
                        'Game Playing',
                        'Machine Learning',
                        'Neural Networks',
                        'Natural Language Processing'
                    ],
                    skills: ['AI Fundamentals', 'Python', 'Algorithms', 'Problem Solving'],
                    url: 'https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/'
                },
                {
                    id: 'berkeley-deep-learning',
                    title: 'UC Berkeley CS182: Deep Learning',
                    provider: 'UC Berkeley',
                    description: 'Глибоке навчання та нейронні мережі',
                    level: 'advanced',
                    duration: '14 тижнів',
                    price: 'Безкоштовно',
                    priceCategory: 'free',
                    rating: 4.7,
                    students: 28000,
                    curriculum: [
                        'Neural Network Fundamentals',
                        'Convolutional Networks',
                        'Recurrent Networks',
                        'Generative Models',
                        'Reinforcement Learning'
                    ],
                    skills: ['Deep Learning', 'TensorFlow', 'PyTorch', 'Computer Vision'],
                    url: 'https://cs182sp21.github.io/'
                }
            ],
            'online-courses': [
                {
                    id: 'coursera-ml-andrew-ng',
                    title: 'Machine Learning Course',
                    provider: 'Coursera (Andrew Ng)',
                    description: 'Найпопулярніший курс машинного навчання в світі',
                    level: 'beginner',
                    duration: '11 тижнів',
                    price: '$49/місяць',
                    priceCategory: 'paid',
                    rating: 4.9,
                    students: 4500000,
                    curriculum: [
                        'Linear Regression',
                        'Logistic Regression',
                        'Neural Networks',
                        'Support Vector Machines',
                        'Clustering',
                        'Anomaly Detection'
                    ],
                    skills: ['Machine Learning', 'Octave/MATLAB', 'Mathematics'],
                    url: 'https://www.coursera.org/learn/machine-learning'
                },
                {
                    id: 'udacity-ai-nanodegree',
                    title: 'Artificial Intelligence Nanodegree',
                    provider: 'Udacity',
                    description: 'Практичний курс AI з реальними проектами',
                    level: 'intermediate',
                    duration: '4 місяці',
                    price: '$399/місяць',
                    priceCategory: 'premium',
                    rating: 4.6,
                    students: 15000,
                    curriculum: [
                        'Search Algorithms',
                        'Game Playing AI',
                        'Constraint Satisfaction',
                        'Machine Learning',
                        'Computer Vision'
                    ],
                    skills: ['AI Programming', 'Python', 'Search Algorithms', 'Game Theory'],
                    url: 'https://www.udacity.com/course/artificial-intelligence-nanodegree--nd889'
                },
                {
                    id: 'edx-mit-intro-ml',
                    title: 'Introduction to Machine Learning',
                    provider: 'edX (MIT)',
                    description: 'Вступ до машинного навчання від MIT',
                    level: 'intermediate',
                    duration: '15 тижнів',
                    price: '$300',
                    priceCategory: 'paid',
                    rating: 4.7,
                    students: 75000,
                    curriculum: [
                        'Linear Models',
                        'Nonlinear Models',
                        'Learning Theory',
                        'Unsupervised Learning',
                        'Reinforcement Learning'
                    ],
                    skills: ['Machine Learning', 'Python', 'Statistics', 'Linear Algebra'],
                    url: 'https://www.edx.org/course/introduction-to-machine-learning'
                }
            ],
            bootcamps: [
                {
                    id: 'metis-data-science',
                    title: 'Data Science Bootcamp',
                    provider: 'Metis',
                    description: 'Інтенсивний буткемп з data science та машинного навчання',
                    level: 'intermediate',
                    duration: '12 тижнів',
                    price: '$17,000',
                    priceCategory: 'premium',
                    rating: 4.5,
                    students: 2000,
                    curriculum: [
                        'Python Programming',
                        'Statistics & Probability',
                        'Machine Learning',
                        'Deep Learning',
                        'Data Visualization',
                        'Capstone Project'
                    ],
                    skills: ['Python', 'SQL', 'Machine Learning', 'Data Visualization'],
                    url: 'https://www.thisismetis.com/bootcamps/online-data-science-bootcamp'
                },
                {
                    id: 'springboard-ai-ml',
                    title: 'AI/Machine Learning Career Track',
                    provider: 'Springboard',
                    description: 'Персоналізований курс з ментором для кар\'єри в AI/ML',
                    level: 'beginner',
                    duration: '6 місяців',
                    price: '$7,940',
                    priceCategory: 'premium',
                    rating: 4.6,
                    students: 5000,
                    curriculum: [
                        'Python Fundamentals',
                        'Statistics for Data Science',
                        'Machine Learning',
                        'Deep Learning',
                        'Capstone Projects'
                    ],
                    skills: ['Python', 'Machine Learning', 'Deep Learning', 'Portfolio Development'],
                    url: 'https://www.springboard.com/courses/ai-machine-learning-career-track/'
                },
                {
                    id: 'general-assembly-data-science',
                    title: 'Data Science Immersive',
                    provider: 'General Assembly',
                    description: 'Повний курс data science з практичними проектами',
                    level: 'beginner',
                    duration: '12 тижнів',
                    price: '$15,950',
                    priceCategory: 'premium',
                    rating: 4.4,
                    students: 8000,
                    curriculum: [
                        'Programming Fundamentals',
                        'Data Analysis',
                        'Machine Learning',
                        'Data Visualization',
                        'Capstone Project'
                    ],
                    skills: ['Python', 'SQL', 'Machine Learning', 'Data Analysis'],
                    url: 'https://generalassemb.ly/education/data-science-immersive'
                }
            ],
            certifications: [
                {
                    id: 'aws-ml-specialty',
                    title: 'AWS Certified Machine Learning - Specialty',
                    provider: 'Amazon Web Services',
                    description: 'Сертифікація з машинного навчання на AWS',
                    level: 'advanced',
                    duration: '3-6 місяців підготовки',
                    price: '$300',
                    priceCategory: 'paid',
                    rating: 4.7,
                    students: 25000,
                    curriculum: [
                        'Data Engineering',
                        'Exploratory Data Analysis',
                        'Modeling',
                        'Machine Learning Implementation',
                        'Operations'
                    ],
                    skills: ['AWS', 'Machine Learning', 'Data Engineering', 'MLOps'],
                    url: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/'
                },
                {
                    id: 'google-ml-engineer',
                    title: 'Google Cloud Professional ML Engineer',
                    provider: 'Google Cloud',
                    description: 'Професійна сертифікація ML інженера від Google',
                    level: 'advanced',
                    duration: '3-6 місяців підготовки',
                    price: '$200',
                    priceCategory: 'paid',
                    rating: 4.6,
                    students: 18000,
                    curriculum: [
                        'ML Problem Framing',
                        'ML Solution Architecture',
                        'Data Preparation',
                        'ML Model Development',
                        'ML Pipeline Automation'
                    ],
                    skills: ['Google Cloud', 'TensorFlow', 'ML Engineering', 'Data Pipeline'],
                    url: 'https://cloud.google.com/certification/machine-learning-engineer'
                },
                {
                    id: 'microsoft-azure-ai',
                    title: 'Microsoft Azure AI Engineer Associate',
                    provider: 'Microsoft',
                    description: 'Сертифікація AI інженера на платформі Azure',
                    level: 'intermediate',
                    duration: '2-4 місяці підготовки',
                    price: '$165',
                    priceCategory: 'paid',
                    rating: 4.5,
                    students: 22000,
                    curriculum: [
                        'Azure Cognitive Services',
                        'Azure Machine Learning',
                        'Knowledge Mining',
                        'Conversational AI'
                    ],
                    skills: ['Azure', 'Cognitive Services', 'Machine Learning', 'AI Solutions'],
                    url: 'https://docs.microsoft.com/en-us/learn/certifications/azure-ai-engineer/'
                }
            ],
            'free-resources': [
                {
                    id: 'fast-ai-course',
                    title: 'Practical Deep Learning for Coders',
                    provider: 'fast.ai',
                    description: 'Практичний курс глибокого навчання',
                    level: 'intermediate',
                    duration: '7 тижнів',
                    price: 'Безкоштовно',
                    priceCategory: 'free',
                    rating: 4.8,
                    students: 100000,
                    curriculum: [
                        'Image Classification',
                        'Segmentation',
                        'Text Classification',
                        'Tabular Data',
                        'Collaborative Filtering',
                        'Neural Language Models'
                    ],
                    skills: ['Deep Learning', 'PyTorch', 'Computer Vision', 'NLP'],
                    url: 'https://course.fast.ai/'
                },
                {
                    id: 'kaggle-learn',
                    title: 'Kaggle Learn Courses',
                    provider: 'Kaggle',
                    description: 'Безкоштовні мікрокурси з data science та ML',
                    level: 'beginner',
                    duration: '4-6 годин на курс',
                    price: 'Безкоштовно',
                    priceCategory: 'free',
                    rating: 4.6,
                    students: 500000,
                    curriculum: [
                        'Python',
                        'Machine Learning',
                        'Data Visualization',
                        'Pandas',
                        'Deep Learning',
                        'SQL'
                    ],
                    skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
                    url: 'https://www.kaggle.com/learn'
                },
                {
                    id: 'youtube-3blue1brown',
                    title: 'Neural Networks Series',
                    provider: '3Blue1Brown (YouTube)',
                    description: 'Візуальне пояснення нейронних мереж',
                    level: 'beginner',
                    duration: '4 години',
                    price: 'Безкоштовно',
                    priceCategory: 'free',
                    rating: 4.9,
                    students: 2000000,
                    curriculum: [
                        'What is a Neural Network?',
                        'Gradient Descent',
                        'Backpropagation',
                        'Backpropagation Calculus'
                    ],
                    skills: ['Neural Networks', 'Mathematics', 'Deep Learning Concepts'],
                    url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi'
                }
            ]
        };
    }

    setupEventListeners() {
        // Category tabs
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleCategoryChange(e.target.dataset.category);
            });
        });

        // Filters
        document.getElementById('levelFilter')?.addEventListener('change', (e) => {
            this.currentFilters.level = e.target.value;
            this.renderEducationItems();
        });

        document.getElementById('durationFilter')?.addEventListener('change', (e) => {
            this.currentFilters.duration = e.target.value;
            this.renderEducationItems();
        });

        document.getElementById('priceFilter')?.addEventListener('change', (e) => {
            this.currentFilters.price = e.target.value;
            this.renderEducationItems();
        });

        // Search
        const searchInput = document.getElementById('educationSearch');
        searchInput?.addEventListener('input', this.debounce((e) => {
            this.currentFilters.search = e.target.value.toLowerCase();
            this.renderEducationItems();
        }, 300));

        // Load more button
        document.getElementById('loadMoreEducation')?.addEventListener('click', () => {
            this.displayedItems += 6;
            this.renderEducationItems();
        });

        // Education path generator
        document.getElementById('generatePath')?.addEventListener('click', () => {
            this.generateEducationPath();
        });

        // Add certification
        document.getElementById('addCertification')?.addEventListener('click', () => {
            this.showAddCertificationModal();
        });

        // Certification form
        document.getElementById('certificationForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addCertification();
        });
    }

    handleCategoryChange(category) {
        this.currentCategory = category;
        this.displayedItems = 9;
        
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        this.renderEducationItems();
    }

    renderEducationItems() {
        const container = document.getElementById('educationGrid');
        if (!container) return;

        const categoryData = this.educationData[this.currentCategory] || [];
        const filteredData = this.filterEducationData(categoryData);
        const displayData = filteredData.slice(0, this.displayedItems);
        
        container.innerHTML = displayData.map(item => this.createEducationCard(item)).join('');
        
        // Update load more button
        const loadMoreBtn = document.getElementById('loadMoreEducation');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = filteredData.length > this.displayedItems ? 'block' : 'none';
        }
    }

    filterEducationData(data) {
        return data.filter(item => {
            const levelMatch = this.currentFilters.level === 'all' || item.level === this.currentFilters.level;
            const priceMatch = this.currentFilters.price === 'all' || item.priceCategory === this.currentFilters.price;
            const searchMatch = this.currentFilters.search === '' || 
                item.title.toLowerCase().includes(this.currentFilters.search) ||
                item.provider.toLowerCase().includes(this.currentFilters.search) ||
                item.description.toLowerCase().includes(this.currentFilters.search);
            
            let durationMatch = true;
            if (this.currentFilters.duration !== 'all') {
                const duration = item.duration.toLowerCase();
                if (this.currentFilters.duration === 'short') {
                    durationMatch = duration.includes('тиждень') || duration.includes('годин');
                } else if (this.currentFilters.duration === 'medium') {
                    durationMatch = duration.includes('місяц');
                } else if (this.currentFilters.duration === 'long') {
                    durationMatch = duration.includes('рік') || parseInt(duration) > 12;
                }
            }
            
            return levelMatch && priceMatch && searchMatch && durationMatch;
        });
    }

    createEducationCard(item) {
        const isInWishlist = this.wishlist.includes(item.id);
        const stars = this.generateStars(item.rating);
        
        return `
            <div class="education-card" data-id="${item.id}" tabindex="0">
                <div class="card-header">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-provider">${item.provider}</p>
                    <div class="card-badges">
                        <span class="badge level-${item.level}">${this.getLevelLabel(item.level)}</span>
                        <span class="badge price-${item.priceCategory}">${item.priceCategory === 'free' ? 'Безкоштовно' : 'Платно'}</span>
                    </div>
                </div>
                <div class="card-body">
                    <p class="card-description">${item.description}</p>
                    <div class="card-details">
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>${item.duration}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <span>${this.formatNumber(item.students)} студентів</span>
                        </div>
                    </div>
                    <div class="card-rating">
                        <div class="stars">${stars}</div>
                        <span class="rating-text">${item.rating} (${this.formatNumber(item.students)} відгуків)</span>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="card-price">${item.price}</div>
                    <div class="card-actions">
                        <button class="btn-secondary" onclick="educationManager.toggleWishlist('${item.id}')">
                            <i class="fas fa-heart ${isInWishlist ? 'text-red-500' : ''}"></i>
                        </button>
                        <button class="btn-primary" onclick="educationManager.showEducationDetails('${item.id}')">
                            Деталі
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getLevelLabel(level) {
        const labels = {
            beginner: 'Початковий',
            intermediate: 'Середній',
            advanced: 'Просунутий'
        };
        return labels[level] || level;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt star"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star star empty"></i>';
        }
        
        return stars;
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    showEducationDetails(itemId) {
        const item = this.findEducationItem(itemId);
        if (!item) return;

        const modal = document.getElementById('educationModal');
        if (!modal) return;

        // Update modal content
        document.getElementById('educationTitle').textContent = item.title;
        document.getElementById('educationProvider').textContent = item.provider;
        document.getElementById('educationDuration').textContent = item.duration;
        document.getElementById('educationLevel').textContent = this.getLevelLabel(item.level);
        document.getElementById('educationPrice').textContent = item.price;
        document.getElementById('educationDescription').textContent = item.description;
        
        // Update rating
        const ratingContainer = document.getElementById('educationRating');
        ratingContainer.innerHTML = this.generateStars(item.rating);
        
        // Update curriculum
        const curriculumList = document.getElementById('educationCurriculum');
        curriculumList.innerHTML = item.curriculum.map(topic => `<li>${topic}</li>`).join('');
        
        // Update skills
        const skillsContainer = document.getElementById('educationSkills');
        skillsContainer.innerHTML = item.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('');
        
        // Update buttons
        const wishlistBtn = document.getElementById('addToWishlist');
        const isInWishlist = this.wishlist.includes(itemId);
        wishlistBtn.innerHTML = `
            <i class="fas fa-heart ${isInWishlist ? 'text-red-500' : ''}"></i>
            ${isInWishlist ? 'Видалити з списку' : 'Додати до списку бажань'}
        `;
        wishlistBtn.onclick = () => this.toggleWishlist(itemId);
        
        const enrollBtn = document.getElementById('enrollNow');
        enrollBtn.onclick = () => window.open(item.url, '_blank');
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    findEducationItem(itemId) {
        for (const category of Object.values(this.educationData)) {
            const item = category.find(item => item.id === itemId);
            if (item) return item;
        }
        return null;
    }

    toggleWishlist(itemId) {
        const index = this.wishlist.indexOf(itemId);
        if (index > -1) {
            this.wishlist.splice(index, 1);
            this.showNotification('Видалено зі списку бажань', 'info');
        } else {
            this.wishlist.push(itemId);
            this.showNotification('Додано до списку бажань', 'success');
        }
        
        localStorage.setItem('educationWishlist', JSON.stringify(this.wishlist));
        this.renderEducationItems();
        
        // Update modal if open
        const modal = document.getElementById('educationModal');
        if (modal.classList.contains('active')) {
            const wishlistBtn = document.getElementById('addToWishlist');
            const isInWishlist = this.wishlist.includes(itemId);
            wishlistBtn.innerHTML = `
                <i class="fas fa-heart ${isInWishlist ? 'text-red-500' : ''}"></i>
                ${isInWishlist ? 'Видалити з списку' : 'Додати до списку бажань'}
            `;
        }
    }

    generateEducationPath() {
        const currentLevel = document.getElementById('currentLevel').value;
        const targetRole = document.getElementById('targetRole').value;
        const timeframe = document.getElementById('timeframe').value;
        
        const pathContainer = document.getElementById('educationPath');
        if (!pathContainer) return;
        
        const paths = {
            'data-scientist': {
                beginner: [
                    {
                        title: 'Основи програмування',
                        description: 'Вивчіть Python та основи програмування',
                        duration: '4-6 тижнів'
                    },
                    {
                        title: 'Математичні основи',
                        description: 'Статистика, лінійна алгебра, теорія ймовірностей',
                        duration: '6-8 тижнів'
                    },
                    {
                        title: 'Машинне навчання',
                        description: 'Основні алгоритми та методи ML',
                        duration: '8-12 тижнів'
                    },
                    {
                        title: 'Практичні проекти',
                        description: 'Створення портфоліо з реальними проектами',
                        duration: '4-6 тижнів'
                    }
                ],
                intermediate: [
                    {
                        title: 'Поглиблене ML',
                        description: 'Складні алгоритми та методи оптимізації',
                        duration: '6-8 тижнів'
                    },
                    {
                        title: 'Глибоке навчання',
                        description: 'Нейронні мережі та deep learning',
                        duration: '8-10 тижнів'
                    },
                    {
                        title: 'Спеціалізація',
                        description: 'NLP, Computer Vision або інша область',
                        duration: '6-8 тижнів'
                    }
                ]
            },
            'ml-engineer': {
                beginner: [
                    {
                        title: 'Software Engineering',
                        description: 'Програмування, Git, тестування',
                        duration: '6-8 тижнів'
                    },
                    {
                        title: 'ML Fundamentals',
                        description: 'Основи машинного навчання',
                        duration: '8-10 тижнів'
                    },
                    {
                        title: 'MLOps',
                        description: 'Deployment, моніторинг, CI/CD',
                        duration: '6-8 тижнів'
                    },
                    {
                        title: 'Cloud Platforms',
                        description: 'AWS, GCP або Azure для ML',
                        duration: '4-6 тижнів'
                    }
                ]
            }
        };
        
        const rolePath = paths[targetRole]?.[currentLevel] || paths[targetRole]?.beginner || [];
        
        pathContainer.innerHTML = rolePath.map((step, index) => `
            <div class="path-step">
                <div class="step-number">${index + 1}</div>
                <div class="step-content">
                    <h3>${step.title}</h3>
                    <p>${step.description}</p>
                    <span class="step-duration">${step.duration}</span>
                </div>
            </div>
        `).join('');
        
        pathContainer.classList.add('active');
    }

    showAddCertificationModal() {
        const modal = document.getElementById('addCertificationModal');
        if (!modal) return;
        
        // Reset form
        document.getElementById('certificationForm').reset();
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    addCertification() {
        const formData = new FormData(document.getElementById('certificationForm'));
        const certification = {
            id: Date.now().toString(),
            name: document.getElementById('certName').value,
            provider: document.getElementById('certProvider').value,
            status: document.getElementById('certStatus').value,
            date: document.getElementById('certDate').value,
            url: document.getElementById('certUrl').value,
            addedDate: new Date().toISOString()
        };
        
        this.certifications.push(certification);
        localStorage.setItem('certifications', JSON.stringify(this.certifications));
        
        this.closeModals();
        this.updateCertificationStats();
        this.renderCertifications();
        this.showNotification('Сертифікацію додано!', 'success');
    }

    updateCertificationStats() {
        const earned = this.certifications.filter(cert => cert.status === 'completed').length;
        const inProgress = this.certifications.filter(cert => cert.status === 'in-progress').length;
        const planned = this.certifications.filter(cert => cert.status === 'planned').length;
        
        document.getElementById('earnedCerts').textContent = earned;
        document.getElementById('inProgressCerts').textContent = inProgress;
        document.getElementById('plannedCerts').textContent = planned;
    }

    renderCertifications() {
        const container = document.getElementById('certificationsList');
        if (!container) return;
        
        if (this.certifications.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>Ще немає доданих сертифікацій. Додайте свою першу сертифікацію!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.certifications.map(cert => `
            <div class="certification-item">
                <div class="cert-info">
                    <h4 class="cert-name">${cert.name}</h4>
                    <p class="cert-provider">${cert.provider}</p>
                    <p class="cert-date">${cert.date ? new Date(cert.date).toLocaleDateString('uk-UA') : 'Дата не вказана'}</p>
                </div>
                <div class="cert-status ${cert.status}">${this.getStatusLabel(cert.status)}</div>
                <div class="cert-actions">
                    ${cert.url ? `<button onclick="window.open('${cert.url}', '_blank')" title="Відкрити посилання"><i class="fas fa-external-link-alt"></i></button>` : ''}
                    <button onclick="educationManager.editCertification('${cert.id}')" title="Редагувати"><i class="fas fa-edit"></i></button>
                    <button onclick="educationManager.deleteCertification('${cert.id}')" title="Видалити"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }

    getStatusLabel(status) {
        const labels = {
            planned: 'Заплановано',
            'in-progress': 'В процесі',
            completed: 'Завершено'
        };
        return labels[status] || status;
    }

    deleteCertification(certId) {
        if (confirm('Ви впевнені, що хочете видалити цю сертифікацію?')) {
            this.certifications = this.certifications.filter(cert => cert.id !== certId);
            localStorage.setItem('certifications', JSON.stringify(this.certifications));
            
            this.updateCertificationStats();
            this.renderCertifications();
            this.showNotification('Сертифікацію видалено', 'info');
        }
    }

    updateLearningProgress() {
        // Simulate progress data
        const progress = {
            completedCourses: this.certifications.filter(cert => cert.status === 'completed').length + 3,
            studyHours: 120,
            completedProjects: 5
        };
        
        document.getElementById('completedCourses').textContent = progress.completedCourses;
        document.getElementById('studyHours').textContent = progress.studyHours;
        document.getElementById('completedProjects').textContent = progress.completedProjects;
        
        // Update progress bars
        const maxCourses = 20;
        const maxHours = 500;
        const maxProjects = 15;
        
        document.getElementById('completedCoursesBar').style.width = `${(progress.completedCourses / maxCourses) * 100}%`;
        document.getElementById('studyHoursBar').style.width = `${(progress.studyHours / maxHours) * 100}%`;
        document.getElementById('completedProjectsBar').style.width = `${(progress.completedProjects / maxProjects) * 100}%`;
        
        // Update recent activity
        this.updateRecentActivity();
    }

    updateRecentActivity() {
        const container = document.getElementById('recentActivityList');
        if (!container) return;
        
        const activities = [
            {
                title: 'Завершено курс "Machine Learning"',
                time: '2 дні тому',
                icon: 'fas fa-graduation-cap'
            },
            {
                title: 'Додано нову сертифікацію',
                time: '1 тиждень тому',
                icon: 'fas fa-certificate'
            },
            {
                title: 'Завершено проект з Computer Vision',
                time: '2 тижні тому',
                icon: 'fas fa-project-diagram'
            }
        ];
        
        container.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </div>
        `).join('');
    }

    initProgressChart() {
        const canvas = document.getElementById('progressChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        this.progressChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер'],
                datasets: [{
                    label: 'Години навчання',
                    data: [10, 25, 40, 65, 85, 120],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f1f5f9'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    generateRecommendations() {
        const container = document.getElementById('recommendationsList');
        if (!container) return;
        
        const recommendations = [
            {
                title: 'Coursera ML Course',
                reason: 'Базується на ваших інтересах до машинного навчання',
                match: '95% відповідність',
                icon: 'fas fa-robot'
            },
            {
                title: 'AWS ML Certification',
                reason: 'Доповнить ваші навички cloud computing',
                match: '87% відповідність',
                icon: 'fas fa-cloud'
            },
            {
                title: 'Deep Learning Specialization',
                reason: 'Наступний крок після основ ML',
                match: '82% відповідність',
                icon: 'fas fa-brain'
            }
        ];
        
        container.innerHTML = recommendations.map(rec => `
            <div class="recommendation-card">
                <div class="recommendation-header">
                    <div class="recommendation-icon">
                        <i class="${rec.icon}"></i>
                    </div>
                    <div class="recommendation-title">${rec.title}</div>
                </div>
                <div class="recommendation-reason">${rec.reason}</div>
                <div class="recommendation-match">
                    <i class="fas fa-check-circle"></i>
                    ${rec.match}
                </div>
            </div>
        `).join('');
    }

    setupModals() {
        // Close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => this.closeModals());
        });
        
        // Click outside to close
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModals();
                }
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModals();
            }
        });
    }

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
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
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
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

// Global instance
let educationManager;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    educationManager = new EducationManager();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EducationManager;
}