import emailjs from '@emailjs/browser';

interface EmailParams {
  to_email: string;
  from_name: string;
  message: string;
  reply_to: string;
}

export const sendEmail = async (params: EmailParams) => {
  try {
    const response = await emailjs.send(
      'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
      params,
      'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
    );
    return response;
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};