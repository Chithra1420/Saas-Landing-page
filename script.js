/* ==========================================================================
   SaaSPro Landing Page - Premium Interaction Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Light / Dark Mode Toggle
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggleBtn.querySelector('i').className = 'fa-solid fa-sun';
        } else {
            body.classList.remove('dark-mode');
            themeToggleBtn.querySelector('i').className = 'fa-solid fa-moon';
        }
    } else {
        // System preference default
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.add('dark-mode');
            themeToggleBtn.querySelector('i').className = 'fa-solid fa-sun';
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        const icon = themeToggleBtn.querySelector('i');
        icon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            icon.style.transform = 'rotate(0deg)';
        }, 150);
    });


    /* ==========================================================================
       2. Scroll Detection & Back-to-Top
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    /* ==========================================================================
       3. Mobile Navigation Menu Toggle
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });


    /* ==========================================================================
       4. Interactive Dashboard Features Section
       ========================================================================== */
    const featureStates = {
        automation: {
            title: "Automation Dashboard",
            value: "$124,560",
            badge: "+12.4% this month",
            badgeClass: "success",
            // SVG chart nodes coordinates:
            points: [
                { cx: 100, cy: 120 },
                { cx: 200, cy: 60 },
                { cx: 300, cy: 90 },
                { cx: 400, cy: 40 }
            ],
            linePath: "M0,110 Q50,70 100,120 T200,60 T300,90 T400,40",
            areaPath: "M0,150 L0,110 Q50,70 100,120 T200,60 T300,90 T400,40 L400,150 Z",
            checklist: [
                { text: "Review new team members on boarding", checked: true },
                { text: "Approve project budgets and invoices", checked: true }
            ]
        },
        analytics: {
            title: "Analytics Intelligence",
            value: "$492,305",
            badge: "+28.7% this week",
            badgeClass: "success",
            points: [
                { cx: 100, cy: 60 },
                { cx: 200, cy: 100 },
                { cx: 300, cy: 40 },
                { cx: 400, cy: 80 }
            ],
            linePath: "M0,130 Q50,30 100,60 T200,100 T300,40 T400,80",
            areaPath: "M0,150 L0,130 Q50,30 100,60 T200,100 T300,40 T400,80 L400,150 Z",
            checklist: [
                { text: "Generate quarterly conversion metrics", checked: true },
                { text: "Resolve bounce rate alert on checkout", checked: false }
            ]
        },
        collaboration: {
            title: "Collaboration Pulse",
            value: "94 active users",
            badge: "+18 new invitations",
            badgeClass: "success",
            points: [
                { cx: 100, cy: 80 },
                { cx: 200, cy: 50 },
                { cx: 300, cy: 60 },
                { cx: 400, cy: 30 }
            ],
            linePath: "M0,80 Q50,110 100,80 T200,50 T300,60 T400,30",
            areaPath: "M0,150 L0,80 Q50,110 100,80 T200,50 T300,60 T400,30 L400,150 Z",
            checklist: [
                { text: "Share project dashboard access to client", checked: true },
                { text: "Conduct standup feedback sessions", checked: true },
                { text: "Publish final marketing resources", checked: true }
            ]
        }
    };

    const featureToggleCards = document.querySelectorAll('.feature-toggle-card');
    const tabTitleEl = document.getElementById('dashboard-tab-title');
    const mainValueEl = document.getElementById('dashboard-main-value');
    const badgeValueEl = document.getElementById('dashboard-badge-value');
    const chartLineEl = document.getElementById('chart-line');
    const chartAreaEl = document.getElementById('chart-area');
    const listItemsContainer = document.getElementById('dashboard-list-items');
    
    let currentFeatureIndex = 0;
    const featureKeys = Object.keys(featureStates);
    let rotationInterval;

    function updateDashboardState(featureKey) {
        const state = featureStates[featureKey];
        if (!state) return;

        tabTitleEl.textContent = state.title;
        mainValueEl.textContent = state.value;
        badgeValueEl.textContent = state.badge;
        

        chartLineEl.setAttribute('d', state.linePath);
        chartAreaEl.setAttribute('d', state.areaPath);
        

        state.points.forEach((pt, index) => {
            const node = document.getElementById(`chart-node-${index + 1}`);
            if (node) {
                node.setAttribute('cx', pt.cx);
                node.setAttribute('cy', pt.cy);
            }
        });
        
        listItemsContainer.innerHTML = '';
        state.checklist.forEach(item => {
            const li = document.createElement('li');
            li.className = `dashboard-list-item ${item.checked ? 'checked' : ''}`;
            
            const checkSpan = document.createElement('span');
            checkSpan.className = 'checkbox-box';
            if (item.checked) {
                checkSpan.innerHTML = '<i class="fa-solid fa-check"></i>';
            }
            
            const textSpan = document.createElement('span');
            textSpan.className = 'item-text';
            textSpan.textContent = item.text;
            
            li.appendChild(checkSpan);
            li.appendChild(textSpan);
            listItemsContainer.appendChild(li);
        });
    }

    function startFeatureRotation() {
        clearInterval(rotationInterval);
        
        rotationInterval = setInterval(() => {
            currentFeatureIndex = (currentFeatureIndex + 1) % featureKeys.length;
            const nextKey = featureKeys[currentFeatureIndex];
            
          
            featureToggleCards.forEach(card => card.classList.remove('active'));
            
            
            const activeCard = document.querySelector(`.feature-toggle-card[data-feature="${nextKey}"]`);
            if (activeCard) {
                activeCard.classList.add('active');
            }
            
            updateDashboardState(nextKey);
        }, 5000);
    }


    featureToggleCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            // Stop rotation on manual user interaction
            clearInterval(rotationInterval);
            
            featureToggleCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            currentFeatureIndex = index;
            const featureKey = card.getAttribute('data-feature');
            updateDashboardState(featureKey);
            
            // Optional: restart rotation after idle
            startFeatureRotation();
        });
    });

    // Start auto rotaton initially
    startFeatureRotation();


    /* ==========================================================================
       5. Customer Reviews Slider Carousel
       ========================================================================== */
    const carouselTrack = document.getElementById('carousel-track');
    const reviewSlides = document.querySelectorAll('.review-slide');
    const carouselDots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    let currentSlide = 0;
    const totalSlides = reviewSlides.length;

    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            currentSlide = totalSlides - 1;
        } else if (slideIndex >= totalSlides) {
            currentSlide = 0;
        } else {
            currentSlide = slideIndex;
        }

        reviewSlides.forEach(slide => {
            slide.classList.remove('active');
        });

  
        reviewSlides[currentSlide].classList.add('active');


        carouselDots.forEach(dot => {
            dot.classList.remove('active');
        });
        carouselDots[currentSlide].classList.add('active');
    }

    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });

  
    carouselDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });

    let testimonialInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 7000);

  
    const sliderContainer = document.querySelector('.review-carousel');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 7000);
    });

});