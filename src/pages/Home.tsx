import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faCar, 
  faShieldAlt, 
  faHandshake,
  faSearch,
  faStar
} from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80)',
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Find Your Perfect Ride
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Discover premium cars and properties for rent. Experience luxury and comfort at competitive prices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/cars" 
                className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold 
                transition-colors duration-300 text-center 
                hover:bg-primary-700 hover:text-white"
              >
              Browse Cars
              </Link>

                <Link 
                  to="/properties" 
                  className="bg-white hover:bg-gray-100 text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300 text-center"
                >
                  View Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white dark:bg-neutral-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-neutral-900 dark:text-white">
            Why Choose RentOrbits?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 dark:bg-neutral-700 p-8 rounded-xl">
              <div className="text-primary-600 mb-4">
                <FontAwesomeIcon icon={faHandshake} className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">Easy Booking Process</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Simple and secure booking system. Reserve your car or property in minutes.
              </p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-700 p-8 rounded-xl">
              <div className="text-primary-600 mb-4">
                <FontAwesomeIcon icon={faShieldAlt} className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">100% Secure</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Your security is our priority. All transactions are protected and insured.
              </p>
            </div>
            <div className="bg-neutral-50 dark:bg-neutral-700 p-8 rounded-xl">
              <div className="text-primary-600 mb-4">
                <FontAwesomeIcon icon={faStar} className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">Premium Selection</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Curated collection of luxury cars and premium properties for the best experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-neutral-100 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-neutral-900 dark:text-white">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">Browse</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Explore our collection of cars and properties
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">Book</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Select your dates and complete the booking
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">Enjoy</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Get the keys and enjoy your premium experience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of satisfied customers who trust RentOrbits
          </p>
          <Link 
            to="/cars" 
            className="inline-block bg-white hover:bg-gray-100 text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 