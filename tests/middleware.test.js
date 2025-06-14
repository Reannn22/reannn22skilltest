const errorHandler = require('../src/middleware/errorHandler');
const NotFoundError = require('../src/errors/NotFoundError');

describe('Error Handler Middleware', () => {
  let mockResponse;
  let mockRequest;
  let nextFunction;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockRequest = {};
    nextFunction = jest.fn();
  });

  it('should handle NotFoundError', () => {
    const error = new NotFoundError('Test not found');
    errorHandler(error, mockRequest, mockResponse, nextFunction);
    
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Test not found'
    });
  });

  it('should handle ValidationError', () => {
    const error = {
      name: 'ValidationError',
      errors: {
        email: { message: 'Invalid email' }
      }
    };
    
    errorHandler(error, mockRequest, mockResponse, nextFunction);
    
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Validation Error',
      errors: ['Invalid email']
    });
  });

  it('should handle duplicate key error', () => {
    const error = {
      code: 11000
    };
    
    errorHandler(error, mockRequest, mockResponse, nextFunction);
    
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Duplicate Error',
      error: 'Email already exists'
    });
  });

  it('should handle generic errors', () => {
    const error = new Error('Test error');
    errorHandler(error, mockRequest, mockResponse, nextFunction);
    
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Internal Server Error',
      error: 'Test error'
    });
  });
});