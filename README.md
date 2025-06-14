# User Management API

A RESTful API for managing user data with MongoDB.

## Setup and Installation

1. Clone the repository
```bash
git clone https://github.com/Reannn22/reannn22skilltest.git
cd backendskilltest
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

4. Run the application
```bash
# Development
npm run dev

# Production
npm start
```

## API Documentation

### Base URL
```
http://localhost:3000/api/users
```

### Endpoints

#### 1. Create User
- **Method:** POST
- **Endpoint:** `/`
- **Body:**
```json
{
  "name": {
    "first": "John",
    "last": "Doe"
  },
  "email": "john.doe@example.com",
  "phoneNumber": {
    "primary": "1234567890",
    "secondary": "0987654321"
  },
  "department": "IT",
  "position": "Developer",
  "employeeId": "EMP001",
  "isActive": true,
  "joiningDate": "2024-01-15",
  "address": {
    "street": "123 Main St",
    "city": "City",
    "state": "State",
    "country": "Country",
    "zipCode": "12345"
  },
  "emergencyContact": {
    "name": "Jane Doe",
    "relationship": "Spouse",
    "phoneNumber": "1234567890"
  },
  "skills": ["JavaScript", "Node.js"],
  "education": [{
    "degree": "Bachelor",
    "institution": "University",
    "year": 2020
  }],
  "socialMedia": {
    "linkedin": "linkedin.com/johndoe",
    "twitter": "@johndoe",
    "github": "github.com/johndoe"
  },
  "notes": "Some notes"
}
```

#### 2. Get All Users
- **Method:** GET
- **Endpoint:** `/`

#### 3. Get User by ID
- **Method:** GET
- **Endpoint:** `/:employeeId`

#### 4. Update User
- **Method:** PUT
- **Endpoint:** `/:employeeId`
- **Body:** Same as Create User

#### 5. Delete User
- **Method:** DELETE
- **Endpoint:** `/:employeeId`

#### 6. Delete All Users
- **Method:** DELETE
- **Endpoint:** `/`

### Validation Rules

- First name and last name are required
- Email must be valid and unique
- Primary phone number must be at least 10 digits
- Department must be one of: Engineering, Marketing, Sales, HR, Finance, Operations, IT, Customer Support
- Position is required
- EmployeeId is required and must be unique

### Response Format

Success Response:
```json
{
  "status": "success",
  "message": "Operation successful",
  "data": {
    "user": {
      // user data
    }
  }
}
```

Error Response:
```json
{
  "status": "error",
  "message": "Error message",
  "errors": [
    {
      "field": "fieldName",
      "message": "Error description"
    }
  ]
}
```

## Docker Support

Build and run with Docker:
```bash
# Build image
docker build -t user-management-api .

# Run container
docker run -p 4000:4000 -e MONGODB_URI=your_mongodb_uri user-management-api
```

## Deployment

Deploy to Vercel:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Express Validator
- Docker
- Vercel
