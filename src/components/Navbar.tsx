import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSun, 
  faMoon, 
  faBars, 
  faTimes,
  faHome,
  faInfoCircle,
  faEnvelope,
  faHeart,
  faCar
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import Login from './Login';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage and system preference for initial theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [showLogin, setShowLogin] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const navigate = useNavigate();

  // Initialize theme on component mount
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    navigate('/profile');
  };

  const toggleFavorite = (carId: number) => {
    setFavorites(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
  };

  const navItems = [
    { name: 'Home', path: '/', icon: faHome },
    { name: 'Cars', path: '/cars', icon: faCar },
    { name: 'About', path: '/about', icon: faInfoCircle },
    { name: 'Contact', path: '/contact', icon: faEnvelope }
  ];

  return (
    <>
      <nav className="bg-neutral-50 dark:bg-neutral-900 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl mr-2">🚗</span>
                <span className="text-2xl font-bold text-green-500">RentOrbits</span>
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
                  <button
                    onClick={() => setShowFavorites(true)}
                    className="text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
                  >
                    <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
                  </button>
                  <button
                    onClick={logout}
                    className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors duration-300"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors duration-300"
                >
                  Sign In
                </button>
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
                  <button
                    onClick={() => {
                      setShowFavorites(true);
                      setIsOpen(false);
                    }}
                    className="block text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
                    <span>Favorites</span>
                  </button>
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
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setIsOpen(false);
                  }}
                  className="block w-full px-3 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-300"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {showLogin && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setShowLogin(false)}
        />
      )}

      {showFavorites && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Favorite Cars</h2>
              <button onClick={() => setShowFavorites(false)}>
                <FontAwesomeIcon icon={faTimes} className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200" />
              </button>
            </div>
            <div className="space-y-4">
              {favorites.length === 0 ? (
                <p className="text-center text-neutral-600 dark:text-neutral-400">No favorite cars yet</p>
              ) : (
                <div className="space-y-2">
                  {favorites.map(carId => (
                    <div key={carId} className="flex items-center justify-between p-3 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                      <span className="text-neutral-900 dark:text-white">Car {carId}</span>
                      <button
                        onClick={() => toggleFavorite(carId)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FontAwesomeIcon icon={faHeart} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 