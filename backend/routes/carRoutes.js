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
const Car_1 = __importDefault(require("../models/Car"));
const router = express_1.default.Router();
// Get all cars
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cars = yield Car_1.default.find();
        res.json(cars);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching cars' });
    }
}));
// Get car by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield Car_1.default.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json(car);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching car' });
    }
}));
// Create new car (admin only)
router.post('/', auth_1.authenticateToken, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = new Car_1.default(req.body);
        yield car.save();
        res.status(201).json(car);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating car' });
    }
}));
// Update car (admin only)
router.put('/:id', auth_1.authenticateToken, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield Car_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json(car);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating car' });
    }
}));
// Delete car (admin only)
router.delete('/:id', auth_1.authenticateToken, auth_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = yield Car_1.default.findByIdAndDelete(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json({ message: 'Car deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting car' });
    }
}));
exports.default = router;
