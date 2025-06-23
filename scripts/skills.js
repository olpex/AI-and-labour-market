// Skills Page JavaScript

class SkillsManager {
    constructor() {
        this.skills = [];
        this.currentCategory = 'technical';
        this.userSkills = JSON.parse(localStorage.getItem('userSkills') || '{}');
        this.assessmentData = {
            currentQuestion: 0,
            answers: [],
            questions: []
        };
        this.learningPlans = {};
        
        this.init();
    }

    init() {
        this.loadSkills();
        this.loadAssessmentQuestions();
        this.loadLearningPlans();
        this.setupEventListeners();
        this.renderSkills();
        this.updateProgress();
        this.setupModals();
    }

    loadSkills() {
        this.skills = {
            technical: [
                {
                    id: 'python',
                    name: 'Python Programming',
                    description: 'Мова програмування для data science та machine learning',
                    difficulty: 'Початковий',
                    icon: 'fab fa-python',
                    resources: [
                        'Python.org Tutorial',
                        'Codecademy Python Course',
                        'Automate the Boring Stuff with Python'
                    ],
                    projects: [
                        'Калькулятор з GUI',
                        'Веб-скрапер для новин',
                        'Простий чат-бот'
                    ]
                },
                {
                    id: 'machine-learning',
                    name: 'Machine Learning',
                    description: 'Алгоритми та методи машинного навчання',
                    difficulty: 'Середній',
                    icon: 'fas fa-robot',
                    resources: [
                        'Andrew Ng Coursera Course',
                        'Scikit-learn Documentation',
                        'Hands-On Machine Learning Book'
                    ],
                    projects: [
                        'Прогнозування цін на нерухомість',
                        'Класифікація зображень',
                        'Рекомендаційна система'
                    ]
                },
                {
                    id: 'deep-learning',
                    name: 'Deep Learning',
                    description: 'Нейронні мережі та глибоке навчання',
                    difficulty: 'Просунутий',
                    icon: 'fas fa-brain',
                    resources: [
                        'Deep Learning Specialization',
                        'TensorFlow Documentation',
                        'PyTorch Tutorials'
                    ],
                    projects: [
                        'CNN для розпізнавання зображень',
                        'RNN для обробки тексту',
                        'GAN для генерації зображень'
                    ]
                },
                {
                    id: 'sql',
                    name: 'SQL & Databases',
                    description: 'Робота з базами даних та SQL запитами',
                    difficulty: 'Початковий',
                    icon: 'fas fa-database',
                    resources: [
                        'W3Schools SQL Tutorial',
                        'SQLBolt Interactive Lessons',
                        'PostgreSQL Documentation'
                    ],
                    projects: [
                        'Дизайн бази даних для e-commerce',
                        'Аналіз продажів з SQL',
                        'ETL pipeline'
                    ]
                },
                {
                    id: 'data-visualization',
                    name: 'Data Visualization',
                    description: 'Створення візуалізацій та дашбордів',
                    difficulty: 'Середній',
                    icon: 'fas fa-chart-bar',
                    resources: [
                        'Matplotlib Documentation',
                        'Seaborn Tutorial',
                        'Tableau Public Training'
                    ],
                    projects: [
                        'Інтерактивний дашборд',
                        'Аналіз трендів у даних',
                        'Геопросторова візуалізація'
                    ]
                }
            ],
            soft: [
                {
                    id: 'communication',
                    name: 'Communication Skills',
                    description: 'Ефективне спілкування з командою та стейкхолдерами',
                    difficulty: 'Середній',
                    icon: 'fas fa-comments',
                    resources: [
                        'Toastmasters International',
                        'Coursera Communication Courses',
                        'TED Talks on Communication'
                    ],
                    projects: [
                        'Презентація результатів проекту',
                        'Написання технічної документації',
                        'Проведення воркшопу'
                    ]
                },
                {
                    id: 'problem-solving',
                    name: 'Problem Solving',
                    description: 'Аналітичне мислення та вирішення складних задач',
                    difficulty: 'Середній',
                    icon: 'fas fa-puzzle-piece',
                    resources: [
                        'LeetCode Practice',
                        'HackerRank Challenges',
                        'Design Thinking Courses'
                    ],
                    projects: [
                        'Оптимізація бізнес-процесу',
                        'Розробка алгоритму',
                        'A/B тестування'
                    ]
                },
                {
                    id: 'project-management',
                    name: 'Project Management',
                    description: 'Управління проектами та командою',
                    difficulty: 'Просунутий',
                    icon: 'fas fa-tasks',
                    resources: [
                        'PMI Certification',
                        'Agile/Scrum Training',
                        'Jira/Confluence Tutorials'
                    ],
                    projects: [
                        'Керування ML проектом',
                        'Впровадження Agile методології',
                        'Координація міжфункціональної команди'
                    ]
                },
                {
                    id: 'critical-thinking',
                    name: 'Critical Thinking',
                    description: 'Критичний аналіз та оцінка інформації',
                    difficulty: 'Середній',
                    icon: 'fas fa-search',
                    resources: [
                        'Critical Thinking Courses',
                        'Philosophy Logic Books',
                        'Scientific Method Training'
                    ],
                    projects: [
                        'Аналіз bias у даних',
                        'Валідація ML моделі',
                        'Етичний аудит AI системи'
                    ]
                }
            ],
            domain: [
                {
                    id: 'statistics',
                    name: 'Statistics & Probability',
                    description: 'Статистичні методи та теорія ймовірностей',
                    difficulty: 'Середній',
                    icon: 'fas fa-calculator',
                    resources: [
                        'Khan Academy Statistics',
                        'Think Stats Book',
                        'R for Statistical Computing'
                    ],
                    projects: [
                        'Статистичний аналіз A/B тесту',
                        'Байєсівський аналіз',
                        'Часові ряди'
                    ]
                },
                {
                    id: 'linear-algebra',
                    name: 'Linear Algebra',
                    description: 'Лінійна алгебра для машинного навчання',
                    difficulty: 'Просунутий',
                    icon: 'fas fa-square-root-alt',
                    resources: [
                        '3Blue1Brown Linear Algebra',
                        'MIT OpenCourseWare',
                        'NumPy Linear Algebra'
                    ],
                    projects: [
                        'PCA для зменшення розмірності',
                        'SVD для рекомендацій',
                        'Eigenfaces для розпізнавання'
                    ]
                },
                {
                    id: 'business-acumen',
                    name: 'Business Understanding',
                    description: 'Розуміння бізнес-процесів та метрик',
                    difficulty: 'Середній',
                    icon: 'fas fa-chart-line',
                    resources: [
                        'Business Analytics Courses',
                        'KPI and Metrics Training',
                        'Industry Case Studies'
                    ],
                    projects: [
                        'ROI аналіз ML проекту',
                        'Бізнес-кейс для AI впровадження',
                        'Метрики продуктивності моделі'
                    ]
                },
                {
                    id: 'ethics',
                    name: 'AI Ethics',
                    description: 'Етичні аспекти штучного інтелекту',
                    difficulty: 'Середній',
                    icon: 'fas fa-balance-scale',
                    resources: [
                        'AI Ethics Courses',
                        'Fairness in ML Research',
                        'IEEE Ethics Standards'
                    ],
                    projects: [
                        'Аудит bias у моделі',
                        'Розробка етичних принципів',
                        'Explainable AI система'
                    ]
                }
            ],
            tools: [
                {
                    id: 'jupyter',
                    name: 'Jupyter Notebooks',
                    description: 'Інтерактивне середовище для data science',
                    difficulty: 'Початковий',
                    icon: 'fas fa-book',
                    resources: [
                        'Jupyter Documentation',
                        'JupyterLab Tutorial',
                        'Best Practices Guide'
                    ],
                    projects: [
                        'EDA notebook',
                        'ML експеримент',
                        'Інтерактивна візуалізація'
                    ]
                },
                {
                    id: 'git',
                    name: 'Git & Version Control',
                    description: 'Контроль версій та співпраця в команді',
                    difficulty: 'Початковий',
                    icon: 'fab fa-git-alt',
                    resources: [
                        'Git Tutorial',
                        'GitHub Learning Lab',
                        'Atlassian Git Tutorials'
                    ],
                    projects: [
                        'Створення репозиторію проекту',
                        'Collaborative ML project',
                        'CI/CD для ML моделі'
                    ]
                },
                {
                    id: 'docker',
                    name: 'Docker & Containerization',
                    description: 'Контейнеризація ML додатків',
                    difficulty: 'Просунутий',
                    icon: 'fab fa-docker',
                    resources: [
                        'Docker Documentation',
                        'Docker for Data Science',
                        'Kubernetes Basics'
                    ],
                    projects: [
                        'Контейнеризація ML API',
                        'Multi-container ML pipeline',
                        'Deployment на cloud'
                    ]
                },
                {
                    id: 'cloud-platforms',
                    name: 'Cloud Platforms',
                    description: 'AWS, GCP, Azure для ML проектів',
                    difficulty: 'Просунутий',
                    icon: 'fas fa-cloud',
                    resources: [
                        'AWS ML Training',
                        'Google Cloud AI Platform',
                        'Azure ML Documentation'
                    ],
                    projects: [
                        'ML model на AWS SageMaker',
                        'Data pipeline на GCP',
                        'AutoML на Azure'
                    ]
                }
            ]
        };
    }

    loadAssessmentQuestions() {
        this.assessmentData.questions = [
            {
                question: 'Який ваш досвід програмування на Python?',
                options: [
                    'Ніколи не програмував',
                    'Базові знання синтаксису',
                    'Можу писати прості скрипти',
                    'Досвідчений у розробці',
                    'Експерт з глибокими знаннями'
                ],
                skill: 'python'
            },
            {
                question: 'Наскільки добре ви знаєте статистику?',
                options: [
                    'Зовсім не знаю',
                    'Базові поняття',
                    'Розумію основні методи',
                    'Можу проводити аналіз',
                    'Експерт у статистиці'
                ],
                skill: 'statistics'
            },
            {
                question: 'Ваш досвід з машинним навчанням?',
                options: [
                    'Ніколи не працював',
                    'Знаю теорію',
                    'Робив прості проекти',
                    'Досвідчений практик',
                    'ML експерт'
                ],
                skill: 'machine-learning'
            },
            {
                question: 'Як ви оцінюєте свої комунікативні навички?',
                options: [
                    'Дуже слабкі',
                    'Потребують покращення',
                    'Середні',
                    'Хороші',
                    'Відмінні'
                ],
                skill: 'communication'
            },
            {
                question: 'Досвід роботи з SQL та базами даних?',
                options: [
                    'Ніколи не працював',
                    'Базові SELECT запити',
                    'Можу писати складні запити',
                    'Проектую бази даних',
                    'DBA рівень'
                ],
                skill: 'sql'
            }
        ];
    }

    loadLearningPlans() {
        this.learningPlans = {
            'data-scientist': {
                title: 'Data Scientist',
                steps: [
                    {
                        title: 'Основи програмування',
                        description: 'Вивчіть Python та основи програмування',
                        skills: ['Python', 'Git', 'Jupyter']
                    },
                    {
                        title: 'Математичні основи',
                        description: 'Статистика, лінійна алгебра, теорія ймовірностей',
                        skills: ['Statistics', 'Linear Algebra', 'Probability']
                    },
                    {
                        title: 'Робота з даними',
                        description: 'SQL, очищення даних, візуалізація',
                        skills: ['SQL', 'Pandas', 'Data Visualization']
                    },
                    {
                        title: 'Machine Learning',
                        description: 'Алгоритми ML, scikit-learn, оцінка моделей',
                        skills: ['Machine Learning', 'Scikit-learn', 'Model Evaluation']
                    },
                    {
                        title: 'Спеціалізація',
                        description: 'Deep Learning, NLP або Computer Vision',
                        skills: ['Deep Learning', 'TensorFlow', 'Domain Expertise']
                    }
                ]
            },
            'ml-engineer': {
                title: 'ML Engineer',
                steps: [
                    {
                        title: 'Software Engineering',
                        description: 'Програмування, Git, тестування',
                        skills: ['Python', 'Git', 'Testing']
                    },
                    {
                        title: 'ML Fundamentals',
                        description: 'Основи машинного навчання',
                        skills: ['Machine Learning', 'Statistics']
                    },
                    {
                        title: 'MLOps',
                        description: 'Deployment, моніторинг, CI/CD',
                        skills: ['Docker', 'Cloud Platforms', 'MLOps']
                    },
                    {
                        title: 'Production Systems',
                        description: 'Масштабування, оптимізація, надійність',
                        skills: ['System Design', 'Performance Optimization']
                    }
                ]
            }
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

        // Assessment button
        const assessmentBtn = document.getElementById('startAssessment');
        assessmentBtn?.addEventListener('click', () => {
            this.startAssessment();
        });

        // Career goal selector
        const careerGoal = document.getElementById('careerGoal');
        careerGoal?.addEventListener('change', (e) => {
            this.generateLearningRoadmap(e.target.value);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModals();
            }
        });
    }

    handleCategoryChange(category) {
        this.currentCategory = category;
        
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        this.renderSkills();
    }

    renderSkills() {
        const container = document.getElementById('skillsGrid');
        if (!container) return;

        const categorySkills = this.skills[this.currentCategory] || [];
        
        container.innerHTML = categorySkills.map(skill => {
            const userLevel = this.userSkills[skill.id] || 0;
            const progress = (userLevel / 4) * 100;
            
            return `
                <div class="skill-card" data-skill-id="${skill.id}" tabindex="0">
                    <div class="skill-header">
                        <div class="skill-icon">
                            <i class="${skill.icon}"></i>
                        </div>
                        <div class="skill-info">
                            <h3>${skill.name}</h3>
                            <div class="skill-difficulty">${skill.difficulty}</div>
                        </div>
                    </div>
                    <p class="skill-description">${skill.description}</p>
                    <div class="skill-progress">
                        <div class="skill-progress-label">
                            <span>Прогрес</span>
                            <span>${this.getLevelName(userLevel)}</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                    </div>
                    <div class="skill-actions">
                        <button class="skill-btn" onclick="skillsManager.showSkillDetails('${skill.id}')">Деталі</button>
                        <button class="skill-btn primary" onclick="skillsManager.startLearning('${skill.id}')">Вивчати</button>
                    </div>
                </div>
            `;
        }).join('');

        // Add click listeners
        container.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const skillId = card.dataset.skillId;
                    this.showSkillDetails(skillId);
                }
            });
        });
    }

    getLevelName(level) {
        const levels = ['Новачок', 'Початківець', 'Середній', 'Просунутий', 'Експерт'];
        return levels[level] || 'Новачок';
    }

    showSkillDetails(skillId) {
        const skill = this.findSkillById(skillId);
        if (!skill) return;

        const modal = document.getElementById('skillModal');
        if (!modal) return;

        // Update modal content
        document.getElementById('skillTitle').textContent = skill.name;
        document.getElementById('skillDescription').textContent = skill.description;
        
        const resourcesList = document.getElementById('skillResourcesList');
        resourcesList.innerHTML = skill.resources.map(resource => `<li>${resource}</li>`).join('');
        
        const projectsList = document.getElementById('skillProjectsList');
        projectsList.innerHTML = skill.projects.map(project => `<li>${project}</li>`).join('');

        // Set current level
        const currentLevel = this.userSkills[skillId] || 0;
        document.querySelectorAll('.level-btn').forEach((btn, index) => {
            btn.classList.toggle('selected', index === currentLevel);
            btn.onclick = () => this.selectLevel(index);
        });

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    findSkillById(skillId) {
        for (const category of Object.values(this.skills)) {
            const skill = category.find(s => s.id === skillId);
            if (skill) return skill;
        }
        return null;
    }

    selectLevel(level) {
        document.querySelectorAll('.level-btn').forEach((btn, index) => {
            btn.classList.toggle('selected', index === level);
        });
        this.selectedLevel = level;
    }

    startLearning(skillId) {
        // Redirect to resources or practice page
        window.location.href = `resources.html?skill=${skillId}`;
    }

    startAssessment() {
        const modal = document.getElementById('assessmentModal');
        if (!modal) return;

        this.assessmentData.currentQuestion = 0;
        this.assessmentData.answers = [];
        
        this.renderAssessmentQuestion();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    renderAssessmentQuestion() {
        const currentQ = this.assessmentData.currentQuestion;
        const question = this.assessmentData.questions[currentQ];
        const totalQuestions = this.assessmentData.questions.length;
        
        // Update progress
        const progress = (currentQ / totalQuestions) * 100;
        document.getElementById('assessmentProgress').style.width = `${progress}%`;
        document.getElementById('currentQuestion').textContent = currentQ + 1;
        document.getElementById('totalQuestions').textContent = totalQuestions;
        
        // Update question content
        const container = document.getElementById('questionContainer');
        container.innerHTML = `
            <div class="question-title">${question.question}</div>
            <div class="question-options">
                ${question.options.map((option, index) => `
                    <button class="option-btn" data-value="${index}">${option}</button>
                `).join('')}
            </div>
        `;
        
        // Add option listeners
        container.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
                this.selectedAnswer = parseInt(e.target.dataset.value);
            });
        });
        
        // Update navigation buttons
        document.getElementById('prevQuestion').disabled = currentQ === 0;
        document.getElementById('nextQuestion').textContent = currentQ === totalQuestions - 1 ? 'Завершити' : 'Далі';
    }

    nextAssessmentQuestion() {
        if (this.selectedAnswer !== undefined) {
            this.assessmentData.answers.push({
                skill: this.assessmentData.questions[this.assessmentData.currentQuestion].skill,
                level: this.selectedAnswer
            });
            
            if (this.assessmentData.currentQuestion < this.assessmentData.questions.length - 1) {
                this.assessmentData.currentQuestion++;
                this.selectedAnswer = undefined;
                this.renderAssessmentQuestion();
            } else {
                this.completeAssessment();
            }
        }
    }

    prevAssessmentQuestion() {
        if (this.assessmentData.currentQuestion > 0) {
            this.assessmentData.currentQuestion--;
            this.assessmentData.answers.pop();
            this.selectedAnswer = undefined;
            this.renderAssessmentQuestion();
        }
    }

    completeAssessment() {
        // Save results
        this.assessmentData.answers.forEach(answer => {
            this.userSkills[answer.skill] = answer.level;
        });
        
        localStorage.setItem('userSkills', JSON.stringify(this.userSkills));
        
        // Close modal and update UI
        this.closeModals();
        this.updateProgress();
        this.renderSkills();
        
        this.showNotification('Оцінка завершена! Ваш прогрес оновлено.', 'success');
    }

    generateLearningRoadmap(careerGoal) {
        const container = document.getElementById('learningRoadmap');
        if (!container || !careerGoal) {
            container.innerHTML = '';
            return;
        }
        
        const plan = this.learningPlans[careerGoal];
        if (!plan) return;
        
        container.innerHTML = plan.steps.map((step, index) => `
            <div class="roadmap-step">
                <div class="step-number">${index + 1}</div>
                <div class="step-content">
                    <h3>${step.title}</h3>
                    <p>${step.description}</p>
                    <div class="step-skills">
                        ${step.skills.map(skill => `<span class="step-skill">${skill}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateProgress() {
        const totalSkills = Object.values(this.skills).flat().length;
        const completedSkills = Object.values(this.userSkills).filter(level => level > 0).length;
        const overallProgress = totalSkills > 0 ? (completedSkills / totalSkills) * 100 : 0;
        
        // Update circular progress
        const circularProgress = document.querySelector('.circular-progress');
        if (circularProgress) {
            const progressText = circularProgress.querySelector('.progress-text');
            progressText.textContent = `${Math.round(overallProgress)}%`;
            
            // Update circular progress background
            const degrees = (overallProgress / 100) * 360;
            circularProgress.style.setProperty('--progress', `${degrees}deg`);
        }
        
        // Update category progress
        Object.keys(this.skills).forEach(category => {
            const categorySkills = this.skills[category];
            const categoryCompleted = categorySkills.filter(skill => this.userSkills[skill.id] > 0).length;
            const categoryProgress = categorySkills.length > 0 ? (categoryCompleted / categorySkills.length) * 100 : 0;
            
            const progressFill = document.querySelector(`[data-category="${category}"]`);
            if (progressFill) {
                progressFill.style.width = `${categoryProgress}%`;
                const label = progressFill.parentElement.nextElementSibling;
                if (label) {
                    label.textContent = `${categoryCompleted}/${categorySkills.length} навичок`;
                }
            }
        });
        
        // Update achievements
        this.updateAchievements();
    }

    updateAchievements() {
        const container = document.getElementById('achievementsList');
        if (!container) return;
        
        const achievements = [];
        const skillLevels = Object.values(this.userSkills);
        
        // Check for achievements
        if (skillLevels.filter(level => level > 0).length >= 5) {
            achievements.push({
                title: 'Початківець',
                description: 'Розпочали вивчення 5+ навичок',
                icon: 'fas fa-star'
            });
        }
        
        if (skillLevels.filter(level => level >= 3).length >= 3) {
            achievements.push({
                title: 'Просунутий',
                description: 'Досягли просунутого рівня в 3+ навичках',
                icon: 'fas fa-trophy'
            });
        }
        
        if (skillLevels.filter(level => level === 4).length >= 1) {
            achievements.push({
                title: 'Експерт',
                description: 'Стали експертом в одній навичці',
                icon: 'fas fa-crown'
            });
        }
        
        if (achievements.length === 0) {
            container.innerHTML = '<p class="no-achievements">Почніть вивчати навички, щоб отримати перші досягнення!</p>';
        } else {
            container.innerHTML = achievements.map(achievement => `
                <div class="achievement-item">
                    <div class="achievement-icon">
                        <i class="${achievement.icon}"></i>
                    </div>
                    <div class="achievement-content">
                        <h4>${achievement.title}</h4>
                        <p>${achievement.description}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    setupModals() {
        // Assessment modal controls
        const nextBtn = document.getElementById('nextQuestion');
        nextBtn?.addEventListener('click', () => this.nextAssessmentQuestion());
        
        const prevBtn = document.getElementById('prevQuestion');
        prevBtn?.addEventListener('click', () => this.prevAssessmentQuestion());
        
        // Skill modal controls
        const saveBtn = document.getElementById('saveSkillLevel');
        saveBtn?.addEventListener('click', () => this.saveSkillLevel());
        
        const addToPlanBtn = document.getElementById('addToLearningPlan');
        addToPlanBtn?.addEventListener('click', () => this.addToLearningPlan());
        
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
    }

    saveSkillLevel() {
        if (this.selectedLevel !== undefined) {
            const skillTitle = document.getElementById('skillTitle').textContent;
            const skill = this.findSkillByName(skillTitle);
            
            if (skill) {
                this.userSkills[skill.id] = this.selectedLevel;
                localStorage.setItem('userSkills', JSON.stringify(this.userSkills));
                
                this.closeModals();
                this.updateProgress();
                this.renderSkills();
                
                this.showNotification('Рівень навички збережено!', 'success');
            }
        }
    }

    findSkillByName(name) {
        for (const category of Object.values(this.skills)) {
            const skill = category.find(s => s.name === name);
            if (skill) return skill;
        }
        return null;
    }

    addToLearningPlan() {
        const skillTitle = document.getElementById('skillTitle').textContent;
        let learningPlan = JSON.parse(localStorage.getItem('learningPlan') || '[]');
        
        if (!learningPlan.includes(skillTitle)) {
            learningPlan.push(skillTitle);
            localStorage.setItem('learningPlan', JSON.stringify(learningPlan));
            this.showNotification('Додано до плану навчання!', 'success');
        } else {
            this.showNotification('Вже є в плані навчання', 'info');
        }
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
}

// Global instance
let skillsManager;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    skillsManager = new SkillsManager();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SkillsManager;
}