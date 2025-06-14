const User = require('../models/User');
const NotFoundError = require('../errors/NotFoundError');

class UserService {
  async createUser(userData) {
    return await User.create(userData);
  }

  async getAllUsers() {
    return await User.find().lean();
  }

  async getUserById(employeeId) {
    const user = await User.findOne({ employeeId }).lean();
    if (!user) {
      throw new NotFoundError(`User with ID ${employeeId} not found`);
    }
    return user;
  }

  async updateUser(employeeId, updateData) {
    const user = await User.findOneAndUpdate(
      { employeeId },
      updateData,
      { new: true, runValidators: true }
    ).lean();
    
    if (!user) {
      throw new NotFoundError(`User with ID ${employeeId} not found`);
    }
    return user;
  }

  async deleteUser(employeeId) {
    const user = await User.findOneAndDelete({ employeeId });
    if (!user) {
      throw new NotFoundError(`User with ID ${employeeId} not found`);
    }
    return user;
  }

  async deleteAllUsers() {
    const result = await User.deleteMany({});
    if (result.deletedCount === 0) {
      throw new NotFoundError('No users found to delete');
    }
    return result;
  }
}

module.exports = new UserService();
