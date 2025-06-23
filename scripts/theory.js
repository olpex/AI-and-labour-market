// Theory page specific JavaScript functionality

// Initialize theory page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheoryNavigation();
    initializeNotesSystem();
    initializeInteractiveDemo();
    initializeBookmarks();
    initializeProgressTracking();
});

// Theory navigation functionality
function initializeTheoryNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Update progress
            updateLessonProgress(targetId);
        });
    });
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Smooth scroll to top of content
        document.querySelector('.lesson-content').scrollTop = 0;
        
        // Update breadcrumb
        updateBreadcrumb(sectionId);
    }
}

function updateBreadcrumb(sectionId) {
    const breadcrumb = document.querySelector('.breadcrumb');
    const sectionTitles = {
        'intro': 'Що таке штучний інтелект?',
        'history': 'Історія розвитку AI',
        'types': 'Типи штучного інтелекту',
        'applications': 'Застосування AI',
        'ml-intro': 'Вступ до ML',
        'supervised': 'Навчання з учителем',
        'unsupervised': 'Навчання без учителя',
        'reinforcement': 'Навчання з підкріпленням',
        'career-paths': 'Професії в AI',
        'skills': 'Необхідні навички',
        'education': 'Освіта та сертифікація',
        'portfolio': 'Створення портфоліо'
    };
    
    const sectionTitle = sectionTitles[sectionId] || 'Невідомий розділ';
    breadcrumb.innerHTML = `
        <a href="index.html">Головна</a>
        <span>/</span>
        <span>Теорія</span>
        <span>/</span>
        <span>${sectionTitle}</span>
    `;
}

// Notes system functionality
function initializeNotesSystem() {
    const toggleNotesBtn = document.getElementById('toggleNotes');
    const notesPanel = document.getElementById('notesPanel');
    const closeNotesBtn = document.getElementById('closeNotes');
    const saveNotesBtn = document.getElementById('saveNotes');
    const clearNotesBtn = document.getElementById('clearNotes');
    const notesTextarea = document.getElementById('notesTextarea');
    
    // Load saved notes
    loadNotes();
    
    toggleNotesBtn.addEventListener('click', function() {
        notesPanel.classList.toggle('active');
    });
    
    closeNotesBtn.addEventListener('click', function() {
        notesPanel.classList.remove('active');
    });
    
    saveNotesBtn.addEventListener('click', function() {
        saveNotes();
        showNotification('Нотатки збережено!', 'success');
    });
    
    clearNotesBtn.addEventListener('click', function() {
        if (confirm('Ви впевнені, що хочете очистити всі нотатки?')) {
            notesTextarea.value = '';
            saveNotes();
            showNotification('Нотатки очищено!', 'info');
        }
    });
    
    // Auto-save notes every 30 seconds
    setInterval(saveNotes, 30000);
}

function saveNotes() {
    const notesTextarea = document.getElementById('notesTextarea');
    const currentSection = document.querySelector('.nav-item.active')?.getAttribute('href')?.substring(1) || 'general';
    
    const notes = {
        content: notesTextarea.value,
        timestamp: new Date().toISOString(),
        section: currentSection
    };
    
    localStorage.setItem(`notes_${currentSection}`, JSON.stringify(notes));
}

function loadNotes() {
    const currentSection = document.querySelector('.nav-item.active')?.getAttribute('href')?.substring(1) || 'intro';
    const savedNotes = localStorage.getItem(`notes_${currentSection}`);
    
    if (savedNotes) {
        const notes = JSON.parse(savedNotes);
        document.getElementById('notesTextarea').value = notes.content || '';
    }
}

// Interactive demo functionality
function initializeInteractiveDemo() {
    const canvas = document.getElementById('regressionCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const dataPointsSlider = document.getElementById('dataPoints');
    const noiseSlider = document.getElementById('noise');
    const trainButton = document.getElementById('trainModel');
    
    // Update slider values display
    dataPointsSlider.addEventListener('input', function() {
        document.getElementById('dataPointsValue').textContent = this.value;
    });
    
    noiseSlider.addEventListener('input', function() {
        document.getElementById('noiseValue').textContent = this.value;
    });
    
    trainButton.addEventListener('click', function() {
        trainRegressionModel();
    });
    
    // Initialize with default values
    trainRegressionModel();
}

function trainRegressionModel() {
    const canvas = document.getElementById('regressionCanvas');
    const ctx = canvas.getContext('2d');
    const dataPoints = parseInt(document.getElementById('dataPoints').value);
    const noiseLevel = parseInt(document.getElementById('noise').value);
    
    const startTime = performance.now();
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Generate synthetic data
    const data = generateSyntheticData(dataPoints, noiseLevel);
    
    // Perform linear regression
    const model = performLinearRegression(data);
    
    // Draw data points and regression line
    drawVisualization(ctx, data, model, canvas.width, canvas.height);
    
    const endTime = performance.now();
    const trainingTime = Math.round(endTime - startTime);
    
    // Calculate accuracy (R-squared)
    const accuracy = calculateRSquared(data, model);
    
    // Update results display
    document.getElementById('accuracy').textContent = `${(accuracy * 100).toFixed(1)}%`;
    document.getElementById('trainingTime').textContent = `${trainingTime} мс`;
}

function generateSyntheticData(numPoints, noiseLevel) {
    const data = [];
    const slope = 2;
    const intercept = 10;
    
    for (let i = 0; i < numPoints; i++) {
        const x = (i / numPoints) * 100;
        const noise = (Math.random() - 0.5) * noiseLevel;
        const y = slope * x + intercept + noise;
        data.push({ x, y });
    }
    
    return data;
}

function performLinearRegression(data) {
    const n = data.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    
    data.forEach(point => {
        sumX += point.x;
        sumY += point.y;
        sumXY += point.x * point.y;
        sumXX += point.x * point.x;
    });
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    return { slope, intercept };
}

function drawVisualization(ctx, data, model, width, height) {
    const padding = 40;
    const plotWidth = width - 2 * padding;
    const plotHeight = height - 2 * padding;
    
    // Find data bounds
    const xMin = Math.min(...data.map(p => p.x));
    const xMax = Math.max(...data.map(p => p.x));
    const yMin = Math.min(...data.map(p => p.y));
    const yMax = Math.max(...data.map(p => p.y));
    
    // Draw axes
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Draw data points
    ctx.fillStyle = '#667eea';
    data.forEach(point => {
        const x = padding + ((point.x - xMin) / (xMax - xMin)) * plotWidth;
        const y = height - padding - ((point.y - yMin) / (yMax - yMin)) * plotHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    // Draw regression line
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const x1 = padding;
    const y1 = height - padding - ((model.slope * xMin + model.intercept - yMin) / (yMax - yMin)) * plotHeight;
    const x2 = width - padding;
    const y2 = height - padding - ((model.slope * xMax + model.intercept - yMin) / (yMax - yMin)) * plotHeight;
    
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    
    // Add labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px Inter';
    ctx.fillText('X', width - padding + 10, height - padding + 5);
    ctx.fillText('Y', padding - 15, padding - 10);
}

function calculateRSquared(data, model) {
    const yMean = data.reduce((sum, point) => sum + point.y, 0) / data.length;
    
    let ssRes = 0; // Sum of squares of residuals
    let ssTot = 0; // Total sum of squares
    
    data.forEach(point => {
        const predicted = model.slope * point.x + model.intercept;
        ssRes += Math.pow(point.y - predicted, 2);
        ssTot += Math.pow(point.y - yMean, 2);
    });
    
    return 1 - (ssRes / ssTot);
}

// Bookmarks functionality
function initializeBookmarks() {
    const toggleBookmarkBtn = document.getElementById('toggleBookmark');
    
    toggleBookmarkBtn.addEventListener('click', function() {
        const currentSection = document.querySelector('.nav-item.active')?.getAttribute('href')?.substring(1) || 'intro';
        toggleBookmark(currentSection);
    });
    
    // Load bookmarks on page load
    loadBookmarks();
}

function toggleBookmark(sectionId) {
    const bookmarks = getBookmarks();
    const toggleBtn = document.getElementById('toggleBookmark');
    const icon = toggleBtn.querySelector('i');
    
    if (bookmarks.includes(sectionId)) {
        // Remove bookmark
        const index = bookmarks.indexOf(sectionId);
        bookmarks.splice(index, 1);
        icon.classList.remove('fas');
        icon.classList.add('far');
        showNotification('Закладку видалено', 'info');
    } else {
        // Add bookmark
        bookmarks.push(sectionId);
        icon.classList.remove('far');
        icon.classList.add('fas');
        showNotification('Закладку додано', 'success');
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    updateBookmarkDisplay();
}

function getBookmarks() {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
}

function loadBookmarks() {
    const bookmarks = getBookmarks();
    const currentSection = document.querySelector('.nav-item.active')?.getAttribute('href')?.substring(1) || 'intro';
    const toggleBtn = document.getElementById('toggleBookmark');
    const icon = toggleBtn.querySelector('i');
    
    if (bookmarks.includes(currentSection)) {
        icon.classList.remove('far');
        icon.classList.add('fas');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
    }
    
    updateBookmarkDisplay();
}

function updateBookmarkDisplay() {
    const bookmarks = getBookmarks();
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const sectionId = item.getAttribute('href').substring(1);
        if (bookmarks.includes(sectionId)) {
            item.classList.add('bookmarked');
        } else {
            item.classList.remove('bookmarked');
        }
    });
}

// Progress tracking
function initializeProgressTracking() {
    loadProgress();
    updateProgressDisplay();
}

function updateLessonProgress(sectionId) {
    const progress = getProgress();
    if (!progress.completed.includes(sectionId)) {
        progress.completed.push(sectionId);
        progress.lastAccessed = sectionId;
        progress.timeSpent = (progress.timeSpent || 0) + 1;
        
        localStorage.setItem('learningProgress', JSON.stringify(progress));
        updateProgressDisplay();
        
        // Mark as completed in navigation
        const navItem = document.querySelector(`[href="#${sectionId}"]`);
        if (navItem) {
            navItem.classList.add('completed');
        }
    }
}

function getProgress() {
    const saved = localStorage.getItem('learningProgress');
    return saved ? JSON.parse(saved) : {
        completed: [],
        lastAccessed: null,
        timeSpent: 0,
        startDate: new Date().toISOString()
    };
}

function loadProgress() {
    const progress = getProgress();
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const sectionId = item.getAttribute('href').substring(1);
        if (progress.completed.includes(sectionId)) {
            item.classList.add('completed');
        }
    });
}

function updateProgressDisplay() {
    const progress = getProgress();
    const totalSections = document.querySelectorAll('.nav-item').length;
    const completedSections = progress.completed.length;
    const progressPercentage = Math.round((completedSections / totalSections) * 100);
    
    const progressText = document.querySelector('.progress-text');
    const progressFill = document.querySelector('.progress-fill');
    
    if (progressText && progressFill) {
        progressText.textContent = `Прогрес: ${progressPercentage}%`;
        progressFill.style.width = `${progressPercentage}%`;
    }
}

// Navigation functions
function nextLesson() {
    const currentActive = document.querySelector('.nav-item.active');
    const allNavItems = Array.from(document.querySelectorAll('.nav-item'));
    const currentIndex = allNavItems.indexOf(currentActive);
    
    if (currentIndex < allNavItems.length - 1) {
        const nextItem = allNavItems[currentIndex + 1];
        nextItem.click();
        
        // Smooth scroll to next item in sidebar
        nextItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        showNotification('Ви завершили всі уроки цього модуля!', 'success');
    }
}

function previousLesson() {
    const currentActive = document.querySelector('.nav-item.active');
    const allNavItems = Array.from(document.querySelectorAll('.nav-item'));
    const currentIndex = allNavItems.indexOf(currentActive);
    
    if (currentIndex > 0) {
        const prevItem = allNavItems[currentIndex - 1];
        prevItem.click();
        
        // Smooth scroll to previous item in sidebar
        prevItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Only activate shortcuts when not typing in input fields
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    
    switch(e.key) {
        case 'ArrowRight':
        case 'n':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                nextLesson();
            }
            break;
        case 'ArrowLeft':
        case 'p':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                previousLesson();
            }
            break;
        case 'b':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                document.getElementById('toggleBookmark').click();
            }
            break;
        case 'n':
            if (e.altKey) {
                e.preventDefault();
                document.getElementById('toggleNotes').click();
            }
            break;
    }
});

// Export functions for global access
window.nextLesson = nextLesson;
window.previousLesson = previousLesson;
window.showSection = showSection;
window.toggleBookmark = toggleBookmark;

// Add CSS for bookmarked items
const bookmarkStyles = document.createElement('style');
bookmarkStyles.textContent = `
    .nav-item.bookmarked::after {
        content: '🔖';
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.75rem;
    }
    
    .nav-item.bookmarked.completed::after {
        content: '🔖 ✓';
    }
`;
document.head.appendChild(bookmarkStyles);