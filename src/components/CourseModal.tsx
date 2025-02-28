import React, { useState } from 'react';
import { X } from 'lucide-react';
import { sendEmail } from '../utils/emailService';

interface CourseModalProps {
  course: {
    title: string;
    description: string;
    duration: string;
    level: string;
    image?: string;
  };
  onClose: () => void;
}

const CourseModal: React.FC<CourseModalProps> = ({ course, onClose }) => {
  const [email, setEmail] = useState('');
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [message, setMessage] = useState('');

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEnrolling(true);
    try {
      await sendEmail({
        to_email: 'bytehatacademy@gmail.com',
        from_name: email,
        message: `Enrollment request for ${course.title}`,
        reply_to: email,
      });
      setMessage('Thank you for your interest! We will contact you soon.');
      setEmail('');
    } catch (error) {
      setMessage('Something went wrong. Please try again later.');
    }
    setIsEnrolling(false);
  };

  const handleDownloadSyllabus = () => {
    // Replace with actual syllabus PDF URL
    const syllabusUrl = `./syllabi/${course.title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    window.open(syllabusUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{course.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {course.image && (
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover rounded-lg mb-6"
            />
          )}

          <div className="space-y-4 mb-6">
            <p className="text-gray-300">{course.description}</p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                Duration: {course.duration}
              </span>
              <span className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                Level: {course.level}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={handleDownloadSyllabus}
              className="btn-secondary flex-1"
            >
              Download Syllabus
            </button>
            <button
              onClick={() => setIsEnrolling(true)}
              className="btn-primary flex-1"
            >
              Enroll Now
            </button>
          </div>

          {isEnrolling && (
            <form onSubmit={handleEnroll} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Submit
              </button>
            </form>
          )}

          {message && (
            <p className="mt-4 text-center text-sm text-accent">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseModal;