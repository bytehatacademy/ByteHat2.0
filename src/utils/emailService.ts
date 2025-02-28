
import emailjs from '@emailjs/browser';
import { toastService } from '../components/ToastContainer';

interface EmailParams {
  to_email: string;
  from_name: string;
  message: string;
  reply_to: string;
}

// Initialize EmailJS - you should call this once when your app starts
export const initEmailJS = () => {
  emailjs.init('IJWEL3vLnHzrOlkZF'); // Replace with your actual public key if different
};

export const sendEmail = async (params: EmailParams) => {
  try {
    // For demo purposes only
    console.log("Demo: Email would be sent with params:", params);
    
    // Simulate successful email sending for demo
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return success for demo environment
    return { status: 200, text: 'Demo: Email sent successfully' };
  } catch (error) {
    console.error('Email service error:', error);
    throw error; // Rethrow to let components handle the error
  }
};
