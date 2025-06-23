// Examples Page Interactive Functionality

class ExamplesManager {
    constructor() {
        this.examples = new Map();
        this.infoModal = null;
        this.init();
    }

    init() {
        this.setupInfoModal();
        this.initializeExamples();
        this.setupEventListeners();
    }

    setupInfoModal() {
        this.infoModal = document.getElementById('infoModal');
        const closeBtn = this.infoModal?.querySelector('.btn-close');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeInfoModal());
        }
        
        if (this.infoModal) {
            this.infoModal.addEventListener('click', (e) => {
                if (e.target === this.infoModal) {
                    this.closeInfoModal();
                }
            });
        }
    }

    showInfoModal(title, content) {
        if (!this.infoModal) return;
        
        const modalTitle = this.infoModal.querySelector('.modal-header h3');
        const modalBody = this.infoModal.querySelector('.modal-body');
        
        if (modalTitle) modalTitle.textContent = title;
        if (modalBody) modalBody.innerHTML = content;
        
        this.infoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeInfoModal() {
        if (this.infoModal) {
            this.infoModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    setupEventListeners() {
        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeInfoModal();
            }
        });

        // Info buttons
        document.querySelectorAll('.btn-info').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const exampleType = e.target.dataset.example;
                this.showExampleInfo(exampleType);
            });
        });
    }

    showExampleInfo(exampleType) {
        const infoContent = {
            'linear-regression': {
                title: 'Лінійна регресія',
                content: `
                    <h4>Що таке лінійна регресія?</h4>
                    <p>Лінійна регресія - це статистичний метод, який моделює залежність між залежною змінною та однією або більше незалежними змінними за допомогою лінійної функції.</p>
                    
                    <h4>Як це працює:</h4>
                    <ul>
                        <li>Алгоритм знаходить найкращу пряму лінію через точки даних</li>
                        <li>Використовує метод найменших квадратів для мінімізації помилок</li>
                        <li>Формула: y = mx + b, де m - нахил, b - перетин з віссю Y</li>
                    </ul>
                    
                    <h4>Застосування:</h4>
                    <ul>
                        <li>Прогнозування цін на нерухомість</li>
                        <li>Аналіз продажів</li>
                        <li>Медичні дослідження</li>
                        <li>Економічне моделювання</li>
                    </ul>
                `
            },
            'neural-network': {
                title: 'Нейронні мережі',
                content: `
                    <h4>Що таке нейронна мережа?</h4>
                    <p>Нейронна мережа - це обчислювальна модель, натхненна біологічними нейронними мережами мозку. Вона складається з взаємопов'язаних вузлів (нейронів), які обробляють інформацію.</p>
                    
                    <h4>Структура:</h4>
                    <ul>
                        <li><strong>Вхідний шар:</strong> отримує дані</li>
                        <li><strong>Приховані шари:</strong> обробляють інформацію</li>
                        <li><strong>Вихідний шар:</strong> видає результат</li>
                    </ul>
                    
                    <h4>Процес навчання:</h4>
                    <ul>
                        <li>Прямий прохід: дані проходять через мережу</li>
                        <li>Обчислення помилки</li>
                        <li>Зворотне поширення: корекція ваг</li>
                        <li>Повторення до досягнення точності</li>
                    </ul>
                `
            },
            'image-classification': {
                title: 'Класифікація зображень',
                content: `
                    <h4>Класифікація зображень з ШІ</h4>
                    <p>Технологія, що дозволяє комп'ютерам автоматично визначати та категоризувати об'єкти на зображеннях.</p>
                    
                    <h4>Як працює:</h4>
                    <ul>
                        <li>Згорткові нейронні мережі (CNN) аналізують пікселі</li>
                        <li>Виділяють характерні ознаки (краї, текстури, форми)</li>
                        <li>Порівнюють з навченими шаблонами</li>
                        <li>Видають ймовірності для кожного класу</li>
                    </ul>
                    
                    <h4>Застосування:</h4>
                    <ul>
                        <li>Медична діагностика</li>
                        <li>Автономні автомобілі</li>
                        <li>Системи безпеки</li>
                        <li>Соціальні мережі (автоматичне тегування)</li>
                    </ul>
                `
            },
            'sentiment-analysis': {
                title: 'Аналіз тональності',
                content: `
                    <h4>Аналіз тональності тексту</h4>
                    <p>Технологія обробки природної мови (NLP), що визначає емоційне забарвлення тексту: позитивне, негативне або нейтральне.</p>
                    
                    <h4>Методи аналізу:</h4>
                    <ul>
                        <li><strong>Лексичний підхід:</strong> використання словників емоцій</li>
                        <li><strong>Машинне навчання:</strong> навчання на розмічених даних</li>
                        <li><strong>Глибоке навчання:</strong> нейронні мережі для контексту</li>
                    </ul>
                    
                    <h4>Застосування:</h4>
                    <ul>
                        <li>Моніторинг соціальних мереж</li>
                        <li>Аналіз відгуків клієнтів</li>
                        <li>Фінансові прогнози</li>
                        <li>Політичний аналіз</li>
                    </ul>
                `
            },
            'clustering': {
                title: 'Кластеризація K-Means',
                content: `
                    <h4>Алгоритм K-Means</h4>
                    <p>Метод кластеризації, який групує дані в k кластерів на основі схожості характеристик.</p>
                    
                    <h4>Як працює:</h4>
                    <ol>
                        <li>Випадково розміщуються k центроїдів</li>
                        <li>Кожна точка приписується до найближчого центроїда</li>
                        <li>Центроїди переміщуються в центр своїх кластерів</li>
                        <li>Повторюється до стабілізації</li>
                    </ol>
                    
                    <h4>Застосування:</h4>
                    <ul>
                        <li>Сегментація клієнтів</li>
                        <li>Аналіз ринку</li>
                        <li>Обробка зображень</li>
                        <li>Рекомендаційні системи</li>
                    </ul>
                `
            },
            'decision-tree': {
                title: 'Дерева рішень',
                content: `
                    <h4>Дерева рішень</h4>
                    <p>Алгоритм машинного навчання, що створює модель рішень у вигляді дерева, де кожен вузол представляє тест на атрибут.</p>
                    
                    <h4>Структура:</h4>
                    <ul>
                        <li><strong>Корінь:</strong> початковий вузол з усіма даними</li>
                        <li><strong>Внутрішні вузли:</strong> тести на атрибути</li>
                        <li><strong>Листя:</strong> кінцеві рішення/класи</li>
                    </ul>
                    
                    <h4>Переваги:</h4>
                    <ul>
                        <li>Легко інтерпретувати</li>
                        <li>Не потребує попередньої обробки даних</li>
                        <li>Працює з категоріальними та числовими даними</li>
                        <li>Автоматично відбирає важливі ознаки</li>
                    </ul>
                `
            },
            'genetic-algorithm': {
                title: 'Генетичні алгоритми',
                content: `
                    <h4>Генетичні алгоритми</h4>
                    <p>Метод оптимізації, натхненний процесом природного відбору та еволюції.</p>
                    
                    <h4>Основні операції:</h4>
                    <ul>
                        <li><strong>Селекція:</strong> вибір найкращих особин</li>
                        <li><strong>Схрещування:</strong> комбінування генів батьків</li>
                        <li><strong>Мутація:</strong> випадкові зміни в генах</li>
                        <li><strong>Заміщення:</strong> формування нового покоління</li>
                    </ul>
                    
                    <h4>Застосування:</h4>
                    <ul>
                        <li>Оптимізація маршрутів</li>
                        <li>Дизайн нейронних мереж</li>
                        <li>Розклад завдань</li>
                        <li>Фінансове моделювання</li>
                    </ul>
                `
            },
            'reinforcement-learning': {
                title: 'Навчання з підкріпленням',
                content: `
                    <h4>Навчання з підкріпленням</h4>
                    <p>Тип машинного навчання, де агент вчиться приймати рішення через взаємодію з середовищем та отримання винагород.</p>
                    
                    <h4>Ключові компоненти:</h4>
                    <ul>
                        <li><strong>Агент:</strong> той, хто приймає рішення</li>
                        <li><strong>Середовище:</strong> світ, в якому діє агент</li>
                        <li><strong>Дії:</strong> можливі кроки агента</li>
                        <li><strong>Стани:</strong> ситуації в середовищі</li>
                        <li><strong>Винагороди:</strong> зворотний зв'язок за дії</li>
                    </ul>
                    
                    <h4>Застосування:</h4>
                    <ul>
                        <li>Ігрові ШІ (шахи, Go)</li>
                        <li>Автономні роботи</li>
                        <li>Рекомендаційні системи</li>
                        <li>Алгоритмічна торгівля</li>
                    </ul>
                `
            }
        };

        const info = infoContent[exampleType];
        if (info) {
            this.showInfoModal(info.title, info.content);
        }
    }

    initializeExamples() {
        // Initialize Linear Regression
        this.initLinearRegression();
        
        // Initialize Neural Network Visualization
        this.initNeuralNetwork();
        
        // Initialize Image Classification
        this.initImageClassification();
        
        // Initialize Sentiment Analysis
        this.initSentimentAnalysis();
        
        // Initialize K-Means Clustering
        this.initKMeansClustering();
        
        // Initialize Decision Tree
        this.initDecisionTree();
        
        // Initialize Genetic Algorithm
        this.initGeneticAlgorithm();
        
        // Initialize Reinforcement Learning
        this.initReinforcementLearning();
        
        // Initialize Algorithm Comparison
        this.initAlgorithmComparison();
    }

    initLinearRegression() {
        const canvas = document.getElementById('regressionCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = 250;
        
        let points = [];
        let showLine = false;
        
        const generateData = () => {
            points = [];
            for (let i = 0; i < 20; i++) {
                points.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height
                });
            }
            drawRegression();
        };
        
        const calculateRegression = () => {
            if (points.length < 2) return null;
            
            const n = points.length;
            let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
            
            points.forEach(point => {
                sumX += point.x;
                sumY += point.y;
                sumXY += point.x * point.y;
                sumXX += point.x * point.x;
            });
            
            const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
            const intercept = (sumY - slope * sumX) / n;
            
            return { slope, intercept };
        };
        
        const drawRegression = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw grid
            ctx.strokeStyle = '#f0f0f0';
            ctx.lineWidth = 1;
            for (let i = 0; i <= canvas.width; i += 50) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
            }
            for (let i = 0; i <= canvas.height; i += 50) {
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.stroke();
            }
            
            // Draw points
            ctx.fillStyle = '#667eea';
            points.forEach(point => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
                ctx.fill();
            });
            
            // Draw regression line
            if (showLine && points.length >= 2) {
                const regression = calculateRegression();
                if (regression) {
                    ctx.strokeStyle = '#ff6b6b';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(0, regression.intercept);
                    ctx.lineTo(canvas.width, regression.slope * canvas.width + regression.intercept);
                    ctx.stroke();
                    
                    // Update info
                    const info = document.querySelector('#regressionCanvas').parentElement.querySelector('.info-display');
                    if (info) {
                        info.textContent = `Нахил: ${regression.slope.toFixed(3)}, Перетин: ${regression.intercept.toFixed(1)}`;
                    }
                }
            }
        };
        
        // Event listeners
        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            points.push({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
            drawRegression();
        });
        
        document.getElementById('generateData')?.addEventListener('click', generateData);
        document.getElementById('showLine')?.addEventListener('change', (e) => {
            showLine = e.target.checked;
            drawRegression();
        });
        document.getElementById('clearPoints')?.addEventListener('click', () => {
            points = [];
            drawRegression();
        });
        
        // Initialize with some data
        generateData();
    }

    initNeuralNetwork() {
        const canvas = document.getElementById('networkCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;
        
        let layers = [3, 4, 2];
        let animationSpeed = 1;
        let animationFrame;
        
        const drawNetwork = () => {
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            const layerWidth = canvas.width / (layers.length + 1);
            const nodePositions = [];
            
            // Calculate node positions
            layers.forEach((nodeCount, layerIndex) => {
                const layerNodes = [];
                const nodeHeight = canvas.height / (nodeCount + 1);
                
                for (let i = 0; i < nodeCount; i++) {
                    layerNodes.push({
                        x: layerWidth * (layerIndex + 1),
                        y: nodeHeight * (i + 1)
                    });
                }
                nodePositions.push(layerNodes);
            });
            
            // Draw connections
            ctx.strokeStyle = '#444';
            ctx.lineWidth = 1;
            for (let i = 0; i < nodePositions.length - 1; i++) {
                nodePositions[i].forEach(fromNode => {
                    nodePositions[i + 1].forEach(toNode => {
                        ctx.beginPath();
                        ctx.moveTo(fromNode.x, fromNode.y);
                        ctx.lineTo(toNode.x, toNode.y);
                        ctx.stroke();
                    });
                });
            }
            
            // Draw nodes
            nodePositions.forEach((layer, layerIndex) => {
                layer.forEach((node, nodeIndex) => {
                    const time = Date.now() * 0.001 * animationSpeed;
                    const activation = Math.sin(time + layerIndex + nodeIndex) * 0.5 + 0.5;
                    
                    ctx.fillStyle = `hsl(${220 + activation * 60}, 70%, ${50 + activation * 30}%)`;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, 8 + activation * 4, 0, 2 * Math.PI);
                    ctx.fill();
                    
                    // Node border
                    ctx.strokeStyle = '#fff';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                });
            });
        };
        
        const animate = () => {
            drawNetwork();
            animationFrame = requestAnimationFrame(animate);
        };
        
        // Controls
        document.getElementById('inputNodes')?.addEventListener('input', (e) => {
            layers[0] = parseInt(e.target.value);
        });
        
        document.getElementById('hiddenNodes')?.addEventListener('input', (e) => {
            layers[1] = parseInt(e.target.value);
        });
        
        document.getElementById('outputNodes')?.addEventListener('input', (e) => {
            layers[2] = parseInt(e.target.value);
        });
        
        document.getElementById('animationSpeed')?.addEventListener('input', (e) => {
            animationSpeed = parseFloat(e.target.value);
        });
        
        animate();
    }

    initImageClassification() {
        const uploadArea = document.getElementById('imageUpload');
        const fileInput = document.getElementById('imageFile');
        const resultsDiv = document.getElementById('classificationResults');
        
        if (!uploadArea || !fileInput) return;
        
        const handleFile = (file) => {
            if (!file.type.startsWith('image/')) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    displayResults(img, file.name);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        };
        
        const displayResults = (img, filename) => {
            // Simulate classification results
            const predictions = [
                { label: 'Кіт', confidence: 0.87 },
                { label: 'Собака', confidence: 0.12 },
                { label: 'Птах', confidence: 0.01 }
            ];
            
            resultsDiv.innerHTML = `
                <div>
                    <img src="${img.src}" alt="${filename}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
                </div>
                <div class="predictions">
                    <h4>Результати класифікації:</h4>
                    ${predictions.map(pred => `
                        <div class="prediction-item">
                            <span class="prediction-label">${pred.label}</span>
                            <span class="prediction-confidence">${(pred.confidence * 100).toFixed(1)}%</span>
                        </div>
                    `).join('')}
                </div>
            `;
            
            resultsDiv.style.display = 'grid';
        };
        
        // Event listeners
        uploadArea.addEventListener('click', () => fileInput.click());
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFile(files[0]);
            }
        });
        
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFile(e.target.files[0]);
            }
        });
    }

    initSentimentAnalysis() {
        const textInput = document.getElementById('sentimentText');
        const analyzeBtn = document.getElementById('analyzeSentiment');
        const meterFill = document.querySelector('.meter-fill');
        const sentimentDetails = document.querySelector('.sentiment-details');
        
        if (!textInput || !analyzeBtn) return;
        
        const analyzeSentiment = () => {
            const text = textInput.value.trim();
            if (!text) return;
            
            // Simple sentiment analysis simulation
            const positiveWords = ['добре', 'чудово', 'відмінно', 'любити', 'щасливий', 'радісний'];
            const negativeWords = ['погано', 'жахливо', 'ненавидіти', 'сумний', 'злий', 'розчарований'];
            
            const words = text.toLowerCase().split(/\s+/);
            let positiveCount = 0;
            let negativeCount = 0;
            
            words.forEach(word => {
                if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
                if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
            });
            
            const totalSentimentWords = positiveCount + negativeCount;
            let sentiment = 0; // -1 to 1 scale
            
            if (totalSentimentWords > 0) {
                sentiment = (positiveCount - negativeCount) / totalSentimentWords;
            }
            
            // Update meter
            const meterPosition = ((sentiment + 1) / 2) * 100; // Convert to 0-100%
            if (meterFill) {
                meterFill.style.left = `${meterPosition}%`;
            }
            
            // Update details
            let sentimentLabel = 'Нейтральний';
            let sentimentColor = '#ffc107';
            
            if (sentiment > 0.2) {
                sentimentLabel = 'Позитивний';
                sentimentColor = '#28a745';
            } else if (sentiment < -0.2) {
                sentimentLabel = 'Негативний';
                sentimentColor = '#dc3545';
            }
            
            if (sentimentDetails) {
                sentimentDetails.innerHTML = `
                    <h4 style="color: ${sentimentColor}; margin-bottom: 0.5rem;">${sentimentLabel}</h4>
                    <p><strong>Оцінка:</strong> ${sentiment.toFixed(2)} (від -1 до 1)</p>
                    <p><strong>Позитивних слів:</strong> ${positiveCount}</p>
                    <p><strong>Негативних слів:</strong> ${negativeCount}</p>
                    <p><strong>Загальна кількість слів:</strong> ${words.length}</p>
                `;
            }
        };
        
        analyzeBtn.addEventListener('click', analyzeSentiment);
        textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                analyzeSentiment();
            }
        });
    }

    initKMeansClustering() {
        const canvas = document.getElementById('clusteringCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = 250;
        
        let points = [];
        let centroids = [];
        let clusters = [];
        let k = 3;
        let isRunning = false;
        
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
        
        const generatePoints = () => {
            points = [];
            for (let i = 0; i < 100; i++) {
                points.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    cluster: -1
                });
            }
            initializeCentroids();
            drawClustering();
        };
        
        const initializeCentroids = () => {
            centroids = [];
            for (let i = 0; i < k; i++) {
                centroids.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height
                });
            }
        };
        
        const assignClusters = () => {
            points.forEach(point => {
                let minDistance = Infinity;
                let closestCentroid = 0;
                
                centroids.forEach((centroid, index) => {
                    const distance = Math.sqrt(
                        Math.pow(point.x - centroid.x, 2) + Math.pow(point.y - centroid.y, 2)
                    );
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestCentroid = index;
                    }
                });
                
                point.cluster = closestCentroid;
            });
        };
        
        const updateCentroids = () => {
            centroids.forEach((centroid, index) => {
                const clusterPoints = points.filter(p => p.cluster === index);
                if (clusterPoints.length > 0) {
                    centroid.x = clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length;
                    centroid.y = clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length;
                }
            });
        };
        
        const drawClustering = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw points
            points.forEach(point => {
                ctx.fillStyle = point.cluster >= 0 ? colors[point.cluster % colors.length] : '#ccc';
                ctx.beginPath();
                ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
                ctx.fill();
            });
            
            // Draw centroids
            centroids.forEach((centroid, index) => {
                ctx.fillStyle = colors[index % colors.length];
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(centroid.x, centroid.y, 8, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
            });
        };
        
        const runKMeans = async () => {
            if (isRunning) return;
            isRunning = true;
            
            for (let iteration = 0; iteration < 20; iteration++) {
                assignClusters();
                updateCentroids();
                drawClustering();
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            
            isRunning = false;
        };
        
        // Event listeners
        document.getElementById('generateClusters')?.addEventListener('click', generatePoints);
        document.getElementById('runKMeans')?.addEventListener('click', runKMeans);
        document.getElementById('clusterCount')?.addEventListener('input', (e) => {
            k = parseInt(e.target.value);
            initializeCentroids();
            drawClustering();
        });
        
        generatePoints();
    }

    initDecisionTree() {
        const container = document.getElementById('decisionTreeContainer');
        if (!container) return;
        
        // Simple decision tree visualization
        const treeData = {
            name: "Вік > 25?",
            children: [
                {
                    name: "Дохід > 50k?",
                    children: [
                        { name: "Схвалити", value: "leaf" },
                        { name: "Відхилити", value: "leaf" }
                    ]
                },
                {
                    name: "Кредитна історія?",
                    children: [
                        { name: "Схвалити", value: "leaf" },
                        { name: "Відхилити", value: "leaf" }
                    ]
                }
            ]
        };
        
        container.innerHTML = `
            <svg width="100%" height="300">
                <!-- Root node -->
                <rect x="200" y="20" width="120" height="40" class="tree-node" rx="5"/>
                <text x="260" y="45" class="tree-text">${treeData.name}</text>
                
                <!-- Left branch -->
                <line x1="230" y1="60" x2="130" y2="120" class="tree-link"/>
                <text x="170" y="85" class="tree-text" style="font-size: 10px;">Так</text>
                
                <rect x="70" y="120" width="120" height="40" class="tree-node" rx="5"/>
                <text x="130" y="145" class="tree-text">${treeData.children[0].name}</text>
                
                <!-- Left-left leaf -->
                <line x1="100" y1="160" x2="50" y2="220" class="tree-link"/>
                <rect x="10" y="220" width="80" height="30" class="tree-node leaf" rx="5"/>
                <text x="50" y="240" class="tree-text">${treeData.children[0].children[0].name}</text>
                
                <!-- Left-right leaf -->
                <line x1="160" y1="160" x2="210" y2="220" class="tree-link"/>
                <rect x="170" y="220" width="80" height="30" class="tree-node leaf" rx="5"/>
                <text x="210" y="240" class="tree-text">${treeData.children[0].children[1].name}</text>
                
                <!-- Right branch -->
                <line x1="290" y1="60" x2="390" y2="120" class="tree-link"/>
                <text x="350" y="85" class="tree-text" style="font-size: 10px;">Ні</text>
                
                <rect x="330" y="120" width="120" height="40" class="tree-node" rx="5"/>
                <text x="390" y="145" class="tree-text">${treeData.children[1].name}</text>
                
                <!-- Right-left leaf -->
                <line x1="360" y1="160" x2="310" y2="220" class="tree-link"/>
                <rect x="270" y="220" width="80" height="30" class="tree-node leaf" rx="5"/>
                <text x="310" y="240" class="tree-text">${treeData.children[1].children[0].name}</text>
                
                <!-- Right-right leaf -->
                <line x1="420" y1="160" x2="470" y2="220" class="tree-link"/>
                <rect x="430" y="220" width="80" height="30" class="tree-node leaf" rx="5"/>
                <text x="470" y="240" class="tree-text">${treeData.children[1].children[1].name}</text>
            </svg>
        `;
    }

    initGeneticAlgorithm() {
        const canvas = document.getElementById('geneticCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = 250;
        
        let population = [];
        let generation = 0;
        let isRunning = false;
        let bestFitness = 0;
        
        const target = "ШТУЧНИЙ ІНТЕЛЕКТ";
        const populationSize = 50;
        const mutationRate = 0.01;
        
        const createIndividual = () => {
            let individual = "";
            const chars = "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ ";
            for (let i = 0; i < target.length; i++) {
                individual += chars[Math.floor(Math.random() * chars.length)];
            }
            return individual;
        };
        
        const calculateFitness = (individual) => {
            let fitness = 0;
            for (let i = 0; i < target.length; i++) {
                if (individual[i] === target[i]) {
                    fitness++;
                }
            }
            return fitness / target.length;
        };
        
        const crossover = (parent1, parent2) => {
            const crossoverPoint = Math.floor(Math.random() * target.length);
            return parent1.substring(0, crossoverPoint) + parent2.substring(crossoverPoint);
        };
        
        const mutate = (individual) => {
            const chars = "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ ";
            let mutated = "";
            for (let i = 0; i < individual.length; i++) {
                if (Math.random() < mutationRate) {
                    mutated += chars[Math.floor(Math.random() * chars.length)];
                } else {
                    mutated += individual[i];
                }
            }
            return mutated;
        };
        
        const initializePopulation = () => {
            population = [];
            for (let i = 0; i < populationSize; i++) {
                population.push({
                    genes: createIndividual(),
                    fitness: 0
                });
            }
            evaluatePopulation();
        };
        
        const evaluatePopulation = () => {
            population.forEach(individual => {
                individual.fitness = calculateFitness(individual.genes);
            });
            population.sort((a, b) => b.fitness - a.fitness);
            bestFitness = population[0].fitness;
        };
        
        const evolve = () => {
            const newPopulation = [];
            
            // Keep best individuals (elitism)
            for (let i = 0; i < populationSize * 0.1; i++) {
                newPopulation.push({ ...population[i] });
            }
            
            // Create new individuals through crossover and mutation
            while (newPopulation.length < populationSize) {
                const parent1 = population[Math.floor(Math.random() * populationSize * 0.5)];
                const parent2 = population[Math.floor(Math.random() * populationSize * 0.5)];
                
                let child = crossover(parent1.genes, parent2.genes);
                child = mutate(child);
                
                newPopulation.push({
                    genes: child,
                    fitness: 0
                });
            }
            
            population = newPopulation;
            evaluatePopulation();
            generation++;
        };
        
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw target
            ctx.fillStyle = '#333';
            ctx.font = '16px Arial';
            ctx.fillText(`Ціль: ${target}`, 10, 30);
            
            // Draw best individual
            ctx.fillStyle = '#667eea';
            ctx.fillText(`Найкращий: ${population[0]?.genes || ''}`, 10, 60);
            
            // Draw generation and fitness
            ctx.fillStyle = '#666';
            ctx.font = '14px Arial';
            ctx.fillText(`Покоління: ${generation}`, 10, 90);
            ctx.fillText(`Точність: ${(bestFitness * 100).toFixed(1)}%`, 10, 110);
            
            // Draw fitness graph
            const graphY = 140;
            const graphHeight = 80;
            
            ctx.strokeStyle = '#ddd';
            ctx.lineWidth = 1;
            ctx.strokeRect(10, graphY, canvas.width - 20, graphHeight);
            
            if (population.length > 0) {
                ctx.strokeStyle = '#667eea';
                ctx.lineWidth = 2;
                ctx.beginPath();
                
                const barWidth = (canvas.width - 20) / Math.min(population.length, 20);
                for (let i = 0; i < Math.min(population.length, 20); i++) {
                    const x = 10 + i * barWidth;
                    const height = population[i].fitness * graphHeight;
                    ctx.rect(x, graphY + graphHeight - height, barWidth - 1, height);
                }
                ctx.stroke();
            }
        };
        
        const runEvolution = async () => {
            if (isRunning) return;
            isRunning = true;
            
            while (bestFitness < 1 && generation < 1000) {
                evolve();
                draw();
                
                // Update stats
                const statsDiv = document.querySelector('#geneticCanvas').parentElement.querySelector('.evolution-stats');
                if (statsDiv) {
                    statsDiv.innerHTML = `
                        <span>Покоління: ${generation}</span>
                        <span>Точність: ${(bestFitness * 100).toFixed(1)}%</span>
                        <span>Найкращий: ${population[0]?.genes || ''}</span>
                    `;
                }
                
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            isRunning = false;
        };
        
        // Event listeners
        document.getElementById('startEvolution')?.addEventListener('click', () => {
            initializePopulation();
            generation = 0;
            runEvolution();
        });
        
        document.getElementById('resetEvolution')?.addEventListener('click', () => {
            initializePopulation();
            generation = 0;
            draw();
        });
        
        initializePopulation();
        draw();
    }

    initReinforcementLearning() {
        const canvas = document.getElementById('mazeCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;
        
        const gridSize = 20;
        const cols = Math.floor(canvas.width / gridSize);
        const rows = Math.floor(canvas.height / gridSize);
        
        let agent = { x: 0, y: 0 };
        let goal = { x: cols - 1, y: rows - 1 };
        let obstacles = [];
        let qTable = {};
        let episode = 0;
        let totalReward = 0;
        let isTraining = false;
        
        const actions = ['up', 'down', 'left', 'right'];
        const learningRate = 0.1;
        const discountFactor = 0.9;
        const epsilon = 0.1; // exploration rate
        
        const initializeMaze = () => {
            obstacles = [];
            // Create some random obstacles
            for (let i = 0; i < (cols * rows) * 0.2; i++) {
                const x = Math.floor(Math.random() * cols);
                const y = Math.floor(Math.random() * rows);
                if ((x !== 0 || y !== 0) && (x !== goal.x || y !== goal.y)) {
                    obstacles.push({ x, y });
                }
            }
            
            // Initialize Q-table
            qTable = {};
            for (let x = 0; x < cols; x++) {
                for (let y = 0; y < rows; y++) {
                    const state = `${x},${y}`;
                    qTable[state] = {};
                    actions.forEach(action => {
                        qTable[state][action] = 0;
                    });
                }
            }
        };
        
        const isValidPosition = (x, y) => {
            return x >= 0 && x < cols && y >= 0 && y < rows && 
                   !obstacles.some(obs => obs.x === x && obs.y === y);
        };
        
        const getNextPosition = (x, y, action) => {
            switch (action) {
                case 'up': return { x, y: y - 1 };
                case 'down': return { x, y: y + 1 };
                case 'left': return { x: x - 1, y };
                case 'right': return { x: x + 1, y };
                default: return { x, y };
            }
        };
        
        const getReward = (x, y) => {
            if (x === goal.x && y === goal.y) return 100;
            if (!isValidPosition(x, y)) return -10;
            return -1; // Small penalty for each step
        };
        
        const chooseAction = (state) => {
            if (Math.random() < epsilon) {
                // Exploration: random action
                return actions[Math.floor(Math.random() * actions.length)];
            } else {
                // Exploitation: best action
                const qValues = qTable[state];
                let bestAction = actions[0];
                let bestValue = qValues[bestAction];
                
                actions.forEach(action => {
                    if (qValues[action] > bestValue) {
                        bestValue = qValues[action];
                        bestAction = action;
                    }
                });
                
                return bestAction;
            }
        };
        
        const updateQTable = (state, action, reward, nextState) => {
            const currentQ = qTable[state][action];
            const maxNextQ = Math.max(...actions.map(a => qTable[nextState][a]));
            const newQ = currentQ + learningRate * (reward + discountFactor * maxNextQ - currentQ);
            qTable[state][action] = newQ;
        };
        
        const runEpisode = async () => {
            agent = { x: 0, y: 0 };
            let steps = 0;
            let episodeReward = 0;
            
            while (steps < 200 && (agent.x !== goal.x || agent.y !== goal.y)) {
                const state = `${agent.x},${agent.y}`;
                const action = chooseAction(state);
                const nextPos = getNextPosition(agent.x, agent.y, action);
                
                let reward = getReward(nextPos.x, nextPos.y);
                let nextState;
                
                if (isValidPosition(nextPos.x, nextPos.y)) {
                    agent = nextPos;
                    nextState = `${agent.x},${agent.y}`;
                } else {
                    nextState = state; // Stay in same position
                }
                
                updateQTable(state, action, reward, nextState);
                episodeReward += reward;
                steps++;
                
                if (steps % 5 === 0) {
                    draw();
                    await new Promise(resolve => setTimeout(resolve, 50));
                }
            }
            
            totalReward += episodeReward;
            episode++;
            
            // Update stats
            const statsDiv = document.querySelector('#mazeCanvas').parentElement.querySelector('.learning-stats');
            if (statsDiv) {
                statsDiv.innerHTML = `
                    <span>Епізод: ${episode}</span>
                    <span>Кроки: ${steps}</span>
                    <span>Винагорода: ${episodeReward.toFixed(1)}</span>
                    <span>Середня винагорода: ${(totalReward / episode).toFixed(1)}</span>
                `;
            }
        };
        
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw grid
            ctx.strokeStyle = '#eee';
            ctx.lineWidth = 1;
            for (let x = 0; x <= cols; x++) {
                ctx.beginPath();
                ctx.moveTo(x * gridSize, 0);
                ctx.lineTo(x * gridSize, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y <= rows; y++) {
                ctx.beginPath();
                ctx.moveTo(0, y * gridSize);
                ctx.lineTo(canvas.width, y * gridSize);
                ctx.stroke();
            }
            
            // Draw obstacles
            ctx.fillStyle = '#333';
            obstacles.forEach(obs => {
                ctx.fillRect(obs.x * gridSize, obs.y * gridSize, gridSize, gridSize);
            });
            
            // Draw goal
            ctx.fillStyle = '#4caf50';
            ctx.fillRect(goal.x * gridSize, goal.y * gridSize, gridSize, gridSize);
            
            // Draw agent
            ctx.fillStyle = '#667eea';
            ctx.beginPath();
            ctx.arc(
                agent.x * gridSize + gridSize / 2,
                agent.y * gridSize + gridSize / 2,
                gridSize / 3,
                0,
                2 * Math.PI
            );
            ctx.fill();
        };
        
        const startTraining = async () => {
            if (isTraining) return;
            isTraining = true;
            
            for (let i = 0; i < 100; i++) {
                await runEpisode();
                if (!isTraining) break;
            }
            
            isTraining = false;
        };
        
        // Event listeners
        document.getElementById('startTraining')?.addEventListener('click', startTraining);
        document.getElementById('resetMaze')?.addEventListener('click', () => {
            isTraining = false;
            episode = 0;
            totalReward = 0;
            initializeMaze();
            agent = { x: 0, y: 0 };
            draw();
        });
        
        initializeMaze();
        draw();
    }

    initAlgorithmComparison() {
        const canvas = document.getElementById('comparisonCanvas');
        const checkboxes = document.querySelectorAll('.algorithm-checkboxes input[type="checkbox"]');
        const metricsTable = document.querySelector('.metrics-table tbody');
        
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;
        
        const algorithms = {
            'linear-regression': { name: 'Лінійна регресія', color: '#ff6b6b', accuracy: 0.75, speed: 0.95, complexity: 0.2 },
            'decision-tree': { name: 'Дерево рішень', color: '#4ecdc4', accuracy: 0.82, speed: 0.8, complexity: 0.6 },
            'neural-network': { name: 'Нейронна мережа', color: '#45b7d1', accuracy: 0.92, speed: 0.3, complexity: 0.9 },
            'svm': { name: 'SVM', color: '#96ceb4', accuracy: 0.88, speed: 0.6, complexity: 0.7 },
            'random-forest': { name: 'Випадковий ліс', color: '#feca57', accuracy: 0.85, speed: 0.7, complexity: 0.5 }
        };
        
        const updateComparison = () => {
            const selectedAlgorithms = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            
            drawComparison(selectedAlgorithms);
            updateMetricsTable(selectedAlgorithms);
        };
        
        const drawComparison = (selected) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (selected.length === 0) {
                ctx.fillStyle = '#666';
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Оберіть алгоритми для порівняння', canvas.width / 2, canvas.height / 2);
                return;
            }
            
            const metrics = ['accuracy', 'speed', 'complexity'];
            const metricLabels = ['Точність', 'Швидкість', 'Складність'];
            const barHeight = 40;
            const barSpacing = 60;
            const startY = 50;
            
            metrics.forEach((metric, metricIndex) => {
                const y = startY + metricIndex * (barHeight * selected.length + barSpacing);
                
                // Draw metric label
                ctx.fillStyle = '#333';
                ctx.font = '14px Arial';
                ctx.textAlign = 'left';
                ctx.fillText(metricLabels[metricIndex], 10, y - 10);
                
                selected.forEach((algKey, algIndex) => {
                    const algorithm = algorithms[algKey];
                    const barY = y + algIndex * barHeight;
                    const barWidth = algorithm[metric] * (canvas.width - 200);
                    
                    // Draw bar
                    ctx.fillStyle = algorithm.color;
                    ctx.fillRect(120, barY, barWidth, barHeight - 5);
                    
                    // Draw algorithm name
                    ctx.fillStyle = '#333';
                    ctx.font = '12px Arial';
                    ctx.textAlign = 'right';
                    ctx.fillText(algorithm.name, 115, barY + 20);
                    
                    // Draw value
                    ctx.fillStyle = '#666';
                    ctx.textAlign = 'left';
                    ctx.fillText((algorithm[metric] * 100).toFixed(0) + '%', 125 + barWidth, barY + 20);
                });
            });
        };
        
        const updateMetricsTable = (selected) => {
            if (!metricsTable) return;
            
            metricsTable.innerHTML = '';
            
            selected.forEach(algKey => {
                const algorithm = algorithms[algKey];
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td style="color: ${algorithm.color}; font-weight: bold;">${algorithm.name}</td>
                    <td>${(algorithm.accuracy * 100).toFixed(1)}%</td>
                    <td>${(algorithm.speed * 100).toFixed(1)}%</td>
                    <td>${(algorithm.complexity * 100).toFixed(1)}%</td>
                `;
                metricsTable.appendChild(row);
            });
        };
        
        // Event listeners
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateComparison);
        });
        
        // Initial comparison with first two algorithms selected
        if (checkboxes.length >= 2) {
            checkboxes[0].checked = true;
            checkboxes[1].checked = true;
            updateComparison();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ExamplesManager();
});

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

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExamplesManager;
}