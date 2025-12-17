import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCar, 
  faUsers, 
  faCalendarAlt, 
  faHeart,
  faRocket,
  faGlobe,
  faShieldAlt,
  faStar,
  faHandshake,
  faAward
} from '@fortawesome/free-solid-svg-icons';

const About = () => {
  const stats = [
    { icon: faCar, number: '2,500+', label: 'Premium Vehicles', color: 'text-blue-600' },
    { icon: faUsers, number: '15,000+', label: 'Happy Customers', color: 'text-green-600' },
    { icon: faCalendarAlt, number: '8', label: 'Years Experience', color: 'text-purple-600' },
    { icon: faStar, number: '4.9/5', label: 'Customer Rating', color: 'text-yellow-600' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              Redefining <span className="text-yellow-400">Mobility</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Where every journey becomes an extraordinary experience through premium vehicles and unmatched service.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-yellow-400 font-semibold">✨ Premium Fleet</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-green-400 font-semibold">🛡️ Fully Insured</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-blue-400 font-semibold">🚀 Instant Booking</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Story Section */}
      <div className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-neutral-900 dark:text-white leading-tight">
                  Our <span className="text-blue-600">Journey</span> Started with a Simple Belief
                </h2>
                <div className="space-y-6 text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  <p>
                    In 2016, we noticed something troubling: car rentals were complicated, expensive, and often disappointing. 
                    Travelers deserved better—they deserved <strong className="text-neutral-900 dark:text-white">freedom, reliability, and joy</strong> in every mile.
                  </p>
                  <p>
                    What started as a small fleet of 10 carefully selected vehicles has grown into a movement. 
                    We've helped over <strong className="text-blue-600">15,000 customers</strong> create unforgettable memories, 
                    from weekend getaways to cross-country adventures.
                  </p>
                  <p>
                    Today, RentOrbits isn't just about cars—it's about <strong className="text-neutral-900 dark:text-white">empowering your journey</strong> 
                    and making every destination feel like home.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faHeart} className="text-6xl text-red-500 mb-4" />
                    <p className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
                      "Every car tells a story.<br />We help you write yours."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-20 bg-neutral-50 dark:bg-neutral-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="bg-white dark:bg-neutral-700 rounded-3xl p-10 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl mr-4">
                    <FontAwesomeIcon icon={faRocket} className="text-3xl text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-900 dark:text-white">Our Mission</h3>
                </div>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  To democratize premium mobility by providing <strong>accessible luxury vehicles</strong> 
                  with exceptional service, making every journey safe, comfortable, and memorable for our customers.
                </p>
              </div>
              <div className="bg-white dark:bg-neutral-700 rounded-3xl p-10 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-2xl mr-4">
                    <FontAwesomeIcon icon={faGlobe} className="text-3xl text-purple-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-900 dark:text-white">Our Vision</h3>
                </div>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  To become the <strong>global leader in sustainable mobility solutions</strong>, 
                  connecting communities through innovative technology and creating a world where premium travel is accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Statistics Section */}
      <div className="py-20 lg:py-28 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Trusted by <span className="text-yellow-400">Thousands</span>
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Our numbers tell the story of trust, quality, and exceptional service
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                  <div className={`${stat.color} mb-4`}>
                    <FontAwesomeIcon icon={stat.icon} className="text-4xl" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              What Drives <span className="text-blue-600">Us</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Our core values shape every interaction, every service, and every mile you travel with us
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faShieldAlt} className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">Safety First</h3>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Every vehicle undergoes rigorous safety checks and maintenance. Your security is our top priority.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="bg-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faHandshake} className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">Customer Obsession</h3>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                We go above and beyond to exceed expectations, creating experiences that customers love to share.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-3xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="bg-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={faAward} className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">Excellence</h3>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                From premium vehicles to seamless service, we maintain the highest standards in everything we do.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-neutral-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your <span className="text-yellow-400">Journey?</span>
          </h2>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust RentOrbits for their mobility needs
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
            Explore Our Fleet
          </button>
        </div>
      </div>
    </div>
  );
};

export default About; 