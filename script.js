// STDC - Stop Tree Devastation Campaign
// Main JavaScript file for enhanced functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initNavigation();
    initContactForm();
    initPledgeSystem();
    initAnimations();
    initScrollEffects();
    initImageOptimization();
    initDynamicHeader();
    
    console.log('STDC - Stop Tree Devastation Campaign loaded successfully! 🌱');
});

// ===== NAVIGATION ENHANCEMENTS =====
function initNavigation() {
    // Add active state to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== CONTACT FORM ENHANCEMENTS =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Enhanced form validation
    const formFields = contactForm.querySelectorAll('input, textarea');
    
    formFields.forEach(field => {
        // Real-time validation
        field.addEventListener('blur', validateField);
        field.addEventListener('input', clearFieldError);
    });
    
    contactForm.addEventListener('submit', handleFormSubmission);
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Validation rules
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    } else if (field.id === 'name' && value.length < 2) {
        isValid = false;
        errorMessage = 'Name must be at least 2 characters long.';
    } else if (field.id === 'message' && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long.';
    }
    
    // Apply error styling and message
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Validate all fields
    const fields = form.querySelectorAll('input, textarea');
    let allValid = true;
    
    fields.forEach(field => {
        if (!validateField({ target: field })) {
            allValid = false;
        }
    });
    
    if (!allValid) {
        showNotification('Please fix the errors in the form.', 'error');
        return;
    }
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual backend integration)
    setTimeout(() => {
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// ===== PLEDGE SYSTEM ENHANCEMENTS =====
function initPledgeSystem() {
    // Enhanced pledge system with localStorage
    const pledgeButton = document.querySelector('button[onclick="takePledge()"]');
    if (pledgeButton) {
        pledgeButton.removeAttribute('onclick');
        pledgeButton.addEventListener('click', takePledge);
    }
}

function takePledge() {
    const pledges = [
        "I pledge to reduce my paper consumption by 50%",
        "I pledge to plant at least one tree this year",
        "I pledge to support sustainable brands only",
        "I pledge to spread awareness about deforestation",
        "I pledge to reduce my meat consumption",
        "I pledge to use digital alternatives when possible",
        "I pledge to recycle all paper products",
        "I pledge to support forest conservation organizations"
    ];
    
    const randomPledge = pledges[Math.floor(Math.random() * pledges.length)];
    
    // Store pledge in localStorage
    const userPledges = JSON.parse(localStorage.getItem('stdcPledges') || '[]');
    const newPledge = {
        text: randomPledge,
        date: new Date().toISOString(),
        id: Date.now()
    };
    userPledges.push(newPledge);
    localStorage.setItem('stdcPledges', JSON.stringify(userPledges));
    
    // Show enhanced pledge confirmation
    showPledgeModal(randomPledge);
    
    // Update pledge counter if it exists
    updatePledgeCounter();
}

function showPledgeModal(pledgeText) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'pledge-modal';
    modal.innerHTML = `
        <div class="pledge-modal-content">
            <div class="pledge-header">
                <h3>🌱 Thank You for Taking the Pledge!</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="pledge-body">
                <p class="pledge-text">"${pledgeText}"</p>
                <div class="pledge-stats">
                    <div class="stat">
                        <span class="stat-number">${getTotalPledges()}</span>
                        <span class="stat-label">Total Pledges</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">${getTodayPledges()}</span>
                        <span class="stat-label">Today's Pledges</span>
                    </div>
                </div>
                <p class="pledge-message">Together, we can make a difference! Every pledge counts towards protecting our forests.</p>
                <button class="cta-button share-pledge">Share Your Pledge</button>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .pledge-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        .pledge-modal-content {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            text-align: center;
            animation: slideUp 0.3s ease;
        }
        .pledge-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }
        .close-modal {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        .pledge-text {
            font-size: 1.2rem;
            font-weight: 600;
            color: #2d5016;
            margin-bottom: 1.5rem;
            padding: 1rem;
            background: rgba(90, 119, 57, 0.1);
            border-radius: 10px;
        }
        .pledge-stats {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin: 1.5rem 0;
        }
        .stat {
            text-align: center;
        }
        .stat-number {
            display: block;
            font-size: 2rem;
            font-weight: bold;
            color: #5A7739;
        }
        .stat-label {
            font-size: 0.9rem;
            color: #666;
        }
        .pledge-message {
            margin: 1.5rem 0;
            color: #666;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    
    // Event listeners
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.querySelector('.share-pledge').addEventListener('click', () => {
        sharePledge(pledgeText);
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(modal)) {
            modal.remove();
        }
    }, 5000);
}

function getTotalPledges() {
    const pledges = JSON.parse(localStorage.getItem('stdcPledges') || '[]');
    return pledges.length;
}

function getTodayPledges() {
    const pledges = JSON.parse(localStorage.getItem('stdcPledges') || '[]');
    const today = new Date().toDateString();
    return pledges.filter(pledge => new Date(pledge.date).toDateString() === today).length;
}

function updatePledgeCounter() {
    const counter = document.querySelector('.pledge-counter');
    if (counter) {
        counter.textContent = getTotalPledges();
    }
}

function sharePledge(pledgeText) {
    const shareText = `I just pledged to help stop deforestation: "${pledgeText}" Join me at STDC! 🌱`;
    
    if (navigator.share) {
        navigator.share({
            title: 'STDC Pledge',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Pledge copied to clipboard!', 'success');
        });
    }
}

// ===== ANIMATION ENHANCEMENTS =====
function initAnimations() {
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
    document.querySelectorAll('.intro, .msg, .vision, .mission, .content, .cta-button').forEach(el => {
        observer.observe(el);
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Parallax effect for banner images
    const banners = document.querySelectorAll('.banner, .banner-def, .banner-eff, .banner-cau');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        banners.forEach(banner => {
            const rate = scrolled * -0.5;
            banner.style.transform = `translateY(${rate}px)`;
        });
    });
    
    // Smooth scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #5A7739;
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(90, 119, 57, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== IMAGE OPTIMIZATION =====
function initImageOptimization() {
    // Lazy loading for images
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
}

// ===== DYNAMIC HEADER FUNCTIONALITY =====
function initDynamicHeader() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const scrollThreshold = 100; // Minimum scroll before hiding header
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Only hide/show header if scrolled past threshold
        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down - hide header
                header.classList.add('header-hidden');
            } else {
                // Scrolling up - show header
                header.classList.remove('header-hidden');
            }
        } else {
            // Near top of page - always show header
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Show header when user hovers near top of screen
    document.addEventListener('mouseover', function(e) {
        if (e.clientY < 100) {
            header.classList.remove('header-hidden');
        }
    });
}

// ===== UTILITY FUNCTIONS =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#27ae60';
            break;
        case 'error':
            notification.style.background = '#e74c3c';
            break;
        case 'warning':
            notification.style.background = '#f39c12';
            break;
        default:
            notification.style.background = '#3498db';
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.remove();
            }
        }, 300);
    }, 5000);
    
    // Add animation styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== DYNAMIC HEADER FUNCTIONALITY =====
function initDynamicHeader() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const scrollThreshold = 100; // Minimum scroll before hiding header
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Only hide/show header if scrolled past threshold
        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down - hide header
                header.classList.add('header-hidden');
            } else {
                // Scrolling up - show header
                header.classList.remove('header-hidden');
            }
        } else {
            // Near top of page - always show header
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Show header when user hovers near top of screen
    document.addEventListener('mouseover', function(e) {
        if (e.clientY < 100) {
            header.classList.remove('header-hidden');
        }
    });
}

// ===== GLOBAL FUNCTIONS (for backward compatibility) =====
window.takePledge = takePledge; 