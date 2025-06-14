# User Management API

A RESTful API for managing user data with MongoDB.

## Live API URL

https://user-management-hjhedkkmu-reannn22s-projects.vercel.app/

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
  "education": [
    {
      "degree": "Bachelor",
      "institution": "University",
      "year": 2020
    }
  ],
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

## API Documentation with Examples

Note: Replace `http://localhost:3000` with `https://user-management-hjhedkkmu-reannn22s-projects.vercel.app` for production API.

### 1. Create User (POST /api/users)

```bash
curl -X POST \
  http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

Success Response:

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
      },
      "email": "ahmad.firdaus@company.co.id",
      "phoneNumber": {
        "primary": "081234567890",
        "secondary": "087711223344"
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
      "education": [
        {
          "degree": "Bachelor",
          "institution": "University",
          "year": 2020
        }
      ],
      "socialMedia": {
        "linkedin": "linkedin.com/johndoe",
        "twitter": "@johndoe",
        "github": "github.com/johndoe"
      },
      "notes": "Some notes"
    }
  }
}
```

### 2. Get User by ID (GET /api/users/:employeeId)

```bash
curl -X GET http://localhost:3000/api/users/EMP011
```

Success Response:

```json
{
  "status": "success",
  "message": "User retrieved successfully",
  "data": {
    "user": {
      "name": {
        "first": "Ahmad",
        "last": "Firdaus",
        "fullName": "Ahmad Firdaus"
      },
      "email": "ahmad.firdaus@company.co.id",
      "phoneNumber": {
        "primary": "081234567890",
        "secondary": "087711223344"
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
      "education": [
        {
          "degree": "Bachelor",
          "institution": "University",
          "year": 2020
        }
      ],
      "socialMedia": {
        "linkedin": "linkedin.com/johndoe",
        "twitter": "@johndoe",
        "github": "github.com/johndoe"
      },
      "notes": "Some notes"
    }
  }
}
```

### 3. Get All Users (GET /api/users)

```bash
curl -X GET http://localhost:3000/api/users/
```

Success Response:

```json
{
  "status": "success",
  "message": "Users retrieved successfully",
  "data": {
    "users": [
      {
        "name": {
          "first": "Ahmad",
          "last": "Firdaus",
          "fullName": "Ahmad Firdaus"
        },
        "email": "ahmad.firdaus@company.co.id",
        "phoneNumber": {
          "primary": "081234567890",
          "secondary": "087711223344"
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
        "education": [
          {
            "degree": "Bachelor",
            "institution": "University",
            "year": 2020
          }
        ],
        "socialMedia": {
          "linkedin": "linkedin.com/johndoe",
          "twitter": "@johndoe",
          "github": "github.com/johndoe"
        },
        "notes": "Some notes"
      }
    ]
  }
}
```

### 4. Update User (PUT /api/users/:employeeId)

```bash
curl -X PUT \
  http://localhost:3000/api/users/EMP011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": {
      "first": "Ahmad",
      "last": "Updated"
    },
    "email": "ahmad.updated@company.co.id",
    "phoneNumber": {
      "primary": "081234567891",
      "secondary": "087711223345"
    },
    "department": "IT",
    "position": "Senior Developer",
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
    "skills": ["JavaScript", "Node.js", "React"],
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
    "notes": "Some updated notes"
  }'
```

Success Response:

```json
{
  "status": "success",
  "message": "User updated successfully",
  "data": {
    "user": {
      "name": {
        "first": "Ahmad",
        "last": "Updated",
        "fullName": "Ahmad Updated"
      },
      "email": "ahmad.updated@company.co.id",
      "phoneNumber": {
        "primary": "081234567891",
        "secondary": "087711223345"
      },
      "department": "IT",
      "position": "Senior Developer",
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
      "skills": ["JavaScript", "Node.js", "React"],
      "education": [
        {
          "degree": "Bachelor",
          "institution": "University",
          "year": 2020
        }
      ],
      "socialMedia": {
        "linkedin": "linkedin.com/johndoe",
        "twitter": "@johndoe",
        "github": "github.com/johndoe"
      },
      "notes": "Some updated notes"
    }
  }
}
```

### 5. Delete User (DELETE /api/users/:employeeId)

```bash
curl -X DELETE http://localhost:3000/api/users/EMP012
```

Success Response:

```json
{
  "status": "success",
  "message": "User with ID EMP012 deleted successfully",
  "data": {
    "deletedCount": 1
  }
}
```

Error Response:

```json
{
  "status": "error",
  "message": "User with ID EMP011 not found"
}
```

### 6. Delete All Users (DELETE /api/users)

```bash
curl -X DELETE http://localhost:3000/api/users
```

Success Response:

```json
{
  "status": "success",
  "message": "All users deleted successfully",
  "data": {
    "deletedCount": 2
  }
}
```

## Response Format

All API endpoints return responses in a consistent format:

```json
{
  "status": "success|error",
  "message": "Description of what happened",
  "data": {
    // Response data or error details
  }
}
```

## Error Handling

The API handles various error scenarios:

- 404: Resource not found
- 400: Validation errors
- 500: Server errors

## Error Responses Examples

#### Get User by ID (404 Not Found)
```bash
curl -X GET http://localhost:3000/api/users/NONEXISTENT
```

Response:
```json
{
  "status": "error",
  "message": "User with ID NONEXISTENT not found"
}
```

#### Update User (404 Not Found)
```bash
curl -X PUT \
  http://localhost:3000/api/users/NONEXISTENT \
  -H "Content-Type: application/json" \
  -d '{...}'
```

Response:
```json
{
  "status": "error",
  "message": "User with ID NONEXISTENT not found"
}
```

#### Delete User (404 Not Found)
```bash
curl -X DELETE http://localhost:3000/api/users/NONEXISTENT
```

Response:
```json
{
  "status": "error",
  "message": "User with ID NONEXISTENT not found"
}
```

#### Get All Users (Empty Database)
```bash
curl -X GET http://localhost:3000/api/users
```

Response:
```json
{
  "status": "error",
  "message": "No users found"
}
```

## Docker Support

Build and run with Docker:

````bash
# Build image
docker build -t user-management-api .

# Run container```
docker run -p 4000:4000 -e MONGODB_URI=your_mongodb_uri user-management-api
oyment
Deploy to Vercel:
```bash
# Install Vercel CLI```bash
npm install -g vercell Vercel CLI
g vercel
# Deploy
vercel --prod# Deploy
````

```
## Technologies Used
ies Used
- Node.js
- Express.js
- MongoDB
- MongooseB
- Express Validatorse
- Docker- Express Validator


- Vercel- Docker
- Vercel
```
