
/**
 * CSRF Protection Utilities
 */

/**
 * Generate a random CSRF token
 * @returns Random token string
 */
export const generateCSRFToken = (): string => {
  return Array(32)
    .fill(0)
    .map(() => Math.random().toString(36).charAt(2))
    .join('');
};

/**
 * Store CSRF token in session storage
 * @param token CSRF token to store
 */
export const storeCSRFToken = (token: string): void => {
  sessionStorage.setItem('csrf_token', token);
};

/**
 * Get stored CSRF token
 * @returns Stored CSRF token or null if not found
 */
export const getStoredCSRFToken = (): string | null => {
  return sessionStorage.getItem('csrf_token');
};

/**
 * Initialize CSRF protection
 * Generates and stores a new token if one doesn't exist
 * @returns Current CSRF token
 */
export const initCSRFProtection = (): string => {
  let token = getStoredCSRFToken();
  
  if (!token) {
    token = generateCSRFToken();
    storeCSRFToken(token);
  }
  
  return token;
};

/**
 * Validate if a token matches the stored token
 * @param token Token to validate
 * @returns Boolean indicating if token is valid
 */
export const validateCSRFToken = (token: string): boolean => {
  const storedToken = getStoredCSRFToken();
  return token === storedToken;
};
