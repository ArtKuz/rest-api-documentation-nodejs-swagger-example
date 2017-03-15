'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// определяем структуру таблицы БД с книгами
const bookModel = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    genre: {
         type: String
    },
    read: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Book', bookModel);