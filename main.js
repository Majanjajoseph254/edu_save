
        // Handle navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                // Remove active class from all links
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Close mobile menu if open
                const nav = document.querySelector('.nav');
                const authButtons = document.querySelector('.auth-buttons');
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    authButtons.classList.remove('active');
                }
            });
        });

        // Update active link based on scroll position
        window.addEventListener('scroll', () => {
            let current = '';
            
            document.querySelectorAll('section[id]').forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });
            
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Mobile navigation toggle
        document.querySelector('.nav-toggle').addEventListener('click', function() {
            const nav = document.querySelector('.nav');
            const authButtons = document.querySelector('.auth-buttons');
            
            nav.classList.toggle('active');
            authButtons.classList.toggle('active');
            
            // Manage focus for accessibility
            if (nav.classList.contains('active')) {
                nav.querySelector('a').focus();
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            const nav = document.querySelector('.nav');
            const authButtons = document.querySelector('.auth-buttons');
            const navToggle = document.querySelector('.nav-toggle');
            
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                nav.classList.remove('active');
                authButtons.classList.remove('active');
            }
        });
        
        // Simple animation for statistics
        function animateStats() {
            const stats = document.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent.replace('+', '').replace('₦', '').replace('M', '000000'));
                let current = 0;
                const increment = target / 50;
                
                const updateStat = () => {
                    if (current < target) {
                        current += increment;
                        if (stat.textContent.includes('₦')) {
                            stat.textContent = '₦' + Math.round(current/1000000) + 'M+';
                        } else if (stat.textContent.includes('+')) {
                            stat.textContent = Math.round(current).toLocaleString() + '+';
                        } else {
                            stat.textContent = Math.round(current).toLocaleString();
                        }
                        setTimeout(updateStat, 30);
                    }
                };
                
                updateStat();
            });
        }
        
        // Run animation when stats are in viewport (once)
        const onStatsScroll = () => {
            const statsSection = document.querySelector('.statistics');
            if (!statsSection) return;
            
            const position = statsSection.getBoundingClientRect();
            
            if (position.top < window.innerHeight && position.bottom >= 0) {
                animateStats();
                window.removeEventListener('scroll', onStatsScroll);
            }
        };

        window.addEventListener('scroll', onStatsScroll);
        // Trigger check in case stats are already in view on load
        onStatsScroll();

        // Lightweight confetti effect
        function launchConfetti(durationMs = 1500, count = 120) {
            const canvas = document.createElement('canvas');
            canvas.style.position = 'fixed';
            canvas.style.inset = '0';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '3000';
            document.body.appendChild(canvas);
            const ctx = canvas.getContext('2d');
            const dpr = window.devicePixelRatio || 1;
            function resize() {
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;
            }
            resize();
            window.addEventListener('resize', resize, { once: true });
            const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#a855f7'];
            const particles = Array.from({ length: count }, () => ({
                x: Math.random() * canvas.width,
                y: -Math.random() * canvas.height * 0.3,
                r: 2 + Math.random() * 4,
                c: colors[Math.floor(Math.random() * colors.length)],
                vx: -1 + Math.random() * 2,
                vy: 2 + Math.random() * 3,
                a: Math.random() * Math.PI * 2
            }));
            let start = performance.now();
            function frame(t) {
                const elapsed = t - start;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += 0.02 * dpr;
                    p.a += 0.1;
                    ctx.save();
                    ctx.fillStyle = p.c;
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.a);
                    ctx.globalAlpha = Math.max(0, 1 - elapsed / durationMs);
                    ctx.fillRect(-p.r, -p.r, p.r * 2, p.r * 2);
                    ctx.restore();
                });
                if (elapsed < durationMs) requestAnimationFrame(frame);
                else canvas.remove();
            }
            requestAnimationFrame(frame);
        }
        
        // Add click events to marketplace buttons
        document.querySelectorAll('.btn-solid').forEach(button => {
            if (button.textContent.includes('View Details')) {
                button.addEventListener('click', () => {
                    alert('In the full application, this would show detailed information about the textbook.');
                });
            }
        });
        
        // Search functionality: live filter across cards
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        const searchResults = document.querySelector('.search-results');

        function getCardText(card) {
            const title = card.querySelector('.card-title');
            const details = card.querySelector('.card-details');
            const p = card.querySelector('p');
            return [title?.textContent || '', details?.textContent || '', p?.textContent || '']
                .join(' ').toLowerCase();
        }

        function filterCards(term) {
            const q = term.trim().toLowerCase();
            const cards = Array.from(document.querySelectorAll('.items-grid .item-card'));
            if (!q) {
                cards.forEach(c => c.style.display = '');
                if (searchResults) searchResults.textContent = '';
                return;
            }

            let matches = 0;
            cards.forEach(card => {
                const text = getCardText(card);
                const isMatch = text.includes(q);
                card.style.display = isMatch ? '' : 'none';
                if (isMatch) matches += 1;
            });

            if (searchResults) {
                searchResults.textContent = matches ? `Found ${matches} result${matches !== 1 ? 's' : ''}` : 'No results';
            }
        }

        searchInput.addEventListener('input', () => filterCards(searchInput.value));
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            filterCards(searchInput.value);
        });

        // Handle search on enter key
        document.querySelector('.search-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                filterCards(searchInput.value);
            }
        });
        
        // Modal functionality
        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            document.body.style.overflow = 'hidden';
            modal.classList.add('active');
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            document.body.style.overflow = '';
            modal.classList.remove('active');
        }

        // Handle modal close button and outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.querySelector('.modal-close').addEventListener('click', () => {
                closeModal(modal.id);
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal(modal.id);
                }
            });
        });

        // Switch between login and signup forms
        document.querySelectorAll('.switch-form').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const currentModal = e.target.closest('.modal');
                const targetModal = link.getAttribute('data-target');
                closeModal(currentModal.id);
                openModal(targetModal);
            });
        });

        // Toggle password visibility
        document.querySelectorAll('.toggle-password').forEach(button => {
            button.addEventListener('click', () => {
                const input = button.parentElement.querySelector('input');
                const icon = button.querySelector('i');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        });

        // Password strength meter (signup)
        const signupPassword = document.getElementById('signupPassword');
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text');
        function calculateStrength(pw) {
            let score = 0;
            if (pw.length >= 6) score += 1;
            if (pw.length >= 10) score += 1;
            if (/[A-Z]/.test(pw)) score += 1;
            if (/[0-9]/.test(pw)) score += 1;
            if (/[^A-Za-z0-9]/.test(pw)) score += 1;
            return score; // 0-5
        }
        function updateStrengthUI(score) {
            if (!strengthBar || !strengthText) return;
            const pct = [0, 20, 40, 60, 80, 100][score] || 0;
            const colors = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'];
            strengthBar.style.setProperty('--strength', pct + '%');
            strengthBar.style.position = 'relative';
            strengthBar.style.overflow = 'hidden';
            strengthBar.style.setProperty('--color', colors[Math.max(0, score-1)] || '#e74c3c');
            const after = strengthBar;
            after.style.setProperty('--w', pct + '%');
            strengthBar.style.setProperty('--w', pct + '%');
            strengthBar.style.setProperty('--c', colors[Math.max(0, score-1)] || '#e74c3c');
            strengthBar.style.setProperty('background-image', `linear-gradient(to right, var(--c) var(--w), var(--light-grey) var(--w))`);
            const labels = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'];
            strengthText.textContent = 'Strength: ' + labels[score];
        }
        if (signupPassword) {
            signupPassword.addEventListener('input', () => {
                const score = calculateStrength(signupPassword.value);
                updateStrengthUI(score);
            });
        }

        // Handle auth buttons
        document.querySelectorAll('.btn-outline').forEach(button => {
            button.addEventListener('click', () => {
                if (button.textContent.trim() === 'Login') {
                    openModal('loginModal');
                } else if (button.textContent.trim() === 'Learn More') {
                    // Handle learn more action
                    window.location.hash = '#features';
                }
            });
        });

        // Theme toggle with persistence
        const THEME_KEY = 'edusaveTheme';
        const root = document.documentElement;
        function applyTheme(theme) {
            if (theme === 'dark') root.classList.add('dark');
            else root.classList.remove('dark');
        }
        try {
            const savedTheme = localStorage.getItem(THEME_KEY);
            if (savedTheme) applyTheme(savedTheme);
            else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                applyTheme('dark');
            }
        } catch {}
        const themeBtn = document.querySelector('.theme-toggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                const isDark = root.classList.toggle('dark');
                try { localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light'); } catch {}
                const icon = themeBtn.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-moon', !isDark);
                    icon.classList.toggle('fa-sun', isDark);
                }
            });
        }
        
        document.querySelectorAll('.btn-solid').forEach(button => {
            button.addEventListener('click', () => {
                if (button.textContent.trim() === 'Sign Up' || button.textContent.trim() === 'Sign Up Now') {
                    openModal('signupModal');
                } else if (button.classList.contains('join-community')) {
                    const uni = (document.getElementById('universitySelect')?.value) || 'All Kenya';
                    try { localStorage.setItem('edusaveCommunity', uni); } catch {}
                    showToast(`Joined ${uni} community!`);
                }
            });
        });

        // Auth storage helpers
        const AUTH_USERS_KEY = 'edusaveUsers';
        const AUTH_SESSION_KEY = 'edusaveSession';
        const UNI_KEY = 'edusaveUniversity';
        function getUsers() {
            try { return JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || '[]'); } catch { return []; }
        }
        function saveUsers(users) {
            try { localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users)); } catch {}
        }
        function setSession(session, remember) {
            try {
                const data = JSON.stringify(session);
                if (remember) {
                    localStorage.setItem(AUTH_SESSION_KEY, data);
                } else {
                    sessionStorage.setItem(AUTH_SESSION_KEY, data);
                }
            } catch {}
        }
        function clearSession() {
            try { localStorage.removeItem(AUTH_SESSION_KEY); } catch {}
            try { sessionStorage.removeItem(AUTH_SESSION_KEY); } catch {}
        }
        function readSession() {
            try { return JSON.parse(localStorage.getItem(AUTH_SESSION_KEY)) || JSON.parse(sessionStorage.getItem(AUTH_SESSION_KEY)); } catch { return null; }
        }

        // University selector with persistence and card filtering
        const uniSelect = document.getElementById('universitySelect');
        function applyUniversityFilter() {
            const selected = uniSelect ? uniSelect.value : 'All Kenya';
            try { localStorage.setItem(UNI_KEY, selected); } catch {}
            const cards = document.querySelectorAll('.items-grid .item-card');
            let visible = 0;
            cards.forEach(card => {
                const tag = card.getAttribute('data-university') || 'All Kenya';
                const show = selected === 'All Kenya' || tag === selected || tag === 'All Kenya' || tag === 'Remote Kenya';
                card.style.display = show ? '' : 'none';
                if (show) visible += 1;
            });
            if (searchResults && searchResults.textContent) {
                searchResults.textContent = `${visible} visible after university filter`;
            }
        }
        function parseHashUni() {
            try {
                const params = new URLSearchParams(location.hash.replace('#', ''));
                return params.get('uni');
            } catch { return null; }
        }
        function setHashUni(uni) {
            const params = new URLSearchParams(location.hash.replace('#', ''));
            if (uni && uni !== 'All Kenya') params.set('uni', uni);
            else params.delete('uni');
            location.hash = params.toString();
        }
        if (uniSelect) {
            try {
                const hashUni = parseHashUni();
                const savedUni = localStorage.getItem(UNI_KEY);
                const initial = hashUni || savedUni;
                if (initial) uniSelect.value = initial;
            } catch {}
            applyUniversityFilter();
            uniSelect.addEventListener('change', () => { setHashUni(uniSelect.value); applyUniversityFilter(); });
            window.addEventListener('hashchange', () => {
                const hashUni = parseHashUni();
                if (hashUni && uniSelect.value !== hashUni) {
                    uniSelect.value = hashUni;
                    applyUniversityFilter();
                }
            });
        }

        // Mock API
        const api = {
            async signup(payload) {
                await new Promise(r => setTimeout(r, 400));
                const users = getUsers();
                if (users.some(u => u.email === payload.email)) {
                    const err = new Error('Email already registered');
                    err.code = 'EMAIL_EXISTS';
                    throw err;
                }
                users.push(payload);
                saveUsers(users);
                return { ok: true };
            },
            async login(email, password) {
                await new Promise(r => setTimeout(r, 350));
                const users = getUsers();
                const user = users.find(u => u.email === email && u.password === password);
                if (!user) {
                    const err = new Error('Invalid credentials');
                    err.code = 'INVALID_CREDENTIALS';
                    throw err;
                }
                return { ok: true, user };
            }
        };

        // Signup
        document.getElementById('signupForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value.trim();
            const email = document.getElementById('signupEmail').value.trim().toLowerCase();
            const university = document.getElementById('signupUniversity').value.trim();
            const password = document.getElementById('signupPassword').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (!name || !emailValid || !university || password.length < 6 || !agreeTerms) {
                showToast('Please complete all fields. Password min 6 chars.', 'error');
                return;
            }
            try {
                await api.signup({ name, email, university, password });
                showToast('Account created. You can login now.', 'info');
                closeModal('signupModal');
                openModal('loginModal');
                launchConfetti();
            } catch (err) {
                if (err.code === 'EMAIL_EXISTS') showToast('Email already registered. Please login.', 'error');
                else showToast('Signup failed. Try again.', 'error');
            }
        });

        // Login
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim().toLowerCase();
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            try {
                const res = await api.login(email, password);
                setSession({ email: res.user.email, name: res.user.name, university: res.user.university }, rememberMe);
                showToast('Logged in successfully.');
                closeModal('loginModal');
                renderAuthUI();
                launchConfetti(1200, 90);
            } catch (err) {
                showToast('Invalid email or password.', 'error');
            }
        });

        // Auth UI
        function renderAuthUI() {
            const session = readSession();
            const authButtons = document.querySelector('.auth-buttons');
            const authUser = document.querySelector('.auth-user');
            const greeting = document.querySelector('.auth-greeting');
            if (session) {
                if (authButtons) authButtons.style.display = 'none';
                if (authUser) authUser.style.display = 'flex';
                if (greeting) greeting.textContent = `Hi, ${session.name.split(' ')[0]}!`;
            } else {
                if (authButtons) authButtons.style.display = '';
                if (authUser) authUser.style.display = 'none';
            }
        }

        renderAuthUI();

        const logoutBtn = document.querySelector('.btn-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                clearSession();
                showToast('You have been logged out.', 'info');
                renderAuthUI();
            });
        }

        // Mock social login
        function socialLogin(provider) {
            const name = provider === 'Google' ? 'Google User' : 'Facebook User';
            const email = provider === 'Google' ? 'google.user@example.com' : 'facebook.user@example.com';
            setSession({ email, name, university: 'N/A' }, true);
            showToast(`Signed in with ${provider}.`);
            closeModal('loginModal');
            closeModal('signupModal');
            renderAuthUI();
            launchConfetti(1000, 80);
        }

        document.querySelectorAll('.social-google').forEach(btn => btn.addEventListener('click', () => socialLogin('Google')));
        document.querySelectorAll('.social-facebook').forEach(btn => btn.addEventListener('click', () => socialLogin('Facebook')));

        // Toast utilities
        const toastContainer = document.querySelector('.toast-container');
        function showToast(message, type = 'success', timeout = 3000) {
            if (!toastContainer) return;
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.innerHTML = `<div>${message}</div>`;
            toastContainer.appendChild(toast);
            setTimeout(() => {
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 200);
            }, timeout);
        }

        // Contact form handling
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            // Draft persistence
            const draftKey = 'contactDraft';
            const nameEl = document.getElementById('contactName');
            const emailEl = document.getElementById('contactEmail');
            const messageEl = document.getElementById('contactMessage');
            try {
                const saved = JSON.parse(localStorage.getItem(draftKey) || '{}');
                if (saved.name) nameEl.value = saved.name;
                if (saved.email) emailEl.value = saved.email;
                if (saved.message) messageEl.value = saved.message;
            } catch {}

            const persistDraft = () => {
                try {
                    localStorage.setItem(draftKey, JSON.stringify({
                        name: nameEl.value,
                        email: emailEl.value,
                        message: messageEl.value
                    }));
                } catch {}
            };

            ['input', 'change'].forEach(evt => {
                nameEl.addEventListener(evt, persistDraft);
                emailEl.addEventListener(evt, persistDraft);
                messageEl.addEventListener(evt, persistDraft);
            });

            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = nameEl;
                const email = emailEl;
                const message = messageEl;
                const hint = contactForm.querySelector('.contact-hint');

                const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
                if (!name.value.trim() || !emailValid || !message.value.trim()) {
                    if (hint) hint.textContent = 'Please fill all fields with a valid email.';
                    showToast('Please complete the form correctly.', 'error');
                    return;
                }

                // Simulate send
                if (hint) hint.textContent = 'Sending...';
                setTimeout(() => {
                    if (hint) hint.textContent = 'Thanks! We will get back to you soon.';
                    showToast('Message sent successfully.');
                    contactForm.reset();
                    try { localStorage.removeItem(draftKey); } catch {}
                }, 800);
            });
        }

        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            const toggleBtn = () => {
                if (window.scrollY > 300) backToTop.classList.add('visible');
                else backToTop.classList.remove('visible');
            };
            window.addEventListener('scroll', toggleBtn);
            toggleBtn();
            backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        }

        // Cookie banner consent
        const cookieBanner = document.querySelector('.cookie-banner');
        if (cookieBanner) {
            const CONSENT_KEY = 'cookieConsent';
            const acceptBtn = cookieBanner.querySelector('.cookie-accept');
            const declineBtn = cookieBanner.querySelector('.cookie-decline');
            const showBanner = () => cookieBanner.classList.add('visible');
            const hideBanner = () => cookieBanner.classList.remove('visible');
            try {
                const consent = localStorage.getItem(CONSENT_KEY);
                if (!consent) setTimeout(showBanner, 500);
            } catch { setTimeout(showBanner, 500); }

            const setConsent = (value) => {
                try { localStorage.setItem(CONSENT_KEY, value); } catch {}
                hideBanner();
                showToast(value === 'accepted' ? 'Thanks for accepting cookies.' : 'You declined optional cookies.', value === 'accepted' ? 'info' : 'error');
            };

            acceptBtn.addEventListener('click', () => setConsent('accepted'));
            declineBtn.addEventListener('click', () => setConsent('declined'));
        }

        // Intersection Observer for fade-in animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Add fade-in animation to elements
        document.querySelectorAll('.feature-card, .item-card, .testimonial-card, .stat-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });

        // Footer year
        const yearEl = document.getElementById('currentYear');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }

        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            const emailInput = document.getElementById('newsletterEmail');
            const hint = document.querySelector('.newsletter-hint');
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
                if (!emailValid) {
                    if (hint) hint.textContent = 'Please enter a valid email address.';
                    showToast('Invalid email for newsletter.', 'error');
                    return;
                }
                if (hint) hint.textContent = 'Subscribed! Check your inbox to confirm.';
                showToast('Subscribed to newsletter.');
                emailInput.value = '';
                // Small celebratory pop
                launchConfetti(800, 50);
            });
        }

        // Hero parallax
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        if (hero) {
            window.addEventListener('scroll', () => {
                const y = window.scrollY;
                hero.style.backgroundPosition = `center ${-y * 0.2}px`;
            });
            hero.addEventListener('mousemove', (e) => {
                if (!heroContent) return;
                const rect = hero.getBoundingClientRect();
                const relX = (e.clientX - rect.left) / rect.width - 0.5;
                const relY = (e.clientY - rect.top) / rect.height - 0.5;
                heroContent.style.transform = `translate3d(${relX * 10}px, ${relY * 8}px, 0)`;
            });
            hero.addEventListener('mouseleave', () => {
                if (!heroContent) return;
                heroContent.style.transform = '';
            });
        }

        // Forgot password -> reset modal
        const forgotLink = document.querySelector('.forgot-password');
        if (forgotLink) {
            forgotLink.addEventListener('click', (e) => {
                e.preventDefault();
                closeModal('loginModal');
                openModal('resetModal');
            });
        }

        // Reset form submit (mock)
        const resetForm = document.getElementById('resetForm');
        if (resetForm) {
            resetForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('resetEmail').value.trim().toLowerCase();
                const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                if (!emailValid) {
                    showToast('Enter a valid email.', 'error');
                    return;
                }
                showToast('If the email exists, a reset link was sent.', 'info');
                closeModal('resetModal');
            });
        }

        // FAQ accordion
        document.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const expanded = btn.getAttribute('aria-expanded') === 'true';
                const answer = document.getElementById(btn.getAttribute('aria-controls'));
                btn.setAttribute('aria-expanded', String(!expanded));
                if (answer) {
                    answer.hidden = expanded;
                }
            });
        });

        // Communities rendering (Kenya)
        const COMMUNITIES_KEY = 'edusaveCommunitiesMembers';
        const communitiesEl = document.querySelector('.communities-grid');
        const kenyaUniversities = [
            'University of Nairobi',
            'Kenyatta University',
            'Strathmore University',
            'JKUAT',
            'Moi University',
            'Egerton University',
            'Technical University of Kenya',
            'Maseno University'
        ];
        function loadCommunityMembers() {
            try { return JSON.parse(localStorage.getItem(COMMUNITIES_KEY) || '{}'); } catch { return {}; }
        }
        function saveCommunityMembers(map) {
            try { localStorage.setItem(COMMUNITIES_KEY, JSON.stringify(map)); } catch {}
        }
        function renderCommunities() {
            if (!communitiesEl) return;
            const membersMap = loadCommunityMembers();
            const joined = localStorage.getItem('edusaveCommunity');
            communitiesEl.innerHTML = '';
            kenyaUniversities.forEach(u => {
                const count = membersMap[u] ?? Math.floor(50 + Math.random() * 450);
                const card = document.createElement('div');
                card.className = 'community-card';
                card.innerHTML = `
                    <h4>${u}</h4>
                    <div class="community-meta"><i class="fas fa-users"></i> ${count.toLocaleString()} members</div>
                    <div class="community-actions">
                        <button class="btn btn-solid btn-join" data-uni="${u}">${joined === u ? 'Joined' : 'Join'}</button>
                        <button class="btn btn-outline btn-invite" data-uni="${u}">Invite</button>
                    </div>
                `;
                communitiesEl.appendChild(card);
            });
            communitiesEl.querySelectorAll('.btn-join').forEach(btn => {
                btn.addEventListener('click', () => {
                    const uni = btn.getAttribute('data-uni');
                    localStorage.setItem('edusaveCommunity', uni);
                    const map = loadCommunityMembers();
                    map[uni] = (map[uni] ?? 100) + 1;
                    saveCommunityMembers(map);
                    showToast(`Joined ${uni} community!`);
                    renderCommunities();
                });
            });
            communitiesEl.querySelectorAll('.btn-invite').forEach(btn => {
                btn.addEventListener('click', () => {
                    const uni = btn.getAttribute('data-uni');
                    const share = `${location.origin}${location.pathname}#communities`;
                    navigator.clipboard?.writeText(share);
                    showToast('Invite link copied to clipboard.');
                });
            });
        }
        renderCommunities();
    