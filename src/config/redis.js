const Redis = require('ioredis');

// Koneksi menggunakan URL penuh dari .env
const redisClient = new Redis(process.env.REDIS_URL);

// Logging event
redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('ready', () => {
  console.log('Redis client ready to accept commands');
});

redisClient.on('reconnecting', (delay) => {
  console.log(`Redis client reconnecting in ${delay}ms...`);
});

redisClient.on('end', () => {
  console.log('Redis client connection closed');
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err.message);
});

process.on('SIGINT', () => {
  redisClient.quit(() => {
    console.log('Redis client disconnected through app termination');
    process.exit(0);
  });
});

module.exports = redisClient;
