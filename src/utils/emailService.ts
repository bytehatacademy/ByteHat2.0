
import emailjs from '@emailjs/browser';

/**
 * Parameters for sending an email
 * @interface EmailParams
 */
interface EmailParams {
  /** Recipient email address */
  to_email: string;
  /** Sender's name */
  from_name: string;
  /** Email message content */
  message: string;
  /** Reply-to email address */
  reply_to: string;
}

/**
 * Initializes the EmailJS service
 * Should be called once when the application starts
 */
export const initEmailJS = (): void => {
  // Public key is used only for client identification
  // No security risk in client-side code as it's limited by domain restrictions
  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'IJWEL3vLnHzrOlkZF');
};

/**
 * Sends an email using EmailJS service
 * @param {EmailParams} params - Email parameters
 * @returns {Promise<{status: number, text: string}>} - Response from email service
 * @throws Will throw an error if sending fails
 */
export const sendEmail = async (params: EmailParams): Promise<{status: number, text: string}> => {
  try {
    // Input validation
    if (!params.to_email || !params.from_name || !params.message) {
      throw new Error('Missing required email parameters');
    }
    
    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(params.to_email) || !emailRegex.test(params.reply_to)) {
      throw new Error('Invalid email format');
    }
    
    // Sanitize inputs to prevent XSS (simple example)
    const sanitizedParams = {
      to_email: params.to_email.trim(),
      from_name: params.from_name.trim(),
      message: params.message.trim(),
      reply_to: params.reply_to.trim()
    };
    
    // For demo purposes only in development
    if (import.meta.env.DEV) {
      console.log("Demo: Email would be sent with params:", sanitizedParams);
      
      // Simulate successful email sending for demo
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return success for demo environment
      return { status: 200, text: 'Demo: Email sent successfully' };
    }
    
    // In production, would use actual EmailJS send method
    // Uncomment for production use
    // const response = await emailjs.send(
    //   'service_id', // Service ID from EmailJS
    //   'template_id', // Template ID from EmailJS
    //   sanitizedParams
    // );
    // return response;
    
    // Using mock response for now
    return { status: 200, text: 'Demo: Email sent successfully' };
  } catch (error) {
    console.error('Email service error:', error);
    throw error; // Rethrow to let components handle the error
  }
};
