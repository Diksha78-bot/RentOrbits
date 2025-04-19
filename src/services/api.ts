import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Car services
export const getCars = async () => {
  const response = await axios.get(`${API_URL}/cars`);
  return response.data;
};

export const getCarById = async (id: string) => {
  const response = await axios.get(`${API_URL}/cars/${id}`);
  return response.data;
};

// Booking services
export const createBooking = async (bookingData: any) => {
  const response = await axios.post(`${API_URL}/bookings`, bookingData);
  return response.data;
};

export const getBookings = async () => {
  const response = await axios.get(`${API_URL}/bookings`);
  return response.data;
};

// User services
export const registerUser = async (userData: any) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
};

export const loginUser = async (credentials: any) => {
  const response = await axios.post(`${API_URL}/users/login`, credentials);
  return response.data;
};

export const getUserProfile = async (token: string) => {
  const response = await axios.get(`${API_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getUserBookings = async (token: string) => {
  const response = await axios.get(`${API_URL}/users/bookings`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}; 