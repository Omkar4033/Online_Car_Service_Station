const express = require('express');
const { pool } = require('../db'); // Assuming you are using a pool for DB connection
const router = express.Router();

// Get all categories
router.get('/categories', (req, res) => {
    const query = 'SELECT Category_ID AS id, Name FROM Categories ORDER BY Category_ID';
    pool.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching categories: ", err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        res.json(results);
    });
});

// Create a new service
router.post('/', (req, res) => {
    const { name, description, price, categories } = req.body;

    if (!name || !description || !price || !categories) {
        return res.status(400).json({ message: 'Name, description, price, and categories are required' });
    }

    const query = 'INSERT INTO Services (Name, Description, Price) VALUES (?, ?, ?)';
    pool.query(query, [name, description, price], (err, result) => {
        if (err) {
            console.error("Error inserting service: ", err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }

        const serviceId = result.insertId;
        const categoryInsertQuery = 'INSERT INTO Service_Categories (Service_ID, Category_ID) VALUES ?';
        const categoryValues = categories.map(categoryId => [serviceId, categoryId]);

        pool.query(categoryInsertQuery, [categoryValues], (err) => {
            if (err) {
                console.error("Error linking categories: ", err);
                return res.status(500).json({ message: 'Error linking categories', error: err.message });
            }
            res.status(201).json({ message: 'Service created successfully', serviceId });
        });
    });
});

// Get all services (filtered by categoryId if provided)
router.get('/', (req, res) => {
    const { categoryId } = req.query;

    const query = `
    SELECT *
    FROM Services 
    ${categoryId ? `WHERE Category_ID = ${categoryId}` : ''} 
    GROUP BY Service_ID
`;


    const params = categoryId ? [categoryId] : [];

    pool.query(query, params, (err, results) => {
        if (err) {
            console.error("Error fetching services: ", err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        res.json(results);
    });
});

// Get a specific service by ID
router.get('/:id', (req, res) => {
    const query = `
        SELECT s.Service_ID AS id, s.Name, s.Description, s.Price, 
               GROUP_CONCAT(c.Name) AS categories
        FROM Services s
        LEFT JOIN Service_Categories sc ON s.Service_ID = sc.Service_ID
        LEFT JOIN Categories c ON sc.Category_ID = c.Category_ID
        WHERE s.Service_ID = ?
        GROUP BY s.Service_ID
    `;
    pool.query(query, [req.params.id], (err, results) => {
        if (err) {
            console.error("Error fetching service: ", err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(results[0]);
    });
});

// Update a service
router.put('/:id', (req, res) => {
    const { name, description, price, categories } = req.body;

    if (!name || !description || !price || !categories) {
        return res.status(400).json({ message: 'Name, description, price, and categories are required' });
    }

    const query = 'UPDATE Services SET Name = ?, Description = ?, Price = ? WHERE Service_ID = ?';
    pool.query(query, [name, description, price, req.params.id], (err, result) => {
        if (err) {
            console.error("Error updating service: ", err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Service not found' });
        }

        const deleteCategoriesQuery = 'DELETE FROM Service_Categories WHERE Service_ID = ?';
        pool.query(deleteCategoriesQuery, [req.params.id], (err) => {
            if (err) {
                console.error("Error deleting old categories: ", err);
                return res.status(500).json({ message: 'Error deleting old categories', error: err.message });
            }

            const categoryInsertQuery = 'INSERT INTO Service_Categories (Service_ID, Category_ID) VALUES ?';
            const categoryValues = categories.map(categoryId => [req.params.id, categoryId]);

            pool.query(categoryInsertQuery, [categoryValues], (err) => {
                if (err) {
                    console.error("Error linking categories: ", err);
                    return res.status(500).json({ message: 'Error linking categories', error: err.message });
                }
                res.json({ message: 'Service updated successfully' });
            });
        });
    });
});

// Delete a service
router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM Services WHERE Service_ID = ?';
    pool.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error("Error deleting service: ", err);
            return res.status(500).json({ message: 'Database error', error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json({ message: 'Service deleted successfully' });
    });
});

module.exports = router;
