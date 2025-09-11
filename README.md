# Dra. Yasmin Carvalho - Dental Clinic Website

This repository contains the website for Dra. Yasmin Carvalho's Dental Clinic, located in São João do Carú, Maranhão, Brazil.

## Security Measures

This website implements several security measures to protect both the site and its visitors:

### 1. Security.txt
A `security.txt` file is provided at the root of the website, following the guidelines at [securitytxt.org](https://securitytxt.org/). This file contains:
- Contact information for security issues
- Links to security policies
- Preferred languages for communication
- Expiration date for the security policy

### 2. Robots.txt
A `robots.txt` file controls how search engines index the website.

### 3. .htaccess Security Rules
An `.htaccess` file (for Apache servers) includes:
- Directory browsing prevention
- Security headers to prevent common attacks:
  - Clickjacking protection
  - MIME-type sniffing prevention
  - XSS protection
  - Content Security Policy
- Protection against access to sensitive files
- Blocking of suspicious query strings
- Bad bot detection and blocking

### 4. Error Pages
Custom error pages (like 404.html) provide a better user experience when errors occur.

## Website Features

- Responsive design that works on all devices
- Modern UI with elegant typography
- WhatsApp integration for patient communication
- Comprehensive procedure selection form
- Gallery showcasing dental work
- Patient testimonials
- Contact information and map

## Files

- `index.html` - Main website page
- `formulario.html` - Patient procedure selection form
- `styles.css` - Main stylesheet
- `script.js` - JavaScript functionality
- `robots.txt` - Search engine directives
- `security.txt` - Security contact information
- `.htaccess` - Server security rules
- `404.html` - Custom 404 error page
- `README.md` - This file

## Deployment

This website can be deployed on any static hosting service, including:
- GitHub Pages
- Netlify
- Vercel
- Traditional web hosting with Apache or Nginx

When deploying on Apache servers, the `.htaccess` file will automatically provide additional security measures.

## Contact

For website issues, contact the website administrator.
For security issues, follow the instructions in `security.txt`.