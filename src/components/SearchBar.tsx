
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onItemClick?: () => void;
}

// Mock data structure - you would normally fetch this from an API
const mockSearchData = {
  courses: [
    { title: 'Ethical Hacking', url: '/courses#ethical-hacking' },
    { title: 'Defensive Security/SOC', url: '/courses#defensive-security' },
    { title: 'Cloud Security', url: '/courses#cloud-security' },
    { title: 'DevSecOps', url: '/courses#devsecops' },
  ],
  blogs: [
    { title: 'Top 5 Cloud Security Tips for 2025', url: '/blog/cloud-security-tips' },
    { title: 'Why Learn Ethical Hacking in 2025', url: '/blog/ethical-hacking' },
    { title: 'DevSecOps: The Future of Secure Development', url: '/blog/devsecops-future' },
    { title: 'AI in Cybersecurity: Trends to Watch', url: '/blog/ai-cybersecurity-trends' },
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  const handleItemClick = (url: string) => {
    navigate(url);
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
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, blogs..."
            className="w-full bg-gray-800 text-white pl-10 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
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
