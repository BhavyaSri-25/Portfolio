// Email handling functionality for portfolio contact form
class EmailHandler {
    constructor() {
        this.isInitialized = false;
        this.config = window.EMAIL_CONFIG || {};
        this.init();
    }

    init() {
        // Check if EmailJS is loaded and configured
        if (typeof emailjs !== 'undefined' && this.isConfigured()) {
            try {
                emailjs.init(this.config.publicKey);
                this.isInitialized = true;
                console.log('EmailJS initialized successfully');
            } catch (error) {
                console.error('EmailJS initialization failed:', error);
            }
        }
    }

    isConfigured() {
        return this.config.publicKey && 
               this.config.serviceId && 
               this.config.templateId &&
               this.config.publicKey !== "YOUR_EMAILJS_PUBLIC_KEY";
    }

    async sendEmail(formData) {
        if (!this.isInitialized || !this.isConfigured()) {
            throw new Error('EmailJS not properly configured');
        }

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: 'bhavyasri744@gmail.com',
            reply_to: formData.email
        };

        try {
            const response = await emailjs.send(
                this.config.serviceId,
                this.config.templateId,
                templateParams
            );
            return response;
        } catch (error) {
            console.error('Email send failed:', error);
            throw error;
        }
    }
}

// Initialize email handler
const emailHandler = new EmailHandler();

// Contact form submission handler
function handleContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        formMessage.innerHTML = '';
        formMessage.style.display = 'none';
        
        // Get form data
        const formData = {
            name: this.name.value.trim(),
            email: this.email.value.trim(),
            message: this.message.value.trim()
        };

        // Validate form data
        if (!formData.name || !formData.email || !formData.message) {
            showMessage('error', '❌ Please fill in all fields');
            resetButton();
            return;
        }

        try {
            if (!emailHandler.isConfigured()) {
                // Fallback when EmailJS is not configured
                showMessage('error', '📧 Email service not configured. Please contact me directly at <a href="mailto:bhavyasri744@gmail.com" style="color: inherit; text-decoration: underline;">bhavyasri744@gmail.com</a>');
            } else {
                // Send email via EmailJS
                await emailHandler.sendEmail(formData);
                showMessage('success', '✅ Message sent successfully! I\'ll get back to you soon.');
                form.reset();
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('error', '❌ Failed to send message. Please try again or contact me directly at <a href="mailto:bhavyasri744@gmail.com" style="color: inherit; text-decoration: underline;">bhavyasri744@gmail.com</a>');
        } finally {
            resetButton();
        }

        function resetButton() {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Message display function
function showMessage(type, message) {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;
    
    formMessage.innerHTML = `<div class="${type}-message">${message}</div>`;
    formMessage.style.display = 'block';
    
    // Auto-hide after 8 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 8000);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleContactForm);
} else {
    handleContactForm();
}
