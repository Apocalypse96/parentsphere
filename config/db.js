const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from a .env file

// Create a new Sequelize instance with database configuration
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database username
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Database host
    dialect: 'mysql', // Database dialect (can be 'mysql', 'postgres', etc.)
  }
);

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
