import express from 'express';
import mongoose from 'mongoose';
import  booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();
const PORT = process.env.REACT_APP_SERVER_URL || 5555;
const MONGO_URI = process.env.MONGO_URI;

//middleware for req body and cors policy
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://mernbookstore-mfvi.onrender.com/books'],
}));

app.get('/', (req, res) => {
    console.log('Hello World!');
});

mongoose
    .connect('mongodb+srv://node1user:user1234@cluster0.f2jm7ay.mongodb.net/cluster0?retryWrites=true&w=majority')
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

app.use('/books', booksRoute);
