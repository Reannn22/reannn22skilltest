const express = require('express');
const { body, validationResult } = require('express-validator');
const userController = require('../controllers/userController');
const router = express.Router();

// Enhanced validation middleware
const userValidation = [
  body('name.first')
    .trim()
    .notEmpty()
    .withMessage('First name is required'),
  
  body('name.last')
    .trim()
    .notEmpty()
    .withMessage('Last name is required'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('phoneNumber.primary')
    .trim()
    .notEmpty()
    .withMessage('Primary phone number is required')
    .matches(/^[0-9]{10,}$/)
    .withMessage('Primary phone number must contain at least 10 digits and only numbers'),
  
  body('phoneNumber.secondary')
    .optional()
    .trim()
    .matches(/^[0-9]{10,}$/)
    .withMessage('Secondary phone number must contain at least 10 digits and only numbers'),
  
  body('department')
    .trim()
    .notEmpty()
    .withMessage('Department is required')
    .isIn(['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'IT', 'Customer Support'])
    .withMessage('Invalid department'),
  
  body('position')
    .trim()
    .notEmpty()
    .withMessage('Position is required'),
  
  body('employeeId')
    .trim()
    .notEmpty()
    .withMessage('Employee ID is required'),
  
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean value')
];

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Helper function for formatting user response
const formatUserResponse = (user) => ({
  name: {
    first: user.name.first,
    last: user.name.last,
    fullName: `${user.name.first} ${user.name.last}`
  },
  email: user.email,
  phoneNumber: user.phoneNumber,
  department: user.department,
  position: user.position,
  employeeId: user.employeeId,
  isActive: user.isActive,
  joiningDate: user.joiningDate,
  address: user.address,
  emergencyContact: user.emergencyContact,
  skills: user.skills,
  education: user.education.map(({ degree, institution, year }) => ({
    degree,
    institution,
    year
  })),
  socialMedia: user.socialMedia,
  notes: user.notes,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

// Add update validation middleware
const updateValidation = [
  body('name.first')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('First name cannot be empty'),
  
  body('name.last')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Last name cannot be empty'),
  
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('phoneNumber.primary')
    .optional()
    .trim()
    .matches(/^[0-9]{10,}$/)
    .withMessage('Primary phone number must contain at least 10 digits and only numbers'),
  
  body('department')
    .optional()
    .trim()
    .isIn(['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations', 'IT', 'Customer Support'])
    .withMessage('Invalid department')
];

// Routes
router.post('/', userValidation, handleValidationErrors, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:employeeId', userController.getUserById);
router.put('/:employeeId', updateValidation, handleValidationErrors, userController.updateUser);
router.delete('/:employeeId', userController.deleteUser);
router.delete('/', userController.deleteAllUsers);

module.exports = router;
