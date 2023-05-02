const fs = require('fs');
const redis = require('redis');

async function setValue() {
const data = fs.readFileSync('data.json', 'utf8');
const client = redis.createClient();
client.connect();
client.set('key', data);
}

setValue();