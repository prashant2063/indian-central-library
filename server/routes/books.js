var express = require('express');
var router = express.Router();

const booksController = require('../controllers/booksController');

// GET users listing
router.get("/", booksController.getBooks)

// ADD user
router.post("/",  booksController.addBook)

// Modify user
router.put("/", booksController.updateBook)

// Delete User
router.delete("/", booksController.deleteBook)

module.exports = router;
