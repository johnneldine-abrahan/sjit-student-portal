const express = require('express');
const path = require('path');
const {Pool} = require('pg');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'SJIT_db',
    password: 'admin',
    port: 5432,
});

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Query to find the user by username
        const result = await pool.query('SELECT * FROM accountstbl WHERE user_id = $1', [username]);
        const user = result.rows[0];

        // Check if the user exists
        if (!user) {
            return res.status(401).send('Invalid username or password!');
        }

        // Check if the password matches (plain text comparison)
        if (user.password === password) {
            return res.send('Login successful!');
        } else {
            return res.status(401).send('Invalid username or password!');
        }
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).send('Error while querying the database.');
    }
});




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});