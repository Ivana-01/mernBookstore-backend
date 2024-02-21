import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

//route for new book
router.post('/', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({
        message: 'All fields required!',
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (err) {
    console.log(err);
  }
});

//route for all books from db
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json(books);
  } catch (err) {
    console.log(err);
  }
});

//route for book by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (err) {
    console.log(err);
  }
});

//route for update book
router.put('/:id', async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear
    ) {
      return res.status(400).send({
        message: 'All fields are required!',
      });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).send({ message: 'Book updated!' });
  } catch (err) {
    console.log(err);
  }
});
//route for delete book
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).send({ message: 'Book deleted' });
  } catch (err) {
    console.log(err);
  }
});

export default router;