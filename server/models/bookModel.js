const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {type: String, required : true},
    author: {type: String, required : true},
    isbn: {type: String, required : true},
    isAvailable: {type: Boolean, required: true},
    genres: {type: String, required : true},
    pages: {type: String, required : true},
    publisher: {type: String, required : true},
    publishDate: {type: String, required : true},
    coverImg: {type: String, required : true},
})

module.exports = mongoose.model('books', bookSchema)