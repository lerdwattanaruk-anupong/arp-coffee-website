document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger?.addEventListener('click', () => {
        if (!navLinks) return;
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
            navLinks?.classList.remove('active');
            const icon = hamburger?.querySelector('i');
            if (!icon) return;
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
        if (!navbar) return;
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
            images: ['tfbo-1.webp', 'tfbo-2.webp', 'tfbo-3.webp', 'tfbo-4.webp', 'tfbo-5.webp', 'tfbo-6.webp', 'tfbo-7.webp', 'tfbo-8.webp', 'tfbo-9.webp', 'tfbo-10.webp']
        },
        expo: {
            title: 'Expo 2026',
            images: ['expo-1.webp', 'expo-2.webp', 'expo-3.webp', 'expo-4.webp', 'expo-5.webp']
        },
        gsb: {
            title: 'GSB Franchise Standard 2026',
            images: ['gsb-1.webp', 'gsb-2.webp', 'gsb-3.webp', 'gsb-5.webp', 'gsb-6.webp', 'gsb-7.webp', 'gsb-8.webp', 'gsb-9.webp', 'gsb-10.webp', 'gsb-11.webp', 'gsb-12.webp', 'gsb-13.webp']
        },
        smart: {
            title: 'Smart SME Expo 2025',
            images: ['smart-1.webp', 'smart-2.webp', 'smart-3.webp']
        },
        rich: {
            title: 'งานชี้ช่องรวย',
            images: ['rich-1.webp', 'rich-2.webp', 'rich-3.webp']
        },
        dbd: {
            title: 'DBD รุ่น 29',
            images: ['dbd-1.webp', 'dbd-2.webp', 'dbd-3.webp']
        },
        dbd: {
            title: 'DBD RoadShow Central Rayong',
            images: ['dbdry-1.webp', 'dbdry-2.webp', 'dbdry-3.webp', 'dbdry-4.webp', 'dbdry-5.webp', 'dbdry-6.webp', 'dbdry-7.webp']
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
                `<img src="assets/events/${file}" alt="${gallery.title} ภาพที่ ${index + 1}" loading="lazy" decoding="async">`
            ).join('');
            galleryDialog.hidden = false;
            document.body.style.overflow = 'hidden';
            galleryClose?.focus();
        });
    });

    const closeGallery = () => {
        if (!galleryDialog) return;
        galleryDialog.hidden = true;
        document.body.style.overflow = '';
    };

    galleryClose?.addEventListener('click', closeGallery);
    galleryDialog?.addEventListener('click', event => {
        if (event.target === galleryDialog) closeGallery();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && galleryDialog && !galleryDialog.hidden) closeGallery();
    });

    // --- Franchise Lead Form -> Vercel API -> Google Sheet ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const packageSelect = document.getElementById('package');

        // Keep the contact form aligned with the current franchise packages.
        if (packageSelect) {
            packageSelect.innerHTML = `
                <option value="STARTER - 190,000 บาท">STARTER - 190,000 บาท</option>
                <option value="SIZE M - 435,000 บาท">SIZE M - 435,000 บาท</option>
                <option value="SIZE L - 650,000 บาท">SIZE L - 650,000 บาท</option>
                <option value="ยังไม่แน่ใจ ต้องการคำปรึกษา">ยังไม่แน่ใจ ต้องการคำปรึกษา</option>
            `;
        }

        // Honeypot field: invisible to normal visitors, useful against simple form bots.
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = 'website';
        honeypot.autocomplete = 'off';
        honeypot.tabIndex = -1;
        honeypot.setAttribute('aria-hidden', 'true');
        honeypot.style.position = 'absolute';
        honeypot.style.left = '-10000px';
        honeypot.style.width = '1px';
        honeypot.style.height = '1px';
        contactForm.appendChild(honeypot);

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            if (!btn) return;

            const originalText = btn.innerHTML;
            const name = document.getElementById('name')?.value.trim() || '';
            const phone = document.getElementById('phone')?.value.trim() || '';
            const location = document.getElementById('location')?.value.trim() || '';
            const packageName = packageSelect?.value || '';

            if (!name || !phone || !location) {
                btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> กรุณากรอกข้อมูลให้ครบ';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                }, 2500);
                return;
            }

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังส่งข้อมูล...';
            btn.style.opacity = '0.8';
            btn.disabled = true;

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        phone,
                        location,
                        packageName,
                        message: '',
                        website: honeypot.value
                    })
                });

                const result = await response.json().catch(() => ({}));

                if (!response.ok || !result.success) {
                    throw new Error(result.message || 'Unable to submit lead');
                }

                btn.innerHTML = '<i class="fas fa-check"></i> ส่งข้อมูลสำเร็จ!';
                btn.style.backgroundColor = '#28a745';
                btn.style.borderColor = '#28a745';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3000);
            } catch (error) {
                console.error('Lead submission failed:', error);
                btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> ส่งไม่สำเร็จ กรุณาลองอีกครั้ง';
                btn.style.opacity = '1';
                btn.disabled = false;

                setTimeout(() => {
                    btn.innerHTML = originalText;
                }, 3500);
            }
        });
    }
});
