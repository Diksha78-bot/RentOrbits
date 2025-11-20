import express from 'express';
import { authenticateToken, isAdmin } from '../middleware/auth';
import { validateCar, validateMongoId } from '../middleware/validation';
import Car from '../models/Car';

const router = express.Router();

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error('Cars fetch error:', error);
    res.status(500).json({ message: 'Error fetching cars' });
  }
});

// Get car by ID
router.get('/:id', validateMongoId, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    console.error('Car fetch error:', error);
    res.status(500).json({ message: 'Error fetching car' });
  }
});

// Create new car (admin only)
router.post('/', authenticateToken, isAdmin, validateCar, async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    console.error('Car creation error:', error);
    res.status(400).json({ message: 'Error creating car' });
  }
});

// Update car (admin only)
router.put('/:id', authenticateToken, isAdmin, validateMongoId, validateCar, async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    console.error('Car update error:', error);
    res.status(400).json({ message: 'Error updating car' });
  }
});

// Delete car (admin only)
router.delete('/:id', authenticateToken, isAdmin, validateMongoId, async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Car deletion error:', error);
    res.status(500).json({ message: 'Error deleting car' });
  }
});

export default router;
