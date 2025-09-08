import express from 'express';
import dotenv from 'dotenv';
import logToAffordmed from './controllers/log.js';
import { connectToMongoDB } from './config/Mongodb.js';
import router from './routes/shorturl.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectToMongoDB();


app.use(express.json());
app.use('/', router);

app.get('/', (req, res) => {
    res.status(200).send("server Started Path called");
});


app.listen(PORT, () => {
    logToAffordmed("backend", 'info', 'domain', `server running on port ${PORT}`);
});
