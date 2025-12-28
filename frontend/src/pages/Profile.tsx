import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faCalendarAlt,
  faEdit,
  faCar,
  faHouseUser,
  faHeart,
  faClockRotateLeft,
  faCrown,
  faTrash,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

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

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'bookings' | 'properties' | 'favorites' | 'history'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('carBookings');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('favoritesCars');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.displayName || "User"
  )}&background=111827&color=fff&bold=true&size=140`;

  // Car data reference
  const carsData = [
    { id: 1, name: 'Toyota Camry', brand: 'Toyota', image: '/CarImages/Toyota Camry.jpg', price: 2500 },
    { id: 2, name: 'Honda Civic', brand: 'Honda', image: '/CarImages/Honda Civic.jpg', price: 2200 },
    { id: 3, name: 'Hyundai Verna', brand: 'Hyundai', image: '/CarImages/Hyundai Verna.jpg', price: 2000 },
    { id: 4, name: 'Honda CR-V', brand: 'Honda', image: '/CarImages/Honda CR-V.jpg', price: 3000 },
    { id: 5, name: 'Toyota Fortuner', brand: 'Toyota', image: '/CarImages/Toyota Fortuner.jpg', price: 3500 },
    { id: 6, name: 'Mahindra XUV700', brand: 'Mahindra', image: '/CarImages/Mahindra XUV700.jpg', price: 2800 },
    { id: 7, name: 'Hyundai Creta', brand: 'Hyundai', image: '/CarImages/Hyundai Creta.jpg', price: 2400 },
    { id: 8, name: 'Maruti Swift', brand: 'Maruti', image: '/CarImages/Maruti Swift.jpg', price: 1500 },
    { id: 9, name: 'Hyundai i20', brand: 'Hyundai', image: '/CarImages/Hyundai i20.jpg', price: 1700 },
    { id: 10, name: 'Tata Altroz', brand: 'Tata', image: '/CarImages/Tata Altroz.jpg', price: 1600 },
    { id: 11, name: 'BMW 5 Series', brand: 'BMW', image: '/CarImages/BMW 5 Series.jpg', price: 4200 },
    { id: 12, name: 'Mercedes-Benz E-Class', brand: 'Mercedes-Benz', image: '/CarImages/Mercedes-Benz E-Class.jpg', price: 4500 },
    { id: 13, name: 'Audi A6', brand: 'Audi', image: '/CarImages/Audi A6.jpg', price: 4000 },
    { id: 14, name: 'Volvo S90', brand: 'Volvo', image: '/CarImages/Volvo S90.jpg', price: 4800 },
  ];

  const activeBookings = bookings.filter(b => b.status === 'active');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');
  const favoriteCars = carsData.filter(car => favorites.includes(car.id));

  const handleDeleteBooking = (bookingId: number) => {
    const updated = bookings.map(b =>
      b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
    );
    setBookings(updated);
    localStorage.setItem('carBookings', JSON.stringify(updated));
  };

  const handleRemoveFavorite = (carId: number) => {
    const updated = favorites.filter(id => id !== carId);
    setFavorites(updated);
    localStorage.setItem('favoritesCars', JSON.stringify(updated));
  };

  // Sync with localStorage on component mount and when storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const storedBookings = localStorage.getItem('carBookings');
      const storedFavorites = localStorage.getItem('favoritesCars');
      
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      }
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    };

    // Load on mount
    handleStorageChange();

    // Listen for storage changes from other tabs/windows
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const formatDate = (date: Date | string) => {
    if (typeof date === 'string') {
      return new Date(date).toLocaleDateString();
    }
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-50">
      {/* PAGE HEADER */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-16 text-center shadow-lg">
        <h1 className="text-4xl font-bold text-white">My Profile</h1>
        <p className="text-white/80 text-lg mt-2">Manage your account and rentals</p>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">

        {/* PROFILE CARD */}
        <div className="bg-neutral-800 shadow-xl border border-neutral-700 rounded-2xl p-8 flex flex-col md:flex-row gap-8 mb-12">

          {/* Avatar */}
          <div className="flex justify-center">
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="w-36 h-36 rounded-full border-4 border-primary-500 shadow-lg"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">{user?.displayName || "Guest User"}</h2>
              <button className="text-primary-500 hover:text-primary-400 transition">
                <FontAwesomeIcon icon={faEdit} className="text-xl" />
              </button>
            </div>

            <p className="flex items-center gap-3 text-neutral-300">
              <FontAwesomeIcon icon={faEnvelope} className="text-primary-500" />
              {user?.email}
            </p>

            <p className="flex items-center gap-3 text-neutral-300">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-primary-500" />
              Member Since:&nbsp;
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : "N/A"}
            </p>

            {/* Premium Label */}
            <div className="inline-flex items-center gap-2 bg-primary-700/40 px-3 py-1 rounded-full text-sm font-medium text-primary-300 border border-primary-700">
              <FontAwesomeIcon icon={faCrown} />
              Standard User
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { id: 'bookings', icon: faCar, text: "My Car Bookings", count: activeBookings.length },
            { id: 'properties', icon: faHouseUser, text: "My Property Rentals", count: 0 },
            { id: 'favorites', icon: faHeart, text: "Favorites", count: favorites.length },
            { id: 'history', icon: faClockRotateLeft, text: "Rental History", count: cancelledBookings.length },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`rounded-xl p-6 flex items-center justify-between gap-4 border shadow-md cursor-pointer hover:scale-[1.03] transition-all duration-300 ${
                activeTab === item.id
                  ? 'bg-primary-700/40 border-primary-500 shadow-lg'
                  : 'bg-neutral-800/90 border-neutral-700 hover:border-neutral-600'
              }`}
            >
              <div className="flex items-center gap-4">
                <FontAwesomeIcon icon={item.icon} className="text-primary-500 text-3xl" />
                <p className="text-lg font-semibold">{item.text}</p>
              </div>
              <span className="bg-primary-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">
                {item.count}
              </span>
            </div>
          ))}
        </div>

        {/* CONTENT SECTIONS */}
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 shadow-lg overflow-hidden">
          
          {/* MY CAR BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">My Car Bookings</h2>
              {activeBookings.length === 0 ? (
                <div className="text-center py-12 text-neutral-400">
                  <FontAwesomeIcon icon={faCar} className="text-6xl mb-4 text-neutral-600" />
                  <p className="text-lg">No active bookings yet</p>
                  <p className="text-sm mt-1">Start booking your favorite cars today!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeBookings.map((booking) => (
                    <div key={booking.id} className="bg-neutral-700/50 border border-neutral-600 rounded-lg p-6 flex gap-6">
                      <img
                        src={booking.image}
                        alt={booking.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">{booking.name}</h3>
                        <p className="text-neutral-300 text-sm mt-1">Booking ID: {booking.bookingId}</p>
                        <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                          <p className="text-neutral-300">
                            <span className="font-semibold text-white">Check-in:</span> {formatDate(booking.startDate)}
                          </p>
                          <p className="text-neutral-300">
                            <span className="font-semibold text-white">Check-out:</span> {formatDate(booking.endDate)}
                          </p>
                          <p className="text-neutral-300">
                            <span className="font-semibold text-white">Total Price:</span> ${booking.totalPrice}
                          </p>
                          <p className="text-green-400 font-semibold flex items-center gap-2">
                            <FontAwesomeIcon icon={faCheckCircle} />
                            Active
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MY PROPERTY RENTALS */}
          {activeTab === 'properties' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">My Property Rentals</h2>
              <div className="text-center py-12 text-neutral-400">
                <FontAwesomeIcon icon={faHouseUser} className="text-6xl mb-4 text-neutral-600" />
                <p className="text-lg">No property rentals yet</p>
                <p className="text-sm mt-1">List your properties to earn income</p>
              </div>
            </div>
          )}

          {/* FAVORITES */}
          {activeTab === 'favorites' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">My Favorite Cars</h2>
              {favoriteCars.length === 0 ? (
                <div className="text-center py-12 text-neutral-400">
                  <FontAwesomeIcon icon={faHeart} className="text-6xl mb-4 text-neutral-600" />
                  <p className="text-lg">No favorite cars yet</p>
                  <p className="text-sm mt-1">Add cars to your favorites to keep them handy</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteCars.map((car) => (
                    <div key={car.id} className="bg-neutral-700/50 border border-neutral-600 rounded-lg overflow-hidden hover:border-blue-500 transition">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-white">{car.name}</h3>
                        <p className="text-neutral-400 text-sm">{car.brand}</p>
                        <p className="text-primary-500 font-bold mt-3 text-lg">${car.price}/day</p>
                        <button
                          onClick={() => handleRemoveFavorite(car.id)}
                          className="mt-4 w-full px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/40 transition border border-red-600/50 flex items-center justify-center gap-2"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* RENTAL HISTORY */}
          {activeTab === 'history' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Rental History</h2>
              {cancelledBookings.length === 0 ? (
                <div className="text-center py-12 text-neutral-400">
                  <FontAwesomeIcon icon={faClockRotateLeft} className="text-6xl mb-4 text-neutral-600" />
                  <p className="text-lg">No rental history yet</p>
                  <p className="text-sm mt-1">Your cancelled bookings will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cancelledBookings.map((booking) => (
                    <div key={booking.id} className="bg-neutral-700/50 border border-neutral-600 rounded-lg p-6 flex gap-6">
                      <img
                        src={booking.image}
                        alt={booking.name}
                        className="w-24 h-24 rounded-lg object-cover opacity-50"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">{booking.name}</h3>
                        <p className="text-neutral-300 text-sm mt-1">Booking ID: {booking.bookingId}</p>
                        <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                          <p className="text-neutral-300">
                            <span className="font-semibold text-white">Check-in:</span> {formatDate(booking.startDate)}
                          </p>
                          <p className="text-neutral-300">
                            <span className="font-semibold text-white">Check-out:</span> {formatDate(booking.endDate)}
                          </p>
                          <p className="text-neutral-300">
                            <span className="font-semibold text-white">Total Price:</span> ${booking.totalPrice}
                          </p>
                          <p className="text-red-400 font-semibold flex items-center gap-2">
                            <FontAwesomeIcon icon={faTimesCircle} />
                            Cancelled
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
