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
    joiningDate: new Date(),
    address: {
      street: 'Test St',
      city: 'Test City',
      state: 'Test State',
      country: 'Test Country',
      zipCode: '12345'
    },
    emergencyContact: {
      name: 'Emergency Contact',
      relationship: 'Relative',
      phoneNumber: '0987654321'
    },
    skills: ['Skill1', 'Skill2'],
    education: [{
      degree: 'Test Degree',
      institution: 'Test University',
      year: 2020
    }],
    socialMedia: {
      linkedin: 'linkedin.com/test',
      twitter: '@test',
      github: 'github.com/test'
    },
    notes: 'Test notes'
  };

  it('should create & save user successfully', async () => {
    const validUser = new User(validUserData);
    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.fullName).toBe('Test User');
  });

  it('should fail to save user without required fields', async () => {
    const userWithoutRequired = new User({});
    let err;
    try {
      await userWithoutRequired.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should validate email format', async () => {
    const userWithInvalidEmail = new User({
      ...validUserData,
      email: 'invalid-email'
    });
    await expect(userWithInvalidEmail.validate()).rejects.toThrow();
  });

  it('should validate phone number format', async () => {
    const userWithInvalidPhone = new User({
      ...validUserData,
      phoneNumber: { primary: '123' }
    });
    await expect(userWithInvalidPhone.validate()).rejects.toThrow();
  });

  it('should validate emergency contact phone', async () => {
    const userWithInvalidEmergencyPhone = new User({
      ...validUserData,
      emergencyContact: {
        ...validUserData.emergencyContact,
        phoneNumber: '123'
      }
    });
    await expect(userWithInvalidEmergencyPhone.validate()).rejects.toThrow();
  });

  it('should validate department enum values', async () => {
    const userWithInvalidDepartment = new User({
      ...validUserData,
      department: 'Invalid'
    });
    await expect(userWithInvalidDepartment.validate()).rejects.toThrow();
  });

  it('should transform document correctly', () => {
    const user = new User(validUserData);
    const transformed = user.toJSON();
    
    expect(transformed._id).toBeUndefined();
    expect(transformed.__v).toBeUndefined();
    expect(transformed.id).toBe(user.employeeId);
    expect(transformed.name.fullName).toBe('Test User');
  });

  it('should clean up education array in transformation', () => {
    const user = new User(validUserData);
    const transformed = user.toJSON();
    
    expect(transformed.education[0]._id).toBeUndefined();
    expect(transformed.education[0].__v).toBeUndefined();
    expect(transformed.education[0].degree).toBe('Test Degree');
  });

  it('should validate notes length', async () => {
    const userWithLongNotes = new User({
      ...validUserData,
      notes: 'a'.repeat(1001)
    });
    await expect(userWithLongNotes.validate()).rejects.toThrow();
  });

  it('should handle secondary phone number validation', async () => {
    const userWithInvalidSecondaryPhone = new User({
      ...validUserData,
      phoneNumber: {
        ...validUserData.phoneNumber,
        secondary: '123'
      }
    });
    await expect(userWithInvalidSecondaryPhone.validate()).rejects.toThrow();
  });
});