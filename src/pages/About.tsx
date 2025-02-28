import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Brain, Users } from 'lucide-react';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | ByteHat Academy</title>
        <meta
          name="description"
          content="Founded by cybersecurity experts, ByteHat Academy empowers learners to secure the digital world through hands-on training and cutting-edge education."
        />
        <meta
          name="keywords"
          content="cybersecurity education, AI security training, cybersecurity experts"
        />
      </Helmet>

      <div className="pt-20 bg-gray-900">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Founded by cybersecurity experts, ByteHat Academy empowers learners to
              secure the digital world. Our mission: Hack the Bytes, Secure the Future.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card text-center">
                <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Practical Excellence</h3>
                <p className="text-gray-400">
                  We believe in hands-on learning. Our courses focus on real-world
                  scenarios and practical applications.
                </p>
              </div>
              <div className="card text-center">
                <Brain className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Innovation First</h3>
                <p className="text-gray-400">
                  Embracing cutting-edge technologies and methodologies, including AI-driven
                  security education.
                </p>
              </div>
              <div className="card text-center">
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Community Driven</h3>
                <p className="text-gray-400">
                  Building a strong community of cybersecurity professionals and
                  enthusiasts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Founder</h2>
            <p className="text-gray-400">
              Leading the charge in cybersecurity education
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="card text-center">
              <div
                className="w-32 h-32 mx-auto mb-6 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url(https://media.licdn.com/dms/image/v2/D4D03AQHYYmbzgDWNUw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1708012459355?e=1746057600&v=beta&t=hO_qUuoUIoHmaSKFbTd2atog3MpuUnl0CtQIO3_8Qyk)',
                }}
              />
              <h3 className="text-2xl font-bold mb-2">Sethu Satheesh</h3>
              <p className="text-accent mb-4">Founder & Lead Instructor</p>
              <p className="text-gray-400">
                With over 5 years of experience in cybersecurity research and
                DevSecOps engineering, Sethu founded ByteHat Academy to bridge
                the gap between theoretical knowledge and practical application in
                cybersecurity education.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;