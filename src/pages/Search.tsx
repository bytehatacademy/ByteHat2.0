
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

// Mock data - in a real app you'd fetch these from an API
const searchData = {
  courses: [
    {
      title: 'Ethical Hacking',
      description: 'Master penetration testing, vulnerability assessment, and ethical hacking methodologies. CEH-inspired curriculum with hands-on labs.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
      url: '/courses#ethical-hacking',
      type: 'course'
    },
    {
      title: 'Defensive Security/SOC',
      description: 'Learn security operations, threat detection, incident response, and defensive strategies for enterprise environments.',
      image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80',
      url: '/courses#defensive-security',
      type: 'course'
    },
    {
      title: 'Cloud Security',
      description: 'Secure cloud infrastructure and applications across AWS based training. Focus on cloud-native security practices and AWS hacking',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80',
      url: '/courses#cloud-security',
      type: 'course'
    },
    {
      title: 'DevSecOps',
      description: 'Integrate security into the development lifecycle. Learn secure coding, CI/CD security, and automated security testing.',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80',
      url: '/courses#devsecops',
      type: 'course'
    }
  ],
  blogs: [
    {
      title: 'Top 5 Cloud Security Tips for 2025',
      excerpt: 'Essential cloud security practices to protect your infrastructure in the age of distributed computing.',
      author: 'Sethu Satheesh',
      date: 'March 15, 2025',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80',
      url: '/blog/top-5-cloud-security-tips-for-2025',
      type: 'blog'
    },
    {
      title: 'Why Learn Ethical Hacking in 2025',
      excerpt: "The growing importance of ethical hacking skills in today's cybersecurity landscape.",
      author: 'Michael Rodriguez',
      date: 'March 10, 2025',
      image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80',
      url: '/blog/why-learn-ethical-hacking-in-2025',
      type: 'blog'
    },
    {
      title: 'DevSecOps: The Future of Secure Development',
      excerpt: 'How DevSecOps is transforming the way we approach security in software development.',
      author: 'Emma Watson',
      date: 'March 5, 2025',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80',
      url: '/blog/devsecops-the-future-of-secure-development',
      type: 'blog'
    },
    {
      title: 'AI in Cybersecurity: Trends to Watch',
      excerpt: 'Exploring the latest developments in AI-powered cybersecurity solutions.',
      author: 'Sethu Satheesh',
      date: 'March 1, 2025',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80',
      url: '/blog/ai-in-cybersecurity-trends-to-watch',
      type: 'blog'
    }
  ]
};

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with setTimeout
    setLoading(true);
    const timer = setTimeout(() => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      const lowerQuery = query.toLowerCase();
      
      // Search in courses
      const courseResults = searchData.courses.filter(
        course => 
          course.title.toLowerCase().includes(lowerQuery) || 
          course.description.toLowerCase().includes(lowerQuery)
      );
      
      // Search in blogs
      const blogResults = searchData.blogs.filter(
        blog => 
          blog.title.toLowerCase().includes(lowerQuery) || 
          blog.excerpt.toLowerCase().includes(lowerQuery)
      );
      
      setResults([...courseResults, ...blogResults]);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      <Helmet>
        <title>Search Results for "{query}" | ByteHat Academy</title>
        <meta
          name="description"
          content={`Search results for "${query}" at ByteHat Academy - Find courses, blogs, and resources related to your search.`}
        />
      </Helmet>

      <div className="pt-20 pb-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Search Results
            </h1>
            <p className="text-xl text-gray-400">
              {query ? `Showing results for "${query}"` : 'Enter a search term to find courses and blogs'}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {results.map((item, index) => (
                <div key={index} className="card overflow-hidden">
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="p-6">
                    {item.type === 'blog' && (
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-accent text-sm font-medium">
                          Blog Post
                        </span>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          {item.date}
                        </div>
                      </div>
                    )}
                    {item.type === 'course' && (
                      <div className="mb-4">
                        <span className="text-accent text-sm font-medium">
                          Course
                        </span>
                      </div>
                    )}
                    <h2 className="text-2xl font-bold mb-3">{item.title}</h2>
                    <p className="text-gray-400 mb-4">
                      {item.type === 'blog' ? item.excerpt : item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      {item.type === 'blog' && (
                        <div className="flex items-center text-sm text-gray-400">
                          <User className="h-4 w-4 mr-1" />
                          {item.author}
                        </div>
                      )}
                      <Link
                        to={item.url}
                        className="flex items-center text-accent hover:text-accent/80 transition-colors ml-auto"
                      >
                        {item.type === 'blog' ? 'Read Article' : 'View Course'}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">No results found</h2>
              <p className="text-gray-400 mb-8">
                We couldn't find any matches for "{query}". Please try a different search term.
              </p>
              <Link to="/" className="btn-primary">
                Return to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
