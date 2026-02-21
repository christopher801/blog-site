// js/script.js - Complete JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ========== MOBILE MENU TOGGLE ==========
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // ========== BLOG SEARCH FILTER ==========
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const posts = document.querySelectorAll('.post-card');
            
            posts.forEach(post => {
                const title = post.querySelector('h3')?.textContent.toLowerCase() || '';
                const excerpt = post.querySelector('.post-excerpt')?.textContent.toLowerCase() || '';
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }

    // ========== CATEGORY FILTER ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                const posts = document.querySelectorAll('.post-card');
                
                posts.forEach(post => {
                    if (category === 'all' || post.getAttribute('data-category') === category) {
                        post.style.display = 'block';
                    } else {
                        post.style.display = 'none';
                    }
                });
            });
        });
    }

    // ========== CONTACT FORM VALIDATION ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const errorDiv = document.getElementById('formError');
            
            let errors = [];
            
            // Validate name
            if (!name.value.trim()) {
                errors.push('Name is required');
                name.style.borderColor = '#dc2626';
            } else if (name.value.trim().length < 2) {
                errors.push('Name must be at least 2 characters');
                name.style.borderColor = '#dc2626';
            } else {
                name.style.borderColor = '#e2e8f0';
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                errors.push('Email is required');
                email.style.borderColor = '#dc2626';
            } else if (!emailRegex.test(email.value.trim())) {
                errors.push('Please enter a valid email address');
                email.style.borderColor = '#dc2626';
            } else {
                email.style.borderColor = '#e2e8f0';
            }
            
            // Validate message
            if (!message.value.trim()) {
                errors.push('Message is required');
                message.style.borderColor = '#dc2626';
            } else if (message.value.trim().length < 10) {
                errors.push('Message must be at least 10 characters');
                message.style.borderColor = '#dc2626';
            } else {
                message.style.borderColor = '#e2e8f0';
            }
            
            // Display errors or submit
            if (errors.length > 0) {
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = errors.join('<br>');
            } else {
                errorDiv.style.display = 'none';
                alert('Form submitted successfully! (Demo mode)');
                contactForm.reset();
            }
        });

        // Reset border colors on input
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.style.borderColor = '#e2e8f0';
            });
        });
    }

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========== BACK TO TOP BUTTON ==========
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========== DARK/LIGHT TOGGLE (BONUS) ==========
    // Create dark mode toggle button
    const createDarkModeToggle = () => {
        const navbar = document.querySelector('.nav-container');
        if (navbar && !document.getElementById('darkModeToggle')) {
            const darkBtn = document.createElement('button');
            darkBtn.id = 'darkModeToggle';
            darkBtn.innerHTML = '🌓';
            darkBtn.style.cssText = `
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                margin-left: 1rem;
                padding: 0.5rem;
            `;
            
            darkBtn.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                
                // Save preference to localStorage
                const isDark = document.body.classList.contains('dark-mode');
                localStorage.setItem('darkMode', isDark);
            });
            
            // Check for saved preference
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
            }
            
            // Add to navbar if mobile menu exists
            if (window.innerWidth > 768) {
                navbar.appendChild(darkBtn);
            }
        }
    };
    
    // Uncomment to enable dark mode toggle
    // createDarkModeToggle();

    // ========== LAZY LOADING IMAGES (BONUS) ==========
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ========== PAGINATION UI (DEMO) ==========
    const pageBtns = document.querySelectorAll('.page-btn');
    if (pageBtns.length > 0) {
        pageBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                pageBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // In a real app, you'd load new posts here
                console.log('Page clicked:', this.textContent);
            });
        });
    }

    // ========== COMMENT FORM (UI ONLY) ==========
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Comment feature coming soon! (Demo mode)');
            this.reset();
        });
    }

    // ========== NEWSLETTER FORM ==========
    const sidebarForm = document.getElementById('sidebarForm');
    if (sidebarForm) {
        sidebarForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]');
            
            if (email && email.value.trim()) {
                alert(`Thanks for subscribing! (Demo) - ${email.value}`);
                email.value = '';
            }
        });
    }

    // ========== RESIZE HANDLER ==========
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 768 && navMenu) {
                navMenu.classList.remove('active');
            }
        }, 250);
    });

    // ========== ACTIVE PAGE HIGHLIGHT ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // ========== SCROLL PROGRESS BAR (BONUS) ==========
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.id = 'scrollProgress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 4px;
            background: var(--accent);
            z-index: 1001;
            width: 0%;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };
    
    // Uncomment for scroll progress bar
    // createScrollProgress();
});