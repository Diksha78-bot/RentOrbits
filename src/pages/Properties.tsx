import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBed,
  faBath,
  faRuler,
  faMapMarkerAlt,
  faStar,
  faHeart,
  faShare,
  faTimes,
  faCheck,
  faIndianRupeeSign
} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from '../context/AuthContext';
import Chatbot from '../components/Chatbot';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  type: string;
  rating: number;
  reviews: number;
  amenities: string[];
  description: string;
  available: boolean;
  lastRenovation: string;
  propertyAge: string;
  floor: string;
  parking: string;
  security: string;
  maintenance: string;
  nearbyFacilities: string[];
  owner: {
    name: string;
    contact: string;
    rating: number;
  };
  availability: {
    startDate: string;
    endDate: string;
  };
}

const Properties = () => {
  const { user } = useAuth();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [cancelReason, setCancelReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);

  const cities = ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'];
  const propertyTypes = ['Apartment', 'House', 'Villa', 'Studio'];

  const cancelReasons = [
    'Change in plans',
    'Found better property',
    'Property not as expected',
    'Service issues',
    'Other reason'
  ];

  const properties: Property[] = [
    {
      id: 1,
      title: "Luxury Apartment in Bandra",
      location: "Bandra West, Mumbai",
      price: 45000,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      bedrooms: 3,
      bathrooms: 2,
      area: "1200 sq ft",
      type: "Apartment",
      rating: 4.8,
      reviews: 124,
      amenities: ["Swimming Pool", "Gym", "Parking", "24/7 Security", "Lift", "Power Backup"],
      description: "Spacious 3BHK apartment in prime location with modern amenities",
      available: true,
      lastRenovation: "2023-01-15",
      propertyAge: "5 years",
      floor: "12th Floor",
      parking: "2 Covered",
      security: "24/7 Security",
      maintenance: "₹5000/month",
      nearbyFacilities: ["Shopping Mall", "School", "Hospital", "Metro Station"],
      owner: {
        name: "Rajesh Kumar",
        contact: "+91 9876543210",
        rating: 4.9
      },
      availability: {
        startDate: "2024-01-01",
        endDate: "2024-12-31"
      }
    },
    {
      id: 2,
      title: "Modern Villa in Koregaon Park",
      location: "Koregaon Park, Pune",
      price: 75000,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      bedrooms: 4,
      bathrooms: 3,
      area: "2500 sq ft",
      type: "Villa",
      rating: 4.9,
      reviews: 89,
      amenities: ["Garden", "Private Pool", "Parking", "Security", "Servant Room", "Power Backup"],
      description: "Luxurious 4BHK villa with private garden and pool",
      available: true,
      lastRenovation: "2023-03-20",
      propertyAge: "3 years",
      floor: "Ground + 2",
      parking: "3 Covered",
      security: "24/7 Security",
      maintenance: "₹8000/month",
      nearbyFacilities: ["IT Park", "Restaurants", "Hospital", "School"],
      owner: {
        name: "Priya Sharma",
        contact: "+91 9876543211",
        rating: 4.8
      },
      availability: {
        startDate: "2024-01-01",
        endDate: "2024-12-31"
      }
    },
    {
      id: 3,
      title: "Cozy Studio in Nagpur",
      location: "Civil Lines, Nagpur",
      price: 15000,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      bedrooms: 1,
      bathrooms: 1,
      area: "500 sq ft",
      type: "Studio",
      rating: 4.5,
      reviews: 67,
      amenities: ["Fully Furnished", "Kitchen", "Parking", "Security", "Lift"],
      description: "Modern studio apartment perfect for singles or couples",
      available: true,
      lastRenovation: "2023-02-10",
      propertyAge: "2 years",
      floor: "5th Floor",
      parking: "1 Covered",
      security: "24/7 Security",
      maintenance: "₹2000/month",
      nearbyFacilities: ["Market", "Restaurants", "Hospital", "College"],
      owner: {
        name: "Amit Patel",
        contact: "+91 9876543212",
        rating: 4.7
      },
      availability: {
        startDate: "2024-01-01",
        endDate: "2024-12-31"
      }
    },
    {
      id: 4,
      title: "Heritage House in Nashik",
      location: "Gangapur Road, Nashik",
      price: 35000,
      image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
      bedrooms: 3,
      bathrooms: 2,
      area: "1800 sq ft",
      type: "House",
      rating: 4.7,
      reviews: 92,
      amenities: ["Garden", "Parking", "Security", "Servant Room", "Power Backup"],
      description: "Beautiful heritage house with modern amenities",
      available: true,
      lastRenovation: "2023-04-05",
      propertyAge: "8 years",
      floor: "Ground + 1",
      parking: "2 Covered",
      security: "24/7 Security",
      maintenance: "₹4000/month",
      nearbyFacilities: ["Temple", "Market", "School", "Hospital"],
      owner: {
        name: "Vikram Singh",
        contact: "+91 9876543213",
        rating: 4.9
      },
      availability: {
        startDate: "2024-01-01",
        endDate: "2024-12-31"
      }
    },
    {
      id: 5,
      title: "Luxury Apartment in Aurangabad",
      location: "Cidco, Aurangabad",
      price: 25000,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      bedrooms: 2,
      bathrooms: 2,
      area: "1000 sq ft",
      type: "Apartment",
      rating: 4.6,
      reviews: 78,
      amenities: ["Swimming Pool", "Gym", "Parking", "24/7 Security", "Lift"],
      description: "Modern 2BHK apartment in prime location",
      available: true,
      lastRenovation: "2023-01-25",
      propertyAge: "4 years",
      floor: "8th Floor",
      parking: "1 Covered",
      security: "24/7 Security",
      maintenance: "₹3000/month",
      nearbyFacilities: ["Mall", "School", "Hospital", "Bus Stand"],
      owner: {
        name: "Neha Gupta",
        contact: "+91 9876543214",
        rating: 4.8
      },
      availability: {
        startDate: "2024-01-01",
        endDate: "2024-12-31"
      }
    }
  ];

  const handleBooking = (property: Property) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    if (selectedProperty) {
      setShowModal(true);
    }
  };

  const handleCancelBooking = () => {
    setShowCancelModal(true);
  };

  const handleCancelConfirm = () => {
    // Handle cancellation logic here
    setShowCancelModal(false);
    setShowModal(false);
    setCancelReason('');
    setOtherReason('');
  };

  const calculateTotalPrice = () => {
    if (!startDate || !endDate || !selectedProperty) return 0;
    const months = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
    return months * selectedProperty.price;
  };

  const handleSubmit = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    // Handle booking submission
    setShowModal(false);
  };

  const toggleFavorite = (propertyId: number) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const filteredProperties = properties.filter(property => 
    (selectedCity === 'all' || property.location.includes(selectedCity)) &&
    (selectedType === 'all' || property.type === selectedType)
  );

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      {/* Hero Section */}
      <div className="bg-primary-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-500 opacity-90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h1 className="text-4xl md:text-5xl font-heading mb-4">Find Your Perfect Home</h1>
          <p className="text-xl text-primary-100">Discover premium properties across Maharashtra</p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-2 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Cities</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-2 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Types</option>
            {propertyTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(property => (
            <div key={property.id} className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-card transform hover:scale-105 transition-transform duration-300">
              <div className="relative">
                <img src={property.image} alt={property.title} className="w-full h-64 object-cover" />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button 
                    onClick={() => toggleFavorite(property.id)}
                    className={`p-2 rounded-full ${favorites.includes(property.id) ? 'bg-primary-500 text-white' : 'bg-white dark:bg-neutral-900 bg-opacity-75 text-neutral-600 dark:text-neutral-300'}`}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                  <button className="bg-white dark:bg-neutral-900 bg-opacity-75 p-2 rounded-full text-neutral-600 dark:text-neutral-300">
                    <FontAwesomeIcon icon={faShare} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold">{property.title}</h3>
                    <div className="flex items-center text-neutral-600 dark:text-neutral-400">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                    <span>{property.rating}</span>
                    <span className="text-neutral-600 dark:text-neutral-400 ml-1">({property.reviews})</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 my-4">
                  <div className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <FontAwesomeIcon icon={faBed} className="mr-2" />
                    <span>{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <FontAwesomeIcon icon={faBath} className="mr-2" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center text-neutral-600 dark:text-neutral-300">
                    <FontAwesomeIcon icon={faRuler} className="mr-2" />
                    <span>{property.area}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {property.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 px-3 py-1 rounded-full text-sm">
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 px-3 py-1 rounded-full text-sm">
                      +{property.amenities.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-2xl font-bold">
                    <FontAwesomeIcon icon={faIndianRupeeSign} />
                    {property.price.toLocaleString()}
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">/month</span>
                  </div>
                  <button
                    onClick={() => handleBooking(property)}
                    className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Book {selectedProperty.title}</h2>
              <button onClick={() => setShowModal(false)} className="text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">Move-in Date</label>
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    className="w-full bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 p-2 rounded-md mt-1 border border-neutral-200 dark:border-neutral-600"
                    minDate={new Date()}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-300">Move-out Date</label>
                  <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    className="w-full bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 p-2 rounded-md mt-1 border border-neutral-200 dark:border-neutral-600"
                    minDate={startDate || new Date()}
                  />
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Property Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-300">Property Age</span>
                      <span>{selectedProperty.propertyAge}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-300">Last Renovation</span>
                      <span>{selectedProperty.lastRenovation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-300">Maintenance</span>
                      <span>{selectedProperty.maintenance}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Booking Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-300">Monthly Rent</span>
                      <span>₹{selectedProperty.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600 dark:text-neutral-300">Duration</span>
                      <span>
                        {startDate && endDate 
                          ? `${Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30))} months`
                          : 'Select dates'}
                      </span>
                    </div>
                    <div className="border-t border-neutral-200 dark:border-neutral-600 my-2"></div>
                    <div className="flex justify-between font-bold">
                      <span>Total Price</span>
                      <span>₹{calculateTotalPrice().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Included Amenities</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProperty.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faCheck} className="text-primary-500" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleCancelBooking}
                className="px-4 py-2 border border-neutral-200 dark:border-neutral-600 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-primary-500 text-white px-6 py-2 rounded-md hover:bg-primary-600 transition-colors duration-300"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Sign In Required</h2>
              <button onClick={() => setShowLoginModal(false)} className="text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">Please sign in to continue with your booking.</p>
            <button
              onClick={handleLoginSuccess}
              className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600 transition-colors duration-300"
            >
              Sign In
            </button>
          </div>
        </div>
      )}

      {/* Cancel Booking Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Cancel Booking</h2>
              <button onClick={() => setShowCancelModal(false)} className="text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <div className="space-y-4">
              <p className="text-neutral-600 dark:text-neutral-300">Please select a reason for cancellation:</p>
              <div className="space-y-2">
                {cancelReasons.map(reason => (
                  <label key={reason} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="cancelReason"
                      value={reason}
                      checked={cancelReason === reason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      className="text-primary-500"
                    />
                    <span className="text-neutral-600 dark:text-neutral-300">{reason}</span>
                  </label>
                ))}
              </div>
              
              {cancelReason === 'Other reason' && (
                <textarea
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  placeholder="Please specify your reason"
                  className="w-full bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 p-2 rounded-md mt-2 border border-neutral-200 dark:border-neutral-600"
                  rows={3}
                />
              )}
              
              <button
                onClick={handleCancelConfirm}
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Properties; 