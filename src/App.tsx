import { useEffect, useState, useCallback, Component, ErrorInfo, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Contact from './pages/Contact';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import ToastContainer from './components/ToastContainer';
import { initEmailJS } from './utils/emailService';
import { toastService } from './components/ToastContainer';
import './App.css';

/**
 * Error Boundary component to catch JavaScript errors
 * and display a fallback UI instead of crashing the app
 */
class ErrorBoundary extends Component<{ children: ReactNode, fallback?: ReactNode }> {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    
    // In production, you would send this to a monitoring service
    if (process.env.NODE_ENV === 'production') {
      // sendToErrorMonitoring(error, errorInfo);
    }
  }
  
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="mb-4">We apologize for the inconvenience. Please try refreshing the page.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary">
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    
    return this.props.children;
  }
}

/**
 * Main App component
 */
function App() {
  // Track theme for controlled component behavior
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  /**
   * Theme toggling function that can be passed to components
   */
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      document.documentElement.classList.toggle('light', newTheme === 'light');
      return newTheme;
    });
  }, []);
  
  /**
   * Initialize app settings on mount
   */
  useEffect(() => {
    // Initialize EmailJS for contact forms
    try {
      initEmailJS();
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
      toastService.show('Some features may be unavailable', 'warning');
    }
    
    // Apply saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const validTheme = savedTheme === 'light' ? 'light' : 'dark';
    setTheme(validTheme as 'dark' | 'light');
    
    document.documentElement.classList.toggle('dark', validTheme === 'dark');
    document.documentElement.classList.toggle('light', validTheme === 'light');
    
    // Set meta theme color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        validTheme === 'dark' ? '#111827' : '#ffffff'
      );
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = validTheme === 'dark' ? '#111827' : '#ffffff';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <div className={`flex flex-col min-h-screen bg-gray-900 text-white font-montserrat transition-colors duration-300 ${theme}`}>
            <Navbar currentTheme={theme} toggleTheme={toggleTheme} />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/search" element={<Search />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer />
          </div>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;