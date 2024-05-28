require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = 5555;

const { dbConnectionPool, dbConnectionPromise } = require('./db/dbconfig');

// Middleware
app.use(express.json());
app.use(cors());

// user route file
const userRouter = require('./routes/userRoute');

app.use("/api", userRouter);

// Start the server
async function startServer() {
    try {
        // Test the database connection
        await dbConnectionPromise.getConnection();
        console.log('Database connected successfully');

        // Start the server
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();
