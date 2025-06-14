# Backend Skill Test - User Management API

A RESTful API service for managing user data with comprehensive CRUD operations, data validation, and error handling.

## Live Demo

- Production URL: https://user-management-4eilpf8w1-reannn22s-projects.vercel.app/api/users

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Validation**: Express Validator
- **Deployment**: Vercel
- **Containerization**: Docker

## Features

- ✅ Complete CRUD operations for user management
- 🔒 Input validation and error handling
- 📝 Extensive user data model
- 🚀 Docker support
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

3. Configure environment:

```bash
# Create .env file
MONGODB_URI=your_mongodb_uri
PORT=3001
```

4. Run application:

```bash
# Development
npm run dev

# Production
npm start
```

### Docker Setup

```bash
# Build image
docker build -t user-management-api .

# Run container
docker run -p 3001:3001 \
  -e MONGODB_URI="your_mongodb_uri" \
  user-management-api
```

## API Documentation

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
│   ├── controllers/
│   │   └── userController.js     # Request handlers
│   ├── models/
│   │   └── user.js              # MongoDB schema
│   ├── routes/
│   │   └── userRoutes.js        # API routes
│   ├── middleware/
│   │   └── errorHandler.js      # Error handling
│   ├── utils/
│   │   └── formatUser.js        # Response formatting
│   ├── app.js                   # Express app setup
│   └── index.js                 # Server entry point
├── tests/
│   └── user.test.js            # API tests
├── .env                        # Environment variables
├── .gitignore                 # Git ignore rules
├── Dockerfile                 # Docker configuration
├── docker-compose.yml        # Docker compose config
├── package.json             # Project dependencies
└── README.md               # Documentation
```

### Key Components

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
