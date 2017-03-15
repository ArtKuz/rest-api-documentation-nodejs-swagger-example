'use strict';

const bookController = function(Book) {
    return {
        // добавление новой книги
        post(req, res) {
            let book = new Book(req.body);

            // title - обяязательный параметр
            if (!req.body.title) {
                res.status(400);
                res.send('Title is required');
            } else {
                book.save();
                res.status(201);
                res.send(book);
            }
        },
        // список книг
        get(req, res) {
            let query = {};

            // список книг по определенному жанру
            if (req.query.genre) {
                query.genre = req.query.genre;
            }

            Book.find(query, (err, books) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(books);
                }
            })
        }
    }
};

module.exports = bookController;