import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Search } from 'lucide-react';
import SearchBar from './SearchBar';

/**
 * Props for the Navbar component
 * @interface NavbarProps
 */
interface NavbarProps {
  /** Current theme of the application */
  currentTheme: 'dark' | 'light';
  /** Function to toggle between dark and light theme */
  toggleTheme: () => void;
}

/**
 * Navigation bar component for the application
 * @param {NavbarProps} props - Component props
 * @returns {JSX.Element} The rendered navbar
 */
const Navbar: React.FC<NavbarProps> = ({ currentTheme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const theme = currentTheme;

  // Close mobile menu on route change or window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Also close mobile menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="bg-gray-900 bg-opacity-95 dark:bg-gray-900 light:bg-white light:bg-opacity-95 fixed w-full z-10 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="font-bold text-xl md:text-2xl text-white dark:text-white light:text-gray-900">
                ByteHat<span className="text-accent">Academy</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`${
                location.pathname === '/'
                  ? 'text-accent'
                  : 'text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-accent'
              } transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className={`${
                location.pathname === '/courses'
                  ? 'text-accent'
                  : 'text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-accent'
              } transition-colors`}
            >
              Courses
            </Link>
            <Link
              to="/blog"
              className={`${
                location.pathname.includes('/blog')
                  ? 'text-accent'
                  : 'text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-accent'
              } transition-colors`}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className={`${
                location.pathname === '/about'
                  ? 'text-accent'
                  : 'text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-accent'
              } transition-colors`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`${
                location.pathname === '/contact'
                  ? 'text-accent'
                  : 'text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-accent'
              } transition-colors`}
            >
              Contact
            </Link>

            {/* Desktop Search */}
            <div className="relative">
              <SearchBar />
            </div>

            {/* Theme Toggle for Desktop */}
            <button
              onClick={toggleTheme}
              className="text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
            </button>
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-accent"
              aria-label="Toggle search"
            >
              <Search size={22} />
            </button>
            <button
              onClick={toggleTheme}
              className="text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-accent"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 dark:text-gray-300 light:text-gray-700 hover:text-accent"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out mb-4 ${
            isSearchOpen ? 'max-h-20 opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <SearchBar onItemClick={() => setIsSearchOpen(false)} />
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 dark:bg-gray-800 light:bg-gray-100">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/'
                ? 'text-accent'
                : 'text-white dark:text-white light:text-gray-900 hover:text-accent'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/courses"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/courses'
                ? 'text-accent'
                : 'text-white dark:text-white light:text-gray-900 hover:text-accent'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Courses
          </Link>
          <Link
            to="/blog"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname.includes('/blog')
                ? 'text-accent'
                : 'text-white dark:text-white light:text-gray-900 hover:text-accent'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/about'
                ? 'text-accent'
                : 'text-white dark:text-white light:text-gray-900 hover:text-accent'
            }`}
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/contact'
                ? 'text-accent'
                : 'text-white dark:text-white light:text-gray-900 hover:text-accent'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;