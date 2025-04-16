import React, { useState } from 'react';
import { StarIcon, HeartIcon, XMarkIcon } from '@heroicons/react/24/solid';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface Car {
  id: number;
  name: string;
  image: string;
  price: number;
  type: string;
  brand: string;
  model: string;
  year: number;
  features: string[];
  rating: number;
  reviews: number;
  transmission: string;
  fuel: string;
  seats: number;
  location: {
    city: string;
    state: string;
  };
  mileage: string;
  insurance: boolean;
  driverIncluded: boolean;
}

const cars: Car[] = [
  {
    id: 1,
    name: 'Maruti Suzuki Swift',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24',
    price: 2000,
    type: 'Hatchback',
    brand: 'Maruti Suzuki',
    model: 'Swift',
    year: 2023,
    features: ['Air Conditioning', 'Power Steering', 'Music System', 'Airbags', 'ABS'],
    rating: 4.8,
    reviews: 120,
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 5,
    location: {
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    mileage: '22 kmpl',
    insurance: true,
    driverIncluded: false
  },
  {
    id: 2,
    name: 'Hyundai Creta',
    image: 'https://images.unsplash.com/photo-1551830820-330a71b99659',
    price: 3500,
    type: 'SUV',
    brand: 'Hyundai',
    model: 'Creta',
    year: 2023,
    features: ['Sunroof', 'Touchscreen', 'Rear Camera', 'Cruise Control', 'Push Start'],
    rating: 4.9,
    reviews: 95,
    transmission: 'Automatic',
    fuel: 'Diesel',
    seats: 5,
    location: {
      city: 'Pune',
      state: 'Maharashtra'
    },
    mileage: '18 kmpl',
    insurance: true,
    driverIncluded: false
  },
  {
    id: 3,
    name: 'Mahindra Thar',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e',
    price: 4000,
    type: 'SUV',
    brand: 'Mahindra',
    model: 'Thar',
    year: 2023,
    features: ['4WD', 'Hard Top', 'LED Lights', 'Touchscreen', 'Climate Control'],
    rating: 4.7,
    reviews: 75,
    transmission: 'Manual',
    fuel: 'Diesel',
    seats: 4,
    location: {
      city: 'Nagpur',
      state: 'Maharashtra'
    },
    mileage: '15 kmpl',
    insurance: true,
    driverIncluded: false
  },
  {
    id: 4,
    name: 'Tata Nexon EV',
    image: 'https://images.unsplash.com/photo-1560958089-b8a19235cea7',
    price: 3000,
    type: 'Electric',
    brand: 'Tata',
    model: 'Nexon EV',
    year: 2023,
    features: ['Electric', 'Fast Charging', 'Sunroof', 'Touchscreen', 'Connected Car'],
    rating: 4.9,
    reviews: 150,
    transmission: 'Automatic',
    fuel: 'Electric',
    seats: 5,
    location: {
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    mileage: '312 km/charge',
    insurance: true,
    driverIncluded: false
  },
  {
    id: 5,
    name: 'Toyota Innova Crysta',
    image: 'https://images.unsplash.com/photo-1618843479313-40f4afd5f5b1',
    price: 4500,
    type: 'SUV',
    brand: 'Toyota',
    model: 'Innova Crysta',
    year: 2023,
    features: ['Captain Seats', 'Touchscreen', 'Rear AC', 'Cruise Control', 'Push Start'],
    rating: 4.8,
    reviews: 85,
    transmission: 'Automatic',
    fuel: 'Diesel',
    seats: 7,
    location: {
      city: 'Pune',
      state: 'Maharashtra'
    },
    mileage: '16 kmpl',
    insurance: true,
    driverIncluded: true
  },
  {
    id: 6,
    name: 'Honda City',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888',
    price: 2500,
    type: 'Sedan',
    brand: 'Honda',
    model: 'City',
    year: 2023,
    features: ['Sunroof', 'LED Lights', 'Touchscreen', 'Rear Camera', 'Push Start'],
    rating: 4.7,
    reviews: 110,
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    location: {
      city: 'Nagpur',
      state: 'Maharashtra'
    },
    mileage: '18 kmpl',
    insurance: true,
    driverIncluded: false
  }
];

const Cars: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const toggleFavorite = (carId: number) => {
    setFavorites(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (selectedCar && start && end) {
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      setTotalPrice(selectedCar.price * days);
    }
  };

  const handleBooking = (car: Car) => {
    setSelectedCar(car);
    setStartDate(null);
    setEndDate(null);
    setTotalPrice(0);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    if (!startDate || !endDate || !selectedCar) {
      alert('Please select rental dates before confirming');
      return;
    }
    
    alert(`Booking confirmed for ${selectedCar.name}!\n\nDates: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}\nTotal Price: ₹${totalPrice}`);
    setShowBookingModal(false);
    setStartDate(null);
    setEndDate(null);
    setTotalPrice(0);
  };

  const filteredCars = cars.filter(car => {
    if (selectedCity !== 'all' && car.location.city !== selectedCity) return false;
    if (selectedType !== 'all' && car.type !== selectedType) return false;
    return true;
  });

  const cities = Array.from(new Set(cars.map(car => car.location.city)));
  const types = Array.from(new Set(cars.map(car => car.type)));

  return (
    <div className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Our Premium Fleet
          </h1>
          <div className="flex flex-wrap gap-4">
            <select 
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white shadow-sm"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="all">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <select 
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white shadow-sm"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {showBookingModal && selectedCar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 my-8 shadow-xl">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                  Book {selectedCar.name}
                </h2>
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <img 
                  src={selectedCar.image} 
                  alt={selectedCar.name} 
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Select Rental Dates</label>
                <div className="border rounded-lg p-4 shadow-sm">
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                    minDate={new Date()}
                    monthsShown={1}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Car Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Brand: {selectedCar.brand}</p>
                    <p className="text-gray-600">Model: {selectedCar.model}</p>
                    <p className="text-gray-600">Year: {selectedCar.year}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Transmission: {selectedCar.transmission}</p>
                    <p className="text-gray-600">Fuel: {selectedCar.fuel}</p>
                    <p className="text-gray-600">Mileage: {selectedCar.mileage}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCar.features.map((feature, index) => (
                    <span 
                      key={index} 
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Price Details</h3>
                <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily Rate:</span>
                    <span className="font-medium">₹{selectedCar.price}/day</span>
                  </div>
                  {startDate && endDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Days:</span>
                      <span className="font-medium">
                        {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total Price:</span>
                    <span className="text-blue-600">₹{totalPrice}</span>
                  </div>
                </div>
              </div>

              <button
                className={`w-full py-3 rounded-lg transition duration-300 ${
                  startDate && endDate 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white cursor-pointer' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleConfirmBooking}
                disabled={!startDate || !endDate}
              >
                {startDate && endDate ? 'Confirm Booking' : 'Select dates to continue'}
              </button>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => toggleFavorite(car.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full ${
                    favorites.includes(car.id) ? 'bg-red-500' : 'bg-white/80'
                  }`}
                >
                  <HeartIcon className={`w-6 h-6 ${
                    favorites.includes(car.id) ? 'text-white' : 'text-red-500'
                  }`} />
                </button>
                <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-lg">
                  ₹{car.price}/day
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">{car.name}</h2>
                    <p className="text-gray-600">{car.type}</p>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                    <span className="ml-1">{car.rating}</span>
                    <span className="text-gray-500 ml-1">({car.reviews})</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">🚗</span>
                    {car.transmission}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">⛽</span>
                    {car.fuel}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">👥</span>
                    {car.seats} Seats
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📍</span>
                    {car.location.city}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {car.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleBooking(car)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300"
                >
                  Rent Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars; 