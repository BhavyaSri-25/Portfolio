# Email Setup Instructions for Portfolio Contact Form

## Quick Setup Guide

Your portfolio now has a modular email system. Follow these steps to enable email functionality:

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose **Gmail** (recommended)
4. Connect your Gmail account (bhavyasri744@gmail.com)
5. Copy the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this exact template structure:

**Template Name:** `portfolio_contact`

**Subject:** `New Contact Form Message from {{from_name}}`

**Content:**
```
Hello Bhavya Sri,

You have received a new message from your portfolio contact form:

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Reply directly to: {{reply_to}}
Sent from: Portfolio Contact Form
```

4. Save and copy the **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key
1. Go to "Account" > "General"
2. Copy your **Public Key** (e.g., `user_def456`)

### Step 5: Update Configuration
Edit the file `js/config.js` and replace the placeholder values:

```javascript
const EMAIL_CONFIG = {
    publicKey: "V1dVdPo99FTbk4ZZl",           // Your actual public key
    serviceId: "service_jnj51of",        // Your actual service ID
    templateId: "template_4zvw9p6"       // Your actual template ID
};
```

### Step 6: Test the Form
1. Open your portfolio in a browser
2. Fill out the contact form with test data
3. Submit and check your email (bhavyasri744@gmail.com)
4. Check spam folder if not received

## Security Features

✅ **Secure Configuration**: Keys are in a separate config file  
✅ **Fallback Handling**: Shows contact info if EmailJS fails  
✅ **Input Validation**: Prevents empty form submissions  
✅ **Error Handling**: Clear success/error messages  
✅ **Theme Compatible**: Works in both light and dark modes  

## File Structure
```
portfolio/
├── js/
│   ├── config.js          # EmailJS configuration
│   └── email-handler.js   # Email functionality
├── index.html             # Main portfolio file
└── EMAIL_SETUP.md         # This guide
```

## Troubleshooting

**Form shows "Email service not configured"**
- Check that you've updated `js/config.js` with real values
- Ensure all three values (publicKey, serviceId, templateId) are set

**Email not received**
- Check spam/junk folder
- Verify EmailJS service is connected to correct Gmail account
- Check EmailJS dashboard for send logs

**Form submission fails**
- Open browser developer tools (F12)
- Check Console tab for error messages
- Verify EmailJS service is active

**Rate limits exceeded**
- Free EmailJS accounts: 200 emails/month
- Upgrade to paid plan if needed

## Alternative: Formspree (Simpler Option)

If EmailJS seems complex, you can use Formspree:

1. Go to [Formspree.io](https://formspree.io/)
2. Create account and new form
3. Replace the form action in `index.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## Production Deployment

For GitHub Pages, Netlify, or similar:
- The current setup works perfectly
- No server-side code needed
- All files are static and secure
