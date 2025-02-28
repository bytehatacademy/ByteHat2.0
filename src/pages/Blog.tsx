import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    title: 'Top 5 Cloud Security Tips for 2025',
    excerpt:
      'Essential cloud security practices to protect your infrastructure in the age of distributed computing.',
    author: 'Sethu Satheesh',
    date: 'March 15, 2025',
    image:
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80',
    category: 'Cloud Security',
  },
  {
    title: 'Why Learn Ethical Hacking in 2025',
    excerpt:
      "The growing importance of ethical hacking skills in today's cybersecurity landscape.",
    author: 'Michael Rodriguez',
    date: 'March 10, 2025',
    image:
      'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80',
    category: 'Ethical Hacking',
  },
  {
    title: 'DevSecOps: The Future of Secure Development',
    excerpt:
      'How DevSecOps is transforming the way we approach security in software development.',
    author: 'Emma Watson',
    date: 'March 5, 2025',
    image:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80',
    category: 'DevSecOps',
  },
  {
    title: 'AI in Cybersecurity: Trends to Watch',
    excerpt:
      'Exploring the latest developments in AI-powered cybersecurity solutions.',
    author: 'Sethu Satheesh',
    date: 'March 1, 2025',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80',
    category: 'AI Security',
  },
];

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog | ByteHat Academy</title>
        <meta
          name="description"
          content="Stay updated with the latest cybersecurity trends, tips, and insights from ByteHat Academy's expert instructors."
        />
        <meta
          name="keywords"
          content="cybersecurity blog, hacking tutorials, security tips, DevSecOps insights"
        />
      </Helmet>

      <div className="pt-20 pb-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              ByteHat Academy Blog
            </h1>
            <p className="text-xl text-gray-400">
              Latest insights, tutorials, and updates from our cybersecurity experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="card overflow-hidden">
                <div
                  className="h-48 bg-cover bg-center mb-6"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-accent text-sm font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-400">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <button className="flex items-center text-accent hover:text-accent/80 transition-colors">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;