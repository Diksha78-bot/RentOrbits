import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { getCars } from '../services/api';
import CarCard from '../components/CarCard';
import CarSkeleton from '../components/CarSkeleton';
import ErrorState from '../components/ErrorState';
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
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'name'>('name');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  
  const { user } = useAuth();

  useEffect(() => {
    fetchCars();
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
    console.log('Booking car:', car);
  };

  const handleToggleFavorite = (carId: number) => {
    setFavorites(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
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