import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl font-bold text-blue-600">RentOrbits</span>
            <span className="text-yellow-400 text-2xl">🚗</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition duration-300">
              Home
            </Link>
            <Link to="/cars" className="text-gray-600 hover:text-blue-600 font-medium transition duration-300">
              Cars
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium transition duration-300">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition duration-300">
              Contact
            </Link>
            <Link
              to="/cars"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-600 hover:text-blue-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/"
              className="block text-gray-600 hover:text-blue-600 font-medium transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/cars"
              className="block text-gray-600 hover:text-blue-600 font-medium transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Cars
            </Link>
            <Link
              to="/about"
              className="block text-gray-600 hover:text-blue-600 font-medium transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-gray-600 hover:text-blue-600 font-medium transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/cars"
              className="block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 