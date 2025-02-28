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