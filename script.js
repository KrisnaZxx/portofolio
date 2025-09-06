const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '+';
    }, 20);
}

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

function typeText(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

window.addEventListener('load', () => {
    setTimeout(() => {
        typeText(document.getElementById('typing-name'), 'ACHMAD KRISNA', 150);
        setTimeout(() => {
            const subtitle = document.getElementById('typing-subtitle');
            subtitle.textContent = '';
            typeText(subtitle, 'INFORMATICS ENGINEERING', 100);
        }, 1500);
    }, 500);
});

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.skill-card, .contact-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 100);
            });
        }
    });
}, {
    threshold: 0.1
});

document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('.skills');
    const contactSection = document.querySelector('.contact');
    
    if (skillsSection) animateOnScroll.observe(skillsSection);
    if (contactSection) animateOnScroll.observe(contactSection);
});

const skillFilterBtns = document.querySelectorAll('.skills .filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        skillFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        skillCards.forEach((card, index) => {
            card.classList.remove('animate');
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 50);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

const contactFilterBtns = document.querySelectorAll('.contact .filter-btn');
const contactCards = document.querySelectorAll('.contact-card');

contactFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        contactFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        contactCards.forEach((card, index) => {
            card.classList.remove('animate');
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 50);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = '#28a745';

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '#333';
            submitBtn.disabled = false;
            e.target.reset();
            localStorage.removeItem('contactFormData');
        }, 2000);
    }, 1500);
});

function saveFormData() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const formData = {
        name: form.querySelector('input[placeholder="Your Name"]').value,
        email: form.querySelector('input[placeholder="Your Email"]').value,
        subject: form.querySelector('input[placeholder="Subject"]').value,
        message: form.querySelector('textarea').value
    };

    localStorage.setItem('contactFormData', JSON.stringify(formData));
}

function loadFormData() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);

        form.querySelector('input[placeholder="Your Name"]').value = formData.name || '';
        form.querySelector('input[placeholder="Your Email"]').value = formData.email || '';
        form.querySelector('input[placeholder="Subject"]').value = formData.subject || '';
        form.querySelector('textarea').value = formData.message || '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadFormData();

    const form = document.getElementById('contactForm');
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', saveFormData);
        });
    }
});

let isDown = false;
let startX;
let scrollLeft;
let brandTrack = document.querySelector('.brand-track');

if (brandTrack) {
    brandTrack.style.cursor = 'grab';

    brandTrack.addEventListener('mousedown', (e) => {
        isDown = true;
        brandTrack.style.cursor = 'grabbing';
        startX = e.pageX - brandTrack.offsetLeft;
        scrollLeft = brandTrack.scrollLeft;
        brandTrack.style.animationPlayState = 'paused';
        e.preventDefault();
    });

    brandTrack.addEventListener('mouseleave', () => {
        if (isDown) {
            isDown = false;
            brandTrack.style.cursor = 'grab';
            brandTrack.style.animationPlayState = 'running';
        }
    });

    brandTrack.addEventListener('mouseup', () => {
        isDown = false;
        brandTrack.style.cursor = 'grab';
        brandTrack.style.animationPlayState = 'running';
    });

    brandTrack.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - brandTrack.offsetLeft;
        const walk = (x - startX) * 3; 
        brandTrack.scrollLeft = scrollLeft - walk;
    });

    brandTrack.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - brandTrack.offsetLeft;
        scrollLeft = brandTrack.scrollLeft;
        brandTrack.style.animationPlayState = 'paused';
    });

    brandTrack.addEventListener('touchend', () => {
        isDown = false;
        brandTrack.style.animationPlayState = 'running';
    });

    brandTrack.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - brandTrack.offsetLeft;
        const walk = (x - startX) * 3;
        brandTrack.scrollLeft = scrollLeft - walk;
    });
}

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const projects = entry.target.querySelectorAll('.project-card');
            projects.forEach((project, index) => {
                setTimeout(() => {
                    project.classList.add('animate');
                }, index * 150);
            });
            projectObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

const projectsSection = document.querySelector('.projects');
if (projectsSection) {
    projectObserver.observe(projectsSection);
}

const messageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const form = entry.target.querySelector('.contact-form');
            if (form) {
                setTimeout(() => {
                    form.classList.add('animate');
                }, 200);
            }
            messageObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

const messageSection = document.querySelector('.message');
if (messageSection) {
    messageObserver.observe(messageSection);
}

document.querySelectorAll('.project-placeholder').forEach(placeholder => {
    placeholder.addEventListener('mouseenter', () => {
        placeholder.classList.add('clicked');
    });
    placeholder.addEventListener('mouseleave', () => {
        placeholder.classList.remove('clicked');
    });
});

const profileImg = document.querySelector('.profile-img');
if (profileImg) {
    profileImg.addEventListener('mouseenter', () => {
        profileImg.classList.add('clicked');
    });
    profileImg.addEventListener('mouseleave', () => {
        profileImg.classList.remove('clicked');
    });
}

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(17, 17, 17, 0.98)';
    } else {
        navbar.style.background = 'rgba(17, 17, 17, 0.95)';
    }
});

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

document.querySelector('.cta-button')?.addEventListener('click', () => {
    document.querySelector('#projects').scrollIntoView({
        behavior: 'smooth'
    });
});
