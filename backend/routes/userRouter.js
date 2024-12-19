const express = require('express');
const { pool } = require('../db');
const bcrypt = require('bcrypt');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, phone, address, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Name, email, password, and role are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO Users (Name, Email, Phone, Address, Password, Role) VALUES (?, ?, ?, ?, ?, ?)';
        pool.query(query, [name, email, phone || null, address || null, hashedPassword, role], (err, result) => {
            if (err) {
                console.error("Error inserting user: ", err);
                return res.status(500).json({ message: 'Database error', error: err.message });
            }
            res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
        });
    } catch (error) {
        console.error("Error hashing password: ", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login user
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const query = 'SELECT User_ID, Name, Email, Password, Role FROM Users WHERE Email = ?';
    pool.query(query, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.Password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.json({ message: 'Login successful', user: { id: user.User_ID, name: user.Name, email: user.Email, role: user.Role } });
    });
});

// Get all users
router.get('/', (req, res) => {
    const query = 'SELECT User_ID AS id, Name, Email, Phone, Address, Role FROM Users';
    pool.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        res.json(results);
    });
});

// Get a specific user by ID
router.get('/:id', (req, res) => {
    const query = 'SELECT User_ID AS id, Name, Email, Phone, Address, Role FROM Users WHERE User_ID = ?';
    pool.query(query, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(results[0]);
    });
});

// Update user details
router.put('/:id', async (req, res) => {
    const { name, email, phone, address, password, role } = req.body;

    if (!name || !email || !role) {
        return res.status(400).json({ message: 'Name, email, and role are required' });
    }

    try {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const query = 'UPDATE Users SET Name = ?, Email = ?, Phone = ?, Address = ?, Password = ?, Role = ? WHERE User_ID = ?';
        pool.query(query, [name, email, phone || null, address || null, hashedPassword, role, req.params.id], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User details updated successfully' });
        });
    } catch (error) {
        console.error("Error hashing password: ", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete a user
router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM Users WHERE User_ID = ?';
    pool.query(query, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    });
});

module.exports = router;
