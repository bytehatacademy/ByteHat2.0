import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Cloud, Code, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/2.jpg'; // Import your local image

const features = [
  {
    icon: <Shield className="h-8 w-8 text-accent" />,
    title: 'Ethical Hacking',
    description:
      'Master the art of ethical hacking with hands-on penetration testing and security assessments.',
  },
  {
    icon: <Cloud className="h-8 w-8 text-accent" />,
    title: 'Cloud Security',
    description:
      'Learn to secure cloud infrastructure and applications across major platforms.',
  },
  {
    icon: <Code className="h-8 w-8 text-accent" />,
    title: 'DevSecOps',
    description:
      'Integrate security into the development lifecycle with modern DevSecOps practices.',
  },
  {
    icon: <Brain className="h-8 w-8 text-accent" />,
    title: 'AI Security',
    description:
      'Explore the intersection of AI and cybersecurity with cutting-edge training.',
  },
];

const Home = () => {
  return (
    <>
      <Helmet>
        <title>ByteHat Academy | Cybersecurity Training & Courses</title>
        <meta
          name="description"
          content="Learn ethical hacking, DevSecOps, and cloud security with ByteHat Academy's hands-on courses. Master cybersecurity with experts."
        />
        <meta
          name="keywords"
          content="cybersecurity training, ethical hacking, DevSecOps, cloud security courses, AI cybersecurity"
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`, // Use the local image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gray-900/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Hack the Bytes,
              <br />
              <span className="text-accent">Secure the Future</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Master cybersecurity with hands-on training from experts
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/courses" className="btn-primary">
                Explore Courses
              </Link>
              <Link to="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose ByteHat Academy?
            </h2>
            <p className="text-gray-400 text-lg">
              Comprehensive cybersecurity education for the modern digital world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Join ByteHat Academy and become a cybersecurity expert
            </p>
            <Link to="/courses" className="btn-primary">
              View All Courses
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
