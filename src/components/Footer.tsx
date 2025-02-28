import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Mail, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">ByteHat Academy</h3>
            <p className="text-sm mb-4">
              Empowering the next generation of cybersecurity professionals through
              hands-on training and cutting-edge education.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/ByteHatAcademy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/bytehatacademy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/bytehatacademy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-accent"
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:bytehatacademy@gmail.com"
                className="text-gray-400 hover:text-accent"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/courses"
                  className="text-gray-400 hover:text-accent transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-accent transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-accent transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-accent transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm mb-4">
              Subscribe to stay updated with our latest courses and cybersecurity
              news.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>© {currentYear} ByteHat Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;