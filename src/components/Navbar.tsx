import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Monitor, Menu, X, Moon, Sun, Search } from 'lucide-react';
import SearchBar from './SearchBar';
import iconImage from '../images/icon.png';

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll <= 0) {
        setScrollDirection('up');
        return;
      }

      if (currentScroll > lastScroll && scrollDirection !== 'down') {
        setScrollDirection('down');
      } else if (currentScroll < lastScroll && scrollDirection !== 'up') {
        setScrollDirection('up');
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll, scrollDirection]);

  return scrollDirection;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const scrollDirection = useScrollDirection();
  
  useEffect(() => {
    // Check if user has previously set a theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    document.documentElement.classList.toggle('light', savedTheme === 'light');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div
      className={`fixed w-full z-50 px-4 sm:px-6 lg:px-8 pt-4 transition-transform duration-300 ${
        scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'bg-gray-900/80 backdrop-blur-lg shadow-lg'
            : 'bg-gray-900/60 backdrop-blur-md'
        }`}
      >
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <img src={iconImage} alt="Icon" className="h-9 w-15" />
              <span className="font-bold text-xl">ByteHat</span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 mx-8">
              <SearchBar />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-accent'
                      : 'text-gray-300 hover:text-accent'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button 
                onClick={toggleTheme}
                className="text-gray-300 hover:text-accent transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Navigation Buttons */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-300 hover:text-accent"
              >
                <Search size={22} />
              </button>
              <button
                onClick={toggleTheme}
                className="text-gray-300 hover:text-accent"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-accent"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Dropdown */}
          {isSearchOpen && !isOpen && (
            <div className="md:hidden px-4 py-3">
              <SearchBar onItemClick={() => setIsSearchOpen(false)} />
            </div>
          )}
          
          {/* Mobile Navigation Menu */}
          {isOpen && (
            <div className="md:hidden pb-4">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-3 py-2 rounded-lg text-base font-medium ${
                      location.pathname === link.path
                        ? 'text-accent bg-gray-800'
                        : 'text-gray-300 hover:text-accent hover:bg-gray-800'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <button 
                  onClick={toggleTheme}
                  className="flex items-center px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:text-accent hover:bg-gray-800 w-full"
                >
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  {theme === 'dark' ? <Sun size={20} className="ml-2" /> : <Moon size={20} className="ml-2" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import SearchBar from './SearchBar';

/**
 * Props for Navbar component
 * @interface NavbarProps
 */
interface NavbarProps {
  /** Current theme ('dark' or 'light') */
  currentTheme?: 'dark' | 'light';
  /** Function to toggle between dark and light themes */
  toggleTheme?: () => void;
}

/**
 * Navbar component for site navigation
 * @param {NavbarProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
const Navbar: React.FC<NavbarProps> = ({ currentTheme = 'dark', toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Add shadow to navbar when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`navbar fixed w-full z-30 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900 bg-opacity-95 shadow-lg backdrop-blur-md' 
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center" aria-label="ByteHat Academy Home">
              <span className="text-xl font-bold text-white">ByteHat Academy</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="mr-4">
              <SearchBar />
            </div>
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/' ? 'text-accent' : 'text-white hover:text-accent'
              }`}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/courses' ? 'text-accent' : 'text-white hover:text-accent'
              }`}
            >
              Courses
            </Link>
            <Link
              to="/blog"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname.includes('/blog') ? 'text-accent' : 'text-white hover:text-accent'
              }`}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/about' ? 'text-accent' : 'text-white hover:text-accent'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/contact' ? 'text-accent' : 'text-white hover:text-accent'
              }`}
            >
              Contact
            </Link>
            
            {/* Theme Toggle Button */}
            {toggleTheme && (
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label={currentTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                title={currentTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                {currentTheme === 'dark' ? (
                  <Sun className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                )}
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            {/* Search Icon for Mobile - Always visible */}
            <div className="mr-2">
              <SearchBar onItemClick={() => setIsOpen(false)} />
            </div>
            
            {/* Theme Toggle Button for Mobile */}
            {toggleTheme && (
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors mr-2"
                aria-label={currentTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                {currentTheme === 'dark' ? (
                  <Sun className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                )}
              </button>
            )}
            
            {/* Hamburger menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/' ? 'text-accent' : 'text-white hover:text-accent'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/courses"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/courses' ? 'text-accent' : 'text-white hover:text-accent'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Courses
          </Link>
          <Link
            to="/blog"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname.includes('/blog') ? 'text-accent' : 'text-white hover:text-accent'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/about' ? 'text-accent' : 'text-white hover:text-accent'
            }`}
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              location.pathname === '/contact' ? 'text-accent' : 'text-white hover:text-accent'
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
