const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Parent = require('./Parent'); // Import the Parent model for associations
const Circle = require('./Circle'); // Import the Circle model for associations

// Define the Post model
const Post = sequelize.define('Post', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false, // Post must have content
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Default timestamp for when the post is created
    },
});

// Define associations
Post.belongsTo(Parent, {
    foreignKey: 'parent_id',
    onDelete: 'CASCADE', // If a parent is deleted, their posts are also deleted
});

Post.belongsTo(Circle, {
    foreignKey: 'circle_id',
    onDelete: 'CASCADE', // If a circle is deleted, the posts in that circle are also deleted
});

module.exports = Post;
