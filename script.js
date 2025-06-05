document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links
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

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const contactSuccess = document.getElementById('contact-success');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Send data to Google Apps Script endpoint
            fetch('https://script.google.com/macros/s/AKfycbwB5dUxRfg8L0BlFmBV1wwQZoNHCh8ERWRSKUUI5AT3D-Frtyru3LtLkldFLdmfsRSO/exec', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (contactSuccess) {
                        contactSuccess.style.display = 'block';
                        contactSuccess.textContent = 'Message successfully sent!';
                        setTimeout(() => {
                            contactSuccess.style.display = 'none';
                        }, 4000);
                    }
                    contactForm.reset();
                })
                .catch(error => {
                    if (contactSuccess) {
                        contactSuccess.style.display = 'block';
                        contactSuccess.textContent = 'There was an error sending your message.';
                    }
                });
        });
    }

    // Add scroll-based navigation highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}); 