import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGasPump, 
  faCog, 
  faUsers,
  faRupeeSign,
  faSnowflake,
  faStar,
  faStarHalfAlt,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface Car {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  image: string;
  pricePerDay: number;
  type: string;
  transmission: string;
  fuel: string;
  seats: number;
  features: string[];
  ac: boolean;
  mileage: string;
  available: boolean;
  condition: string;
  engineType: string;
  location: string;
  rating: number;
  reviews: number;
}

const Cars = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [cancelReason, setCancelReason] = useState('');

  const cities = [
    'All Cities',
    'Mumbai',
    'Pune',
    'Nagpur',
    'Nashik',
    'Aurangabad'
  ];

  const carTypes = [
    'All Types',
    'Sedan',
    'SUV',
    'Hatchback',
    'Premium',
    'Luxury'
  ];

  const cancelReasons = [
    'Change in travel plans',
    'Found better deal',
    'Vehicle not suitable',
    'Service issues',
    'Other reason'
  ];

  const cars: Car[] = [
    // Sedan Cars
    {
      id: 1,
      name: "Maruti Swift Dzire",
      brand: "Maruti Suzuki",
      model: "Dzire VXi",
      year: 2023,
      image: "https://images.unsplash.com/photo-1623869675781-80aa31012c98?ixlib=rb-4.0.3",
      pricePerDay: 1500,
      type: "Sedan",
      transmission: "Manual",
      fuel: "Petrol",
      seats: 5,
      features: ["Power Steering", "Power Windows", "Central Locking", "Music System"],
      ac: true,
      mileage: "22 kmpl",
      available: true,
      condition: "Excellent",
      engineType: "1.2L K-Series",
      location: "Mumbai",
      rating: 4.5,
      reviews: 120
    },
    {
      id: 2,
      name: "Honda City",
      brand: "Honda",
      model: "City VX",
      year: 2023,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3",
      pricePerDay: 2500,
      type: "Sedan",
      transmission: "Automatic",
      fuel: "Petrol",
      seats: 5,
      features: ["Sunroof", "Cruise Control", "Rear Camera", "Climate Control"],
      ac: true,
      mileage: "18 kmpl",
      available: true,
      condition: "Like New",
      engineType: "1.5L i-VTEC",
      location: "Pune",
      rating: 4.7,
      reviews: 95
    },
    // SUV Cars
    {
      id: 3,
      name: "Hyundai Creta",
      brand: "Hyundai",
      model: "Creta SX",
      year: 2023,
      image: "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?ixlib=rb-4.0.3",
      pricePerDay: 2800,
      type: "SUV",
      transmission: "Automatic",
      fuel: "Diesel",
      seats: 5,
      features: ["Sunroof", "Cruise Control", "Rear Camera", "Climate Control"],
      ac: true,
      mileage: "18 kmpl",
      available: true,
      condition: "Excellent",
      engineType: "1.5L CRDi",
      location: "Nagpur",
      rating: 4.6,
      reviews: 85
    },
    {
      id: 4,
      name: "Kia Seltos",
      brand: "Kia",
      model: "Seltos HTX",
      year: 2023,
      image: "https://images.unsplash.com/photo-1621285853634-713b8dd6b5fd?ixlib=rb-4.0.3",
      pricePerDay: 3000,
      type: "SUV",
      transmission: "Automatic",
      fuel: "Petrol",
      seats: 5,
      features: ["Panoramic Sunroof", "Bose Audio", "360 Camera", "Ventilated Seats"],
      ac: true,
      mileage: "16 kmpl",
      available: true,
      condition: "Like New",
      engineType: "1.5L Turbo GDI",
      location: "Mumbai",
      rating: 4.8,
      reviews: 110
    },
    // Hatchback Cars
    {
      id: 5,
      name: "Maruti Baleno",
      brand: "Maruti Suzuki",
      model: "Baleno Zeta",
      year: 2023,
      image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?ixlib=rb-4.0.3",
      pricePerDay: 1200,
      type: "Hatchback",
      transmission: "Manual",
      fuel: "Petrol",
      seats: 5,
      features: ["SmartPlay Studio", "Auto AC", "Rear Defogger", "Keyless Entry"],
      ac: true,
      mileage: "23 kmpl",
      available: true,
      condition: "Excellent",
      engineType: "1.2L K-Series",
      location: "Nashik",
      rating: 4.4,
      reviews: 75
    },
    {
      id: 6,
      name: "Tata Altroz",
      brand: "Tata",
      model: "Altroz XZ",
      year: 2023,
      image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?ixlib=rb-4.0.3",
      pricePerDay: 1300,
      type: "Hatchback",
      transmission: "Manual",
      fuel: "Diesel",
      seats: 5,
      features: ["7-inch Touchscreen", "Rear Camera", "Rain Sensing Wipers", "Auto Headlamps"],
      ac: true,
      mileage: "25 kmpl",
      available: true,
      condition: "Like New",
      engineType: "1.5L Revotorq",
      location: "Aurangabad",
      rating: 4.3,
      reviews: 60
    },
    // Premium Cars
    {
      id: 7,
      name: "Toyota Innova Crysta",
      brand: "Toyota",
      model: "Innova Crysta VX",
      year: 2023,
      image: "https://images.unsplash.com/photo-1619767886558-efdc259b6e1a?ixlib=rb-4.0.3",
      pricePerDay: 3500,
      type: "Premium",
      transmission: "Automatic",
      fuel: "Diesel",
      seats: 7,
      features: ["Captain Seats", "Premium Audio", "LED Lights", "Push Start"],
      ac: true,
      mileage: "15 kmpl",
      available: true,
      condition: "Excellent",
      engineType: "2.4L GD",
      location: "Pune",
      rating: 4.7,
      reviews: 90
    },
    {
      id: 8,
      name: "Mahindra XUV700",
      brand: "Mahindra",
      model: "XUV700 AX7",
      year: 2023,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3",
      pricePerDay: 3200,
      type: "Premium",
      transmission: "Automatic",
      fuel: "Diesel",
      seats: 7,
      features: ["Adrenox Connect", "360 Camera", "Panoramic Sunroof", "Wireless Charging"],
      ac: true,
      mileage: "16 kmpl",
      available: true,
      condition: "Like New",
      engineType: "2.2L mHawk",
      location: "Mumbai",
      rating: 4.6,
      reviews: 85
    },
    // Luxury Cars
    {
      id: 9,
      name: "Mercedes-Benz C-Class",
      brand: "Mercedes-Benz",
      model: "C 200",
      year: 2023,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3",
      pricePerDay: 8000,
      type: "Luxury",
      transmission: "Automatic",
      fuel: "Petrol",
      seats: 5,
      features: ["MBUX System", "Panoramic Roof", "Burmester Audio", "Ambient Lighting"],
      ac: true,
      mileage: "12 kmpl",
      available: true,
      condition: "Excellent",
      engineType: "2.0L Turbo",
      location: "Mumbai",
      rating: 4.9,
      reviews: 45
    },
    {
      id: 10,
      name: "BMW 3 Series",
      brand: "BMW",
      model: "330i",
      year: 2023,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3",
      pricePerDay: 8500,
      type: "Luxury",
      transmission: "Automatic",
      fuel: "Petrol",
      seats: 5,
      features: ["Live Cockpit Pro", "Harman Kardon", "Panoramic Roof", "Gesture Control"],
      ac: true,
      mileage: "13 kmpl",
      available: true,
      condition: "Like New",
      engineType: "2.0L TwinPower Turbo",
      location: "Pune",
      rating: 4.8,
      reviews: 50
    }
  ];

  const handleBooking = (car: Car) => {
    setSelectedCar(car);
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setShowModal(true);
  };

  const handleCancelBooking = () => {
    setShowCancelModal(true);
  };

  const handleCancelConfirm = () => {
    // Handle cancellation logic here
    alert(`Booking cancelled. Reason: ${cancelReason}`);
    setShowCancelModal(false);
    setShowModal(false);
  };

  const calculateTotalPrice = () => {
    if (!startDate || !endDate || !selectedCar) return 0;
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return selectedCar.pricePerDay * days;
  };

  const handleSubmit = () => {
    if (!startDate || !endDate) {
      alert('Please select rental dates');
      return;
    }
    // Handle booking submission
    alert('Booking confirmed! We will contact you shortly.');
    setShowModal(false);
    setSelectedCar(null);
    setStartDate(null);
    setEndDate(null);
  };

  const filteredCars = cars.filter(car => {
    const matchesCity = selectedCity === 'all' || car.location.toLowerCase() === selectedCity.toLowerCase();
    const matchesType = selectedType === 'all' || car.type.toLowerCase() === selectedType.toLowerCase();
    return matchesCity && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Available Cars</h1>
          <div className="flex gap-4">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value.toLowerCase())}
              className="block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              {cities.map(city => (
                <option key={city} value={city.toLowerCase()}>{city}</option>
              ))}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value.toLowerCase())}
              className="block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              {carTypes.map(type => (
                <option key={type} value={type.toLowerCase()}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map(car => (
            <div key={car.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{car.name}</h3>
                    <p className="text-sm text-gray-400">{car.brand} {car.model} {car.year}</p>
                  </div>
                  <div className="flex items-center text-blue-400">
                    <FontAwesomeIcon icon={faRupeeSign} className="h-4 w-4" />
                    <span className="ml-1 font-bold">{car.pricePerDay}/day</span>
                  </div>
                </div>

                <div className="flex items-center text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={i < Math.floor(car.rating) ? faStar : i < car.rating ? faStarHalfAlt : faStar}
                      className="h-4 w-4"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-400">({car.reviews} reviews)</span>
                </div>

                <div className="flex items-center text-gray-400 mb-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="h-4 w-4 mr-2" />
                  <span>{car.location}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-400">
                    <FontAwesomeIcon icon={faCog} className="h-4 w-4" />
                    <span className="ml-2 text-sm">{car.transmission}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FontAwesomeIcon icon={faGasPump} className="h-4 w-4" />
                    <span className="ml-2 text-sm">{car.fuel}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FontAwesomeIcon icon={faUsers} className="h-4 w-4" />
                    <span className="ml-2 text-sm">{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FontAwesomeIcon icon={faSnowflake} className="h-4 w-4" />
                    <span className="ml-2 text-sm">AC</span>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <button
                    onClick={() => handleBooking(car)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Sign In Required</h2>
            <p className="text-gray-400 mb-4">Please sign in to continue with your booking.</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLoginSuccess}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showModal && selectedCar && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-white">Book {selectedCar.name}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Rental Dates
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    placeholderText="Start Date"
                    className="w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date: Date | null) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate || new Date()}
                    placeholderText="End Date"
                    className="w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-gray-400">Total Price:</span>
                  <div className="flex items-center text-blue-400 text-xl font-bold">
                    <FontAwesomeIcon icon={faRupeeSign} className="h-4 w-4" />
                    <span className="ml-1">{calculateTotalPrice()}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleCancelBooking}
                    className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-300"
                  >
                    Cancel Booking
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Booking Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Cancel Booking</h2>
            <p className="text-gray-400 mb-4">Please select a reason for cancellation:</p>
            
            <div className="space-y-2 mb-4">
              {cancelReasons.map((reason) => (
                <label key={reason} className="flex items-center text-gray-400">
                  <input
                    type="radio"
                    name="cancelReason"
                    value={reason}
                    checked={cancelReason === reason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="mr-2"
                  />
                  {reason}
                </label>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-300"
              >
                Back
              </button>
              <button
                onClick={handleCancelConfirm}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cars; 