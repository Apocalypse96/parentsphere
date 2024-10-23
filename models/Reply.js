const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Parent = require('./Parent'); // Import the Parent model for associations
const Post = require('./Post');     // Import the Post model for associations

// Define the Reply model
const Reply = sequelize.define('Reply', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false, // Reply must have content
    },
    parent_reply_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Optional, used for threading (replying to another reply)
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Default timestamp for when the reply is created
    },
});

// Define associations
Reply.belongsTo(Parent, {
    foreignKey: 'parent_id',
    onDelete: 'CASCADE', // If a parent is deleted, their replies are also deleted
});

Reply.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE', // If a post is deleted, all replies are deleted
});

// Association to handle threading of replies
Reply.belongsTo(Reply, {
    as: 'ParentReply', // This alias allows replies to link to another reply
    foreignKey: 'parent_reply_id',
    onDelete: 'CASCADE', // If a parent reply is deleted, its child replies are deleted
});

module.exports = Reply;
