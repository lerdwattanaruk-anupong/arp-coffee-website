document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle hamburger icon between bars and times
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // --- Sticky Header & Active Link Highlighting ---
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }

        // Active Link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current) && current !== '') {
                item.classList.add('active');
            }
        });
    });

    // --- Intersection Observer for Animations ---
    const animateElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    const staggerElements = document.querySelectorAll('.stagger-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Handle staggered animations
    const staggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, 100 * index); // delay based on index for stagger effect
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    staggerElements.forEach(el => {
        staggerObserver.observe(el);
    });

    // --- Activity Galleries ---
    const activityGalleries = {
        tfbo: {
            title: 'TFBO 2026',
            images: ['tfbo-1.jpg', 'tfbo-2.jpg', 'tfbo-3.jpg', 'tfbo-4.JPG', 'tfbo-5.JPG', 'tfbo-6.JPG', 'tfbo-7.JPG', 'tfbo-8.JPG', 'tfbo-9.JPG', 'tfbo-10.JPG']
        },
        expo: {
            title: 'Expo 2026',
            images: ['expo-1.jpg', 'expo-2.jpg', 'expo-3.jpg', 'expo-4.JPG', 'expo-5.JPG']
        },
        gsb: {
            title: 'GSB Franchise Standard 2026',
            images: ['gsb-1.jpg', 'gsb-2.jpg', 'gsb-3.jpg', 'gsb-5.jpg', 'gsb-6.jpg', 'gsb-7.jpg', 'gsb-8.jpg', 'gsb-9.jpg', 'gsb-10.jpg', 'gsb-11.jpg', 'gsb-12.jpg', 'gsb-13.jpg']
        },
        smart: {
            title: 'Smart SME Expo 2025',
            images: ['smart-1.jpg', 'smart-2.jpg', 'smart-3.jpg']
        },
        rich: {
            title: 'งานชี้ช่องรวย',
            images: ['rich-1.jpg', 'rich-2.jpg', 'rich-3.jpg']
        },
        dbd: {
            title: 'DBD รุ่น 29',
            images: ['dbd-1.jpg', 'dbd-2.jpg', 'dbd-3.jpg']
        },

    };

    const galleryDialog = document.getElementById('galleryDialog');
    const galleryTitle = document.getElementById('galleryTitle');
    const galleryImages = document.getElementById('galleryImages');
    const galleryClose = document.querySelector('.gallery-close');

    document.querySelectorAll('[data-gallery]').forEach(card => {
        card.addEventListener('click', () => {
            const gallery = activityGalleries[card.dataset.gallery];
            if (!gallery || !galleryDialog) return;

            galleryTitle.textContent = gallery.title;
            galleryImages.innerHTML = gallery.images.map((file, index) =>
                `<img src="assets/events/${file}" alt="${gallery.title} ภาพที่ ${index + 1}" loading="lazy">`
            ).join('');
            galleryDialog.hidden = false;
            document.body.style.overflow = 'hidden';
            galleryClose?.focus();
        });
    });

    const closeGallery = () => {
        galleryDialog.hidden = true;
        document.body.style.overflow = '';
    };

    galleryClose?.addEventListener('click', closeGallery);
    galleryDialog?.addEventListener('click', event => {
        if (event.target === galleryDialog) closeGallery();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !galleryDialog?.hidden) closeGallery();
    });

    // --- Form Submission Handling ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Loading state
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังส่งข้อมูล...';
            btn.style.opacity = '0.8';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> ส่งข้อมูลสำเร็จ!';
                btn.style.backgroundColor = '#28a745';
                btn.style.borderColor = '#28a745';
                
                // Reset form
                contactForm.reset();

                // Revert button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
