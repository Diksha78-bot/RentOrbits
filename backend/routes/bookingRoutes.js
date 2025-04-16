"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const Booking_1 = __importDefault(require("../models/Booking"));
const Car_1 = __importDefault(require("../models/Car"));
const router = express_1.default.Router();
// Get all bookings (admin only)
router.get('/', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield Booking_1.default.find()
            .populate('user', 'name email')
            .populate('car', 'name price');
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching bookings' });
    }
}));
// Get booking by ID
router.get('/:id', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield Booking_1.default.findById(req.params.id)
            .populate('user', 'name email')
            .populate('car', 'name price');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching booking' });
    }
}));
// Create new booking
router.post('/', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId, startDate, endDate } = req.body;
        // Check if car exists
        const car = yield Car_1.default.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        // Check if car is available for the selected dates
        const existingBooking = yield Booking_1.default.findOne({
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
        const booking = new Booking_1.default({
            user: req.user.id,
            car: carId,
            startDate,
            endDate,
            totalPrice,
            status: 'confirmed'
        });
        yield booking.save();
        res.status(201).json(booking);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating booking' });
    }
}));
// Update booking
router.put('/:id', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield Booking_1.default.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        // Check if user is authorized to update this booking
        if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }
        const updatedBooking = yield Booking_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user', 'name email').populate('car', 'name price');
        res.json(updatedBooking);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating booking' });
    }
}));
// Cancel booking
router.put('/:id/cancel', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield Booking_1.default.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        // Check if user is authorized to cancel this booking
        if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }
        booking.status = 'cancelled';
        yield booking.save();
        res.json(booking);
    }
    catch (error) {
        res.status(400).json({ message: 'Error cancelling booking' });
    }
}));
exports.default = router;
