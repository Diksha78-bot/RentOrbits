import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faGasPump, faCog, faUsers, faHeart } from '@fortawesome/free-solid-svg-icons';

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

interface CarCardProps {
  car: Car;
  onBookNow: (car: Car) => void;
  onToggleFavorite: (carId: number) => void;
  isFavorite: boolean;
}

const CarCard: React.FC<CarCardProps> = ({ car, onBookNow, onToggleFavorite, isFavorite }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.target as HTMLImageElement;
    if (!img.src.includes('placeholder.jpg')) {
      img.src = process.env.PUBLIC_URL + '/CarImages/placeholder.jpg';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={process.env.PUBLIC_URL + car.image}
          alt={car.name}
          className="w-full h-48 object-cover"
          onError={handleImageError}
        />
        <button
          onClick={() => onToggleFavorite(car.id)}
          className="absolute top-2 right-2 p-2 bg-gray-800/80 rounded-full hover:bg-gray-700 transition-colors"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FontAwesomeIcon 
            icon={faHeart} 
            className={isFavorite ? 'text-red-500' : 'text-gray-400'} 
          />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-white">{car.name}</h3>
            <p className="text-sm text-gray-400">{car.brand} • {car.type}</p>
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
        <div className="grid grid-cols-3 gap-2 mb-4 text-sm text-gray-400">
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
        </div>
        <button
          onClick={() => onBookNow(car)}
          className={`w-full py-2 rounded-lg transition-colors ${
            car.available
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!car.available}
        >
          {car.available ? 'Book Now' : 'Not Available'}
        </button>
      </div>
    </div>
  );
};

export default CarCard;