
document.addEventListener('DOMContentLoaded', function() {
    // Variables for navigation
    const sections = document.querySelectorAll('.section');
    const navDots = document.querySelectorAll('.nav-dot');
    const navLinks = document.querySelectorAll('.nav-link');
    const nextButton = document.querySelector('.next-section');
    const prevButton = document.querySelector('.prev-section');
    let currentIndex = 0;
    let isScrolling = false;
    
    // Animation elements
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Booking form (overlay)
    const reservaBtn = document.getElementById('reservaCita');
    const heroFormOverlay = document.getElementById('heroFormOverlay');
    const closeFormBtn = document.getElementById('closeForm');
    
    // Learn more button
    const conoceMasBtn = document.getElementById('conoceMas');
    
    // Mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menuNav = document.querySelector('nav ul');
    
    // Function to show a specific section
    function goToSection(index) {
        if (isScrolling) return;
        
        // Validate index
        if (index < 0) index = 0;
        if (index >= sections.length) index = sections.length - 1;
        
        // Do nothing if trying to go to same section
        if (currentIndex === index) {
            return;
        }
        
        isScrolling = true;
        currentIndex = index;
        
        // Prepare animations before showing section
        prepareAnimations();
        
        // If mobile menu is open, close it
        if (menuNav.classList.contains('show')) {
            menuNav.classList.remove('show');
        }
        
        // Hide all sections and show current one
        sections.forEach((section, i) => {
            if (i === index) {
                section.style.display = 'flex';
                section.scrollTop = 0; // Scroll to top of section
                
                // Check if section needs internal scroll
                const container = section.querySelector('.container');
                if (container && container.scrollHeight > section.clientHeight) {
                    section.classList.add('has-scroll');
                } else {
                    section.classList.remove('has-scroll');
                }
                
                // Activate animations for current section
                activateAnimations(section);
            } else {
                section.style.display = 'none';
            }
        });
        
        // Update dot navigation
        navDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Update menu navigation
        navLinks.forEach((link, i) => {
            if (i === index) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Update scroll indicators when changing sections
        updateScrollIndicators();
        
        // Ensure section height is correct
        updateSectionHeights();
        
        // Allow new scroll after a brief delay
        setTimeout(() => {
            isScrolling = false;
            // Update indicators again after transition completes
            updateScrollIndicators();
        }, 800);
    }
    
    // Prepare all animations
    function prepareAnimations() {
        // Reset all animations
        document.querySelectorAll('.animate-fadeInUp, .animate-fadeInLeft, .animate-fadeInRight, .animate-zoomIn').forEach(elem => {
            // Don't remove opacity-0 class to keep elements invisible
            // until animation is activated
        });
    }
    
    // Activate elements with animations in a specific section
    function activateAnimations(section) {
        // Activate fadeInUp animations
        const fadeUpElems = section.querySelectorAll('.animate-fadeInUp');
        fadeUpElems.forEach((elem, i) => {
            setTimeout(() => {
                elem.classList.remove('opacity-0');
            }, 100 * i);
        });
        
        // Activate fadeInLeft animations
        const fadeLeftElems = section.querySelectorAll('.animate-fadeInLeft');
        fadeLeftElems.forEach((elem, i) => {
            setTimeout(() => {
                elem.classList.remove('opacity-0');
            }, 150 * i + 200);
        });
        
        // Activate fadeInRight animations
        const fadeRightElems = section.querySelectorAll('.animate-fadeInRight');
        fadeRightElems.forEach((elem, i) => {
            setTimeout(() => {
                elem.classList.remove('opacity-0');
            }, 150 * i + 200);
        });
        
        // Activate zoomIn animations
        const zoomElems = section.querySelectorAll('.animate-zoomIn');
        zoomElems.forEach((elem, i) => {
            setTimeout(() => {
                elem.classList.remove('opacity-0');
            }, 250 * i + 300);
        });
        
        // Activate elements with fade-in (legacy)
        const fadeElems = section.querySelectorAll('.fade-in');
        fadeElems.forEach((elem, i) => {
            setTimeout(() => {
                elem.classList.add('active');
            }, 200 * i);
        });
    }
    
    // Add scroll progress bar for mobile
    const body = document.body;
    // Create element for progress bar
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    const scrollProgressBar = document.createElement('div');
    scrollProgressBar.className = 'scroll-progress-bar';
    scrollProgress.appendChild(scrollProgressBar);
    body.appendChild(scrollProgress);
    
    // Add scroll indicators for mobile sections
    sections.forEach(section => {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = '<i class="fas fa-chevron-down"></i>';
        section.appendChild(scrollIndicator);
    });
    
    // Function to update scroll indicators
    function updateScrollIndicators() {
        const currentSection = sections[currentIndex];
        const scrollIndicator = currentSection.querySelector('.scroll-indicator');
        
        // Show/hide scroll indicator based on whether there's scrollable content
        if (currentSection.classList.contains('has-scroll') && 
            (currentSection.scrollHeight - currentSection.scrollTop - 5) > currentSection.clientHeight) {
            scrollIndicator.classList.add('show');
        } else {
            scrollIndicator.classList.remove('show');
        }
        
        // Update progress bar
        const scrollPercentage = (currentSection.scrollTop / (currentSection.scrollHeight - currentSection.clientHeight)) * 100;
        scrollProgressBar.style.width = `${isNaN(scrollPercentage) ? 0 : scrollPercentage}%`;
        
        // Update progress bar visibility
        if (currentSection.classList.contains('has-scroll')) {
            scrollProgress.style.opacity = '1';
        } else {
            scrollProgress.style.opacity = '0';
        }
    }
    
    // Add event handlers for sections with scroll
    sections.forEach(section => {
        section.addEventListener('scroll', updateScrollIndicators);
    });
    
    // Initialize: Show only first section
    goToSection(0);
    
    // Function to check if a section needs internal scroll
    function checkSectionNeedsScroll() {
        sections.forEach(section => {
            const container = section.querySelector('.container');
            if (container) {
                // If content is taller than visible section, enable scroll
                if (container.scrollHeight > section.clientHeight) {
                    section.classList.add('has-scroll');
                } else {
                    section.classList.remove('has-scroll');
                }
            }
        });
    }
    
    // We don't need this function now since all sections have automatic scroll
    // But keep resize event for other updates if needed
    window.addEventListener('resize', function() {
        // Calculate correct visible height for each section
        updateSectionHeights();
        // Update indicators
        updateScrollIndicators();
    });
    
    // Function to update section heights
    function updateSectionHeights() {
        // Get real navbar height
        const navbarHeight = document.querySelector('header').offsetHeight;
        
        // Update all sections
        sections.forEach(section => {
            // Update padding-top to compensate for navbar
            section.style.paddingTop = `${navbarHeight}px`;
            
            // Update container minHeight
            const container = section.querySelector('.container');
            if (container) {
                container.style.minHeight = `calc(100% - ${navbarHeight}px)`;
            }
        });
    }
    
    // Run at start
    updateSectionHeights();
    
    // Improved mouse wheel navigation system
    window.addEventListener('wheel', function(e) {
        if (isScrolling) return;
        
        const currentSection = sections[currentIndex];
        
        // For devices of any size, apply the same smart scroll logic
        // Determine if we're at the beginning or end of scroll
        const isAtTop = currentSection.scrollTop <= 5; // 5px tolerance
        const isAtBottom = (currentSection.scrollHeight - currentSection.scrollTop - 10) <= currentSection.clientHeight;
        
        // If we're at scroll limits, navigate between sections
        if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
            e.preventDefault(); // Prevent default behavior
            
            if (e.deltaY > 0) {
                // Scroll down
                goToSection(currentIndex + 1);
            } else {
                // Scroll up
                goToSection(currentIndex - 1);
            }
        }
        // Otherwise, allow normal scroll within section
    }, { passive: false }); // passive: false to be able to use preventDefault
    
    // Events for dot navigation
    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            goToSection(index);
        });
    });
    
    // Events for menu navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent submenus from triggering navigation
            if (this.querySelector('.fas.fa-chevron-down')) {
                return;
            }
            const index = parseInt(this.getAttribute('data-index'));
            goToSection(index);
            
            // If mobile menu is open, close it
            if (window.innerWidth <= 768) {
                menuNav.classList.remove('show');
            }
        });
    });
    
    // Events for next/previous buttons
    nextButton.addEventListener('click', function() {
        goToSection(currentIndex + 1);
    });
    
    prevButton.addEventListener('click', function() {
        goToSection(currentIndex - 1);
    });
    
    // Event for Book Appointment button (show overlay form)
    if (reservaBtn) {
        reservaBtn.addEventListener('click', function() {
            heroFormOverlay.classList.add('active');
        });
    }
    
    // Event to close form
    if (closeFormBtn) {
        closeFormBtn.addEventListener('click', function() {
            heroFormOverlay.classList.remove('active');
        });
    }
    
    // Close form when clicking outside it
    heroFormOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
            heroFormOverlay.classList.remove('active');
        }
    });
    
    // Event for Learn More button
    if (conoceMasBtn) {
        conoceMasBtn.addEventListener('click', function() {
            goToSection(1); // Go to services section
        });
    }
    
    // Events for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (isScrolling) return;
        
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            goToSection(currentIndex + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            goToSection(currentIndex - 1);
        } else if (e.key === 'Escape' && heroFormOverlay.classList.contains('active')) {
            heroFormOverlay.classList.remove('active');
        }
    });
    
    // Improved support for touch events on mobile devices
    let touchStartY = 0;
    let touchStartTime = 0;
    let lastTouchEnd = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now(); // Save initial touch time
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        // Detect touch end for possible section navigation
        const currentSection = sections[currentIndex];
        const now = Date.now();
        
        // Avoid multiple quick activations
        if (now - lastTouchEnd < 300) {
            return;
        }
        lastTouchEnd = now;
        
        // Determine if we're at the beginning or end of scroll
        const isAtTop = currentSection.scrollTop <= 5;
        const isAtBottom = (currentSection.scrollHeight - currentSection.scrollTop - 10) <= currentSection.clientHeight;
        
        // If we're at top or bottom limit, check for section change
        if (isAtTop || isAtBottom) {
            // Add small delay to allow any ongoing animation to finish
            setTimeout(function() {
                updateScrollIndicators();
            }, 100);
        }
    });
    
    document.addEventListener('touchmove', function(e) {
        if (isScrolling) return;
        
        const currentSection = sections[currentIndex];
        const touchEndY = e.touches[0].clientY;
        const diff = touchStartY - touchEndY;
        const time = Date.now() - touchStartTime;
        
        // Determine if we're at the beginning or end of scroll
        const isAtTop = currentSection.scrollTop <= 5; // 5px tolerance
        const isAtBottom = (currentSection.scrollHeight - currentSection.scrollTop - 10) <= currentSection.clientHeight;
        
        // If we're at limits and gesture is in right direction
        if ((isAtTop && diff < -30) || (isAtBottom && diff > 30)) {
            // Use preventDefault only if we're at limits and want to change sections
            if (!e.defaultPrevented) {
                e.preventDefault();
            }
            
            // Section change, but only if gesture is fast or has significant distance
            if ((Math.abs(diff) > 50 && time < 300) || Math.abs(diff) > 100) {
                if (diff > 0 && isAtBottom) {
                    // Scroll down from bottom
                    goToSection(currentIndex + 1);
                } else if (diff < 0 && isAtTop) {
                    // Scroll up from top
                    goToSection(currentIndex - 1);
                }
                
                touchStartY = touchEndY; // Reset to avoid multiple activations
                touchStartTime = Date.now(); // Reset time
            }
        }
        
        // If we're not at limits or gesture isn't strong, allow normal scroll
    }, { passive: false }); // passive: false to be able to use preventDefault
    
    // Event for mobile menu
    document.addEventListener('DOMContentLoaded', function() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const menuNav = document.querySelector('.menu-nav');
        
        if (mobileMenuBtn && menuNav) {
            mobileMenuBtn.addEventListener('click', function() {
                menuNav.classList.toggle('show');
            });
        } else {
            console.error('One or more elements not found:');
            console.log('Mobile Menu Button:', mobileMenuBtn);
            console.log('Menu Navigation:', menuNav);
        }
    });
    
    // Close mobile menu if clicking outside it
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav') && !e.target.closest('.mobile-menu-btn') && menuNav.classList.contains('show')) {
            menuNav.classList.remove('show');
        }
    });
    
    // Adjust navigation on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && menuNav.classList.contains('show')) {
            menuNav.classList.remove('show');
        }
    });
});

