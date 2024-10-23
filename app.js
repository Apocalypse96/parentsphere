const express = require('express');
const sequelize = require('./config/db'); // Database connection
const parentRoutes = require('./routes/parentRoutes');
const postRoutes = require('./routes/postRoutes');
const circleRoutes = require('./routes/circleRoutes');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use('/api/parents', parentRoutes);   // Routes related to parent registration and management
app.use('/api/posts', postRoutes);       // Routes related to posts, replies, and votes
app.use('/api/circles', circleRoutes);   // Routes related to social circles

// Root route for health check or home page
app.get('/', (req, res) => {
    res.send('Welcome to the Social Network for Parents API');
});

// Sync database and start server
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }) // Use force: true to drop and recreate tables (for development)
    .then(() => {
        console.log('Database synced successfully');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Unable to sync the database:', error);
    });
