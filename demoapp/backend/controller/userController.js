const bcrypt = require("bcrypt");

async function registerUser(req, res, dbConnectionPromise) {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Validate request body
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields: first_name, last_name, email, and password' });
        }

        // Hash the password
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            console.log("Received request:", { first_name, last_name, email });

            try {
                // Example database query to insert the user data
                const connection = await dbConnectionPromise.getConnection();
                const sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
                const [result] = await connection.execute(sql, [first_name, last_name, email, hashedPassword]);

                connection.release();

                res.status(201).json({ message: 'User registered successfully', result });
            } catch (error) {
                console.error('Error registering user:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function loginUser(req, res, dbConnectionPromise) {
    try {
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            return res.status(400).json({ message: 'Missing required fields: email and password' });
        }

        // Fetch the user from the database
        dbConnectionPromise.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting database connection:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            const sql = 'SELECT * FROM users WHERE email = ?';
            connection.execute(sql, [email], async (err, rows) => {
                connection.release();

                if (err) {
                    console.error('Error executing SQL query:', err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }

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
            });
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { registerUser, loginUser };
