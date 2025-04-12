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
  features: string[];
  rating: number;
  reviews: number;
  transmission: string;
  fuel: string;
  seats: number;
}

const cars: Car[] = [
  {
    id: 1,
    name: 'Toyota Camry 2024',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24',
    price: 60,
    type: 'Sedan',
    features: ['Automatic', 'Air Conditioning', 'Bluetooth', 'Backup Camera', 'GPS Navigation'],
    rating: 4.8,
    reviews: 120,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    seats: 5,
  },
  {
    id: 2,
    name: 'Honda CR-V 2024',
    image: 'https://images.unsplash.com/photo-1551830820-330a71b99659',
    price: 75,
    type: 'SUV',
    features: ['Automatic', '4WD', 'GPS Navigation', 'Sunroof', 'Heated Seats'],
    rating: 4.9,
    reviews: 95,
    transmission: 'Automatic',
    fuel: 'Hybrid',
    seats: 5,
  },
  {
    id: 3,
    name: 'BMW 3 Series 2024',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e',
    price: 100,
    type: 'Luxury',
    features: ['Automatic', 'Leather Seats', 'Premium Sound', 'Heated Seats', 'Parking Assist'],
    rating: 4.7,
    reviews: 75,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    seats: 5,
  },
  {
    id: 4,
    name: 'Tesla Model 3',
    image: 'https://images.unsplash.com/photo-1560958089-b8a19235cea7',
    price: 90,
    type: 'Electric',
    features: ['Autopilot', 'Premium Sound', 'Glass Roof', 'Wireless Charging', 'Keyless Entry'],
    rating: 4.9,
    reviews: 150,
    transmission: 'Automatic',
    fuel: 'Electric',
    seats: 5,
  },
  {
    id: 5,
    name: 'Mercedes-Benz C-Class',
    image: 'https://images.unsplash.com/photo-1618843479313-40f4afd5f5b1',
    price: 120,
    type: 'Luxury',
    features: ['Automatic', 'Leather Seats', 'Premium Sound', 'Heated Seats', 'Parking Assist'],
    rating: 4.8,
    reviews: 85,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    seats: 5,
  },
  {
    id: 6,
    name: 'Toyota RAV4',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888',
    price: 70,
    type: 'SUV',
    features: ['Automatic', '4WD', 'GPS Navigation', 'Sunroof', 'Backup Camera'],
    rating: 4.7,
    reviews: 110,
    transmission: 'Automatic',
    fuel: 'Hybrid',
    seats: 5,
  }
];

const Cars: React.FC = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const toggleFavorite = (carId: number) => {
    setFavorites(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
  };

  const calculateTotalPrice = (car: Car, start: Date | null, end: Date | null) => {
    if (start && end) {
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return car.price * days;
    }
    return 0;
  };

  const handleBooking = (car: Car) => {
    setSelectedCar(car);
    setShowBookingModal(true);
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (selectedCar && start && end) {
      setTotalPrice(calculateTotalPrice(selectedCar, start, end));
    }
  };

  const handleConfirmBooking = () => {
    if (!startDate || !endDate || !selectedCar) {
      alert('Please select rental dates before confirming');
      return;
    }
    
    // Handle booking confirmation
    alert(`Booking confirmed for ${selectedCar.name}!\n\nDates: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}\nTotal Price: $${totalPrice}`);
    setShowBookingModal(false);
    setStartDate(null);
    setEndDate(null);
    setTotalPrice(0);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Our Premium Fleet</h1>
          <div className="flex gap-4">
            <select className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option>All Types</option>
              <option>Sedan</option>
              <option>SUV</option>
              <option>Luxury</option>
            </select>
            <select className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </div>
        </div>

        {showBookingModal && selectedCar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Book {selectedCar.name}</h2>
                <button onClick={() => setShowBookingModal(false)} className="text-gray-500 hover:text-gray-700">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-6">
                <img src={selectedCar.image} alt={selectedCar.name} className="w-full h-64 object-cover rounded-lg" />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Select Rental Dates</label>
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  minDate={new Date()}
                  className="w-full"
                />
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCar.features.map((feature, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Price Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Daily Rate:</span>
                    <span>${selectedCar.price}/day</span>
                  </div>
                  {startDate && endDate && (
                    <div className="flex justify-between">
                      <span>Total Days:</span>
                      <span>{Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Price:</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>
              </div>

              <button
                className={`w-full py-3 rounded-lg transition duration-300 ${
                  startDate && endDate 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer' 
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
          {cars.map((car) => (
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
                <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-lg">
                  ${car.price}/day
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
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleBooking(car)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
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