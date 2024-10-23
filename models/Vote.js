const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Parent = require('./Parent'); // Import the Parent model for associations
const Post = require('./Post');     // Import the Post model for associations
const Reply = require('./Reply');   // Import the Reply model for associations

// Define the Vote model
const Vote = sequelize.define('Vote', {
    vote_type: {
        type: DataTypes.ENUM('upvote', 'downvote'),
        allowNull: false, // Vote must be either upvote or downvote
    },
});

// Define associations
Vote.belongsTo(Parent, {
    foreignKey: 'parent_id',
    onDelete: 'CASCADE', // If a parent is deleted, their votes are also deleted
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id',
    allowNull: true, // Can be null if the vote is for a reply
    onDelete: 'CASCADE', // If the post is deleted, the votes for that post are deleted
});

Vote.belongsTo(Reply, {
    foreignKey: 'reply_id',
    allowNull: true, // Can be null if the vote is for a post
    onDelete: 'CASCADE', // If the reply is deleted, the votes for that reply are deleted
});

module.exports = Vote;
