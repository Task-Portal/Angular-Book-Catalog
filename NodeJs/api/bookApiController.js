const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const { Book } = require("../models/book");

//1 Get all books
router.get("/", (req, res) => {
  Book.find((err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(`GetAllBooks Error: ${err}`);
    }
  });
});

//2 Get a book
router.get("/:id", (req, res) => {
  if (!ObjectId.isValid(req.param.id)) {
    return res
      .status(400)
      .send(`No information about the book with id${id} found.`);
  }

  Book.findById(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(`Get a book Error: ${err}`);
    }
  });
});

//3 Post a book
router.post("/", (req, res) => {
  const newBook = new Book({
    name: req.body.name,
    author: req.body.author,
    price: req.body.price,
  });
  newBook.save((err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(`Create a book Error: ${err}`);
    }
  });
});

//4 Update a book
router.put("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .send(`No information about the book with id:${id} found`);
  }

  const updateBook = {
    name: req.body.name,
    author: req.body.author,
    price: req.body.price,
  };

  Book.findByIdAndUpdate(
    req.params.id,
    { $set: updateBook },
    { new: true },
    (err, data) => {
      if (!err) {
        res.send(data);
      } else {
        console.log(`Update Book Error: ${err}`);
      }
    }
  );
});

//5 Delete a book
router.delete("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .send(`No information about the book with id:${id} found`);
  }

  Book.findByIdAndRemove(req.params.id, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(`Delete Book Error: ${err}`);
    }
  });
});

module.exports = router;
