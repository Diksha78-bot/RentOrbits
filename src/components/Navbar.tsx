import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  faHeart,
  faCar,
  faChevronDown,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import Login from './Login';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [showLogin, setShowLogin] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Handle scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setShowUserDropdown(false);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-lg' 
          : 'bg-neutral-50 dark:bg-neutral-900'
      }`}>
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
                  className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 group ${
                    isActiveLink(item.path)
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                  {isActiveLink(item.path) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full" />
                  )}
                </Link>
              ))}
              
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="w-5 h-5" />
              </button>

              {user ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowFavorites(true)}
                    className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
                    aria-label="View favorites"
                  >
                    <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
                  </button>
                  
                  <div className="relative dropdown-container">
                    <button
                      onClick={() => setShowUserDropdown(!showUserDropdown)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-all duration-300"
                      aria-expanded={showUserDropdown}
                      aria-haspopup="true"
                    >
                      <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                      <span className="font-medium">Account</span>
                      <FontAwesomeIcon 
                        icon={faChevronDown} 
                        className={`w-3 h-3 transition-transform duration-200 ${
                          showUserDropdown ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {showUserDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 py-2 animate-in slide-in-from-top-2 duration-200">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                        >
                          Profile
                        </Link>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium"
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

        {/* Mobile Navigation Backdrop */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 z-50 transform transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}>
          <div className="px-4 py-6 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActiveLink(item.path)
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500'
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                <span className="font-medium text-lg">{item.name}</span>
              </Link>
            ))}
            
            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
              <button
                onClick={toggleDarkMode}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 w-full"
              >
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="w-5 h-5" />
                <span className="font-medium text-lg">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              {user ? (
                <div className="space-y-2 mt-4">
                  <button
                    onClick={() => {
                      setShowFavorites(true);
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 w-full"
                  >
                    <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
                    <span className="font-medium text-lg">Favorites</span>
                  </button>
                  
                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                    <span className="font-medium text-lg">Profile</span>
                  </Link>
                  
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full mt-4 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 font-medium text-lg"
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
                  className="w-full mt-4 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium text-lg"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
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