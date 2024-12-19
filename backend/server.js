const express = require('express');
const { pool } = require('./db'); // Ensure this is the correct path to your db.js file
const cors = require('cors'); // Ensure cors is properly imported
const userRouter = require('./routes/userRouter'); // Adjust the path as necessary
const serviceRouter =require('./routes/serviceRouter');


const app = express();

// Use middleware
app.use(cors()); // FIX: Properly call the `cors` function
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/services', serviceRouter);

// Home route
app.get('/', (req, res) => {
    res.send("Project's home page");
});

// Health-check route
app.get('/api/health', async (req, res) => {
    try {
        await pool.query('SELECT 1'); // Simple query to verify DB connection
        res.status(200).json({ status: 'OK', message: 'Database connected' });
    } catch (error) {
        res.status(500).json({ status: 'ERROR', message: 'Database not connected', error: error.message });
    }
});

// Check database connection on server start
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        process.exit(1); // Exit the application if the database connection fails
    } else {
        console.log('Database connected successfully');
        connection.release(); // FIX: Release the connection after use
    }
});

// Start the server
const PORT = process.env.PORT || 5000; // Use environment variable for the port if available
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
