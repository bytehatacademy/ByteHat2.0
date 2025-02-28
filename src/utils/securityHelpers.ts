
/**
 * Security utility functions for enhancing web application security
 */

/**
 * Validates input to prevent XSS attacks
 * @param input User input string
 * @returns Sanitized string
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validates an email address format
 * @param email Email to validate
 * @returns Boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generates a Content Security Policy header value
 * @returns CSP header value
 */
export const getCSPPolicy = (): string => {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://emailjs.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' https: data:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://api.emailjs.com",
    "frame-src 'self'",
    "object-src 'none'"
  ].join('; ');
};
