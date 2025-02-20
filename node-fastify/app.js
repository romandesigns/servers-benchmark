'use strict';

const path = require('node:path');
const AutoLoad = require('@fastify/autoload');
const Fastify = require('fastify');
require('dotenv').config();

const fastify = Fastify({
  logger: true, // Enable logging for debugging
});

// Cloud Run requires PORT=8080, use default locally
const PORT = process.env.PORT || 5678;

// Register database connection
fastify.register(require('@fastify/postgres'), {
  connectionString: `postgres://${process.env.PSQL_USER}:${process.env.PSQL_PASSWORD}@${process.env.PSQL_HOST}:${process.env.PSQL_PORT}/${process.env.PSQL_DB}`,
});

// Load plugins
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
});

// Load routes
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'routes'),
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`🚀 Fastify server running on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
