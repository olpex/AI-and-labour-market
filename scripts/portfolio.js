// Portfolio Page JavaScript

class PortfolioManager {
    constructor() {
        this.currentTab = 'personal';
        this.portfolioData = {
            personal: {
                name: '',
                title: '',
                email: '',
                phone: '',
                location: '',
                website: '',
                bio: '',
                linkedin: '',
                github: '',
                twitter: ''
            },
            projects: [],
            skills: {
                technical: [],
                soft: [],
                tools: [],
                languages: []
            },
            experience: {
                work: [],
                education: [],
                certifications: []
            }
        };
        this.templates = {
            projects: {
                'machine-learning': {
                    title: 'Проект машинного навчання',
                    category: 'Machine Learning',
                    description: 'Опис вашого проекту з машинного навчання',
                    technologies: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn'],
                    github: '',
                    demo: ''
                },
                'web-app': {
                    title: 'Веб-додаток з AI',
                    category: 'Web Development',
                    description: 'Веб-додаток, що використовує штучний інтелект',
                    technologies: ['JavaScript', 'React', 'Node.js', 'TensorFlow.js'],
                    github: '',
                    demo: ''
                },
                'data-analysis': {
                    title: 'Аналіз даних',
                    category: 'Data Science',
                    description: 'Проект з аналізу та візуалізації даних',
                    technologies: ['Python', 'Pandas', 'Matplotlib', 'Jupyter'],
                    github: '',
                    demo: ''
                },
                'nlp': {
                    title: 'Обробка природної мови',
                    category: 'NLP',
                    description: 'Проект з обробки та аналізу тексту',
                    technologies: ['Python', 'NLTK', 'spaCy', 'Transformers'],
                    github: '',
                    demo: ''
                },
                'computer-vision': {
                    title: 'Комп\'ютерний зір',
                    category: 'Computer Vision',
                    description: 'Проект з розпізнавання та обробки зображень',
                    technologies: ['Python', 'OpenCV', 'TensorFlow', 'Keras'],
                    github: '',
                    demo: ''
                },
                'mobile-app': {
                    title: 'Мобільний додаток з AI',
                    category: 'Mobile Development',
                    description: 'Мобільний додаток з функціями штучного інтелекту',
                    technologies: ['React Native', 'TensorFlow Lite', 'Firebase'],
                    github: '',
                    demo: ''
                }
            }
        };
        this.portfolioScore = {
            completeness: 0,
            projects: 0,
            skills: 0,
            experience: 0,
            total: 0
        };
        this.viewsData = {
            daily: [12, 19, 8, 15, 22, 18, 25],
            weekly: [85, 92, 78, 105, 120, 98, 110],
            monthly: [450, 520, 480, 610, 580, 650, 720]
        };
        this.init();
    }

    init() {
        this.loadPortfolioData();
        this.setupEventListeners();
        this.updatePreview();
        this.calculateScore();
        this.initializeCharts();
        this.updateStats();
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Experience tabs
        document.querySelectorAll('.exp-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchExperienceTab(e.target.dataset.tab);
            });
        });

        // Form inputs
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', () => {
                this.saveFormData();
                this.updatePreview();
                this.calculateScore();
            });
        });

        // Add buttons
        document.getElementById('addProjectBtn')?.addEventListener('click', () => {
            this.showModal('projectModal');
        });

        document.getElementById('addSkillBtn')?.addEventListener('click', () => {
            this.showModal('skillModal');
        });

        document.getElementById('addWorkBtn')?.addEventListener('click', () => {
            this.showModal('experienceModal', 'work');
        });

        document.getElementById('addEducationBtn')?.addEventListener('click', () => {
            this.showModal('experienceModal', 'education');
        });

        document.getElementById('addCertificationBtn')?.addEventListener('click', () => {
            this.showModal('experienceModal', 'certification');
        });

        // Template buttons
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', () => {
                const templateType = card.dataset.template;
                this.useProjectTemplate(templateType);
            });
        });

        // Preview actions
        document.getElementById('exportPdfBtn')?.addEventListener('click', () => {
            this.exportToPDF();
        });

        document.getElementById('sharePortfolioBtn')?.addEventListener('click', () => {
            this.sharePortfolio();
        });

        document.getElementById('downloadHtmlBtn')?.addEventListener('click', () => {
            this.downloadHTML();
        });

        // Modal close
        document.querySelectorAll('.modal-close, .modal').forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target === element) {
                    this.hideModal();
                }
            });
        });

        // Form submissions
        document.getElementById('projectForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addProject();
        });

        document.getElementById('skillForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addSkill();
        });

        document.getElementById('experienceForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addExperience();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 's':
                        e.preventDefault();
                        this.savePortfolio();
                        break;
                    case 'p':
                        e.preventDefault();
                        this.exportToPDF();
                        break;
                }
            }
            if (e.key === 'Escape') {
                this.hideModal();
            }
        });
    }

    switchTab(tabName) {
        // Update active tab button
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update active tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}Tab`).classList.add('active');

        this.currentTab = tabName;
    }

    switchExperienceTab(tabName) {
        // Update active tab button
        document.querySelectorAll('.exp-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update active tab content
        document.querySelectorAll('.exp-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}Experience`).classList.add('active');
    }

    saveFormData() {
        // Save personal information
        const personalForm = document.getElementById('personalForm');
        if (personalForm) {
            const formData = new FormData(personalForm);
            for (let [key, value] of formData.entries()) {
                this.portfolioData.personal[key] = value;
            }
        }

        this.savePortfolioData();
    }

    addProject() {
        const form = document.getElementById('projectForm');
        const formData = new FormData(form);
        
        const project = {
            id: Date.now(),
            title: formData.get('title'),
            category: formData.get('category'),
            description: formData.get('description'),
            technologies: formData.get('technologies').split(',').map(tech => tech.trim()),
            github: formData.get('github'),
            demo: formData.get('demo'),
            featured: formData.get('featured') === 'on'
        };

        this.portfolioData.projects.push(project);
        this.renderProjects();
        this.updatePreview();
        this.calculateScore();
        this.savePortfolioData();
        this.hideModal();
        form.reset();
        this.showNotification('Проект додано успішно!');
    }

    addSkill() {
        const form = document.getElementById('skillForm');
        const formData = new FormData(form);
        
        const skill = {
            id: Date.now(),
            name: formData.get('skillName'),
            level: formData.get('skillLevel'),
            category: formData.get('skillCategory')
        };

        this.portfolioData.skills[skill.category].push(skill);
        this.renderSkills();
        this.updatePreview();
        this.calculateScore();
        this.savePortfolioData();
        this.hideModal();
        form.reset();
        this.showNotification('Навичку додано успішно!');
    }

    addExperience() {
        const form = document.getElementById('experienceForm');
        const formData = new FormData(form);
        const type = form.dataset.type;
        
        const experience = {
            id: Date.now(),
            title: formData.get('title'),
            organization: formData.get('organization'),
            location: formData.get('location'),
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate'),
            current: formData.get('current') === 'on',
            description: formData.get('description')
        };

        this.portfolioData.experience[type].push(experience);
        this.renderExperience(type);
        this.updatePreview();
        this.calculateScore();
        this.savePortfolioData();
        this.hideModal();
        form.reset();
        this.showNotification('Досвід додано успішно!');
    }

    useProjectTemplate(templateType) {
        const template = this.templates.projects[templateType];
        if (template) {
            // Fill the project form with template data
            document.getElementById('projectTitle').value = template.title;
            document.getElementById('projectCategory').value = template.category;
            document.getElementById('projectDescription').value = template.description;
            document.getElementById('projectTechnologies').value = template.technologies.join(', ');
            document.getElementById('projectGithub').value = template.github;
            document.getElementById('projectDemo').value = template.demo;
            
            this.showModal('projectModal');
            this.showNotification('Шаблон проекту завантажено!');
        }
    }

    renderProjects() {
        const container = document.getElementById('projectsList');
        if (!container) return;

        if (this.portfolioData.projects.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-folder-open"></i>
                    <h3>Поки що немає проектів</h3>
                    <p>Додайте свій перший проект, щоб почати створення портфоліо</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.portfolioData.projects.map(project => `
            <div class="project-item" data-id="${project.id}">
                <div class="project-header">
                    <div>
                        <h4 class="project-title">${project.title}</h4>
                        <span class="project-category">${project.category}</span>
                    </div>
                    <div class="project-actions">
                        <button onclick="portfolioManager.editProject(${project.id})" title="Редагувати">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="portfolioManager.deleteProject(${project.id})" title="Видалити">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.github ? `<a href="${project.github}" class="project-link" target="_blank"><i class="fab fa-github"></i> GitHub</a>` : ''}
                    ${project.demo ? `<a href="${project.demo}" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                </div>
            </div>
        `).join('');
    }

    renderSkills() {
        Object.keys(this.portfolioData.skills).forEach(category => {
            const container = document.getElementById(`${category}Skills`);
            if (!container) return;

            const skills = this.portfolioData.skills[category];
            
            if (skills.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-plus-circle"></i>
                        <p>Додайте навички в цій категорії</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = skills.map(skill => `
                <div class="skill-item" data-id="${skill.id}">
                    <div class="skill-info">
                        <div class="skill-name">${skill.name}</div>
                        <div class="skill-level ${skill.level}">${this.getSkillLevelText(skill.level)}</div>
                    </div>
                    <div class="skill-actions">
                        <button onclick="portfolioManager.editSkill(${skill.id}, '${category}')" title="Редагувати">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="portfolioManager.deleteSkill(${skill.id}, '${category}')" title="Видалити">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        });
    }

    renderExperience(type) {
        const container = document.getElementById(`${type}List`);
        if (!container) return;

        const experiences = this.portfolioData.experience[type];
        
        if (experiences.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-briefcase"></i>
                    <h3>Поки що немає записів</h3>
                    <p>Додайте свій досвід у цій категорії</p>
                </div>
            `;
            return;
        }

        container.innerHTML = experiences.map(exp => `
            <div class="experience-item" data-id="${exp.id}">
                <div class="exp-item-header">
                    <div>
                        <h4 class="exp-title">${exp.title}</h4>
                        <div class="exp-organization">${exp.organization}</div>
                        <div class="exp-duration">${this.formatDateRange(exp.startDate, exp.endDate, exp.current)}</div>
                        ${exp.location ? `<div class="exp-location">${exp.location}</div>` : ''}
                    </div>
                    <div class="exp-actions">
                        <button onclick="portfolioManager.editExperience(${exp.id}, '${type}')" title="Редагувати">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="portfolioManager.deleteExperience(${exp.id}, '${type}')" title="Видалити">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                ${exp.description ? `<p class="exp-description">${exp.description}</p>` : ''}
            </div>
        `).join('');
    }

    updatePreview() {
        const preview = document.getElementById('portfolioPreview');
        if (!preview) return;

        const data = this.portfolioData;
        
        preview.innerHTML = `
            <div class="preview-header-section">
                <h1 class="preview-name">${data.personal.name || 'Ваше ім\'я'}</h1>
                <h2 class="preview-title">${data.personal.title || 'Ваша професія'}</h2>
                <p class="preview-bio">${data.personal.bio || 'Розкажіть про себе...'}</p>
                <div class="preview-contact">
                    ${data.personal.email ? `<div class="preview-contact-item"><i class="fas fa-envelope"></i> ${data.personal.email}</div>` : ''}
                    ${data.personal.phone ? `<div class="preview-contact-item"><i class="fas fa-phone"></i> ${data.personal.phone}</div>` : ''}
                    ${data.personal.location ? `<div class="preview-contact-item"><i class="fas fa-map-marker-alt"></i> ${data.personal.location}</div>` : ''}
                    ${data.personal.website ? `<div class="preview-contact-item"><i class="fas fa-globe"></i> ${data.personal.website}</div>` : ''}
                </div>
                <div class="preview-social">
                    ${data.personal.linkedin ? `<a href="${data.personal.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>` : ''}
                    ${data.personal.github ? `<a href="${data.personal.github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                    ${data.personal.twitter ? `<a href="${data.personal.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>` : ''}
                </div>
            </div>
            
            ${data.projects.length > 0 ? `
                <div class="preview-section">
                    <h3>Проекти</h3>
                    <div class="preview-projects-grid">
                        ${data.projects.slice(0, 6).map(project => `
                            <div class="preview-project">
                                <h4>${project.title}</h4>
                                <p>${project.description}</p>
                                <div class="preview-skill-list">
                                    ${project.technologies.slice(0, 4).map(tech => `<span class="preview-skill-tag">${tech}</span>`).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${this.hasSkills() ? `
                <div class="preview-section">
                    <h3>Навички</h3>
                    <div class="preview-skills-grid">
                        ${Object.keys(data.skills).filter(cat => data.skills[cat].length > 0).map(category => `
                            <div class="preview-skill-category">
                                <h4>${this.getCategoryTitle(category)}</h4>
                                <div class="preview-skill-list">
                                    ${data.skills[category].slice(0, 8).map(skill => `<span class="preview-skill-tag">${skill.name}</span>`).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${data.experience.work.length > 0 ? `
                <div class="preview-section">
                    <h3>Досвід роботи</h3>
                    ${data.experience.work.slice(0, 3).map(exp => `
                        <div class="preview-project">
                            <h4>${exp.title} - ${exp.organization}</h4>
                            <p>${this.formatDateRange(exp.startDate, exp.endDate, exp.current)}</p>
                            ${exp.description ? `<p>${exp.description}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        `;
    }

    calculateScore() {
        const data = this.portfolioData;
        let scores = {
            completeness: 0,
            projects: 0,
            skills: 0,
            experience: 0
        };

        // Completeness score (personal info)
        const personalFields = ['name', 'title', 'email', 'bio'];
        const filledFields = personalFields.filter(field => data.personal[field] && data.personal[field].trim());
        scores.completeness = Math.round((filledFields.length / personalFields.length) * 100);

        // Projects score
        scores.projects = Math.min(data.projects.length * 20, 100);

        // Skills score
        const totalSkills = Object.values(data.skills).reduce((sum, skills) => sum + skills.length, 0);
        scores.skills = Math.min(totalSkills * 10, 100);

        // Experience score
        const totalExperience = Object.values(data.experience).reduce((sum, exp) => sum + exp.length, 0);
        scores.experience = Math.min(totalExperience * 25, 100);

        // Total score
        scores.total = Math.round((scores.completeness + scores.projects + scores.skills + scores.experience) / 4);

        this.portfolioScore = scores;
        this.updateScoreDisplay();
    }

    updateScoreDisplay() {
        // Update score circle
        const scoreNumber = document.querySelector('.score-number');
        if (scoreNumber) {
            scoreNumber.textContent = this.portfolioScore.total;
        }

        // Update breakdown bars
        Object.keys(this.portfolioScore).forEach(key => {
            if (key !== 'total') {
                const bar = document.querySelector(`[data-score="${key}"] .breakdown-fill`);
                const value = document.querySelector(`[data-score="${key}"] .breakdown-value`);
                if (bar && value) {
                    bar.style.width = `${this.portfolioScore[key]}%`;
                    value.textContent = `${this.portfolioScore[key]}%`;
                }
            }
        });

        // Update recommendations
        this.updateRecommendations();
    }

    updateRecommendations() {
        const container = document.querySelector('.recommendations-list');
        if (!container) return;

        const recommendations = [];
        const scores = this.portfolioScore;

        if (scores.completeness < 80) {
            recommendations.push({
                title: 'Заповніть особисту інформацію',
                description: 'Додайте більше деталей про себе, включаючи біографію та контактну інформацію.'
            });
        }

        if (scores.projects < 60) {
            recommendations.push({
                title: 'Додайте більше проектів',
                description: 'Створіть принаймні 3-5 проектів, щоб продемонструвати свої навички.'
            });
        }

        if (scores.skills < 70) {
            recommendations.push({
                title: 'Розширте список навичок',
                description: 'Додайте технічні та м\'які навички, які відповідають вашій спеціалізації.'
            });
        }

        if (scores.experience < 50) {
            recommendations.push({
                title: 'Додайте досвід',
                description: 'Включіть освіту, роботу або сертифікації для підвищення довіри.'
            });
        }

        if (recommendations.length === 0) {
            recommendations.push({
                title: 'Відмінна робота!',
                description: 'Ваше портфоліо виглядає чудово. Продовжуйте оновлювати його новими проектами.'
            });
        }

        container.innerHTML = recommendations.map(rec => `
            <div class="recommendation-item">
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
            </div>
        `).join('');
    }

    initializeCharts() {
        // Views chart
        const ctx = document.getElementById('viewsChart');
        if (ctx && typeof Chart !== 'undefined') {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'],
                    datasets: [{
                        label: 'Перегляди',
                        data: this.viewsData.daily,
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
    }

    updateStats() {
        // Update view statistics
        const totalViews = this.viewsData.daily.reduce((sum, views) => sum + views, 0);
        const avgViews = Math.round(totalViews / this.viewsData.daily.length);
        const maxViews = Math.max(...this.viewsData.daily);

        document.querySelector('[data-stat="total"] .stat-number')?.textContent = totalViews;
        document.querySelector('[data-stat="average"] .stat-number')?.textContent = avgViews;
        document.querySelector('[data-stat="peak"] .stat-number')?.textContent = maxViews;
    }

    // Utility methods
    getSkillLevelText(level) {
        const levels = {
            beginner: 'Початківець',
            intermediate: 'Середній',
            advanced: 'Просунутий',
            expert: 'Експерт'
        };
        return levels[level] || level;
    }

    getCategoryTitle(category) {
        const titles = {
            technical: 'Технічні навички',
            soft: 'М\'які навички',
            tools: 'Інструменти',
            languages: 'Мови програмування'
        };
        return titles[category] || category;
    }

    formatDateRange(startDate, endDate, current) {
        const start = new Date(startDate).toLocaleDateString('uk-UA', { month: 'short', year: 'numeric' });
        const end = current ? 'теперішній час' : new Date(endDate).toLocaleDateString('uk-UA', { month: 'short', year: 'numeric' });
        return `${start} - ${end}`;
    }

    hasSkills() {
        return Object.values(this.portfolioData.skills).some(skills => skills.length > 0);
    }

    // Modal methods
    showModal(modalId, type = null) {
        const modal = document.getElementById(modalId);
        if (modal) {
            if (type && modalId === 'experienceModal') {
                const form = modal.querySelector('form');
                form.dataset.type = type;
                
                const title = modal.querySelector('.modal-header h3');
                const titles = {
                    work: 'Додати досвід роботи',
                    education: 'Додати освіту',
                    certification: 'Додати сертифікацію'
                };
                title.textContent = titles[type] || 'Додати досвід';
            }
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    hideModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }

    // CRUD operations
    deleteProject(id) {
        if (confirm('Ви впевнені, що хочете видалити цей проект?')) {
            this.portfolioData.projects = this.portfolioData.projects.filter(p => p.id !== id);
            this.renderProjects();
            this.updatePreview();
            this.calculateScore();
            this.savePortfolioData();
            this.showNotification('Проект видалено');
        }
    }

    deleteSkill(id, category) {
        if (confirm('Ви впевнені, що хочете видалити цю навичку?')) {
            this.portfolioData.skills[category] = this.portfolioData.skills[category].filter(s => s.id !== id);
            this.renderSkills();
            this.updatePreview();
            this.calculateScore();
            this.savePortfolioData();
            this.showNotification('Навичку видалено');
        }
    }

    deleteExperience(id, type) {
        if (confirm('Ви впевнені, що хочете видалити цей запис?')) {
            this.portfolioData.experience[type] = this.portfolioData.experience[type].filter(e => e.id !== id);
            this.renderExperience(type);
            this.updatePreview();
            this.calculateScore();
            this.savePortfolioData();
            this.showNotification('Запис видалено');
        }
    }

    // Export methods
    exportToPDF() {
        if (typeof html2pdf !== 'undefined') {
            const element = document.getElementById('portfolioPreview');
            const opt = {
                margin: 1,
                filename: `${this.portfolioData.personal.name || 'portfolio'}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            
            html2pdf().set(opt).from(element).save();
            this.showNotification('PDF експортується...');
        } else {
            this.showNotification('Функція експорту в PDF недоступна', 'error');
        }
    }

    downloadHTML() {
        const html = this.generatePortfolioHTML();
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.portfolioData.personal.name || 'portfolio'}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.showNotification('HTML файл завантажується...');
    }

    sharePortfolio() {
        if (navigator.share) {
            navigator.share({
                title: `Портфоліо - ${this.portfolioData.personal.name}`,
                text: 'Подивіться на моє портфоліо!',
                url: window.location.href
            });
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.showNotification('Посилання скопійовано в буфер обміну!');
            });
        }
    }

    generatePortfolioHTML() {
        const preview = document.getElementById('portfolioPreview').innerHTML;
        return `
            <!DOCTYPE html>
            <html lang="uk">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Портфоліо - ${this.portfolioData.personal.name}</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 2rem; }
                    .preview-name { font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem; }
                    .preview-title { font-size: 1.5rem; color: #3b82f6; margin-bottom: 1rem; }
                    .preview-bio { color: #666; margin-bottom: 2rem; }
                    .preview-contact { display: flex; gap: 2rem; margin-bottom: 1rem; flex-wrap: wrap; }
                    .preview-social { display: flex; gap: 1rem; margin-bottom: 3rem; }
                    .preview-section { margin-bottom: 3rem; }
                    .preview-section h3 { font-size: 1.5rem; border-bottom: 2px solid #3b82f6; padding-bottom: 0.5rem; margin-bottom: 1.5rem; }
                    .preview-projects-grid { display: grid; gap: 1.5rem; }
                    .preview-project { background: #f8f9fa; padding: 1.5rem; border-radius: 8px; }
                    .preview-skill-tag { background: #3b82f6; color: white; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.875rem; margin-right: 0.5rem; }
                </style>
            </head>
            <body>
                ${preview}
            </body>
            </html>
        `;
    }

    // Data persistence
    savePortfolioData() {
        localStorage.setItem('portfolioData', JSON.stringify(this.portfolioData));
    }

    loadPortfolioData() {
        const saved = localStorage.getItem('portfolioData');
        if (saved) {
            this.portfolioData = { ...this.portfolioData, ...JSON.parse(saved) };
            this.populateForm();
            this.renderProjects();
            this.renderSkills();
            Object.keys(this.portfolioData.experience).forEach(type => {
                this.renderExperience(type);
            });
        }
    }

    populateForm() {
        // Populate personal information form
        Object.keys(this.portfolioData.personal).forEach(key => {
            const input = document.getElementById(key);
            if (input) {
                input.value = this.portfolioData.personal[key];
            }
        });
    }

    savePortfolio() {
        this.savePortfolioData();
        this.showNotification('Портфоліо збережено!');
    }

    // Notification system
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add styles if not already added
        if (!document.getElementById('notificationStyles')) {
            const styles = document.createElement('style');
            styles.id = 'notificationStyles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    color: white;
                    font-weight: 500;
                    z-index: 10000;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                }
                .notification.success { background: #10b981; }
                .notification.error { background: #ef4444; }
                .notification.show { transform: translateX(0); }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
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

// Initialize portfolio manager when DOM is loaded
let portfolioManager;
document.addEventListener('DOMContentLoaded', () => {
    portfolioManager = new PortfolioManager();
});

// Export for global access
window.portfolioManager = portfolioManager;