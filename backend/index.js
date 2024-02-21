import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import  booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//middleware for req body and cors policy
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5555", "https://mernbookstore.onrender.app"]
}));

//server production assets
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join('frontend/build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });}

mongoose
    .connect(mongoDBURL)
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
