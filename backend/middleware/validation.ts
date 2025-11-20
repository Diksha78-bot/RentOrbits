import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation error handler
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Validation failed', 
      errors: errors.array() 
    });
  }
  next();
};

// User registration validation
export const validateUserRegistration = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  handleValidationErrors
];

// User login validation
export const validateUserLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required'),
  
  handleValidationErrors
];

// Profile update validation
export const validateProfileUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  
  handleValidationErrors
];

// Booking creation validation
export const validateBookingCreation = [
  body('carId')
    .notEmpty().withMessage('Car ID is required')
    .isMongoId().withMessage('Invalid car ID format'),
  
  body('startDate')
    .notEmpty().withMessage('Start date is required')
    .isISO8601().withMessage('Invalid start date format')
    .custom((value) => {
      const startDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (startDate < today) {
        throw new Error('Start date cannot be in the past');
      }
      return true;
    }),
  
  body('endDate')
    .notEmpty().withMessage('End date is required')
    .isISO8601().withMessage('Invalid end date format')
    .custom((value, { req }) => {
      const startDate = new Date(req.body.startDate);
      const endDate = new Date(value);
      if (endDate <= startDate) {
        throw new Error('End date must be after start date');
      }
      const maxDays = 30;
      const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff > maxDays) {
        throw new Error(`Booking cannot exceed ${maxDays} days`);
      }
      return true;
    }),
  
  handleValidationErrors
];

// Booking update validation
export const validateBookingUpdate = [
  body('status')
    .optional()
    .isIn(['confirmed', 'cancelled', 'completed']).withMessage('Invalid status value'),
  
  body('startDate')
    .optional()
    .isISO8601().withMessage('Invalid start date format'),
  
  body('endDate')
    .optional()
    .isISO8601().withMessage('Invalid end date format'),
  
  handleValidationErrors
];

// Car creation/update validation
export const validateCar = [
  body('name')
    .trim()
    .notEmpty().withMessage('Car name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Car name must be between 2 and 100 characters'),
  
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  
  body('category')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('Category must not exceed 50 characters'),
  
  body('transmission')
    .optional()
    .isIn(['automatic', 'manual']).withMessage('Transmission must be either automatic or manual'),
  
  body('fuelType')
    .optional()
    .isIn(['petrol', 'diesel', 'electric', 'hybrid']).withMessage('Invalid fuel type'),
  
  body('seats')
    .optional()
    .isInt({ min: 1, max: 50 }).withMessage('Seats must be between 1 and 50'),
  
  body('image')
    .optional()
    .trim()
    .isURL().withMessage('Image must be a valid URL'),
  
  handleValidationErrors
];

// MongoDB ID validation
export const validateMongoId = [
  param('id')
    .isMongoId().withMessage('Invalid ID format'),
  
  handleValidationErrors
];

// Sanitize input to prevent XSS
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  // Additional sanitization is handled by xss-clean middleware
  // This is a placeholder for any custom sanitization logic
  next();
};
