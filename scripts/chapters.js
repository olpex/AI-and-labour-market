// Chapter navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeChapterNavigation();
    initializeContentSections();
    initializeProgressTracking();
});

// Initialize chapter navigation
function initializeChapterNavigation() {
    const contentNav = document.querySelector('.content-nav');
    const contentSections = document.querySelectorAll('.content-section');
    
    if (!contentNav) return;
    
    const navLinks = contentNav.querySelectorAll('a');
    
    // Add click handlers to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showContentSection(targetId);
            
            // Update active nav item
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Update progress
            updateSectionProgress(targetId);
        });
    });
    
    // Show first section by default
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
        const firstSectionId = navLinks[0].getAttribute('href').substring(1);
        showContentSection(firstSectionId);
    }
}

// Show specific content section
function showContentSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
        
        // Smooth scroll to section
        targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Animate section appearance
        setTimeout(() => {
            targetSection.style.opacity = '0';
            targetSection.style.transform = 'translateY(20px)';
            targetSection.style.transition = 'all 0.3s ease';
            
            requestAnimationFrame(() => {
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
            });
        }, 50);
    }
}

// Initialize content sections
function initializeContentSections() {
    const sections = document.querySelectorAll('.content-section');
    
    // Hide all sections initially
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Initialize interactive elements
    initializeToolCards();
    initializeExampleCards();
    initializeProgressBars();
}

// Initialize tool cards interactivity
function initializeToolCards() {
    const toolCards = document.querySelectorAll('.tool-card, .example-card, .skill-card');
    
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
}

// Initialize example cards
function initializeExampleCards() {
    const exampleItems = document.querySelectorAll('.example-item');
    
    exampleItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('expanded');
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize progress bars
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress') || '0';
        const progressFill = bar.querySelector('.progress-fill');
        
        if (progressFill) {
            setTimeout(() => {
                progressFill.style.width = progress + '%';
            }, 500);
        }
    });
}

// Update section progress
function updateSectionProgress(sectionId) {
    const progressKey = `chapter_progress_${window.location.pathname}`;
    let progress = JSON.parse(localStorage.getItem(progressKey) || '{}');
    
    progress[sectionId] = {
        visited: true,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(progressKey, JSON.stringify(progress));
    
    // Update progress indicator
    updateProgressIndicator(progress);
}

// Update progress indicator
function updateProgressIndicator(progress) {
    const totalSections = document.querySelectorAll('.content-section').length;
    const completedSections = Object.keys(progress).length;
    const progressPercentage = Math.round((completedSections / totalSections) * 100);
    
    const progressIndicator = document.querySelector('.progress-indicator');
    if (progressIndicator) {
        progressIndicator.textContent = `Прогрес: ${progressPercentage}%`;
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .content-section {
        transition: all 0.3s ease;
    }
    
    .tool-card, .example-card, .skill-card {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .example-item {
        transition: all 0.2s ease;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    
    .example-item:hover {
        background-color: rgba(74, 144, 226, 0.1);
        transform: translateX(5px);
    }
    
    .example-item.expanded {
        background-color: rgba(74, 144, 226, 0.15);
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(74, 144, 226, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .content-nav a {
        transition: all 0.3s ease;
        position: relative;
    }
    
    .content-nav a.active {
        color: #4a90e2;
        font-weight: 600;
    }
    
    .content-nav a.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #4a90e2;
    }
    
    .progress-fill {
        transition: width 1s ease;
    }
`;
document.head.appendChild(style);