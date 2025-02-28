import { useEffect } from 'react';
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
import { initEmailJS } from './utils/emailService';
import './App.css';

function App() {
  useEffect(() => {
    // Initialize EmailJS when the app loads
    initEmailJS();
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-900 text-white font-montserrat">
          <Navbar />
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
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;