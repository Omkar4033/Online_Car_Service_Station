const express = require('express');
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    port:3306,
    user: 'D4_86959_Omkar',
    password: 'manager', // Replace with your MySQL password
    database: 'online_car_service', // Replace with your database name
});
module.exports={
    pool
};