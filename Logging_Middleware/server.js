import express from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectToMongoDB();

app.get('/', (req, res) => {
    res.status(200).send("server Started Path called");
});

app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
