import express from 'express';
import dotenv from 'dotenv';
import logToAffordmed from './controllers/log.js';
import connectToMongoDB from './models/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectToMongoDB();

app.get('/', (req, res) => {
    res.status(200).send("server Started Path called");
});


app.listen(PORT, () => {
    logToAffordmed("backend", 'info', 'server.js', `server running on port ${PORT}`);
});
