import React, { useState, useEffect } from 'react';
import { Shield, Cloud, Code, Terminal, Brain, Lock } from 'lucide-react';
import CourseModal from '../components/CourseModal';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';

interface Course {
  icon: JSX.Element;
  title: string;
  description: string;
  duration: string;
  level: string;
  status: string;
  image?: string;
}

const courses: Course[] = [
  {
    icon: <Shield className="h-12 w-12 text-accent" />,
    title: 'Ethical Hacking',
    description: 'Master penetration testing, vulnerability assessment, and ethical hacking methodologies. CEH-inspired curriculum with hands-on labs.',
    duration: '12 weeks',
    level: 'Beginner',
    status: 'Enroll Now',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
  },
  {
    icon: <Lock className="h-12 w-12 text-accent" />,
    title: 'Defensive Security/SOC',
    description: 'Learn security operations, threat detection, incident response, and defensive strategies for enterprise environments.',
    duration: '10 weeks',
    level: 'Beginner to Intermediate',
    status: 'Enroll Now',
    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80',
  },
  {
    icon: <Cloud className="h-12 w-12 text-accent" />,
    title: 'Cloud Security',
    description: 'Secure cloud infrastructure and applications across AWS based training. Focus on cloud-native security practices and AWS hacking',
    duration: '8 weeks',
    level: 'Intermediate',
    status: 'Enroll Now',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80',
  },
  {
    icon: <Code className="h-12 w-12 text-accent" />,
    title: 'DevSecOps',
    description: 'Integrate security into the development lifecycle. Learn secure coding, CI/CD security, and automated security testing.',
    duration: '10 weeks',
    level: 'Intermediate to Advanced',
    status: 'Enroll Now',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80',
  },
  {
    icon: <Terminal className="h-12 w-12 text-accent" />,
    title: 'Advanced Cybersecurity',
    description: 'Deep dive into advanced topics including malware analysis, reverse engineering, and advanced persistent threats.',
    duration: '16 weeks',
    level: 'Advanced',
    status: 'Enroll Now',
    image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80',
  },
  {
    icon: <Brain className="h-12 w-12 text-accent" />,
    title: 'IoT Hacking',
    description: 'Explore security vulnerabilities in IoT devices, firmware analysis, and hardware hacking techniques.',
    duration: '8 weeks',
    level: 'Intermediate to Advanced',
    status: 'Coming Soon',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80',
  },
];

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const location = useLocation();
  
  // Handle course opening from search results
  useEffect(() => {
    if (location.state?.openCourse) {
      const courseId = location.state.openCourse;
      const foundCourse = courses.find(course => 
        course.title.toLowerCase().replace(/\s+/g, '-') === courseId);
      
      if (foundCourse) {
        setSelectedCourse(foundCourse);
      }
    }
  }, [location.state]);

  return (
    <>
      <SEO
        title="Cybersecurity Courses | ByteHat Academy"
        description="Comprehensive cybersecurity courses including ethical hacking, cloud security, DevSecOps, and more. Start your cybersecurity career with ByteHat Academy."
        keywords="cybersecurity courses, ethical hacking training, DevSecOps certification, cloud security training, SOC analyst training, CEH course, cybersecurity certification"
        url="/courses"
      />

      <div className="pt-20 pb-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Courses</h1>
            <p className="text-xl text-gray-400">
              Comprehensive cybersecurity training for all skill levels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="card">
                <div className="mb-6">{course.icon}</div>
                <h2 className="text-2xl font-bold mb-3">{course.title}</h2>
                <p className="text-gray-400 mb-4">{course.description}</p>
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold">Duration:</span> {course.duration}
                  </p>
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold">Level:</span> {course.level}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="btn-primary w-full"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </>
  );
};

export default Courses;