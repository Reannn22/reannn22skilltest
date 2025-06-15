const User = require('../models/User');
const NotFoundError = require('../errors/NotFoundError');
const redisClient = require('../config/redis');

const CACHE_TTL = 3600; // 1 hour in seconds

class UserService {
  async createUser(userData) {
    const user = await User.create(userData);
    // Invalidate users list cache
    await redisClient.del('users:all');
    return user;
  }
  
  async getAllUsers() {
    // Try to get from cache first
    const cachedUsers = await redisClient.get('users:all');
    if (cachedUsers) {
      const users = JSON.parse(cachedUsers);
      if (users.length === 0) {
        throw new NotFoundError('No users found');
      }
      return users;
    }

    const users = await User.find().lean();
    if (!users || users.length === 0) {
      throw new NotFoundError('No users found');
    }

    // Store in cache
    await redisClient.setex('users:all', CACHE_TTL, JSON.stringify(users));
    return users;
  }

  async getUserById(employeeId) {
    // Try to get from cache first
    const cachedUser = await redisClient.get(`user:${employeeId}`);
    if (cachedUser) {
      return JSON.parse(cachedUser);
    }

    const user = await User.findOne({ employeeId }).lean();
    if (!user) {
      throw new NotFoundError(`User with ID ${employeeId} not found`);
    }

    // Store in cache
    await redisClient.setex(`user:${employeeId}`, CACHE_TTL, JSON.stringify(user));
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

    // Invalidate caches
    await Promise.all([
      redisClient.del(`user:${employeeId}`),
      redisClient.del('users:all')
    ]);

    return user;
  }

  async deleteUser(employeeId) {
    const user = await User.findOneAndDelete({ employeeId });
    if (!user) {
      throw new NotFoundError(`User with ID ${employeeId} not found`);
    }

    // Invalidate caches
    await Promise.all([
      redisClient.del(`user:${employeeId}`),
      redisClient.del('users:all')
    ]);

    return user;
  }

  async deleteAllUsers() {
    const result = await User.deleteMany({});
    if (result.deletedCount === 0) {
      throw new NotFoundError('No users to delete');
    }

    // Clear all user-related caches
    const keys = await redisClient.keys('user:*');
    if (keys && keys.length > 0) {
      await Promise.all(keys.map(key => redisClient.del(key)));
    }
    await redisClient.del('users:all');

    return result;
  }
}

module.exports = new UserService();
