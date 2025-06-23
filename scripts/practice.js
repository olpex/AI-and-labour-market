// Practice Page JavaScript

class PracticeManager {
    constructor() {
        this.currentTask = null;
        this.currentStep = 1;
        this.totalSteps = 5;
        this.startTime = null;
        this.attempts = 0;
        this.codeEditor = null;
        this.tasks = this.initializeTasks();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupDifficultyFilter();
        this.initializeCodeEditor();
    }

    setupEventListeners() {
        // Modal controls
        document.getElementById('closeTask')?.addEventListener('click', () => this.closeTaskModal());
        document.getElementById('resetTask')?.addEventListener('click', () => this.resetTask());
        
        // Step navigation
        document.getElementById('prevStep')?.addEventListener('click', () => this.previousStep());
        document.getElementById('nextStep')?.addEventListener('click', () => this.nextStep());
        
        // Code execution
        document.getElementById('runCode')?.addEventListener('click', () => this.runCode());
        document.getElementById('checkSolution')?.addEventListener('click', () => this.checkSolution());
        document.getElementById('clearOutput')?.addEventListener('click', () => this.clearOutput());
        
        // Success modal
        document.getElementById('nextTask')?.addEventListener('click', () => this.goToNextTask());
        document.getElementById('backToTasks')?.addEventListener('click', () => this.backToTaskList());
        
        // Close modals on outside click
        document.getElementById('taskModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'taskModal') this.closeTaskModal();
        });
        
        document.getElementById('successModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'successModal') this.closeSuccessModal();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    setupDifficultyFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const practiceCards = document.querySelectorAll('.practice-card');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const difficulty = btn.dataset.difficulty;
                
                // Filter cards
                practiceCards.forEach(card => {
                    if (difficulty === 'all' || card.dataset.difficulty === difficulty) {
                        card.classList.remove('hidden');
                        card.style.animation = 'slideUp 0.3s ease';
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    initializeTasks() {
        return {
            'data-analysis': {
                title: 'Аналіз даних з Python',
                difficulty: 'beginner',
                steps: [
                    {
                        title: 'Імпорт бібліотек',
                        content: `
                            <h4>Крок 1: Імпорт необхідних бібліотек</h4>
                            <p>Почнемо з імпорту основних бібліотек для аналізу даних:</p>
                            <ul>
                                <li><strong>pandas</strong> - для роботи з даними</li>
                                <li><strong>matplotlib</strong> - для візуалізації</li>
                                <li><strong>numpy</strong> - для числових обчислень</li>
                            </ul>
                            <p>Введіть код для імпорту цих бібліотек у робочу область.</p>
                        `,
                        starterCode: '# Імпортуйте pandas, matplotlib.pyplot та numpy\n',
                        solution: 'import pandas as pd\nimport matplotlib.pyplot as plt\nimport numpy as np'
                    },
                    {
                        title: 'Створення даних',
                        content: `
                            <h4>Крок 2: Створення тестових даних</h4>
                            <p>Створимо DataFrame з тестовими даними про продажі:</p>
                            <ul>
                                <li>Місяці: січень-грудень</li>
                                <li>Продажі: випадкові значення від 1000 до 5000</li>
                            </ul>
                            <p>Використайте pandas для створення DataFrame.</p>
                        `,
                        starterCode: '# Створіть DataFrame з колонками "month" та "sales"\n',
                        solution: `data = pd.DataFrame({
    'month': ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
              'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
    'sales': [2500, 3200, 2800, 4100, 3600, 4500, 5000, 4800, 3900, 3400, 2900, 3800]
})`
                    },
                    {
                        title: 'Базовий аналіз',
                        content: `
                            <h4>Крок 3: Базовий статистичний аналіз</h4>
                            <p>Проведемо базовий аналіз наших даних:</p>
                            <ul>
                                <li>Виведіть основну інформацію про дані</li>
                                <li>Обчисліть середнє значення продажів</li>
                                <li>Знайдіть максимальне та мінімальне значення</li>
                            </ul>
                        `,
                        starterCode: '# Виведіть info(), describe() та основні статистики\n',
                        solution: `print(data.info())
print(data.describe())
print(f"Середні продажі: {data['sales'].mean():.2f}")
print(f"Максимальні продажі: {data['sales'].max()}")
print(f"Мінімальні продажі: {data['sales'].min()}")`
                    },
                    {
                        title: 'Візуалізація',
                        content: `
                            <h4>Крок 4: Створення графіків</h4>
                            <p>Створимо візуалізацію наших даних:</p>
                            <ul>
                                <li>Лінійний графік продажів по місяцях</li>
                                <li>Стовпчикова діаграма</li>
                                <li>Додайте заголовки та підписи осей</li>
                            </ul>
                        `,
                        starterCode: '# Створіть графіки для візуалізації даних\n',
                        solution: `plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(data['month'], data['sales'], marker='o')
plt.title('Продажі по місяцях (лінійний графік)')
plt.xticks(rotation=45)
plt.ylabel('Продажі')

plt.subplot(1, 2, 2)
plt.bar(data['month'], data['sales'])
plt.title('Продажі по місяцях (стовпчики)')
plt.xticks(rotation=45)
plt.ylabel('Продажі')

plt.tight_layout()
plt.show()`
                    },
                    {
                        title: 'Висновки',
                        content: `
                            <h4>Крок 5: Аналіз результатів</h4>
                            <p>Проаналізуйте отримані результати:</p>
                            <ul>
                                <li>Знайдіть тренди в даних</li>
                                <li>Визначте найкращий та найгірший місяці</li>
                                <li>Зробіть висновки про сезонність</li>
                            </ul>
                        `,
                        starterCode: '# Напишіть код для аналізу трендів\n',
                        solution: `best_month = data.loc[data['sales'].idxmax(), 'month']
worst_month = data.loc[data['sales'].idxmin(), 'month']

print(f"Найкращий місяць: {best_month} ({data['sales'].max()} продажів)")
print(f"Найгірший місяць: {worst_month} ({data['sales'].min()} продажів)")

# Аналіз тренду
trend = np.polyfit(range(len(data)), data['sales'], 1)[0]
if trend > 0:
    print("Загальний тренд: зростання")
else:
    print("Загальний тренд: спадання")`
                    }
                ]
            },
            'ml-model': {
                title: 'Створення ML моделі',
                difficulty: 'intermediate',
                steps: [
                    {
                        title: 'Підготовка даних',
                        content: `
                            <h4>Крок 1: Імпорт та підготовка даних</h4>
                            <p>Імпортуємо необхідні бібліотеки та створимо тестовий датасет:</p>
                            <ul>
                                <li>scikit-learn для машинного навчання</li>
                                <li>Створення синтетичних даних для класифікації</li>
                            </ul>
                        `,
                        starterCode: '# Імпортуйте sklearn та створіть тестові дані\n',
                        solution: `from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import numpy as np

# Створення тестових даних
X, y = make_classification(n_samples=1000, n_features=20, n_informative=10, 
                          n_redundant=10, n_clusters_per_class=1, random_state=42)`
                    },
                    {
                        title: 'Розділення даних',
                        content: `
                            <h4>Крок 2: Розділення на тренувальну та тестову вибірки</h4>
                            <p>Розділимо дані для навчання та тестування моделі:</p>
                            <ul>
                                <li>80% для навчання, 20% для тестування</li>
                                <li>Використайте train_test_split</li>
                            </ul>
                        `,
                        starterCode: '# Розділіть дані на тренувальну та тестову вибірки\n',
                        solution: `X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"Розмір тренувальної вибірки: {X_train.shape}")
print(f"Розмір тестової вибірки: {X_test.shape}")`
                    },
                    {
                        title: 'Навчання моделі',
                        content: `
                            <h4>Крок 3: Створення та навчання моделі</h4>
                            <p>Створимо модель Random Forest та навчимо її:</p>
                            <ul>
                                <li>Використайте RandomForestClassifier</li>
                                <li>Встановіть параметри: n_estimators=100, random_state=42</li>
                            </ul>
                        `,
                        starterCode: '# Створіть та навчіть модель Random Forest\n',
                        solution: `# Створення моделі
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Навчання моделі
model.fit(X_train, y_train)

print("Модель успішно навчена!")`
                    },
                    {
                        title: 'Прогнозування',
                        content: `
                            <h4>Крок 4: Прогнозування та оцінка</h4>
                            <p>Зробимо прогнози та оцінимо якість моделі:</p>
                            <ul>
                                <li>Зробіть прогнози на тестовій вибірці</li>
                                <li>Обчисліть точність моделі</li>
                            </ul>
                        `,
                        starterCode: '# Зробіть прогнози та обчисліть точність\n',
                        solution: `# Прогнозування
y_pred = model.predict(X_test)

# Оцінка точності
accuracy = accuracy_score(y_test, y_pred)
print(f"Точність моделі: {accuracy:.4f}")

# Детальний звіт
print("\nДетальний звіт:")
print(classification_report(y_test, y_pred))`
                    },
                    {
                        title: 'Аналіз важливості ознак',
                        content: `
                            <h4>Крок 5: Аналіз важливості ознак</h4>
                            <p>Проаналізуємо, які ознаки найбільш важливі для моделі:</p>
                            <ul>
                                <li>Отримайте важливість ознак з моделі</li>
                                <li>Виведіть топ-10 найважливіших ознак</li>
                            </ul>
                        `,
                        starterCode: '# Проаналізуйте важливість ознак\n',
                        solution: `# Отримання важливості ознак
feature_importance = model.feature_importances_

# Створення списку з індексами та важливістю
feature_list = [(i, importance) for i, importance in enumerate(feature_importance)]

# Сортування за важливістю
feature_list.sort(key=lambda x: x[1], reverse=True)

print("Топ-10 найважливіших ознак:")
for i, (feature_idx, importance) in enumerate(feature_list[:10]):
    print(f"{i+1}. Ознака {feature_idx}: {importance:.4f}")`
                    }
                ]
            },
            'neural-network': {
                title: 'Нейронна мережа з TensorFlow',
                difficulty: 'advanced',
                steps: [
                    {
                        title: 'Налаштування середовища',
                        content: `
                            <h4>Крок 1: Імпорт TensorFlow та підготовка</h4>
                            <p>Налаштуємо середовище для роботи з нейронними мережами:</p>
                            <ul>
                                <li>Імпорт TensorFlow та Keras</li>
                                <li>Завантаження датасету CIFAR-10</li>
                            </ul>
                        `,
                        starterCode: '# Імпортуйте TensorFlow та завантажте CIFAR-10\n',
                        solution: `import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np
import matplotlib.pyplot as plt

# Завантаження CIFAR-10
(x_train, y_train), (x_test, y_test) = keras.datasets.cifar10.load_data()

print(f"Форма тренувальних даних: {x_train.shape}")
print(f"Форма тестових даних: {x_test.shape}")
print(f"Кількість класів: {len(np.unique(y_train))}")`
                    },
                    {
                        title: 'Попередня обробка',
                        content: `
                            <h4>Крок 2: Попередня обробка даних</h4>
                            <p>Підготуємо дані для навчання нейронної мережі:</p>
                            <ul>
                                <li>Нормалізація пікселів до діапазону [0, 1]</li>
                                <li>Перетворення міток у категоріальний формат</li>
                            </ul>
                        `,
                        starterCode: '# Нормалізуйте дані та перетворіть мітки\n',
                        solution: `# Нормалізація пікселів
x_train = x_train.astype('float32') / 255.0
x_test = x_test.astype('float32') / 255.0

# Перетворення міток у категоріальний формат
y_train = keras.utils.to_categorical(y_train, 10)
y_test = keras.utils.to_categorical(y_test, 10)

print(f"Форма нормалізованих даних: {x_train.shape}")
print(f"Форма категоріальних міток: {y_train.shape}")`
                    },
                    {
                        title: 'Архітектура CNN',
                        content: `
                            <h4>Крок 3: Створення архітектури CNN</h4>
                            <p>Побудуємо згорткову нейронну мережу:</p>
                            <ul>
                                <li>Згорткові шари з ReLU активацією</li>
                                <li>MaxPooling для зменшення розмірності</li>
                                <li>Dropout для регуляризації</li>
                            </ul>
                        `,
                        starterCode: '# Створіть архітектуру CNN\n',
                        solution: `model = keras.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')
])

model.summary()`
                    },
                    {
                        title: 'Компіляція та навчання',
                        content: `
                            <h4>Крок 4: Компіляція та навчання моделі</h4>
                            <p>Налаштуємо та навчимо нейронну мережу:</p>
                            <ul>
                                <li>Компіляція з оптимізатором Adam</li>
                                <li>Навчання на декількох епохах</li>
                            </ul>
                        `,
                        starterCode: '# Скомпілюйте та навчіть модель\n',
                        solution: `# Компіляція моделі
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Навчання моделі (використовуємо менше епох для демонстрації)
history = model.fit(x_train, y_train,
                    batch_size=32,
                    epochs=5,
                    validation_data=(x_test, y_test),
                    verbose=1)

print("Навчання завершено!")`
                    },
                    {
                        title: 'Оцінка результатів',
                        content: `
                            <h4>Крок 5: Оцінка та візуалізація результатів</h4>
                            <p>Оцінимо продуктивність моделі:</p>
                            <ul>
                                <li>Обчислення точності на тестових даних</li>
                                <li>Візуалізація процесу навчання</li>
                            </ul>
                        `,
                        starterCode: '# Оцініть модель та візуалізуйте результати\n',
                        solution: `# Оцінка моделі
test_loss, test_accuracy = model.evaluate(x_test, y_test, verbose=0)
print(f"Точність на тестових даних: {test_accuracy:.4f}")

# Візуалізація процесу навчання
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label='Точність навчання')
plt.plot(history.history['val_accuracy'], label='Точність валідації')
plt.title('Точність моделі')
plt.xlabel('Епоха')
plt.ylabel('Точність')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label='Втрати навчання')
plt.plot(history.history['val_loss'], label='Втрати валідації')
plt.title('Втрати моделі')
plt.xlabel('Епоха')
plt.ylabel('Втрати')
plt.legend()

plt.tight_layout()
plt.show()`
                    }
                ]
            }
        };
    }

    initializeCodeEditor() {
        const textarea = document.getElementById('codeEditor');
        if (textarea && typeof CodeMirror !== 'undefined') {
            this.codeEditor = CodeMirror.fromTextArea(textarea, {
                mode: 'python',
                theme: 'material',
                lineNumbers: true,
                autoCloseBrackets: true,
                matchBrackets: true,
                indentUnit: 4,
                lineWrapping: true
            });
        }
    }

    openTask(taskId) {
        this.currentTask = taskId;
        this.currentStep = 1;
        this.startTime = Date.now();
        this.attempts = 0;
        
        const task = this.tasks[taskId];
        if (!task) return;
        
        document.getElementById('taskTitle').textContent = task.title;
        this.totalSteps = task.steps.length;
        
        this.updateStepContent();
        this.updateProgress();
        
        document.getElementById('taskModal').classList.add('active');
        
        // Focus on code editor
        setTimeout(() => {
            if (this.codeEditor) {
                this.codeEditor.refresh();
                this.codeEditor.focus();
            }
        }, 300);
    }

    closeTaskModal() {
        document.getElementById('taskModal').classList.remove('active');
        this.currentTask = null;
        this.clearOutput();
    }

    updateStepContent() {
        if (!this.currentTask) return;
        
        const task = this.tasks[this.currentTask];
        const step = task.steps[this.currentStep - 1];
        
        document.getElementById('instructionContent').innerHTML = step.content;
        document.getElementById('currentStep').textContent = this.currentStep;
        document.getElementById('totalSteps').textContent = this.totalSteps;
        
        // Update code editor with starter code
        if (this.codeEditor && step.starterCode) {
            this.codeEditor.setValue(step.starterCode);
        }
        
        // Update navigation buttons
        document.getElementById('prevStep').disabled = this.currentStep === 1;
        document.getElementById('nextStep').textContent = 
            this.currentStep === this.totalSteps ? 'Завершити' : 'Наступний';
    }

    updateProgress() {
        const progress = (this.currentStep / this.totalSteps) * 100;
        document.getElementById('taskProgress').style.width = `${progress}%`;
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStepContent();
            this.updateProgress();
        }
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateStepContent();
            this.updateProgress();
        } else {
            this.completeTask();
        }
    }

    runCode() {
        const code = this.codeEditor ? this.codeEditor.getValue() : 
                    document.getElementById('codeEditor').value;
        
        if (!code.trim()) {
            this.showOutput('Будь ласка, введіть код для виконання.', 'error');
            return;
        }
        
        // Simulate code execution (in real implementation, this would use a backend)
        this.showOutput('Код виконується...', 'info');
        
        setTimeout(() => {
            try {
                // Simulate successful execution
                this.showOutput('Код виконано успішно!\n\nРезультат:\n>>> ' + code, 'success');
            } catch (error) {
                this.showOutput(`Помилка виконання:\n${error.message}`, 'error');
            }
        }, 1000);
    }

    checkSolution() {
        if (!this.currentTask) return;
        
        const code = this.codeEditor ? this.codeEditor.getValue() : 
                    document.getElementById('codeEditor').value;
        
        const task = this.tasks[this.currentTask];
        const step = task.steps[this.currentStep - 1];
        
        this.attempts++;
        
        // Simple solution checking (in real implementation, this would be more sophisticated)
        const isCorrect = this.validateSolution(code, step.solution);
        
        if (isCorrect) {
            this.showOutput('✅ Правильно! Ваше рішення коректне.', 'success');
            
            // Auto-advance to next step after a delay
            setTimeout(() => {
                if (this.currentStep < this.totalSteps) {
                    this.nextStep();
                } else {
                    this.completeTask();
                }
            }, 2000);
        } else {
            this.showOutput('❌ Рішення потребує доопрацювання. Спробуйте ще раз.', 'error');
        }
    }

    validateSolution(userCode, expectedSolution) {
        // Simple validation - check if key elements are present
        const userCodeClean = userCode.replace(/\s+/g, ' ').toLowerCase();
        const expectedCodeClean = expectedSolution.replace(/\s+/g, ' ').toLowerCase();
        
        // Extract key keywords from expected solution
        const keywords = expectedCodeClean.match(/\b(import|from|def|class|if|for|while|print)\b/g) || [];
        
        // Check if most keywords are present in user code
        const matchedKeywords = keywords.filter(keyword => 
            userCodeClean.includes(keyword)
        );
        
        return matchedKeywords.length >= Math.ceil(keywords.length * 0.7);
    }

    showOutput(message, type = 'info') {
        const outputContent = document.getElementById('outputContent');
        const timestamp = new Date().toLocaleTimeString();
        
        const outputElement = document.createElement('div');
        outputElement.className = `output-${type}`;
        outputElement.innerHTML = `<strong>[${timestamp}]</strong> ${message.replace(/\n/g, '<br>')}`;
        
        outputContent.appendChild(outputElement);
        outputContent.scrollTop = outputContent.scrollHeight;
    }

    clearOutput() {
        const outputContent = document.getElementById('outputContent');
        outputContent.innerHTML = '<p class="output-placeholder">Результат виконання коду з\'явиться тут...</p>';
    }

    resetTask() {
        if (!this.currentTask) return;
        
        this.currentStep = 1;
        this.attempts = 0;
        this.startTime = Date.now();
        
        this.updateStepContent();
        this.updateProgress();
        this.clearOutput();
        
        this.showNotification('Завдання скинуто', 'info');
    }

    completeTask() {
        const completionTime = Math.round((Date.now() - this.startTime) / 1000);
        const score = Math.max(100 - (this.attempts - 1) * 10, 50);
        
        // Update success modal
        document.getElementById('completionTime').textContent = `${Math.floor(completionTime / 60)}:${(completionTime % 60).toString().padStart(2, '0')}`;
        document.getElementById('attemptsCount').textContent = this.attempts;
        document.getElementById('scoreEarned').textContent = score;
        
        // Close task modal and show success modal
        this.closeTaskModal();
        document.getElementById('successModal').classList.add('active');
        
        // Save progress
        this.saveProgress();
    }

    closeSuccessModal() {
        document.getElementById('successModal').classList.remove('active');
    }

    goToNextTask() {
        this.closeSuccessModal();
        // Logic to open next task
        this.showNotification('Функція "Наступне завдання" буде реалізована', 'info');
    }

    backToTaskList() {
        this.closeSuccessModal();
    }

    saveProgress() {
        const progress = JSON.parse(localStorage.getItem('practiceProgress') || '{}');
        progress[this.currentTask] = {
            completed: true,
            completionTime: Date.now(),
            attempts: this.attempts,
            score: Math.max(100 - (this.attempts - 1) * 10, 50)
        };
        localStorage.setItem('practiceProgress', JSON.stringify(progress));
    }

    handleKeyboardShortcuts(e) {
        if (!document.getElementById('taskModal').classList.contains('active')) return;
        
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'Enter':
                    e.preventDefault();
                    this.runCode();
                    break;
                case 's':
                    e.preventDefault();
                    this.checkSolution();
                    break;
                case 'r':
                    e.preventDefault();
                    this.resetTask();
                    break;
            }
        }
        
        if (e.key === 'Escape') {
            this.closeTaskModal();
        }
    }

    showNotification(message, type = 'info') {
        // Use the notification system from main.js if available
        if (window.showNotification) {
            window.showNotification(message, type);
        } else {
            alert(message);
        }
    }
}

// Global function to open tasks
function openTask(taskId) {
    if (window.practiceManager) {
        window.practiceManager.openTask(taskId);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.practiceManager = new PracticeManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PracticeManager;
}