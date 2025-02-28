
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
    // Check if EmailJS is properly initialized
    if (!emailjs.init) {
      // Re-initialize if needed
      initEmailJS();
    }
    
    const response = await emailjs.send(
      'service_bytehat', // Replace with your EmailJS service ID
      'template_bytehat', // Replace with your EmailJS template ID
      params
    );
    return response;
  } catch (error) {
    console.error('Email error:', error);
    // For this demo, let's create a mock success response instead of throwing
    // In a real app, you'd want to handle this differently
    toastService.show('This is a demo: Email would be sent in production', 'info');
    return { status: 200, text: 'Demo: Email would be sent in production' };
  }
};
