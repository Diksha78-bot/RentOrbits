import express from 'express';
import { authenticateToken } from '../middleware/auth';
import Booking from '../models/Booking';
import Car from '../models/Car';

const router = express.Router();

// Get all bookings (admin only)
router.get('/', authenticateToken, async (req: any, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('car', 'name price');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// Get booking by ID
router.get('/:id', authenticateToken, async (req: any, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email')
      .populate('car', 'name price');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking' });
  }
});

// Create new booking
router.post('/', authenticateToken, async (req: any, res) => {
  try {
    const { carId, startDate, endDate } = req.body;

    // Check if car exists
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Check if car is available for the selected dates
    const existingBooking = await Booking.findOne({
      car: carId,
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
        { startDate: { $gte: startDate, $lte: endDate } }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Car is not available for the selected dates' });
    }

    // Calculate total price
    const days = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = car.price * days;

    const booking = new Booking({
      user: req.user.id,
      car: carId,
      startDate,
      endDate,
      totalPrice,
      status: 'confirmed'
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: 'Error creating booking' });
  }
});

// Update booking
router.put('/:id', authenticateToken, async (req: any, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is authorized to update this booking
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('user', 'name email').populate('car', 'name price');

    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: 'Error updating booking' });
  }
});

// Cancel booking
router.put('/:id/cancel', authenticateToken, async (req: any, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is authorized to cancel this booking
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: 'Error cancelling booking' });
  }
});

export default router; 