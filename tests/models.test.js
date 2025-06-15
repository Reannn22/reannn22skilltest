const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../src/models/User');

describe('User Model Test', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  const validUserData = {
    name: { first: 'Test', last: 'User' },
    email: 'test@test.com',
    phoneNumber: { primary: '1234567890' },
    department: 'IT',
    position: 'Developer',
    employeeId: 'EMP123',
    isActive: true,
    joiningDate: new Date()
  };

  it('should create & save user successfully', async () => {
    const user = new User(validUserData);
    const savedUser = await user.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.fullName).toBe('Test User');
  });

  it('should fail to save user without required fields', async () => {
    const user = new User({});
    let err;
    try {
      await user.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors.email).toBeDefined();
  });
});
