import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faStar, faGasPump, faCog, faUsers, faMapMarkerAlt, faHistory, faHeart, faSearch, faFilter, faCalculator, faExchangeAlt, faRoad } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';
import Notification from '../components/Notification';
import { preloadImages } from '../utils/imageUtils';

interface Car {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  city: string;
  transmission: string;
  fuelType: string;
  seats: number;
  condition: string;
  engineType: string;
  year: number;
  mileage: string;
  features: string[];
  available: boolean;
}

interface Booking extends Car {
  id: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'cancelled';
  totalPrice: number;
  bookingId: string;
}

const Cars = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPriceCalculator, setShowPriceCalculator] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showBookingHistory, setShowBookingHistory] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'newest'>('newest');
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedTransmission, setSelectedTransmission] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [selectedSeats, setSelectedSeats] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [likedCars, setLikedCars] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showFavoritesDropdown, setShowFavoritesDropdown] = useState(false);

  const cities = ['Islampur'];
  const carTypes = ['Sedan', 'SUV', 'Hatchback', 'Luxury'];
  const cancelReasons = [
    'Change of plans',
    'Found a better option',
    'Emergency situation',
    'Price too high',
    'Vehicle not suitable',
    'Other'
  ];

  const cars: Car[] = [
    // Sedans
    {
      id: 1,
      name: 'Toyota Camry',
      type: 'Sedan',
      price: 2500,
      image: '/CarImages/Toyota Camry.jpg',
      rating: 4.5,
      reviews: 120,
      city: 'Islampur',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      condition: 'Excellent',
      engineType: '2.5L 4-cylinder',
      year: 2023,
      mileage: '15,000 km',
      features: ['Leather Seats', 'Sunroof', 'Apple CarPlay', 'Android Auto'],
      available: true
    },
    {
      id: 2,
      name: 'Honda Civic',
      type: 'Sedan',
      price: 2200,
      image: '/CarImages/Honda Civic.jpg',
      rating: 4.3,
      reviews: 98,
      city: 'Islampur',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      condition: 'Very Good',
      engineType: '1.8L i-VTEC',
      year: 2022,
      mileage: '25,000 km',
      features: ['Smart Entry', 'Lane Departure Warning', 'Backup Camera'],
      available: true
    },
    {
      id: 3,
      name: 'Hyundai Verna',
      type: 'Sedan',
      price: 2000,
      image: '/CarImages/Hyundai Verna.jpg',
      rating: 4.4,
      reviews: 85,
      city: 'Islampur',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      condition: 'Excellent',
      engineType: '1.5L CRDi',
      year: 2023,
      mileage: '12,000 km',
      features: ['Ventilated Seats', 'Wireless Charging', 'Digital Cluster'],
      available: true
    },
    // SUVs
    {
      id: 4,
      name: 'Honda CR-V',
      type: 'SUV',
      price: 3000,
      image: '/CarImages/Honda CR-V.jpg',
      rating: 4.7,
      reviews: 95,
      city: 'Islampur',
      transmission: 'Automatic',
      fuelType: 'Diesel',
      seats: 5,
      condition: 'Excellent',
      engineType: '1.6L Turbo Diesel',
      year: 2023,
      mileage: '18,000 km',
      features: ['Panoramic Sunroof', 'AWD', 'Wireless Charging'],
      available: true
    },
    {
      id: 5,
      name: 'Toyota Fortuner',
      type: 'SUV',
      price: 3500,
      image: '/CarImages/Toyota Fortuner.jpg',
      rating: 4.8,
      reviews: 150,
      city: 'Islampur',
      transmission: 'Automatic',
      fuelType: 'Diesel',
      seats: 7,
      condition: 'Excellent',
      engineType: '2.8L Turbo Diesel',
      year: 2023,
      mileage: '12,000 km',
      features: ['4x4', 'Premium Sound System', 'Leather Interior'],
      available: true
    },
    {
      id: 6,
      name: 'Mahindra XUV700',
      type: 'SUV',
      price: 2800,
      image: '/CarImages/Mahindra XUV700.jpg',
      rating: 4.6,
      reviews: 110,
      city: 'Islampur',
      transmission: 'Automatic',
      fuelType: 'Diesel',
      seats: 7,
      condition: 'Excellent',
      engineType: '2.2L mHawk',
      year: 2023,
      mileage: '20,000 km',
      features: ['ADAS', 'Panoramic Sunroof', 'Connected Car Tech'],
      available: true
    },
    {
      id: 7,
      name: 'Hyundai Creta',
      type: 'SUV',
      price: 2400,
      image: '/CarImages/Hyundai Creta.jpg',
      rating: 4.5,
      reviews: 130,
      city: 'Islampur',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      condition: 'Very Good',
      engineType: '1.4L Turbo',
      year: 2023,
      mileage: '15,000 km',
      features: ['Ventilated Seats', 'Bose Sound System', 'BlueLink'],
      available: true
    },
    // Hatchbacks
    {
      id: 8,
      name: 'Maruti Swift',
      type: 'Hatchback',
      price: 1500,
      image: '/CarImages/Maruti Swift.jpg',
      rating: 4.3,
      reviews: 200,
      city: 'Islampur',
      transmission: 'Manual',
      fuelType: 'Petrol',
      seats: 5,
      condition: 'Very Good',
      engineType: '1.2L K-Series',
      year: 2022,
      mileage: '30,000 km',
      features: ['Touchscreen Display', 'Apple CarPlay', 'Keyless Entry'],
      available: true
    },
    {
      id: 9,
      name: 'Hyundai i20',
      type: 'Hatchback',
      price: 1700,
      image: '/CarImages/Hyundai i20.jpg',
      rating: 4.4,
      reviews: 180,
      city: 'Islampur',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      condition: 'Excellent',
      engineType: '1.2L Kappa',
      year: 2023,
      mileage: '15,000 km',
      features: ['Sunroof', 'BlueLink Connected', 'Wireless Charging'],
      available: true
    },
    {
      id: 10,
      name: 'Tata Altroz',
      type: 'Hatchback',
      price: 1600,
      image: '/CarImages/Tata Altroz.jpg',
      rating: 4.2,
      reviews: 150,
      city: 'Islampur',
      transmission: 'Manual',
      fuelType: 'Petrol',
      seats: 5,
      condition: 'Very Good',
      engineType: '1.2L Revotron',
      year: 2023,
      mileage: '18,000 km',
      features: ['iRA Connected Car', '5-Star Safety', 'Harman Audio'],
      available: true
    },
    // Luxury Cars
    {
      id: 11,
      name: 'BMW 5 Series',
      type: 'Luxury',
      price: 5000,
      image: '/CarImages/BMW 5 Series.jpg',
      rating: 4.8,
      reviews: 75,
      city: 'Islampur',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      condition: 'Excellent',
      engineType: '2.0L TwinPower Turbo',
      year: 2023,
      mileage: '10,000 km',
      features: ['Premium Sound', 'Massage Seats', 'Gesture Control'],
      available: true
    },
    {
      id: 12,
      name: 'Mercedes-Benz E-Class',
      type: 'Luxury',
      price: 5500,
      image: '/CarImages/Mercedes-Benz E-Class.jpg',
      rating: 4.9,
      reviews: 85,
      city: 'Islampur',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      condition: 'Excellent',
      engineType: '3.0L V6',
      year: 2023,
      mileage: '8,000 km',
      features: ['Air Suspension', 'Burmester Sound', 'Panoramic Roof'],
      available: true
    },
    {
      id: 13,
      name: 'Audi A6',
      type: 'Luxury',
      price: 5200,
      image: '/CarImages/Audi A6.jpg',
      rating: 4.7,
      reviews: 70,
      city: 'Islampur',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      condition: 'Excellent',
      engineType: '2.0L TFSI',
      year: 2023,
      mileage: '12,000 km',
      features: ['Matrix LED', 'Bang & Olufsen', 'Virtual Cockpit'],
      available: true
    },
    {
      id: 14,
      name: 'Volvo S90',
      type: 'Luxury',
      price: 4800,
      image: '/CarImages/Volvo S90.jpg',
      rating: 4.6,
      reviews: 65,
      city: 'Islampur',
      transmission: 'Automatic',
      fuelType: 'Hybrid',
      seats: 5,
      condition: 'Excellent',
      engineType: '2.0L T8 Hybrid',
      year: 2023,
      mileage: '15,000 km',
      features: ['Pilot Assist', 'Bowers & Wilkins', 'Air Purifier'],
      available: true
    }
  ];

  useEffect(() => {
    // Preload images
    const imagePaths = cars.map(car => car.image);
    preloadImages(imagePaths);
  }, []);

  const handleBookNow = (car: Car) => {
    if (!user) {
      setSelectedCar(car);
      setShowLoginModal(true);
      return;
    }
    setSelectedCar(car);
    setShowBookingModal(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    if (selectedCar) {
      setShowBookingModal(true);
    }
  };

  const handleConfirmBooking = async () => {
    if (selectedCar && startDate && endDate) {
      const newBooking: Booking = {
        id: bookings.length + 1,
        carId: selectedCar.id,
        startDate,
        endDate,
        status: 'active',
        totalPrice: calculateTotalPrice(selectedCar, startDate, endDate),
        bookingId: '',
        name: selectedCar.name,
        type: selectedCar.type,
        price: selectedCar.price,
        image: selectedCar.image,
        rating: selectedCar.rating,
        reviews: selectedCar.reviews,
        city: selectedCar.city,
        transmission: selectedCar.transmission,
        fuelType: selectedCar.fuelType,
        seats: selectedCar.seats,
        condition: selectedCar.condition,
        engineType: selectedCar.engineType,
        year: selectedCar.year,
        mileage: selectedCar.mileage,
        features: selectedCar.features,
        available: selectedCar.available
      };
      setBookings([...bookings, newBooking]);
      showNotification('Booking successful!', 'success');
      setShowBookingModal(false);
      setSelectedCar(null);
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleCancelBooking = async () => {
    if (selectedBooking && cancelReason) {
      const updatedBookings = bookings.map(booking =>
        booking.id === selectedBooking.id
          ? { ...booking, status: 'cancelled' as const }
          : booking
      );
      setBookings(updatedBookings);
      showNotification('Booking cancelled successfully!', 'success');
      setShowCancelModal(false);
      setSelectedBooking(null);
      setCancelReason('');
    }
  };

  const calculateTotalPrice = (car: Car, start: Date, end: Date) => {
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return car.price * days;
  };

  const toggleFavorite = (carId: number) => {
    setFavorites(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
  };

  const filteredCars = cars.filter(car => {
    if (selectedCity !== 'all' && car.city !== selectedCity) return false;
    if (selectedType !== 'all' && car.type !== selectedType) return false;
    if (car.price < priceRange[0] || car.price > priceRange[1]) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        car.name.toLowerCase().includes(query) ||
        car.type.toLowerCase().includes(query) ||
        car.city.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.year - a.year;
      default:
        return 0;
    }
  });

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.target as HTMLImageElement;
    if (!img.src.includes('placeholder.jpg')) {
      console.error(`Failed to load image: ${img.src}`);
      img.src = process.env.PUBLIC_URL + '/CarImages/placeholder.jpg';
    }
  };

  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  const handleLike = (carId: number) => {
    setLikedCars(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header Section */}
      <div className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-white font-poppins">Discover Your Perfect Ride</h1>
          <p className="text-gray-300 mt-4 text-lg">Explore our premium collection of vehicles in Islampur</p>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search cars..."
              className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All Types</option>
              {carTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={toggleAdvancedFilters}
            >
              Filters {showAdvancedFilters ? '▼' : '▲'}
            </button>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <select
                className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
                value={selectedTransmission}
                onChange={(e) => setSelectedTransmission(e.target.value)}
              >
                <option value="">Transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
              <select
                className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
                value={selectedFuelType}
                onChange={(e) => setSelectedFuelType(e.target.value)}
              >
                <option value="">Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
              <select
                className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
                value={selectedSeats}
                onChange={(e) => setSelectedSeats(e.target.value)}
              >
                <option value="">Seats</option>
                <option value="4">4 Seats</option>
                <option value="5">5 Seats</option>
                <option value="7">7 Seats</option>
              </select>
              <div className="flex items-center">
                <label className="flex items-center space-x-2 text-white">
                  <input
                    type="checkbox"
                    checked={onlyAvailable}
                    onChange={(e) => setOnlyAvailable(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                  />
                  <span>Available Only</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cars Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Available Cars</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowPriceCalculator(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faCalculator} />
              <span>Price Calculator</span>
            </button>
            <button
              onClick={() => setShowBookingHistory(true)}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faHistory} />
              <span>Booking History</span>
            </button>
            <button
              onClick={() => setShowFavorites(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faHeart} />
              <span>Favorites ({likedCars.length})</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCars.map((car) => (
            <div key={car.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={process.env.PUBLIC_URL + car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover"
                  onError={handleImageError}
                />
                <button
                  onClick={() => handleLike(car.id)}
                  className="absolute top-2 right-2 p-2 bg-gray-800/80 rounded-full hover:bg-gray-700 transition-colors"
                >
                  {likedCars.includes(car.id) ? (
                    <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                  ) : (
                    <FontAwesomeIcon icon={faHeart} className="text-gray-400" />
                  )}
                </button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{car.name}</h3>
                    <p className="text-sm text-gray-400">{car.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-500">₹{car.price}</p>
                    <p className="text-xs text-gray-400">per day</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={faStar}
                      className={`${
                        index < car.rating ? 'text-yellow-400' : 'text-gray-600'
                      } text-sm`}
                    />
                  ))}
                  <span className="text-sm text-gray-400">({car.reviews})</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faGasPump} className="text-gray-500" />
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faCog} className="text-gray-500" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faUsers} className="text-gray-500" />
                    <span>{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FontAwesomeIcon icon={faRoad} className="text-gray-500" />
                    <span>{car.mileage}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleBookNow(car)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={!car.available}
                >
                  {car.available ? 'Book Now' : 'Not Available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Book {selectedCar.name}</h2>
              <button onClick={() => setShowBookingModal(false)} aria-label="Close booking modal">
                <FontAwesomeIcon icon={faTimes} className="text-gray-400 hover:text-white" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-300">Pick-up Date</label>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                className="w-full p-2 rounded-lg bg-neutral-700 border-neutral-600 text-white"
                placeholderText="Select date"
                minDate={new Date()}
                id="start-date"
                name="start-date"
                aria-label="Pick-up date"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-gray-300">Return Date</label>
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                className="w-full p-2 rounded-lg bg-neutral-700 border-neutral-600 text-white"
                placeholderText="Select date"
                minDate={startDate || new Date()}
                id="end-date"
                name="end-date"
                aria-label="Return date"
              />
            </div>
            <button
              onClick={handleConfirmBooking}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg transition-colors font-semibold"
              aria-label="Confirm booking"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      {/* Price Calculator Modal */}
      {showPriceCalculator && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Price Calculator</h2>
              <button onClick={() => setShowPriceCalculator(false)} className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Select Car</label>
                <select
                  className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
                  onChange={(e) => setSelectedCar(cars.find(c => c.id === parseInt(e.target.value)) || null)}
                >
                  <option value="">Choose a car</option>
                  {cars.map(car => (
                    <option key={car.id} value={car.id}>
                      {car.name} - ₹{car.price}/day
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Number of Days</label>
                <input
                  type="number"
                  min="1"
                  className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
                  placeholder="Enter number of days"
                  onChange={(e) => {
                    const days = parseInt(e.target.value);
                    if (selectedCar && days > 0) {
                      const totalPrice = selectedCar.price * days;
                      setNotification({
                        message: `Total Price: ₹${totalPrice}`,
                        type: 'success'
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking History Modal */}
      {showBookingHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Booking History</h2>
              <button onClick={() => setShowBookingHistory(false)} className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="space-y-4">
              {bookings.map(booking => {
                const car = cars.find(c => c.id === booking.carId);
                return (
                  <div key={booking.id} className="p-4 bg-gray-700 rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white">{car?.name}</h3>
                      <p className="text-sm text-gray-300">
                        {booking.startDate.toLocaleDateString()} - {booking.endDate.toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-300">Status: {booking.status}</p>
                    </div>
                    {booking.status === 'active' && (
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowCancelModal(true);
                        }}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                );
              })}
              {bookings.length === 0 && (
                <p className="text-center text-gray-400">No booking history found</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cancel Booking Modal */}
      {showCancelModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Cancel Booking</h2>
              <button onClick={() => setShowCancelModal(false)} className="text-gray-400 hover:text-white">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Reason for Cancellation</label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
              >
                <option value="">Select a reason</option>
                {cancelReasons.map(reason => (
                  <option key={reason} value={reason}>{reason}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleCancelBooking}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
            >
              Confirm Cancellation
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Menu Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-around items-center">
            <button
              onClick={() => setShowFavoritesDropdown(!showFavoritesDropdown)}
              className="relative text-white hover:text-blue-500 transition-colors"
            >
              <FontAwesomeIcon icon={faHeart} className="text-2xl" />
              {likedCars.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {likedCars.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowBookingHistory(true)}
              className="flex flex-col items-center space-y-1 text-white hover:text-blue-500 transition-colors"
            >
              <FontAwesomeIcon icon={faHistory} className="text-2xl" />
              <span className="text-xs">History</span>
            </button>
            <button
              onClick={() => setShowPriceCalculator(true)}
              className="flex flex-col items-center space-y-1 text-white hover:text-blue-500 transition-colors"
            >
              <FontAwesomeIcon icon={faCalculator} className="text-2xl" />
              <span className="text-xs">Calculator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Favorites Dropdown */}
      {showFavoritesDropdown && (
        <div className="fixed top-16 right-24 w-96 bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-700">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Favorite Cars</h3>
              <button 
                onClick={() => setShowFavoritesDropdown(false)}
                className="text-gray-400 hover:text-white"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {likedCars.length > 0 ? (
                cars
                  .filter(car => likedCars.includes(car.id))
                  .map(car => (
                    <div key={car.id} className="flex items-center gap-4 p-3 hover:bg-gray-700 rounded-lg mb-2">
                      <img
                        src={process.env.PUBLIC_URL + car.image}
                        alt={car.name}
                        className="w-20 h-20 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.includes('placeholder.jpg')) {
                            target.src = process.env.PUBLIC_URL + '/CarImages/placeholder.jpg';
                          }
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{car.name}</h4>
                        <p className="text-gray-400 text-sm">{car.type}</p>
                        <p className="text-blue-500 font-bold">₹{car.price}/day</p>
                      </div>
                      <button
                        onClick={() => handleLike(car.id)}
                        className="p-2 hover:bg-gray-600 rounded-full"
                      >
                        <FontAwesomeIcon icon={faHeart} className="text-red-500" />
                      </button>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No favorite cars yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cars; 