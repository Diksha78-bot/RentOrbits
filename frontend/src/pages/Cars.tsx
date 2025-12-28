import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';
import CarCard from '../components/CarCard';

interface Car {
  id: number;
  name: string;
  brand: string;
  type: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  transmission: string;
  fuelType: string;
  seats: number;
  available: boolean;
  city?: string;
  condition?: string;
  engineType?: string;
  year?: number;
  mileage?: string;
  features?: string[];
}

interface Booking {
  id: number;
  carId: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'cancelled';
  totalPrice: number;
  bookingId: string;
  name: string;
  type: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  city?: string;
  transmission: string;
  fuelType: string;
  seats: number;
  condition?: string;
  engineType?: string;
  year?: number;
  mileage?: string;
  features?: string[];
  available: boolean;
}

const Cars = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [bookings, setBookings] = useState<Booking[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('carBookings');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [selectedType, setSelectedType] = useState<string>('');
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'newest'>('newest');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('favoritesCars');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });


  // Helper functions
  const preloadImages = (imagePaths: string[]) => {
    imagePaths.forEach(path => {
      const img = new Image();
      img.src = path;
    });
  };

  const handleToggleFavorite = (carId: number) => {
    setFavorites(prev => {
      const updated = prev.includes(carId)
        ? prev.filter(id => id !== carId)
        : [...prev, carId];
      if (typeof window !== 'undefined') {
        localStorage.setItem('favoritesCars', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const cars: Car[] = [
    // Sedans
    {
      id: 1,
      name: 'Toyota Camry',
      brand: 'Toyota',
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
      brand: 'Honda',
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
      brand: 'Hyundai',
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
      brand: 'Honda',
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
      brand: 'Toyota',
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
      brand: 'Mahindra',
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
      brand: 'Hyundai',
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
      brand: 'Maruti',
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
      brand: 'Hyundai',
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
      brand: 'Tata',
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
      brand: 'BMW',
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
      brand: 'Mercedes-Benz',
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
      brand: 'Audi',
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
      brand: 'Volvo',
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

  const calculateTotalPrice = (car: Car, start: Date | null, end: Date | null) => {
    if (!start || !end) return 0;
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return days * car.price;
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBookNow = (car: Car) => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      setSelectedCar(car);
      setShowBookingModal(true);
    }
  };

  const handleConfirmBooking = () => {
    if (!selectedCar || !startDate || !endDate || !user) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    if (endDate < startDate) {
      showNotification('End date must be after start date', 'error');
      return;
    }

    const newBooking: Booking = {
      ...selectedCar,
      id: bookings.length + 1,
      carId: selectedCar.id,
      startDate,
      endDate,
      status: 'active',
      totalPrice: calculateTotalPrice(selectedCar, startDate, endDate),
      bookingId: `BK${Date.now()}`,
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    if (typeof window !== 'undefined') {
      localStorage.setItem('carBookings', JSON.stringify(updatedBookings));
    }
    showNotification('Booking confirmed! Check your profile for details.', 'success');
    setShowBookingModal(false);
    setStartDate(null);
    setEndDate(null);
  };

  const handleCancelBooking = () => {
    if (!selectedBooking || !cancelReason) {
      showNotification('Please provide a cancellation reason', 'error');
      return;
    }

    const updatedBookings = bookings.map((b) =>
      b.id === selectedBooking.id ? { ...b, status: 'cancelled' as const } : b
    );
    setBookings(updatedBookings);
    if (typeof window !== 'undefined') {
      localStorage.setItem('carBookings', JSON.stringify(updatedBookings));
    }
    showNotification('Booking cancelled successfully', 'success');
    setShowCancelModal(false);
    setCancelReason('');
    setSelectedBooking(null);
  };

  useEffect(() => {
    // Preload images
    const imagePaths = cars.map(car => car.image);
    preloadImages(imagePaths);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredAndSortedCars = cars
    .filter(car => {
      const matchesSearch = !searchQuery || car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (car.brand?.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           car.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !selectedType || car.type === selectedType;
      const matchesBrand = !selectedBrand || car.brand === selectedBrand;
      return matchesSearch && matchesType && matchesBrand;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return 0;
        default:
          return 0;
      }
    });

  const uniqueTypes = Array.from(new Set(cars.map(car => car.type)));
  const uniqueBrands = Array.from(new Set(cars.map(car => car.brand)));

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 shadow-lg">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-white">Discover Your Perfect Ride</h1>
          <p className="text-white/80 mt-4 text-lg">
            Explore our premium collection of {cars.length} vehicles
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 border border-neutral-200 dark:border-neutral-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" 
              />
              <input
                type="text"
                placeholder="Search cars..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All Types</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select
              className="px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All Brands</option>
              {uniqueBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            <select
              className="px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"
              defaultValue="newest"
              onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'newest')}
            >
              <option value="newest">Sort by Newest</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="container mx-auto px-4 pb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Available Cars ({filteredAndSortedCars.length})
          </h2>
          <div className="text-neutral-600 dark:text-neutral-400">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            {filteredAndSortedCars.length} of {cars.length} cars
          </div>
        </div>
        
        {filteredAndSortedCars.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-neutral-600 dark:text-neutral-400 text-lg">No cars found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('');
                setSelectedBrand('');
              }}
              className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedCars.map(car => (
              <CarCard
                key={car.id}
                car={car}
                onBookNow={handleBookNow}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={favorites.includes(car.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onLoginSuccess={() => {
            setShowLoginModal(false);
            if (selectedCar) {
              handleBookNow(selectedCar);
            }
          }}
        />
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedCar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-md w-full p-6 border border-neutral-200 dark:border-neutral-700">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Book {selectedCar.name}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 mb-2">Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  minDate={new Date()}
                  className="w-full px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white"
                  placeholderText="Select start date"
                />
              </div>

              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 mb-2">End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  minDate={startDate || new Date()}
                  className="w-full px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white"
                  placeholderText="Select end date"
                />
              </div>

              {startDate && endDate && (
                <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg border border-primary-200 dark:border-primary-800">
                  <div className="flex justify-between mb-2">
                    <span className="text-neutral-700 dark:text-neutral-300">Daily Rate:</span>
                    <span className="text-neutral-900 dark:text-white font-semibold">${selectedCar.price}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-neutral-700 dark:text-neutral-300">Number of Days:</span>
                    <span className="text-neutral-900 dark:text-white font-semibold">
                      {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1}
                    </span>
                  </div>
                  <div className="border-t border-primary-300 dark:border-primary-700 pt-2 flex justify-between">
                    <span className="text-neutral-900 dark:text-white font-bold">Total Price:</span>
                    <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">
                      ${calculateTotalPrice(selectedCar, startDate, endDate)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  setShowBookingModal(false);
                  setStartDate(null);
                  setEndDate(null);
                }}
                className="flex-1 px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Modal */}
      {showCancelModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-md w-full p-6 border border-neutral-200 dark:border-neutral-700">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Cancel Booking</h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              Are you sure you want to cancel your booking for {selectedBooking.name}?
            </p>
            
            <div className="mb-4">
              <label className="block text-neutral-700 dark:text-neutral-300 mb-2">Cancellation Reason</label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Please tell us why you're cancelling..."
                className="w-full px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:ring-2 focus:ring-primary-500"
                rows={3}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelReason('');
                  setSelectedBooking(null);
                }}
                className="flex-1 px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white font-semibold shadow-lg z-50 transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default Cars;