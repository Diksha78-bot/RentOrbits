import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSun, 
  faMoon, 
  faBars, 
  faTimes,
  faHome,
  faInfoCircle,
  faEnvelope,
  faMapMarkerAlt,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { name: 'Find Your Space', path: '/', icon: faHome },
    { name: 'Why RentOrbits?', path: '/about', icon: faInfoCircle },
    { name: 'Browse by City', path: '/cities', icon: faMapMarkerAlt },
    { name: 'Get in Touch', path: '/contact', icon: faEnvelope },
  ];

  return (
    <nav className="bg-neutral-50 dark:bg-neutral-900 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.svg" alt="RentOrbits" className="h-8 w-8" />
              <span className="text-xl font-heading text-primary-600 dark:text-primary-400">RentOrbits</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300 flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            <button
              onClick={toggleDarkMode}
              className="text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="w-5 h-5" />
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/favorites"
                  className="text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
                >
                  <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
                </Link>
                <button
                  onClick={logout}
                  className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors duration-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors duration-300"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-3 py-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300 flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            <button
              onClick={toggleDarkMode}
              className="block w-full px-3 py-2 text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300 text-left flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="w-4 h-4" />
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            {user ? (
              <div className="px-3 py-2">
                <Link
                  to="/favorites"
                  className="block text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300 flex items-center space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
                  <span>Favorites</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="mt-2 block w-full bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors duration-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 