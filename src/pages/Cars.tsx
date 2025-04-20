import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCalendarAlt, faTimes, faStar, faGasPump, faCog, faUsers, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../context/AuthContext';
import Chatbot from '../components/Chatbot';

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
}

const Cars = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const { user } = useAuth();

  const cities = ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'];
  const carTypes = ['Sedan', 'SUV', 'Hatchback', 'Luxury'];

  const cars: Car[] = [
    {
      id: 1,
      name: 'Toyota Camry',
      type: 'Sedan',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      rating: 4.5,
      reviews: 120,
      city: 'Mumbai',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      condition: 'Excellent',
      engineType: '2.5L 4-cylinder'
    },
    {
      id: 2,
      name: 'Honda CR-V',
      type: 'SUV',
      price: 3000,
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      rating: 4.7,
      reviews: 95,
      city: 'Pune',
      transmission: 'Automatic',
      fuelType: 'Diesel',
      seats: 5,
      condition: 'Good',
      engineType: '1.6L Turbo Diesel'
    },
    {
      id: 3,
      name: 'Maruti Swift',
      type: 'Hatchback',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      rating: 4.3,
      reviews: 200,
      city: 'Nagpur',
      transmission: 'Manual',
      fuelType: 'Petrol',
      seats: 5,
      condition: 'Very Good',
      engineType: '1.2L K-Series'
    },
    {
      id: 4,
      name: 'BMW 5 Series',
      type: 'Luxury',
      price: 5000,
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      rating: 4.8,
      reviews: 75,
      city: 'Mumbai',
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      condition: 'Excellent',
      engineType: '2.0L Turbo'
    }
  ];

  const handleBookNow = (car: Car) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setSelectedCar(car);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    if (selectedCar && startDate && endDate) {
      // Handle booking logic here
      setShowBookingModal(false);
      setSelectedCar(null);
      setStartDate(null);
      setEndDate(null);
    }
  };

  const filteredCars = cars.filter(car => {
    if (selectedCity !== 'all' && car.city !== selectedCity) return false;
    if (selectedType !== 'all' && car.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: 'url(/images/cars-hero.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">Find Your Perfect Ride</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <select
            className="p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="all">All Cities</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <select
            className="p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            {carTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map(car => (
            <div key={car.id} className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
              <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{car.name}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">{car.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600">₹{car.price}/day</p>
                    <div className="flex items-center mt-1">
                      <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                      <span>{car.rating}</span>
                      <span className="text-neutral-600 dark:text-neutral-400 ml-1">({car.reviews})</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faGasPump} className="mr-2 text-neutral-600 dark:text-neutral-400" />
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faCog} className="mr-2 text-neutral-600 dark:text-neutral-400" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faUsers} className="mr-2 text-neutral-600 dark:text-neutral-400" />
                    <span>{car.seats} seats</span>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-neutral-600 dark:text-neutral-400" />
                    <span>{car.city}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Condition: {car.condition}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Engine: {car.engineType}</p>
                </div>
                <button
                  onClick={() => handleBookNow(car)}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Book {selectedCar.name}</h2>
              <button onClick={() => setShowBookingModal(false)}>
                <FontAwesomeIcon icon={faTimes} className="text-neutral-600 dark:text-neutral-400" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Pick-up Date</label>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
                placeholderText="Select date"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Return Date</label>
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                className="w-full p-2 border rounded-lg dark:bg-neutral-800 dark:border-neutral-700"
                placeholderText="Select date"
              />
            </div>
            <button
              onClick={handleConfirmBooking}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Sign In Required</h2>
              <button onClick={() => setShowLoginModal(false)}>
                <FontAwesomeIcon icon={faTimes} className="text-neutral-600 dark:text-neutral-400" />
              </button>
            </div>
            <p className="mb-4">Please sign in to book a car.</p>
            <button
              onClick={() => {
                setShowLoginModal(false);
                // Redirect to login page
                window.location.href = '/login';
              }}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      )}

      <Chatbot />
    </div>
  );
};

export default Cars; 