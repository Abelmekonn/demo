const bcrypt = require("bcrypt");
const { dbConnectionPromise } = require('../db/dbconfig');

async function registerUser(req, res) {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Validate request body
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields: first_name, last_name, email, and password' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Received request:", { first_name, last_name, email });

        // Example database query to insert the user data
        const connection = await dbConnectionPromise;
        const sql = 'INSERT INTO employee_test (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
        const [result] = await connection.execute(sql, [first_name, last_name, email, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully', result });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing required fields: email and password' });
        }

        // Fetch the user from the database
        const connection = await dbConnectionPromise;
        const [rows] = await connection.execute('SELECT * FROM employee_test WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = rows[0];

        // Compare the password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { registerUser, loginUser };
