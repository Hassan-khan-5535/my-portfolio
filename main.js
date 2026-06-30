document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // Page Transition Fade-In
    // -------------------------------------------------------------
    const transitionOverlay = document.querySelector('.page-transition');
    if (transitionOverlay) {
        // Allow DOM to render then remove overlay opacity
        setTimeout(() => {
            transitionOverlay.classList.add('loaded');
        }, 100);
    }

    // Intercept navigation links for smooth page exit transitions
    const navLinks = document.querySelectorAll('a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const target = link.getAttribute('target');
        
        // Only transition internal relative html pages (not hashes, external links, or new tabs)
        if (href && href.endsWith('.html') && !href.startsWith('http') && target !== '_blank') {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (transitionOverlay) {
                    transitionOverlay.classList.remove('loaded');
                    transitionOverlay.classList.add('fade-out');
                }
                setTimeout(() => {
                    window.location.href = href;
                }, 500); // matches style.css transition time
            });
        }
    });

    // -------------------------------------------------------------
    // Mobile Navigation Toggle
    // -------------------------------------------------------------
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    if (menuBtn && navLinksContainer) {
        menuBtn.addEventListener('click', () => {
            navLinksContainer.classList.add('active');
        });
    }

    if (closeBtn && navLinksContainer) {
        closeBtn.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
        });
    }

    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (navLinksContainer && navLinksContainer.classList.contains('active')) {
            if (!navLinksContainer.contains(e.target) && !menuBtn.contains(e.target)) {
                navLinksContainer.classList.remove('active');
            }
        }
    });

    // -------------------------------------------------------------
    // Sticky Navbar Styling on Scroll
    // -------------------------------------------------------------
    const header = document.querySelector('header.nav-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // -------------------------------------------------------------
    // Scroll Reveal (Fade-in Animations)
    // -------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // only reveal once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // -------------------------------------------------------------
    // Interactive Skill Bars Fill
    // -------------------------------------------------------------
    const skillBars = document.querySelectorAll('.skill-progress-fill');
    if (skillBars.length > 0) {
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const percentWidth = fill.getAttribute('data-width');
                    if (percentWidth) {
                        fill.style.width = percentWidth;
                    }
                    observer.unobserve(fill);
                }
            });
        }, { threshold: 0.2 });

        skillBars.forEach(bar => skillObserver.observe(bar));
    }

    // -------------------------------------------------------------
    // Typing Animation (For Home Page Hero)
    // -------------------------------------------------------------
    const typedTextEl = document.querySelector('.typed-text');
    if (typedTextEl) {
        const rolesStr = typedTextEl.getAttribute('data-roles');
        const roles = rolesStr ? rolesStr.split(',') : ['Software Engineer', 'Web Developer', 'UI/UX Designer'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let typingSpeed = 100;
            if (isDeleting) {
                typingSpeed /= 2; // Delete faster
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typingSpeed = 2000; // Pause at full word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500; // Brief pause before typing next
            }

            setTimeout(type, typingSpeed);
        }

        // Start typing loop
        setTimeout(type, 1000);
    }

    // -------------------------------------------------------------
    // Tabs Navigation (For About Page Profile tabs)
    // -------------------------------------------------------------
    const tabLinks = document.querySelectorAll('.tab-links');
    const tabContents = document.querySelectorAll('.tab-contents');

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const tabName = link.getAttribute('data-tab');
            
            tabLinks.forEach(l => l.classList.remove('active-link'));
            tabContents.forEach(c => c.classList.remove('active-tab'));
            
            link.classList.add('active-link');
            const activeContent = document.getElementById(tabName);
            if (activeContent) {
                activeContent.classList.add('active-tab');
            }
        });
    });

    // -------------------------------------------------------------
    // Portfolio Category Filters
    // -------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active status from other buttons, add to current
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    // Trigger animate in again
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // -------------------------------------------------------------
    // Portfolio Project Details Modals
    // -------------------------------------------------------------
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    
    if (portfolioItems.length > 0 && modal) {
        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                // Read metadata from clicked item data-attributes
                const title = item.getAttribute('data-title');
                const category = item.getAttribute('data-category-display') || item.getAttribute('data-category');
                const description = item.getAttribute('data-description');
                const tags = item.getAttribute('data-tags');
                const img = item.getAttribute('data-modal-img') || item.querySelector('.portfolio-img img').src;
                const github = item.getAttribute('data-github') || '#';
                const live = item.getAttribute('data-live') || '#';

                // Populate modal
                modal.querySelector('.modal-hero-img').src = img;
                modal.querySelector('.modal-category').textContent = category;
                modal.querySelector('.modal-title').textContent = title;
                modal.querySelector('.modal-desc').innerHTML = description;
                
                // Populate tags
                const tagsContainer = modal.querySelector('.modal-tags');
                tagsContainer.innerHTML = '';
                if (tags) {
                    tags.split(',').forEach(tag => {
                        const span = document.createElement('span');
                        span.className = 'tag';
                        span.textContent = tag.trim();
                        tagsContainer.appendChild(span);
                    });
                }

                // Populate links
                const githubLink = modal.querySelector('.modal-link-github');
                const liveLink = modal.querySelector('.modal-link-live');

                if (github && github !== '#') {
                    githubLink.style.display = 'inline-flex';
                    githubLink.href = github;
                } else {
                    githubLink.style.display = 'none';
                }

                if (live && live !== '#') {
                    liveLink.style.display = 'inline-flex';
                    liveLink.href = live;
                } else {
                    liveLink.style.display = 'none';
                }

                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Lock background scroll
            });
        });

        // Close modal event
        const closeModalFn = () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scroll
        };

        if (modalClose) {
            modalClose.addEventListener('click', closeModalFn);
        }

        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalFn();
            }
        });

        // Close on ESC keypress
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModalFn();
            }
        });
    }

    // -------------------------------------------------------------
    // Contact Form AJAX Google Sheets Handler
    // -------------------------------------------------------------
    const contactForm = document.querySelector('form[name="submit-to-google-sheet"]');
    const msgStatus = document.getElementById('msg');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwoen0jw0V1O9-MmMQm1qw3ijQKQpgxuBd02Z-iWTfy0OUjeg3TpzjpGNysLpPJSmBw/exec';

    if (contactForm && msgStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Set sending status state
            msgStatus.textContent = "Sending message...";
            msgStatus.className = ""; // Reset styling
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';
            }

            fetch(scriptURL, { 
                method: 'POST', 
                body: new FormData(contactForm) 
            })
            .then(response => {
                msgStatus.textContent = "Message sent successfully! I will get back to you shortly.";
                msgStatus.className = "success";
                contactForm.reset();
                setTimeout(() => {
                    msgStatus.textContent = "";
                    msgStatus.className = "";
                }, 6000);
            })
            .catch(error => {
                console.error('Error!', error.message);
                msgStatus.textContent = "Oops! Something went wrong. Please check your network or try again.";
                msgStatus.className = "error";
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }
            });
        });
    }
});
