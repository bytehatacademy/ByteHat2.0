
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Props for the SearchBar component
 * @interface SearchBarProps
 */
interface SearchBarProps {
  /** Optional callback function when a search result is clicked */
  onItemClick?: () => void;
}

/**
 * Search result item structure
 * @interface SearchItem
 */
interface SearchItem {
  /** Display title of the search result */
  title: string;
  /** URL to navigate to when clicked */
  url: string;
}

/**
 * Mock data structure for search results
 * In production, this would be fetched from an API
 */
const mockSearchData: {
  courses: SearchItem[];
  blogs: SearchItem[];
} = {
  courses: [
    { title: 'Ethical Hacking', url: '/courses#ethical-hacking' },
    { title: 'Defensive Security/SOC', url: '/courses#defensive-security' },
    { title: 'Cloud Security', url: '/courses#cloud-security' },
    { title: 'DevSecOps', url: '/courses#devsecops' },
  ],
  blogs: [
    { title: 'Top 5 Cloud Security Tips for 2025', url: '/blog/top-5-cloud-security-tips-for-2025' },
    { title: 'Why Learn Ethical Hacking in 2025', url: '/blog/why-learn-ethical-hacking-in-2025' },
    { title: 'DevSecOps: The Future of Secure Development', url: '/blog/devsecops-the-future-of-secure-development' },
    { title: 'AI in Cybersecurity: Trends to Watch', url: '/blog/ai-in-cybersecurity-trends-to-watch' },
  ],
};

const SearchBar: React.FC<SearchBarProps> = ({ onItemClick }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ type: string; items: any[] }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Perform search as user types
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setIsOpen(true);

    // Simulate API call with setTimeout
    const timer = setTimeout(() => {
      const filteredCourses = mockSearchData.courses.filter(course =>
        course.title.toLowerCase().includes(query.toLowerCase())
      );
      
      const filteredBlogs = mockSearchData.blogs.filter(blog =>
        blog.title.toLowerCase().includes(query.toLowerCase())
      );

      setResults([
        { type: 'Courses', items: filteredCourses },
        { type: 'Blogs', items: filteredBlogs }
      ]);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  /**
   * Handles form submission for search
   * @param {React.FormEvent} e - Form event
   */
  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault();
    
    // Validate and sanitize the query
    const sanitizedQuery = query.trim();
    if (sanitizedQuery) {
      // Use encodeURIComponent to safely include the query in the URL
      navigate(`/search?q=${encodeURIComponent(sanitizedQuery)}`);
      setIsOpen(false);
    }
  };

  /**
   * Handles click on a search result item
   * @param {string} url - URL to navigate to
   */
  const handleItemClick = (url: string): void => {
    // Validate URL for security
    if (!url || typeof url !== 'string') {
      console.error('Invalid URL provided to handleItemClick');
      return;
    }
    
    // Parse URL to determine if it's a course or blog post
    if (url.startsWith('/courses#')) {
      // For courses, navigate to courses page and trigger the corresponding modal
      const courseId = url.split('#')[1];
      if (courseId) {
        navigate('/courses', { state: { openCourse: courseId } });
      } else {
        navigate('/courses');
      }
    } else if (url.startsWith('/blog/')) {
      // For blog posts, navigate to the specific blog post
      // Ensure we reset the query and close dropdown before navigation
      setQuery('');
      setIsOpen(false);
      
      // Use requestAnimationFrame instead of setTimeout for better browser compatibility
      requestAnimationFrame(() => {
        navigate(url);
      });
    } else {
      // Default navigation with validation
      if (url.startsWith('/')) {
        navigate(url);
      } else {
        console.error('Attempted to navigate to invalid URL:', url);
      }
    }
    
    setQuery('');
    setIsOpen(false);
    if (onItemClick) {
      onItemClick();
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="relative" role="search">
        <div className="relative">
          <label htmlFor="site-search" className="sr-only">Search courses and blogs</label>
          <input
            id="site-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, blogs..."
            className="w-full bg-gray-800 text-white pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Search through site content"
            autoComplete="off"
            maxLength={100}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" aria-hidden="true" />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </form>
      
      {/* Search results dropdown */}
      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-4 text-gray-400 text-center">Searching...</div>
          ) : results.some(category => category.items.length > 0) ? (
            <div className="max-h-80 overflow-y-auto">
              {results.map((category) => 
                category.items.length > 0 && (
                  <div key={category.type}>
                    <div className="px-4 py-2 bg-gray-700 text-xs font-semibold">
                      {category.type}
                    </div>
                    <div>
                      {category.items.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleItemClick(item.url)}
                          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                        >
                          {item.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="p-4 text-gray-400 text-center">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
