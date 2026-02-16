// ================================
// Mobile Menu Toggle
// ================================
const mobileMenuToggle = document.querySelector(’.mobile-menu-toggle’);
const navMenu = document.querySelector(’.nav-menu’);

if (mobileMenuToggle) {
mobileMenuToggle.addEventListener(‘click’, () => {
navMenu.classList.toggle(‘active’);
mobileMenuToggle.classList.toggle(‘active’);
});
}

// ================================
// Smooth Scrolling for Navigation Links
// ================================
document.querySelectorAll(‘a[href^=”#”]’).forEach(anchor => {
anchor.addEventListener(‘click’, function (e) {
const href = this.getAttribute(‘href’);
if (href !== ‘#’) {
e.preventDefault();
const target = document.querySelector(href);
if (target) {
target.scrollIntoView({
behavior: ‘smooth’,
block: ‘start’
});
// Close mobile menu if open
if (navMenu.classList.contains(‘active’)) {
navMenu.classList.remove(‘active’);
mobileMenuToggle.classList.remove(‘active’);
}
}
}
});
});

// ================================
// Navbar Background on Scroll
// ================================
const navbar = document.querySelector(’.navbar’);
let lastScroll = 0;

window.addEventListener(‘scroll’, () => {
const currentScroll = window.pageYOffset;

```
if (currentScroll > 100) {
    navbar.style.background = 'rgba(10, 14, 26, 0.98)';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
} else {
    navbar.style.background = 'rgba(10, 14, 26, 0.95)';
    navbar.style.boxShadow = 'none';
}

lastScroll = currentScroll;
```

});

// ================================
// Vehicle Key Finder - Cascading Dropdowns
// ================================
const vehicleData = {
toyota: [‘Camry’, ‘Corolla’, ‘RAV4’, ‘Highlander’, ‘Tacoma’, ‘Tundra’, ‘4Runner’, ‘Sienna’],
honda: [‘Accord’, ‘Civic’, ‘CR-V’, ‘Pilot’, ‘Odyssey’, ‘Ridgeline’, ‘HR-V’, ‘Passport’],
ford: [‘F-150’, ‘Mustang’, ‘Explorer’, ‘Escape’, ‘Edge’, ‘Ranger’, ‘Expedition’, ‘Bronco’],
chevrolet: [‘Silverado’, ‘Equinox’, ‘Traverse’, ‘Tahoe’, ‘Malibu’, ‘Colorado’, ‘Suburban’, ‘Blazer’],
nissan: [‘Altima’, ‘Sentra’, ‘Rogue’, ‘Pathfinder’, ‘Frontier’, ‘Titan’, ‘Murano’, ‘Armada’],
bmw: [‘3 Series’, ‘5 Series’, ‘X3’, ‘X5’, ‘X1’, ‘X7’, ‘7 Series’, ‘4 Series’],
mercedes: [‘C-Class’, ‘E-Class’, ‘GLE’, ‘GLC’, ‘S-Class’, ‘GLA’, ‘GLS’, ‘A-Class’]
};

const yearSelect = document.getElementById(‘year’);
const makeSelect = document.getElementById(‘make’);
const modelSelect = document.getElementById(‘model’);
const findButton = document.querySelector(’.btn-find’);

if (makeSelect && modelSelect) {
makeSelect.addEventListener(‘change’, function() {
const selectedMake = this.value;
modelSelect.innerHTML = ‘<option value="">Select Model</option>’;

```
    if (selectedMake && vehicleData[selectedMake]) {
        vehicleData[selectedMake].forEach(model => {
            const option = document.createElement('option');
            option.value = model.toLowerCase().replace(/\s+/g, '-');
            option.textContent = model;
            modelSelect.appendChild(option);
        });
        modelSelect.disabled = false;
    } else {
        modelSelect.disabled = true;
    }
});
```

}

if (findButton) {
findButton.addEventListener(‘click’, function(e) {
e.preventDefault();

```
    const year = yearSelect.value;
    const make = makeSelect.options[makeSelect.selectedIndex].text;
    const model = modelSelect.options[modelSelect.selectedIndex].text;
    
    if (!year || !makeSelect.value || !modelSelect.value) {
        alert('Please select year, make, and model to find your key.');
        return;
    }
    
    // Create WhatsApp message with vehicle details
    const vehicle = `${year} ${make} ${model}`;
    const whatsappMessage = `Hi Brown Keys Auto! I need a key for my ${vehicle}. Can you help me with pricing and availability?`;
    const whatsappUrl = `https://wa.me/16582183855?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Show options to user
    const userChoice = confirm(`Found keys for your ${vehicle}!\n\nClick OK to book via WhatsApp, or Cancel to view pricing on this page.`);
    
    if (userChoice) {
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
    } else {
        // Show pricing info (in real site, would show actual pricing)
        alert(`Keys available for ${vehicle}:\n\n• Standard Key: $15-$25\n• Transponder Key: $45-$85\n• Smart Key: $89-$149\n\nContact us to confirm availability and book your service!`);
    }
});
```

}

// ================================
// Contact Form Validation & Submission
// ================================
const contactForm = document.getElementById(‘contactForm’);

if (contactForm) {
contactForm.addEventListener(‘submit’, function(e) {
e.preventDefault();

```
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const vehicle = document.getElementById('vehicle').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !phone || !email) {
        alert('Please fill in all required fields (Name, Phone, Email).');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number.');
        return;
    }
    
    // Create WhatsApp message with form details
    let whatsappMessage = `Hi Brown Keys Auto! My name is ${name}.\n\n`;
    if (vehicle) whatsappMessage += `Vehicle: ${vehicle}\n`;
    if (service) {
        const serviceText = document.querySelector(`#service option[value="${service}"]`).textContent;
        whatsappMessage += `Service Needed: ${serviceText}\n`;
    }
    if (message) whatsappMessage += `Details: ${message}\n`;
    whatsappMessage += `\nContact: ${phone}\nEmail: ${email}`;
    
    const whatsappUrl = `https://wa.me/16582183855?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Ask user if they want to continue via WhatsApp
    const useWhatsApp = confirm(`Thank you, ${name}! Your quote request is ready.\n\nWould you like to send this via WhatsApp for faster response?\n\nClick OK to open WhatsApp, or Cancel to submit via email.`);
    
    if (useWhatsApp) {
        window.open(whatsappUrl, '_blank');
    } else {
        // Success message (in real implementation, would send to server)
        alert(`Thank you, ${name}! Your quote request has been received.\n\nWe'll contact you shortly at ${phone} to discuss your key needs.`);
    }
    
    // Reset form
    contactForm.reset();
});
```

}

// ================================
// Scroll Animations - Fade in elements
// ================================
const observerOptions = {
threshold: 0.1,
rootMargin: ‘0px 0px -100px 0px’
};

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = ‘1’;
entry.target.style.transform = ‘translateY(0)’;
}
});
}, observerOptions);

// Observe all service cards, pricing cards, feature items
const animateOnScroll = document.querySelectorAll(’.service-card, .comparison-card, .feature-item, .visual-card, .contact-item’);

animateOnScroll.forEach(element => {
element.style.opacity = ‘0’;
element.style.transform = ‘translateY(30px)’;
element.style.transition = ‘opacity 0.6s ease, transform 0.6s ease’;
observer.observe(element);
});

// ================================
// Parallax Effect for Hero Background
// ================================
window.addEventListener(‘scroll’, () => {
const scrolled = window.pageYOffset;
const heroBackground = document.querySelector(’.hero-background’);

```
if (heroBackground && scrolled < window.innerHeight) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
}
```

});

// ================================
// Floating Cards Animation Enhancement
// ================================
const floatingCards = document.querySelectorAll(’.floating-card’);

floatingCards.forEach((card, index) => {
card.addEventListener(‘mouseenter’, function() {
this.style.transform = `translateY(-10px) scale(1.05)`;
this.style.zIndex = ‘10’;
});

```
card.addEventListener('mouseleave', function() {
    this.style.transform = '';
    this.style.zIndex = '';
});
```

});

// ================================
// Service Card Interactive Effects
// ================================
const serviceCards = document.querySelectorAll(’.service-card’);

serviceCards.forEach(card => {
card.addEventListener(‘mouseenter’, function() {
// Add a subtle glow effect
this.style.boxShadow = ‘0 0 40px rgba(212, 175, 55, 0.4)’;
});

```
card.addEventListener('mouseleave', function() {
    if (!this.classList.contains('featured')) {
        this.style.boxShadow = '';
    }
});
```

});

// ================================
// Logo Item Interaction
// ================================
const logoItems = document.querySelectorAll(’.logo-item’);

logoItems.forEach(logo => {
logo.addEventListener(‘click’, function() {
const brand = this.textContent.trim();
alert(`Viewing keys for ${brand}...\n\nIn a live site, this would filter keys by this brand.`);
});
});

// ================================
// Pricing Comparison Interactive Highlight
// ================================
const comparisonCards = document.querySelectorAll(’.comparison-card’);

comparisonCards.forEach(card => {
card.addEventListener(‘click’, function() {
if (!this.classList.contains(‘featured’)) {
comparisonCards.forEach(c => c.classList.remove(‘active-comparison’));
this.classList.add(‘active-comparison’);
}
});
});

// ================================
// Dynamic Year Population (extend range)
// ================================
if (yearSelect) {
const currentYear = new Date().getFullYear();
yearSelect.innerHTML = ‘<option value="">Select Year</option>’;

```
// Add years from current year down to 15 years back
for (let year = currentYear; year >= currentYear - 15; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
}
```

}

// ================================
// Stats Counter Animation
// ================================
function animateCounter(element, target, duration = 2000) {
const start = 0;
const increment = target / (duration / 16); // 60fps
let current = start;

```
const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
    } else {
        element.textContent = Math.floor(current);
    }
}, 16);
```

}

// Observe stats and animate when visible
const statsObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting && !entry.target.dataset.animated) {
const targetText = entry.target.textContent.trim();

```
        // Extract number from text like "75%" or "15K+"
        let targetNumber = parseInt(targetText.replace(/[^\d]/g, ''));
        
        if (targetText.includes('K+')) {
            targetNumber = targetNumber;
            animateCounter(entry.target, targetNumber, 2000);
            entry.target.dataset.animated = 'true';
            
            // Re-add suffix after animation
            setTimeout(() => {
                entry.target.textContent = targetNumber + 'K+';
            }, 2000);
        } else if (targetText.includes('%')) {
            animateCounter(entry.target, targetNumber, 2000);
            entry.target.dataset.animated = 'true';
            
            // Re-add suffix after animation
            setTimeout(() => {
                entry.target.textContent = targetNumber + '%';
            }, 2000);
        }
    }
});
```

}, { threshold: 0.5 });

document.querySelectorAll(’.stat-number, .stat-big’).forEach(stat => {
statsObserver.observe(stat);
});

// ================================
// Console Welcome Message
// ================================
console.log(’%c🔑 Brown Keys Auto’, ‘color: #D4AF37; font-size: 24px; font-weight: bold;’);
console.log(’%cProfessional Key Cutting & Programming Services’, ‘color: #B8BFD8; font-size: 14px;’);
console.log(’%cWebsite loaded successfully ✓’, ‘color: #22C55E; font-size: 12px;’);
console.log(’%cBook via WhatsApp: +1 (658) 218-3855’, ‘color: #25D366; font-size: 12px;’);
