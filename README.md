# Backend Skill Test - User Management API

A RESTful API service for managing user data with comprehensive CRUD operations, data validation, and error handling.

## Live Demo

- Production URL: https://user-management-gh1mxtbje-reannn22s-projects.vercel.app/api/users

## Technology Stack

- **Backend Framework**: Node.js (v18+) with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Caching**: Redis with ioredis
- **Validation**: Express Validator
- **Testing**: Jest & Supertest
- **API Documentation**: Postman Collection
- **Deployment**: Vercel
- **Containerization**: Docker
- **Version Control**: Git

## Features

- ✅ Complete CRUD operations for user management
- 🔒 Input validation and error handling
- 📝 Extensive user data model
- 💨 Redis caching for improved performance
- 🐳 Docker support with Redis container
- 📚 API documentation (Postman Collection)

## Required Endpoints

| Method | Endpoint               | Description      |
| ------ | ---------------------- | ---------------- |
| POST   | /api/users             | Create new user  |
| GET    | /api/users             | Get all users    |
| GET    | /api/users/:employeeId | Get user by ID   |
| PUT    | /api/users/:employeeId | Update user      |
| DELETE | /api/users/:employeeId | Delete user      |
| DELETE | /api/users             | Delete all users |

## Data Model

Required fields:

- Name (string)
- Email (string, unique)
- Phone number (string)
- Active status (boolean)
- Department (string)

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB
- Redis >= 6.0
- Docker (optional)

### Installation

1. Clone repository:

```bash
git clone https://github.com/Reannn22/reannn22skilltest.git
cd backendskilltest
```

2. Install dependencies:

```bash
npm install
```

3. Set up Redis with Upstash:

```bash
# Option 1: Local Redis Installation
# For Windows:
1. Download Redis for Windows from https://github.com/microsoftarchive/redis/releases
2. Run redis-server.exe to start Redis locally

# For Linux:
sudo apt-get install redis-server
sudo systemctl start redis-server

# For macOS:
brew install redis
brew services start redis

# Option 2: Upstash Redis (Recommended for production)
1. Create account at https://upstash.com/
2. Create new Redis database
3. Copy the REDIS_URL from your database details
```

4. Configure environment:

```bash
# Create .env file
MONGODB_URI=your_mongodb_uri
PORT=3001
REDIS_URL=your_upstash_redis_url  # Add this line for Redis configuration
```

5. Run application:

```bash
# Development
npm run dev

# Production
npm start
```

### Docker Setup

```bash
# Build and run with Docker Compose (includes Redis)
docker-compose up -d

# Or build and run manually
docker build -t user-management-api .
docker run -p 3001:3001 \
  -e MONGODB_URI="your_mongodb_uri" \
  -e REDIS_HOST="redis" \
  -e REDIS_PORT="6379" \
  -e REDIS_PASSWORD="your_redis_password" \
  user-management-api
```

## API Documentation

### Postman Collection

You can find the complete API documentation and test the endpoints using our Postman collection:
[View Postman Collection](https://www.postman.co/workspace/SkillTest~d28c032f-8d32-40d9-b0d7-6092d3dcc93a/collection/37563138-e4afcd61-fbfd-4a11-8bc1-6c2c4c119c99?action=share&creator=37563138&active-environment=37563138-8af18842-f5dd-4699-9712-57cebde6e1d0)

### Create User (POST /api/users)

Create new user with complete profile information.

Request:

```json
{
  "name": {
    "first": "Ahmad",
    "last": "Firdaus"
  },
  "email": "ahmad.firdaus@company.co.id",
  "phoneNumber": {
    "primary": "081234567890",
    "secondary": "087711223344"
  },
  "department": "IT",
  "position": "Backend Developer",
  "employeeId": "EMP011",
  "isActive": true,
  "joiningDate": "2024-03-25"
}
```

Response (201 Created):

```json
{
  "status": "success",
  "message": "User created successfully",
  "data": {
    "user": {
      "name": {
        "first": "Ahmad",
        "last": "Firdaus",
        "fullName": "Ahmad Firdaus"
      }
      // ...full user details
    }
  }
}
```

### Get User (GET /api/users/:employeeId)

Retrieve specific user by employee ID.

Response (200 OK):

```json
{
  "status": "success",
  "message": "User retrieved successfully",
  "data": {
    "user": {
      // user details
    }
  }
}
```

### Update User (PUT /api/users/:employeeId)

Update existing user information.

Response (200 OK):

```json
{
  "status": "success",
  "message": "User updated successfully",
  "data": {
    "user": {
      // updated user details
    }
  }
}
```

### Delete User (DELETE /api/users/:employeeId)

Remove specific user.

Response (200 OK):

```json
{
  "status": "success",
  "message": "User with ID EMP011 deleted successfully",
  "data": {
    "deletedCount": 1
  }
}
```

## Input Validation

- Email: Valid format required
- Phone number: Minimum 10 digits, numbers only
- Required fields validation
- Department values validation

## Error Handling

All errors return appropriate HTTP status codes:

- 400: Validation errors
- 404: Resource not found
- 500: Server errors

Error response format:

```json
{
  "status": "error",
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation message"
    }
  ]
}
```

## Testing

The project uses Jest and Supertest for API testing.

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Cases

1. User Creation

```bash
✓ should create a new user
✓ should fail if required fields are missing
```

2. User Retrieval

```bash
✓ should retrieve all users
✓ should return 404 if no users found
✓ should retrieve user by employeeId
✓ should return 404 if user not found
```

3. User Updates

```bash
✓ should update existing user
✓ should return 404 if user not found
```

4. User Deletion

```bash
✓ should delete existing user
✓ should return 404 if user not found
✓ should delete all users
✓ should return error when no users to delete
```

## Codebase Structure

```
backendskilltest/
├── src/
│   ├── config/              # Configuration files
│   │   └── redis.js        # Redis client setup
│   ├── controllers/         # Request handlers
│   │   └── userController.js
│   ├── models/             # Database schemas
│   │   └── User.js
│   ├── routes/             # API routes
│   │   └── userRoutes.js
│   ├── middleware/         # Custom middleware
│   │   └── errorHandler.js
│   ├── services/          # Business logic
│   │   └── userService.js # Includes Redis caching
│   ├── utils/             # Helper functions
│   │   └── formatUser.js
│   ├── errors/            # Custom error classes
│   │   └── NotFoundError.js
│   ├── app.js            # Express app setup
│   └── index.js          # Server entry point
├── tests/                 # Test suites
│   ├── user.test.js
│   ├── model.test.js
│   └── middleware.test.js
├── .env                   # Environment variables
├── .env.test             # Test environment variables
├── .gitignore            # Git ignore rules
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker compose config (includes Redis)
├── jest.config.js        # Jest test configuration
├── package.json          # Project dependencies
└── README.md            # Documentation
```

### Key Components

- **config/redis.js**: Redis client configuration and connection setup
- **services/userService.js**: Implements Redis caching strategy
- **controllers/**: Business logic and request handling
- **models/**: Database schemas and models
- **routes/**: API endpoint definitions
- **middleware/**: Custom middleware functions
- **utils/**: Helper functions and utilities
- **tests/**: Test suites and test helpers

## Deployment

Deploy to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## Author

[Reyhan](https://github.com/Reannn22)

## Caching with Redis (Upstash)

This project uses [Upstash Redis](https://upstash.com/) for caching:

- **Global Caching**: Using Upstash Redis for serverless caching
- **Cache Duration**: 1 hour TTL for cached data
- **Cached Data**:
  - User lists
  - Individual user details
  - Automatic cache invalidation on updates

### Redis Configuration

1. Environment Setup

```env
REDIS_URL=your_upstash_redis_url
```

2. Cache Implementation

- GET requests: Check cache first
- POST/PUT/DELETE: Invalidate related cache
- Automatic error handling & fallback

### Cache Strategy

- List Cache Key: `users:all`
- User Cache Key: `user:{employeeId}`
- Cache Invalidation:
  - On Create: Clear `users:all`
  - On Update: Clear `user:{id}` and `users:all`
  - On Delete: Clear all related keys

### Redis Configuration Options

You can use either local Redis for development or Upstash Redis for production:

1. Local Redis:

```bash
REDIS_URL=redis://localhost:6379
```

2. Upstash Redis:

```bash
REDIS_URL=rediss://username:password@your-redis-host:port
```

