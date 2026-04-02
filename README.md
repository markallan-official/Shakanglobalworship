# Shakan Global Worship 🎤

A modern, responsive website for Shakan Global Worship - a vocal training and worship movement platform.

## 🌟 Features

- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Vocal Training**: Comprehensive curriculum covering techniques, breathing, stage presence, and more
- **Event Management**: Live event registration and countdown timers
- **Community Features**: Connect with worship leaders and community members
- **Email Integration**: EmailJS integration for form submissions and notifications
- **Security**: CORS protection, honeypot bot detection, rate limiting
- **Animations**: Smooth scroll animations, parallax effects, and interactive elements
- **SEO Optimized**: Proper meta tags and semantic HTML

## 📋 Pages

- **Home** (`index.html`) - Main landing page with hero, features, and calls-to-action
- **About** (`about.html`) - Organization information and core values
- **Vocal Topics** (`topics.html`) - Training curriculum and learning resources
- **Events** (`events.html`) - Event listings and registration
- **Community** (`community.html`) - Community features and connections
- **Contact** (`contact.html`) - Contact form and information

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables and glassmorphism
- **JavaScript (Vanilla)** - No frameworks, pure ES6+
- **EmailJS** - Backend-less email service
- **HTTP Server** - Development server

## 🚀 Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Server will run on http://localhost:8000
```

### Environment Setup

The email system is configured with EmailJS. To enable email notifications:

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Get your Service ID, Template ID, and Public Key
3. Update the EMAILJS_CONFIG in `assets/js/main.js` or the initialization scripts in HTML files

## 📧 Email Configuration

The website uses EmailJS to send notifications:
- **Admin Email**: nicosaab19@gmail.com
- **Notifications**: Sent on form submissions (contact form, event registration, newsletter)

## 🎨 Design System

- **Primary Color**: Gold (#C8960C)
- **Secondary Colors**: Deep Navy (#0A0E2A), Purple (#2D1B69), Fire (#F44336)
- **Typography**: 
  - Headings: Cinzel, Cinzel Decorative
  - Body: Raleway, Open Sans
- **Effects**: Glassmorphism cards, smooth transitions, accessibility-first

## 📱 Mobile Responsive

Fully responsive across all devices:
- Mobile: 320px - 480px
- Tablet: 481px - 768px
- Desktop: 769px - 1024px
- Wide: 1025px+

## 🔒 Security Features

- Apache .htaccess with security headers
- Content-Security-Policy headers
- Honeypot bot detection
- Form validation and sanitization
- Rate limiting (3 submissions per session)
- CORS protection

## ✨ Animations

- Scroll-triggered fade-in animations
- Stagger effects for card groups
- Particle canvas animation on hero
- Countdown timer animation
- Parallax scrolling
- Smooth transitions throughout

## 🚀 Deployment

### Vercel Deployment

This project is configured for instant deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Import the project
3. Deploy with automatic builds

**Deployment Link**: https://shakanglobalworship.vercel.app

Configuration file: `vercel.json`

```json
{
  "buildCommand": "",
  "devCommand": "npx http-server -p 3000",
  "framework": "static",
  "outputDirectory": "."
}
```

## 📞 Contact

- **Website**: www.shakanglobalnetwork.com
- **Email**: nicosaab19@gmail.com
- **Phone**: +254 729 440 558
- **WhatsApp**: [Contact us on WhatsApp](https://wa.me/254729440558)

## 📄 License

MIT License - Feel free to use and modify

## 🙏 Credits

Built with passion for the Shakan Global Worship movement.
