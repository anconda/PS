// Dynamic Header Functionality
// Hides header when scrolling down, shows when scrolling up

function initDynamicHeader() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const scrollThreshold = 100; // Minimum scroll before hiding header
    
    if (!header) return;
    
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDynamicHeader); 