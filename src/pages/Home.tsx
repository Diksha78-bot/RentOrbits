import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  return (
    <div>
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-600 text-white py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-900/80 to-blue-600/80"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Drive Your Dreams with <span className="text-yellow-400">RentOrbits</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Experience the freedom of the open road with our premium fleet of vehicles
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/cars"
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold hover:bg-yellow-300 transition duration-300 flex items-center justify-center group"
              >
                Explore Our Fleet
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose <span className="text-blue-600">RentOrbits</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div className="text-5xl mb-6">🚗</div>
              <h3 className="text-xl font-semibold mb-4">Premium Fleet</h3>
              <p className="text-gray-600">Choose from our extensive collection of luxury and economy vehicles</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div className="text-5xl mb-6">💰</div>
              <h3 className="text-xl font-semibold mb-4">Best Rates</h3>
              <p className="text-gray-600">Competitive pricing with flexible rental options</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div className="text-5xl mb-6">⭐</div>
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock assistance for all your needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Special Weekend Offers</h2>
            <p className="text-xl mb-8">Get 20% off on all weekend rentals. Book now and save!</p>
            <Link
              to="/cars"
              className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition duration-300 inline-block"
            >
              View Offers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 