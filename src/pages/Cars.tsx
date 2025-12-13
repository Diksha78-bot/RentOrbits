import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faStar, faGasPump, faCog, faUsers, faHistory, faHeart, faCalculator, faRoad } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';

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
  const [selectedCity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPriceCalculator, setShowPriceCalculator] = useState(false);

  const [showBookingHistory, setShowBookingHistory] = useState(false);
  const [priceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy] = useState<'price' | 'rating' | 'newest'>('newest');
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
  const [, setShowFavorites] = useState(false);
  const [showFavoritesDropdown, setShowFavoritesDropdown] = useState(false);


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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCars();
      setCars(data);
    } catch (err) {
      setError('Failed to load car listings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (car: Car) => {
    if (!user) {
      setSelectedCar(car);
      setShowLoginModal(true);
      return;
    }
    // TODO: Implement booking flow (e.g., navigate to booking page, open modal, or call booking API)
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



  const filteredAndSortedCars = cars
    .filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const uniqueTypes = Array.from(new Set(cars.map(car => car.type)));
  const uniqueBrands = Array.from(new Set(cars.map(car => car.brand)));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="bg-gray-800 shadow-lg">
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl font-bold text-white">Discover Your Perfect Ride</h1>
            <p className="text-gray-300 mt-4 text-lg">Loading our premium collection...</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <CarSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="bg-gray-800 shadow-lg">
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl font-bold text-white">Discover Your Perfect Ride</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <ErrorState message={error} onRetry={fetchCars} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-white">Discover Your Perfect Ride</h1>
          <p className="text-gray-300 mt-4 text-lg">
            Explore our premium collection of {cars.length} vehicles
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="text"
                placeholder="Search cars..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All Types</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select
              className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All Brands</option>
              {uniqueBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            <select
              className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'name')}
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="container mx-auto px-4 pb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Available Cars ({filteredAndSortedCars.length})
          </h2>
          <div className="text-gray-400">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            {filteredAndSortedCars.length} of {cars.length} cars
          </div>
        </div>
        
        {filteredAndSortedCars.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No cars found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('');
                setSelectedBrand('');
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
    </div>
  );
};

export default Cars;