
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | ByteHat Academy</title>
        <meta name="description" content="The page you're looking for cannot be found." />
      </Helmet>

      <div className="pt-20 pb-16 flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <h1 className="text-8xl font-bold mb-4">404</h1>
          <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
