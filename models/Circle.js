const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Parent = require('./Parent'); // Import the Parent model for associations

const Circle = sequelize.define('Circle', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    school_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userInitiated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

// Define associations (Many-to-Many relationship with Parents)
Circle.belongsToMany(Parent, {
    through: 'CircleMemberships', // Join table
    foreignKey: 'circle_id',
    otherKey: 'parent_id',
});


// You may need to define the reverse association in the Parent model too
Parent.belongsToMany(Circle, {
    through: 'CircleMemberships',
    foreignKey: 'parent_id',
    otherKey: 'circle_id',
});

module.exports = Circle;
