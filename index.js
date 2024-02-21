import express from 'express';
import { PORT, MONGO_URI } from './config.js';
import mongoose from 'mongoose';
import  booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//middleware for req body and cors policy
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5555", "https://mernbookstore-api.onrender.app"]
}));

mongoose
    .connect(MONGO_URI)
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
