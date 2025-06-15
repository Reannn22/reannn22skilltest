# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Runtime stage
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy built application from builder
COPY --from=builder /app ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001
ENV MONGODB_URI=mongodb+srv://reyhan123140022:t9JyfK1LQTI8zops@cluster0.i2yv1.mongodb.net/skilltest?retryWrites=true&w=majority&appName=Cluster0

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "src/index.js"]