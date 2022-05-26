const bookModel = require('../models/bookModel');
const mongoose = require('mongoose');

exports.getBooks = async (req, res) => {
    try {
        const pagination = JSON.parse(req.query.pagination)
        const searchCondition = JSON.parse(req.query.searchCondition)
        const matchingCondition = {
            'title': {
                '$regex': new RegExp(searchCondition.title, 'i')
            },
            'author': {
                '$regex': new RegExp(searchCondition.author, 'i')
            },
            'isbn': {
                '$regex': new RegExp(searchCondition.isbn, 'i')
            },
            'genres': {
                '$regex': new RegExp(searchCondition.genres, 'i')
            },
            'publisher': {
                '$regex': new RegExp(searchCondition.publisher, 'i')
            },
            'isAvailable': searchCondition.isAvailable || {
                '$in': [true, false]
            }
        }
        let data = {}
        const content = await bookModel.aggregate([
            {
                '$match': matchingCondition
            }, {
                '$skip': (pagination.page - 1) * pagination.pageSize
            }, {
                '$limit': pagination.pageSize
            }
        ]);
        const collectionSize = await bookModel.aggregate([
            {
                '$match': matchingCondition
            }, {
                '$count': 'collectionSize'
            }
        ])
        data = {
            content,
            collectionSize: collectionSize[0].collectionSize
        }
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const _id = req.query._id;
        console.log(_id)
        const data = await bookModel.deleteOne({ _id: mongoose.Types.ObjectId(_id) })
        console.log(data)
        res.send(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addBook = async (req, res) => {
    try {
        book = req.body;
        const data = await bookModel.create(book)
        res.status(200).json({ message: data });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateBook = async (req, res) => {
    try {
        let book = req.body;
        console.log(book)
        const _id = book._id
        delete book._id
        const data = await bookModel.updateOne({ _id: mongoose.Types.ObjectId(_id) }, book)
        console.log(data)
        res.status(200).json({ message: data });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}