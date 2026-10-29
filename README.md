git add README.md# Rudra Cottex Limited — Ultra-Premium Official Website

<div align="center">

![Rudra Cottex Badge](https://img.shields.io/badge/Rudra%20Cottex-Spinners%20of%20Distinction-C5A059?style=for-the-badge&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Google Sheets](https://img.shields.io/badge/Google_Sheets-34A853?style=for-the-badge&logo=google-sheets&logoColor=white)
![ISO 9001:2015](https://img.shields.io/badge/ISO-9001%3A2015_Certified-blue?style=for-the-badge)

<p align="center">
  <strong>Crafting the Pinnacle of Pure Cotton Yarn.</strong><br>
  Official corporate website for Rudra Cottex Limited — operating a modern 27,360-spindle spinning facility in Gandhinagar, Gujarat, India.
</p>

[View Pages](#-page-architecture) • [Features](#-key-features) • [Quick Start](#-quick-start) • [Google Sheets Integration](#-google-sheets-integration) • [Contact](#-corporate-communication)

</div>

---

## 🌟 Overview

**Rudra Cottex Limited** (incorporated 23 March 2016) is a premier textile spinning enterprise headquartered in Gujarat, India. Operating from an automated 27,360-spindle complex with a daily output of **25,500 kg**, the mill manufactures world-class EliTwist® twin-spun compact, conventional compact, combed, and carded cotton yarns for discerning global mills.

This repository contains the complete source code for the official website, built with an **ultra-premium haute-couture light theme**, zero heavy framework dependencies, blazing-fast performance, and automated Google Sheets lead logging.

---

## ✨ Key Features

- **🏛️ Haute Couture Light Luxury Aesthetic**:
  - Warm alabaster (`#FBF9F5`) and natural sand (`#F5F2EB`) backgrounds.
  - Bespoke typography pairing: **Cinzel** (regal branding), **Cormorant Garamond** (editorial headlines), **JetBrains Mono** (technical data/badges), and **Plus Jakarta Sans** (clean body text).
  - Subtle gold gradients, ambient light spotlights, and frosted glass cards (`luxury-glass`).

- **🔄 Interactive 12-Stage Spinning Journey**:
  - Dynamic visual process navigator showing all 12 manufacturing gates from Shankar-6 bale plucking to Schlafhorst optical clearing and packaging.
  - Interactive route switcher toggle between **Combed Route (12 Stages)** and **Carded Route (10 Stages)**.

- **📊 Live Google Sheets Lead Capture**:
  - Built-in serverless client-to-sheet integration via Google Apps Script.
  - RFQ form automatically captures and appends submissions into the connected Google Sheet in real time.
  - Smart column mapping handles Name, Company, Email, Phone, Product Category, Quantity, Delivery Terms, Message, and Page Source.

- **💬 Dual-Channel Omni Handoff**:
  - Submitting an inquiry simultaneously displays a luxury confirmation toast and dynamically prepares a pre-filled, verified **WhatsApp commercial message** to `+91 97731 90667`.

- **⚡ Lightweight & Blazing Fast**:
  - Pure **HTML5**, **Tailwind CSS**, and **Vanilla JavaScript**.
  - Zero framework dependencies, zero build-step overhead, and instantaneous page transitions.

- **📱 Fully Responsive**:
  - Mobile-first architecture with animated full-screen drawer navigation and touch-optimized touch targets.

---

## 📂 Page Architecture

The web application consists of 8 comprehensive pages:

| Page | File | Description |
| :--- | :--- | :--- |
| **Home** | [`index.html`](index.html) | Brand overview, hero visual, product highlight cards, 12-stage process navigator, plant stats, commercial RFQ form, and Google Maps embed. |
| **Heritage** | [`about.html`](about.html) | Corporate journey from 2016 inception, vision & mission, executive board of directors, and clean power / ESG stewardship. |
| **Collection** | [`products.html`](products.html) | Full technical specification table (Ne counts, CSP, Hairiness H), package configurations (1.89 kg cones), and container loading data. |
| **Process** | [`process.html`](process.html) | Detailed technical breakdown of all 12 manufacturing gates, machinery models, inputs, outputs, and quality inspection criteria. |
| **Infrastructure** | [`infrastructure.html`](infrastructure.html) | Gandhinagar spinning complex details, Tier-1 machinery fleet (Truetzschler, Rieter, LMW, Schlafhorst), and Luwa RH humidification zones. |
| **Quality Lab** | [`quality-control.html`](quality-control.html) | In-house Swiss Uster Tester 6, Tensorapid 4, Classimat testing lab, and international certifications (ISO 9001:2015, OEKO-TEX 100, BCI, GOTS). |
| **Investors** | [`investor-relations.html`](investor-relations.html) | Statutory registrations (CIN: `U17299GJ2021PLC123456`, RoC Ahmedabad), board committees, fiduciary governance, and compliance contact. |
| **Contact Desk** | [`contact.html`](contact.html) | Interactive Commercial RFQ quotation builder, sales desk helpline, mill campus location, and direct WhatsApp routing. |

---

## 🛠️ Tech Stack

- **Markup**: Semantic HTML5 with microdata and OpenGraph tags
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (utility-first styling via CDN) + [`css/styles.css`](css/styles.css) (custom gradients, luxury glass, and keyframe animations)
- **Scripting**: Pure Vanilla JavaScript ([`js/main.js`](js/main.js))
- **Typography**: Google Fonts (*Cinzel*, *Cormorant Garamond*, *JetBrains Mono*, *Plus Jakarta Sans*)
- **Icons**: Font Awesome 6.5.1
- **Backend / CRM**: Google Apps Script Web App (Serverless Webhook) &rarr; Google Sheets

---

## 🚀 Quick Start

Run the website locally using any standard HTTP server:

### Option 1: Python (Recommended)
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/rudra-cottex-website.git
cd rudra-cottex-website

# Start local server
python -m http.server 3000
```
Open **`http://localhost:3000`** in your browser.

### Option 2: Node.js / npx
```bash
npx serve .
```

### Option 3: VS Code Live Server
Right-click on `index.html` inside VS Code and select **Open with Live Server**.

---

## 📋 Google Sheets Integration

The website forms on `index.html` and `contact.html` connect directly to Google Sheets via a Google Apps Script Web App webhook:

1. **Client Submission**: User submits the quotation form.
2. **Payload Dispatch**: `js/main.js` sends an asynchronous `POST` request with the form data.
3. **Apps Script Webhook**: The script appends the row into your Google Sheet with timestamp, contact info, and specs.
4. **Instant Response**: Form button displays `"Recorded in Google Sheet ✓"` and opens a WhatsApp follow-up link.

### Changing the Google Sheets Webhook URL
Open [`js/main.js`](js/main.js) and locate line ~704:
```javascript
const GOOGLE_SHEETS_WEB_APP_URL = window.GOOGLE_SHEETS_URL || 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
```
Replace the URL with your deployed Google Apps Script Web App URL.

---

## 📞 Corporate Communication

- **Helpline / Sales Desk**: [+91 97731 90667](tel:+919773190667)
- **WhatsApp**: [Chat on WhatsApp](https://wa.me/919773190667)
- **Official Email**: [hmmakani005@gmail.com](mailto:hmmakani005@gmail.com)
- **Manufacturing Plant**: Survey No. 808 & 836-843, Kadjodra, Gandhinagar, Gujarat &ndash; 382315, India
- **Corporate Office**: Near Infocity, Gandhinagar &ndash; 382007, Gujarat, India

---

## 📄 License & Legal

© 2026 **Rudra Cottex Limited**. All rights reserved.  
CIN: `U17299GJ2021PLC123456` &bull; RoC &ndash; Ahmedabad, Gujarat.
