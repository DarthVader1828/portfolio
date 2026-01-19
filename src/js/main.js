
// Custom cursor - create if doesn't exist
            let cursorFollower = document.querySelector('.cursor-follower');
            let cursorInner = document.querySelector('.cursor-inner');
            
            if (!cursorFollower) {
                cursorFollower = document.createElement('div');
                cursorFollower.className = 'cursor-follower';
                document.body.appendChild(cursorFollower);
            }
            
            if (!cursorInner) {
                cursorInner = document.createElement('div');
                cursorInner.className = 'cursor-inner';
                document.body.appendChild(cursorInner);
            }
            
            document.addEventListener('mousemove', (e) => {
                cursorInner.style.left = e.clientX + 'px';
                cursorInner.style.top = e.clientY + 'px';
                
                gsap.to(cursorFollower, {
                    left: e.clientX,
                    top: e.clientY,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
            
            // Change cursor on hover
            const hoverElements = document.querySelectorAll('a, button, .project-card, .card-hover, .nav-link');
            
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursorFollower.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
                });
                
                el.addEventListener('mouseleave', () => {
                    cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursorFollower.style.backgroundColor = 'rgba(99, 102, 241, 0.3)';
                });
            });

// Navigation Functionality
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
    
    // Update active nav link
    updateActiveNavLink();
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars
                if (entry.target.classList.contains('skills-section')) {
                    animateSkillBars();
                }
                
                // Staggered animation for achievement cards
                if (entry.target.classList.contains('achievements-grid')) {
                    animateAchievements();
                }
                
                // Staggered animation for about highlights
                if (entry.target.classList.contains('about-highlights')) {
                    animateAboutHighlights();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .skills-section, .achievements-grid');
    animatedElements.forEach(el => observer.observe(el));
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        }, index * 200);
    });
}

// Animate achievement cards with stagger
function animateAchievements() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Animate about highlights with stagger
function animateAboutHighlights() {
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach((highlight, index) => {
        highlight.classList.add('stagger-fade-in');
        setTimeout(() => {
            highlight.classList.add('visible');
        }, index * 200);
    });
}

// Projects Gallery Navigation
const projectsGallery = document.getElementById('projects-gallery');
const projectsPrev = document.getElementById('projects-prev');
const projectsNext = document.getElementById('projects-next');

let currentProjectIndex = 0;
const projectCards = document.querySelectorAll('.project-card');
const totalProjects = projectCards.length;

function updateProjectsView() {
    const cardWidth = 400 + 32; // card width + gap
    const scrollPosition = currentProjectIndex * cardWidth;
    projectsGallery.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
}

projectsPrev.addEventListener('click', () => {
    currentProjectIndex = Math.max(0, currentProjectIndex - 1);
    updateProjectsView();
});

projectsNext.addEventListener('click', () => {
    currentProjectIndex = Math.min(totalProjects - 1, currentProjectIndex + 1);
    updateProjectsView();
});

// Project Cards Click Handler
const projectModal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

const projectData = {
    'sign-language': {
        title: 'AI Sign Language Translation Platform',
        status: 'Work in Progress',
        description: 'Developing an AI-powered platform that translates American Sign Language hand gestures into text in real time, and also translates spoken input into ASL, leveraging advanced machine learning techniques and computer vision, allowing signers and non-signers to communicate easily.',
        technologies: ['Computer Vision', 'Machine Learning', 'Real-time Processing', 'Neural Networks', 'Python', 'OpenCV'],
        images: [
            'https://i.ibb.co/SwTj5058/Image-10-08-2025-at-4-14-PM.jpg',
            'https://i.ibb.co/XxyMkM5S/Screenshot-2025-08-10-at-4-24-08-PM.png'
        ],
        features: [
            'Real-time gesture recognition',
            'Text-to-ASL translation',
            'Multi-platform compatibility',
            'Accessible user interface'
        ]
    },
    'revision-notes': {
        title: 'AI Revision Notes Website',
        status: 'Completed',
        description: 'Developed an innovative AI-powered website aimed at revolutionising the process of generating revision notes for students. Used Google Gemini API and Python programming to develop a dynamic platform that offers personalised revision notes and guidance tailored to individual user inputs and learning objectives.',
        technologies: ['Google Gemini API', 'Python', 'Web Development', 'Natural Language Processing', 'Machine Learning'],
        images: [
            'https://i.ibb.co/Kzpm7jGM/Screenshot-2025-08-10-at-4-16-15-PM.png" alt="AI Revision Notes Website',
            'https://i.ibb.co/0jG51mR1/Screenshot-2025-08-10-at-4-17-54-PM.png',
            'https://i.ibb.co/7x1dhrBX/Screenshot-2025-08-10-at-4-20-19-PM.png'
        ],
        features: [
            'Personalized note generation',
            'Subject-specific guidance',
            'Interactive learning interface',
            'Progress tracking system'
        ]
    },
    'image-generation': {
        title: 'Gamified Image Generation AI Campaign',
        status: 'Completed',
        description: 'Developed an AI-powered platform where users\' creative prompts generated unique images tailored to brand-specific parameters, offering a highly personalised experience. Streamlined user engagement by automating competition entries and follow-up emails, enhancing participation and interaction with the campaign.',
        technologies: ['Image Generation', 'AI APIs', 'Automation', 'User Engagement', 'Python', 'Web Integration'],
        images: [
            'https://i.ibb.co/KpXDgB11/504189d282ff.jpg',
            'https://i.ibb.co/yn5c5nbV/7f2f722253fd.jpg',
            'https://i.ibb.co/LdPchWd8/Screenshot-2025-08-10-at-4-31-03-PM.png'
        ],
        features: [
            'Creative prompt processing',
            'Brand-specific image generation',
            'Automated competition system',
            'Email automation workflow'
        ]
    },
    'personalized-ai': {
        title: 'Personalised Generative AI Campaign',
        status: 'Completed',
        description: 'Designed a solution that used AI to transform user selfies into personalised promotional images in different styles. Replaced the faces in the promotional image with the user\'s face in different expressions, creating highly engaging and personalized marketing content.',
        technologies: ['Face Generation', 'Style Transfer', 'Computer Vision', 'Image Processing', 'Deep Learning'],
        images: [
            'https://i.ibb.co/Qjr2Fq5m/Screenshot-2025-08-10-at-4-42-45-PM.png',
            'https://i.ibb.co/1tJy308c/Screenshot-2025-08-10-at-4-35-48-PM.png',
            'https://i.ibb.co/4wCXKr8r/Screenshot-2025-08-10-at-4-38-49-PM.png'
        ],
        features: [
            'Facial recognition and replacement',
            'Multiple style variations',
            'Expression manipulation',
            'High-quality output generation'
        ]
    },
    'restaurant-ai': {
        title: 'Restaurant AI Agent',
        status: 'Completed',
        description: 'Developed an AI agent solution for a restaurant to handle orders, reservations, etc. autonomously. Used n8n and integrated multiple APIs together to create a smart AI that could use functions and solve tasks, streamlining restaurant operations and improving customer experience.',
        technologies: ['AI Agents', 'API Integration', 'n8n Automation', 'Natural Language Processing', 'Task Automation'],
        images: [
            'https://i.ibb.co/35GyYTg9/Agent-chat-818315ae64.webp',
            'https://i.ibb.co/99XL8GS3/Whats-App-Image-2025-08-10-at-4-47-10-PM.jpg'
        ],
        features: [
            'Autonomous order processing',
            'Reservation management',
            'Multi-API integration',
            'Function-based task solving'
        ]
      },
    'ai-avatar': {
        title: 'Interactive AI Avatar',
        status: 'Completed',
        description: 'Developed a cutting-edge 3D interactive AI avatar capable of real-time, natural language conversations. Seamlessly integrated with a comprehensive company knowledge base. Leveraging ElevenLabs for advanced voice synthesis, enhancing user engagement.', 
        technologies: ['AI Avatars', 'ElevenLabs', '3D Engines', 'Natural Language Processing', 'Animation Rigging'],
        images: [
            'https://i.ibb.co/Y4PCLF2N/Screenshot-2025-08-10-at-7-33-16-PM.png',
            'https://i.ibb.co/9k1jT1GB/Screenshot-2025-08-10-at-7-40-23-PM.png'
        ],
        features: [
            'Real time conversations',
            'Animations and lip syncing of 3D avatar',
            'Knowledge base integration',
            'Vision capabilities'
        ]
    }
};

// Project card click handlers
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        showProjectModal(projectId);
    });
});

// Show project modal
function showProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    modalBody.innerHTML = `
        <div class="modal-project">
            <div class="modal-project-header">
                <h2 class="modal-project-title">${project.title}</h2>
                <span class="modal-project-status ${project.status.toLowerCase().replace(' ', '-')}">${project.status}</span>
            </div>
            
            <div class="modal-project-gallery">
                ${project.images.map(img => `
                    <div class="modal-image">
                        <img src="${img}" alt="${project.title}" />
                    </div>
                `).join('')}
            </div>
            
            <div class="modal-project-content">
                <p class="modal-project-description">${project.description}</p>
                
                <div class="modal-project-section">
                    <h3>Technologies Used</h3>
                    <div class="modal-technologies">
                        ${project.technologies.map(tech => `<span class="modal-tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="modal-project-section">
                    <h3>Key Features</h3>
                    <ul class="modal-features-list">
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    projectModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close project modal
modalClose.addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeProjectModal();
    }
});

function closeProjectModal() {
    projectModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validate form
    if (validateForm(data)) {
        submitContactForm(data);
    }
});

function validateForm(data) {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(error => {
        error.classList.remove('show');
    });
    
    // Validate name
    if (!data.name.trim()) {
        showFormError('name-error', 'Name is required');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
        showFormError('email-error', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(data.email)) {
        showFormError('email-error', 'Please enter a valid email');
        isValid = false;
    }
    
    // Validate subject
    if (!data.subject.trim()) {
        showFormError('subject-error', 'Subject is required');
        isValid = false;
    }
    
    // Validate message
    if (!data.message.trim()) {
        showFormError('message-error', 'Message is required');
        isValid = false;
    } else if (data.message.trim().length < 10) {
        showFormError('message-error', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function showFormError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

async function submitContactForm(data) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = 'var(--success-500)';

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            contactForm.reset();
        }, 2000);
    } catch (error) {
        submitBtn.textContent = 'Send Failed';
        submitBtn.style.background = 'var(--error-500)';

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 2000);
    }
}

// Smooth scrolling for anchor links
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

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add CSS for modal content
const modalStyles = `
<style>
.modal-project-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-6);
    padding-bottom: var(--space-4);
    border-bottom: 2px solid var(--gray-100);
}

.modal-project-title {
    font-size: 1.75rem;
    font-weight: var(--font-weight-bold);
    color: var(--gray-900);
    margin: 0;
}

.modal-project-status {
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: var(--font-weight-medium);
}

.modal-project-status.completed {
    background: var(--success-500);
    color: white;
}

.modal-project-status.work-in-progress {
    background: var(--warning-500);
    color: white;
}

.modal-project-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-4);
    margin-bottom: var(--space-8);
}

.modal-image {
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-md);
}

.modal-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform var(--transition-normal);
}

.modal-image:hover img {
    transform: scale(1.05);
}

.modal-project-description {
    font-size: 1.125rem;
    line-height: 1.7;
    color: var(--gray-600);
    margin-bottom: var(--space-8);
}

.modal-project-section {
    margin-bottom: var(--space-8);
}

.modal-project-section h3 {
    font-size: 1.25rem;
    font-weight: var(--font-weight-semibold);
    color: var(--gray-900);
    margin-bottom: var(--space-4);
}

.modal-technologies {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
}

.modal-tech-tag {
    background: var(--primary-100);
    color: var(--primary-700);
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    font-weight: var(--font-weight-medium);
}

.modal-features-list {
    list-style: none;
    display: grid;
    gap: var(--space-3);
}

.modal-features-list li {
    position: relative;
    padding-left: var(--space-6);
    color: var(--gray-600);
}

.modal-features-list li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--primary-500);
    font-weight: var(--font-weight-bold);
}

@media (max-width: 768px) {
    .modal-content {
        margin: var(--space-4);
        max-height: 95vh;
    }
    
    .modal-body {
        padding: var(--space-6);
    }
    
    .modal-project-header {
        flex-direction: column;
        align-items: start;
        gap: var(--space-3);
    }
    
    .modal-project-gallery {
        grid-template-columns: 1fr;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', modalStyles);

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('show')) {
        closeProjectModal();
    }
});

// Remove this line from the top of the file:
// document.addEventListener('DOMContentLoaded', initializeAnimations);

// ... (other code) ...

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in classes to elements
    document.querySelectorAll('.about-text, .about-highlights').forEach(el => {
        if (el.classList.contains('about-text')) {
            el.classList.add('fade-in');
        }
    });
  
    document.querySelectorAll('.skills-section').forEach(el => {
        el.classList.add('slide-in-right');
    });

    document.querySelectorAll('.experience-card').forEach(el => {
        el.classList.add('fade-in');
    });

    document.querySelectorAll('.education-column').forEach((el, index) => {
        el.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
    });

    document.querySelectorAll('.hobbies-cloud, .languages-section').forEach(el => {
        el.classList.add('fade-in');
    });

    document.querySelectorAll('.contact-info, .contact-form').forEach((el, index) => {
        el.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
    });

    // Add these lines to trigger hero section animations
    const heroImage = document.querySelector('.hero-image');
    const heroContent = document.querySelector('.hero-content');

    if (heroImage) {
        heroImage.classList.add('animate-in');
    }
    if (heroContent) {
        heroContent.classList.add('animate-in');
    }

    // Add this line here to ensure animations are initialized after classes are applied
    initializeAnimations();
});



// Performance optimization: throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);
