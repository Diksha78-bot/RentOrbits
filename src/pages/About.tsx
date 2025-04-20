import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCar, 
  faHome, 
  faHandshake, 
  faShieldAlt,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

const About = () => {
  const features = [
    {
      icon: faCar,
      title: 'Premium Vehicles',
      description: 'Access to a wide range of luxury and comfortable vehicles for all your needs.'
    },
    {
      icon: faHome,
      title: 'Quality Properties',
      description: 'Carefully selected properties in prime locations for your comfort.'
    },
    {
      icon: faHandshake,
      title: 'Customer First',
      description: '24/7 support and hassle-free booking process for your convenience.'
    },
    {
      icon: faShieldAlt,
      title: 'Safe & Secure',
      description: 'Fully insured vehicles and verified properties for your peace of mind.'
    }
  ];

  const achievements = [
    { number: '1000+', text: 'Happy Customers' },
    { number: '500+', text: 'Premium Vehicles' },
    { number: '200+', text: 'Properties' },
    { number: '24/7', text: 'Customer Support' }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <div className="relative py-20 bg-primary-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About RentOrbits</h1>
            <p className="text-xl text-white/80">
              Your trusted partner in premium car and property rentals. We provide exceptional service and unforgettable experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-white">Our Mission</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              At RentOrbits, we're committed to providing premium rental experiences through our carefully curated selection of vehicles and properties. Our mission is to make luxury accessible while ensuring the highest standards of service and satisfaction.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-neutral-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900 dark:text-white">
            What Sets Us Apart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-neutral-50 dark:bg-neutral-700 rounded-xl">
                <div className="text-primary-600 mb-4">
                  <FontAwesomeIcon icon={feature.icon} className="text-4xl" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">{feature.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="py-20 bg-neutral-100 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">{achievement.number}</div>
                <div className="text-neutral-600 dark:text-neutral-300">{achievement.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white dark:bg-neutral-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900 dark:text-white">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="text-primary-600">
                <FontAwesomeIcon icon={faCheckCircle} className="text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-white">Quality</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  We maintain high standards in our vehicle and property selections.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-primary-600">
                <FontAwesomeIcon icon={faCheckCircle} className="text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-white">Reliability</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Consistent service quality and support you can count on.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-primary-600">
                <FontAwesomeIcon icon={faCheckCircle} className="text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-white">Trust</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Building long-lasting relationships through transparency and integrity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 