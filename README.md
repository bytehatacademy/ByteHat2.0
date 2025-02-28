
# ByteHat Academy Website

![ByteHat Academy Logo](logo.png)

A modern, responsive website for ByteHat Academy, a cybersecurity training institution offering courses in ethical hacking, cloud security, DevSecOps, and more.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Development](#development)
- [Deployment](#deployment)
- [SEO Optimization](#seo-optimization)
- [Contributing](#contributing)
- [License](#license)

## Overview

ByteHat Academy website is built as a modern single-page application (SPA) using React, TypeScript, and Tailwind CSS. The site includes course listings, blog posts, contact forms, and other features needed for an educational institution.

## Features

- **Responsive Design**: Mobile-first approach ensuring compatibility across all devices
- **Dark/Light Mode**: User preference-based theme switching
- **Dynamic Course Catalog**: Showcase of cybersecurity courses with detailed information
- **Blog Platform**: Articles about cybersecurity topics and industry news
- **Contact System**: Forms for user inquiries with email integration
- **Search Functionality**: Site-wide search for courses and blog posts
- **SEO Optimized**: Structured data, meta tags, and other SEO best practices
- **Accessibility**: WCAG compliant for maximum user accessibility

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **SEO**: React Helmet Async
- **Form Handling**: Native React forms
- **Email Service**: EmailJS
- **Deployment**: Replit hosting

## Project Structure

```
├── public/                  # Static files
│   ├── robots.txt           # Instructions for search engine crawlers
│   ├── sitemap.xml          # Site map for search engines
│   └── security.txt         # Security contact information
├── src/                     # Source code
│   ├── components/          # Reusable React components
│   │   ├── CourseModal.tsx  # Course details modal
│   │   ├── Footer.tsx       # Site footer
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── SearchBar.tsx    # Search functionality
│   │   ├── SEO.tsx          # SEO component with structured data
│   │   └── ToastContainer.tsx # Notification system
│   ├── images/              # Image assets
│   ├── pages/               # Page components
│   │   ├── About.tsx        # About page
│   │   ├── Blog.tsx         # Blog listing page
│   │   ├── BlogPost.tsx     # Individual blog post page
│   │   ├── Contact.tsx      # Contact page
│   │   ├── Courses.tsx      # Course listing page
│   │   ├── Home.tsx         # Homepage
│   │   ├── NotFound.tsx     # 404 page
│   │   └── Search.tsx       # Search results page
│   ├── utils/               # Utility functions
│   │   └── emailService.ts  # Email service integration
│   ├── App.css              # Global CSS
│   ├── App.tsx              # Main application component
│   ├── index.css            # CSS entry point
│   └── main.tsx             # Application entry point
├── .gitignore               # Git ignore file
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

## Setup and Installation

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository (if using Git):
   ```bash
   git clone https://github.com/yourusername/bytehat-academy.git
   cd bytehat-academy
   ```

2. If using Replit, simply fork the Repl.

3. Install dependencies:
   ```bash
   npm install
   ```

## Development

### Running Locally

To start the development server:

```bash
npm run dev
```

This will start the development server at http://localhost:3000

### Code Style and Linting

The project uses ESLint for code quality. To run the linter:

```bash
npm run lint
```

### Building for Production

To create a production build:

```bash
npm run build
```

This will generate optimized files in the `build` directory.

## Deployment

### Deploying on Replit

1. Make sure your project builds successfully with `npm run build`
2. Go to the "Deployments" tab in your Replit workspace
3. Select "Static" as the deployment type
4. Set the build command: `npm run build`
5. Set the output directory: `build`
6. Click "Deploy"

### Environment Variables

For production, you may need to set the following environment variables:

- `VITE_EMAIL_SERVICE_ID`: Your EmailJS service ID
- `VITE_EMAIL_TEMPLATE_ID`: Your EmailJS template ID
- `VITE_EMAIL_USER_ID`: Your EmailJS user ID

In Replit, you can set these in the "Secrets" tool.

## SEO Optimization

The website implements several SEO best practices:

1. **Meta Tags**: Comprehensive meta tags for all pages
2. **Structured Data**: JSON-LD for articles, courses, and organization information
3. **Sitemap**: XML sitemap for search engine indexing
4. **Robots.txt**: Instructions for search engine crawlers
5. **Canonical URLs**: Proper canonical URL tags
6. **Semantic HTML**: Proper use of HTML5 semantic elements
7. **Mobile Optimization**: Responsive design for all devices
8. **Page Speed**: Optimized assets and code splitting for fast loading

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
