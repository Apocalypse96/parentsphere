const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define the School model
const School = sequelize.define('School', {
    name: {
        type: DataTypes.STRING,
        allowNull: false, // The school's name is required
    },
});

module.exports = School;
