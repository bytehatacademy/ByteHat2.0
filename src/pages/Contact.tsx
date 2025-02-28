import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin } from 'lucide-react';
import { toastService } from '../components/ToastContainer';
import { sendEmail } from '../utils/emailService';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | ByteHat Academy</title>
        <meta
          name="description"
          content="Get in touch with ByteHat Academy for inquiries about our cybersecurity courses and training programs."
        />
        <meta
          name="keywords"
          content="contact ByteHat Academy, cybersecurity training contact, course inquiries"
        />
      </Helmet>

      <div className="pt-20 pb-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-400">
              Have questions? We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form 
                  className="space-y-6"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get('name') as string;
                    const email = formData.get('email') as string;
                    const message = formData.get('message') as string;

                    // Enhanced validation
                    if (!name || name.trim().length < 2) {
                      toastService.show('Please enter your name (minimum 2 characters)', 'warning');
                      return;
                    }

                    // Email validation using regex
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!email || !emailRegex.test(email)) {
                      toastService.show('Please enter a valid email address', 'warning');
                      return;
                    }

                    if (!message || message.trim().length < 10) {
                      toastService.show('Please enter a detailed message (minimum 10 characters)', 'warning');
                      return;
                    }

                    // Show loading state and disable form
                    const form = e.currentTarget;
                    const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                    const originalButtonText = submitButton.innerText;
                    submitButton.innerText = 'Sending...';
                    submitButton.disabled = true;

                    // Disable all form inputs during submission
                    Array.from(form.elements).forEach((element) => {
                      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                        element.disabled = true;
                      }
                    });

                    try {
                      // Send email via EmailJS
                      const result = await sendEmail({
                        to_email: 'bytehatacademy@gmail.com',
                        from_name: name.trim(),
                        message: message.trim(),
                        reply_to: email.trim(),
                      });

                      if (result && result.status === 200) {
                        toastService.show('Message sent successfully! We will get back to you soon.', 'success');
                        form.reset();
                      } else {
                        throw new Error('Failed to send message');
                      }
                    } catch (error) {
                      console.error('Error sending email:', error);
                      toastService.show('Failed to send message. Please try again later.', 'error');
                    } finally {
                      // Re-enable form regardless of outcome
                      submitButton.innerText = originalButtonText;
                      submitButton.disabled = false;

                      // Re-enable all form inputs
                      Array.from(form.elements).forEach((element) => {
                        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                          element.disabled = false;
                        }
                      });
                    }
                  }}
                  aria-label="Contact form"
                >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Your message"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-accent mr-4 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-gray-400">bytehatacademy@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-accent mr-4 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-gray-400">+91 7558 9513 51</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-accent mr-4 mt-1" />
                    <div>
                      <h3 className="font-medium mb-1">Location</h3>
                      <p className="text-gray-400">
                        Kerala, IN
                        <br />
                        {/* San Francisco, CA 94105 */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Office Hours</h2>
                <div className="space-y-2">
                  <p className="text-gray-400">
                    <span className="font-medium text-white">
                      Monday - Saturday:
                    </span>{' '}
                    9:00 AM - 6:00 PM (IST)
                  </p>
                  {/* <p className="text-gray-400">
                    <span className="font-medium text-white">Saturday:</span> 10:00
                    AM - 2:00 PM (IST)
                  </p> */}
                  <p className="text-gray-400">
                    <span className="font-medium text-white">Sunday:</span> Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;