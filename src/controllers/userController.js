const userService = require('../services/userService');
const formatUserResponse = require('../utils/formatUser');
const NotFoundError = require('../errors/NotFoundError');

const userController = {
  createUser: async (req, res, next) => {
    try {
      const user = await userService.createUser(req.body);
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

  getAllUsers: async (req, res, next) => {
    try {
      const users = await userService.getAllUsers();
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

  getUserById: async (req, res, next) => {
    try {
      const user = await userService.getUserById(req.params.employeeId);
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

  updateUser: async (req, res, next) => {
    try {
      const user = await userService.updateUser(req.params.employeeId, req.body);
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

  deleteUser: async (req, res, next) => {
    try {
      await userService.deleteUser(req.params.employeeId);
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

  deleteAllUsers: async (req, res, next) => {
    try {
      const result = await userService.deleteAllUsers();
      res.json({
        status: 'success',
        message: 'All users deleted successfully',
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



