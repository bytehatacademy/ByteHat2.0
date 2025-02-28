import emailjs from '@emailjs/browser';
import { sanitizeInput, isValidEmail } from './securityHelpers';

interface EmailParams {
  to_email: string;
  from_name: string;
  message: string;
  reply_to: string;
}

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(import.meta.env.VITE_EMAIL_USER_ID || 'IJWEL3vLnHzrOlkZF');
};

/**
 * Validate email parameters before sending
 * @param params Email parameters to validate
 * @returns Array of error messages, empty if valid
 */
const validateEmailParams = (params: EmailParams): string[] => {
  const errors: string[] = [];

  if (!params.from_name || params.from_name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!params.reply_to || !isValidEmail(params.reply_to)) {
    errors.push('Valid email address is required');
  }

  if (!params.message || params.message.trim().length === 0) {
    errors.push('Message is required');
  }

  return errors;
};

/**
 * Send an email with sanitized input
 * @param params Email parameters
 * @returns Promise resolving to the send result
 */
export const sendEmail = async (params: EmailParams): Promise<any> => {
  try {
    // Validate parameters
    const validationErrors = validateEmailParams(params);
    if (validationErrors.length > 0) {
      throw new Error('Validation failed: ' + validationErrors.join(', '));
    }

    // Sanitize inputs
    const sanitizedParams = {
      to_email: sanitizeInput(params.to_email),
      from_name: sanitizeInput(params.from_name),
      message: sanitizeInput(params.message),
      reply_to: sanitizeInput(params.reply_to)
    };

    // For demo purposes only
    console.log("Demo: Email would be sent with params:", sanitizedParams);

    // Simulate successful email sending for demo
    await new Promise(resolve => setTimeout(resolve, 500));

    // In production, uncomment this code:
    return await emailjs.send(
      import.meta.env.VITE_EMAIL_SERVICE_ID || 'service_id',
      import.meta.env.VITE_EMAIL_TEMPLATE_ID || 'template_id',
      sanitizedParams,
      import.meta.env.VITE_EMAIL_USER_ID || 'user_id'
    );

    // Return success for demo environment
    // return { status: 200, text: 'Demo: Email sent successfully' };
  } catch (error) {
    console.error('Email service error:', error);
    // Log error but don't expose details to client
    throw new Error('Failed to send email. Please try again later.');
  }
};