import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { 
  validateBookingCreation, 
  validateBookingUpdate, 
  validateMongoId 
} from '../middleware/validation';
import Booking from '../models/Booking';
import Car from '../models/Car';

const router = express.Router();

// Get all bookings (admin only)
router.get('/', authenticateToken, async (req: any, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('car', 'name price');
    res.json(bookings);
  } catch (error) {
    console.error('Bookings fetch error:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// Get booking by ID
router.get('/:id', authenticateToken, validateMongoId, async (req: any, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email')
      .populate('car', 'name price');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is authorized to view this booking
    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Booking fetch error:', error);
    res.status(500).json({ message: 'Error fetching booking' });
  }
});

// Create new booking
router.post('/', authenticateToken, validateBookingCreation, async (req: any, res) => {
  try {
    const { carId, startDate, endDate } = req.body;

    // Check if car exists and is available
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Check if car is available for the selected dates
    const existingBooking = await Booking.findOne({
      car: carId,
      status: { $ne: 'cancelled' },
      $or: [
        { 
          startDate: { $lte: new Date(endDate) }, 
          endDate: { $gte: new Date(startDate) } 
        }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({ 
        message: 'Car is not available for the selected dates',
        conflictingBooking: {
          startDate: existingBooking.startDate,
          endDate: existingBooking.endDate
        }
      });
    }

    // Calculate total price
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = car.price * days;

    // Validate total price
    if (totalPrice <= 0) {
      return res.status(400).json({ message: 'Invalid booking duration' });
    }

    const booking = new Booking({
      user: req.user.id,
      car: carId,
      startDate: start,
      endDate: end,
      totalPrice,
      status: 'confirmed'
    });

    await booking.save();
    
    const populatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email')
      .populate('car', 'name price image');

    res.status(201).json(populatedBooking);
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(400).json({ message: 'Error creating booking' });
  }
});

// Update booking
router.put('/:id', authenticateToken, validateMongoId, validateBookingUpdate, async (req: any, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is authorized to update this booking
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this booking' });
    }

    // Prevent updating cancelled bookings
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Cannot update a cancelled booking' });
    }

    // Only allow specific fields to be updated
    const allowedUpdates = ['status', 'startDate', 'endDate'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'name email').populate('car', 'name price');

    res.json(updatedBooking);
  } catch (error) {
    console.error('Booking update error:', error);
    res.status(400).json({ message: 'Error updating booking' });
  }
});

// Cancel booking
router.put('/:id/cancel', authenticateToken, validateMongoId, async (req: any, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is authorized to cancel this booking
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    // Check if booking is already cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    // Check if booking has already started
    const now = new Date();
    if (booking.startDate < now) {
      return res.status(400).json({ message: 'Cannot cancel a booking that has already started' });
    }

    booking.status = 'cancelled';
    await booking.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email')
      .populate('car', 'name price');

    res.json(populatedBooking);
  } catch (error) {
    console.error('Booking cancellation error:', error);
    res.status(400).json({ message: 'Error cancelling booking' });
  }
});

export default router;
