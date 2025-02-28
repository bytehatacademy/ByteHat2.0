
# ByteHat Academy - Cybersecurity Training Platform

![ByteHat Academy](public/logo.png)

ByteHat Academy is a comprehensive cybersecurity training platform offering courses in Ethical Hacking, Cloud Security, DevSecOps, and more. This repository contains the complete source code for the ByteHat Academy website.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
  - [Building for Production](#building-for-production)
  - [Deploying on Replit](#deploying-on-replit)
- [Security Features](#security-features)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- Responsive design that works across all devices
- Course catalog with detailed information
- Blog with cybersecurity articles and insights
- Contact form with email integration
- Search functionality across courses and blog posts
- Dark mode support
- SEO-optimized for better visibility

## Technology Stack

- **Frontend Framework**: React with TypeScript
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Email Integration**: EmailJS
- **Database**: PostgreSQL
- **Deployment**: Replit

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bytehatacademy/bytehat-website.git
   cd bytehat-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables by copying the example file:
   ```bash
   cp .env.example .env
   ```
   
4. Update the environment variables with your values (see [Environment Variables](#environment-variables) section).

### Running Locally

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# EmailJS Configuration
VITE_EMAIL_SERVICE_ID=your_service_id
VITE_EMAIL_TEMPLATE_ID=your_template_id
VITE_EMAIL_USER_ID=your_user_id

# Site Base URL (used for SEO)
VITE_SITE_URL=https://bytehatacademy.com

# Database Configuration
VITE_DATABASE_URL=postgresql://username:password@hostname:5432/database_name

# Security
VITE_JWT_SECRET=your_jwt_secret_key
```

In Replit, you can set these as Secrets in the appropriate tool.

### Database Setup

The application uses PostgreSQL for data storage. You need to:

1. Create a PostgreSQL database (in Replit, use the built-in Replit Database or connect to an external PostgreSQL instance)
2. Set the `VITE_DATABASE_URL` environment variable to your database connection string
3. The application will automatically create the necessary tables and seed initial data on startup

## Project Structure

```
bytehat-academy/
├── public/               # Static files
│   ├── robots.txt        # Instructions for search engine crawlers
│   ├── sitemap.xml       # XML sitemap for search engines
│   └── ...
├── src/                  # Source code
│   ├── components/       # Reusable React components
│   ├── pages/            # Page components
│   ├── utils/            # Utility functions
│   ├── images/           # Image assets
│   └── ...
├── .env.example          # Example environment variables
├── package.json          # Project dependencies and scripts
├── vite.config.ts        # Vite configuration
└── ...
```

## Deployment

### Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

This will create a `build` directory with optimized production files.

### Deploying on Replit

1. Fork this repository to your Replit account.
2. Set the necessary environment variables in the Secrets tool.
3. Run the following command to build the project:
   ```bash
   npm run build
   ```
4. Use the Deployment tool to deploy your application.

## Security Features

ByteHat Academy implements several security measures:

- **Content Security Policy (CSP)**: Restricts which resources can be loaded.
- **CSRF Protection**: Prevents cross-site request forgery attacks.
- **Input Sanitization**: All user inputs are sanitized to prevent XSS attacks.
- **Rate Limiting**: Forms implement basic rate limiting to prevent abuse.
- **Error Handling**: Comprehensive error handling with an error boundary component.
- **Secure Headers**: Implements various security headers for better protection.
- **Offline Support**: Service worker for improved performance and offline capabilities.

## Testing

Run tests with:

```bash
npm test
# or
yarn test
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
