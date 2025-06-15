const User = require('../models/User');
const NotFoundError = require('../errors/NotFoundError');
const cacheService = require('./cacheService');

class UserService {
  async createUser(userData) {
    const user = await User.create(userData);
    await cacheService.deleteCache('users:all');
    return user;
  }
  
  async getAllUsers() {
    const cachedUsers = await cacheService.getCache('users:all');
    if (cachedUsers) {
      return cachedUsers;
    }

    const users = await User.find().lean();
    if (!users || users.length === 0) {
      throw new NotFoundError('No users found');
    }

    await cacheService.setCache('users:all', users);
    return users;
  }

  async getUserById(employeeId) {
    const cacheKey = `user:${employeeId}`;
    const cachedUser = await cacheService.getCache(cacheKey);
    if (cachedUser) {
      return cachedUser;
    }

    const user = await User.findOne({ employeeId }).lean();
    if (!user) {
      throw new NotFoundError(`User with ID ${employeeId} not found`);
    }

    await cacheService.setCache(cacheKey, user);
    return user;
  }

  async updateUser(employeeId, updateData) {
    const user = await User.findOneAndUpdate(
      { employeeId },
      { $set: updateData },
      { new: true, runValidators: true, context: 'query' }
    ).lean();
    
    if (!user) {
      throw new NotFoundError(`User with ID ${employeeId} not found`);
    }

    await Promise.all([
      cacheService.deleteCache(`user:${employeeId}`),
      cacheService.deleteCache('users:all')
    ]);

    return user;
  }

  async deleteUser(employeeId) {
    const user = await User.findOneAndDelete({ employeeId });
    if (!user) {
      throw new NotFoundError(`User with ID ${employeeId} not found`);
    }

    await Promise.all([
      cacheService.deleteCache(`user:${employeeId}`),
      cacheService.deleteCache('users:all')
    ]);

    return user;
  }

  async deleteAllUsers() {
    const result = await User.deleteMany({});
    if (result.deletedCount === 0) {
      throw new NotFoundError('No users to delete');
    }

    await cacheService.deleteCachePattern('user:*');
    await cacheService.deleteCache('users:all');

    return result;
  }
}

module.exports = new UserService();
