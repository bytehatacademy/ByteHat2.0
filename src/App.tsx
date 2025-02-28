import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import ToastContainer from './components/ToastContainer';
import ErrorBoundary from './components/ErrorBoundary';
import { initEmailJS } from './utils/emailService';
import { getCSPPolicy } from './utils/securityHelpers';

import './App.css';

function App() {
  useEffect(() => {
    // Initialize EmailJS
    initEmailJS();

    // Add additional security measures
    document.addEventListener('contextmenu', (e) => {
      if (import.meta.env.PROD) {
        e.preventDefault(); // Prevent right-click menu in production
      }
    });
  }, []);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <div className="app">
            <Helmet>
              {/* Security Headers */}
              <meta httpEquiv="Content-Security-Policy" content={getCSPPolicy()} />
              <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
              <meta httpEquiv="X-Frame-Options" content="DENY" />
              <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
              <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
              <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
            </Helmet>
            <Navbar />
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/search" element={<Search />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;