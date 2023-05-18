const { createClient } = require('redis');
const RedisPort = 6379
const myCache = createClient(RedisPort);
//myCache.on('error', err => console.log('Redis Client Error', err));

//myCache.connect();

module.exports = { myCache };
