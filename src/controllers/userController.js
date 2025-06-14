const User = require('../models/User');

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

// Controller methods
const userController = {
  // Create user
  createUser: async (req, res, next) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json({
        status: 'success',
        message: 'User created successfully',
        data: {
          user: formatUserResponse(user)
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Get all users
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find().lean();
      res.json({
        status: 'success',
        message: 'Users retrieved successfully',
        data: {
          users: users.map(formatUserResponse)
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Get user by ID
  getUserById: async (req, res, next) => {
    try {
      const user = await User.findOne({ employeeId: req.params.employeeId }).lean();
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found'
        });
      }
      res.json({
        status: 'success',
        message: 'User retrieved successfully',
        data: {
          user: formatUserResponse(user)
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Update user
  updateUser: async (req, res, next) => {
    try {
      const user = await User.findOneAndUpdate(
        { employeeId: req.params.employeeId },
        req.body,
        { new: true, runValidators: true }
      ).lean();

      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found'
        });
      }

      res.json({
        status: 'success',
        message: 'User updated successfully',
        data: {
          user: formatUserResponse(user)
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete user
  deleteUser: async (req, res, next) => {
    try {
      const user = await User.findOneAndDelete({ employeeId: req.params.employeeId });
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: `User with ID ${req.params.employeeId} not found`
        });
      }
      res.json({
        status: 'success',
        message: `User with ID ${req.params.employeeId} deleted successfully`,
        data: {
          deletedCount: 1
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Delete all users
  deleteAllUsers: async (req, res, next) => {
    try {
      const result = await User.deleteMany({});
      if (result.deletedCount === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'No users found to delete'
        });
      }
      res.json({
        status: 'success',
        message: `All users deleted successfully`,
        data: {
          deletedCount: result.deletedCount
        }
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController;
