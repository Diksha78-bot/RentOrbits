"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const carSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    type: {
        type: String,
        required: true,
        enum: ['Hatchback', 'Sedan', 'SUV', 'Luxury', 'Electric']
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true,
        min: 2000,
        max: new Date().getFullYear()
    },
    features: [{
            type: String,
            trim: true
        }],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviews: {
        type: Number,
        default: 0
    },
    transmission: {
        type: String,
        required: true,
        enum: ['Manual', 'Automatic']
    },
    fuel: {
        type: String,
        required: true,
        enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid']
    },
    seats: {
        type: Number,
        required: true,
        min: 2,
        max: 8
    },
    location: {
        city: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: String,
            required: true,
            trim: true,
            default: 'Maharashtra'
        }
    },
    mileage: {
        type: String,
        required: true
    },
    insurance: {
        type: Boolean,
        default: true
    },
    driverIncluded: {
        type: Boolean,
        default: false
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Car = mongoose_1.default.model('Car', carSchema);
exports.default = Car;
