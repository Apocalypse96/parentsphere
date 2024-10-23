const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Circle = require('./Circle'); // Import the Circle model for associations

// Define the Parent model
const Parent = sequelize.define('Parent', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    child_school_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    child_grade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    child_section: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    community: {
        type: DataTypes.STRING,
        allowNull: true, // Community is optional
    },
});

// Define associations (Many-to-Many relationship with Circles)
Parent.belongsToMany(Circle, {
    through: 'CircleMemberships',
    foreignKey: 'parent_id',
    otherKey: 'circle_id',
});

// You may need to define the reverse association in the Circle model too
Circle.belongsToMany(Parent, {
    through: 'CircleMemberships',
    foreignKey: 'circle_id',
    otherKey: 'parent_id',
});

module.exports = Parent;
