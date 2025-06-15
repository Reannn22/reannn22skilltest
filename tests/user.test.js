const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');
const User = require('../src/models/User');

// Mock Redis client
jest.mock('../src/config/redis', () => ({
  get: jest.fn(),
  setex: jest.fn(),
  del: jest.fn().mockResolvedValue('OK'),
  keys: jest.fn().mockResolvedValue([]),
}));

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Close existing connections
  await mongoose.disconnect();
  await mongoose.connection.close();
  
  // Connect to test database
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
  // Reset Redis mock
  const redisClient = require('../src/config/redis');
  jest.clearAllMocks();
  redisClient.get.mockResolvedValue(null);
});

const testUser = {
  name: {
    first: "Test",
    last: "User"
  },
  email: "test.user@company.co.id",
  phoneNumber: {
    primary: "0812345678901"
  },
  department: "IT",
  position: "Tester",
  employeeId: "EMP999",
  isActive: true,
  joiningDate: "2024-01-01"
};

describe('User API Tests', () => {
  // Valid user data for testing
  const validUser = {
    name: {
      first: "Ahmad",
      last: "Firdaus"
    },
    email: "ahmad.firdaus@company.co.id",
    phoneNumber: {
      primary: "081234567890",
      secondary: "087711223344"
    },
    department: "IT",
    position: "Backend Developer",
    employeeId: "EMP011",
    isActive: true,
    joiningDate: "2024-03-25",
    address: {
      street: "Jalan Merdeka No. 15",
      city: "Jakarta Pusat",
      state: "DKI Jakarta",
      country: "Indonesia",
      zipCode: "10110"
    },
    emergencyContact: {
      name: "Siti Nurhaliza",
      relationship: "Istri",
      phoneNumber: "085566778899"
    },
    skills: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    education: [{
      degree: "Sarjana Teknik Informatika",
      institution: "Institut Teknologi Bandung",
      year: 2020
    }],
    socialMedia: {
      linkedin: "linkedin.com/in/ahmadfirdaus",
      twitter: "@ahmadfirdaus",
      github: "github.com/ahmadfirdaus"
    },
    notes: "Backend developer dengan spesialisasi Java dan Spring Boot."
  };

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = {
        name: {
          first: "Test",
          last: "User"
        },
        email: "test.user@company.co.id",
        phoneNumber: {
          primary: "0812345678901"
        },
        department: "IT",
        position: "Tester",
        employeeId: "EMP999"
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body.status).toBe('success');
      expect(response.body.data.user.email).toBe(userData.email);
    });

    it('should fail if required fields are missing', async () => {
      const invalidUser = { name: { first: 'Test' } };
      const res = await request(app)
        .post('/api/users')
        .send(invalidUser);
      
      expect(res.status).toBe(400);
      expect(res.body.status).toBe('error');
    });
  });

  describe('GET /api/users', () => {
    it('should retrieve all users', async () => {
      await User.create(validUser);
      const res = await request(app).get('/api/users');
      
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(Array.isArray(res.body.data.users)).toBe(true);
    });
    
    it('should return 404 if no users found', async () => {
      await User.deleteMany({}); // Ensure no users exist
      const res = await request(app).get('/api/users');

      expect(res.status).toBe(404);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('No users found');
    });
  });

  describe('GET /api/users/:employeeId', () => {
    it('should retrieve user by employeeId', async () => {
        await User.create(validUser);
          const res = await request(app)
          .get(`/api/users/${validUser.employeeId}`);

        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.data.user.employeeId).toBe(validUser.employeeId);
    });

    it('should return 404 if user not found', async () => {
      const res = await request(app)
        .get('/api/users/NONEXISTENT');
      
      expect(res.status).toBe(404);
      expect(res.body.status).toBe('error');
    });
  });

  describe('PUT /api/users/:employeeId', () => {
    it('should update existing user', async () => {
      const user = await User.create(validUser);
      const update = {
        position: 'Senior Backend Developer',
        skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS']
      };

      const res = await request(app)
        .put(`/api/users/${user.employeeId}`)
        .send(update);
      
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.user.position).toBe(update.position);
      expect(res.body.data.user.skills).toEqual(expect.arrayContaining(['Kubernetes', 'AWS']));
    });

    it('should return 404 if user not found', async () => {
      const res = await request(app)
        .put('/api/users/NONEXISTENT')
        .send(validUser);
      
      expect(res.status).toBe(404);
      expect(res.body.status).toBe('error');
    });
  });

  describe('DELETE /api/users', () => {
    it('should delete all users', async () => {

      await User.create([validUser, testUser]);

      const res = await request(app)
        .delete('/api/users');

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.deletedCount).toBe(2); // karena kita tambahkan 2 user
    });

    it('should return 404 if no users to delete', async () => {
      const res = await request(app)
        .delete('/api/users');

      expect(res.status).toBe(404);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('No users to delete'); // sesuaikan dengan message di controllermu
    });
  });

  describe('DELETE /api/users/:employeeId', () => {
    it('should delete existing user', async () => {
        await User.create(validUser); 
      const res = await request(app)
        .delete(`/api/users/${validUser.employeeId}`);
      
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.deletedCount).toBe(1);
    });

    it('should return 404 if user not found', async () => {
      const res = await request(app)
        .delete('/api/users/NONEXISTENT');
      
      expect(res.status).toBe(404);
      expect(res.body.status).toBe('error');
    });
  });
});