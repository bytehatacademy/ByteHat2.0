
import emailjs from '@emailjs/browser';

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
    const response = await emailjs.send(
      'service_bytehat', // Replace with your EmailJS service ID
      'template_bytehat', // Replace with your EmailJS template ID
      params
    );
    return response;
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};
