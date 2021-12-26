const assert = require('assert');

const { JWT_SECRET, PORT, NODE_ENV } = process.env;

assert.ok(PORT, 'PORT configuration is required.');
assert.ok(JWT_SECRET, 'JWT_SECRET configuration is required.');
assert.ok(NODE_ENV, 'NODE_ENV configuration is required.');

module.exports = {
    environment: NODE_ENV,
    server: {
        port: Number.parseInt(PORT, 10) || 4000
    },
    auth: {
        secret: JWT_SECRET,
        ttl: '1h'
    }
};
