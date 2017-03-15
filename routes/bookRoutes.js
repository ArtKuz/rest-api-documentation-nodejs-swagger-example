'use strict';

const express = require('express');

const routes = function(Book) {
    const bookRouter = express.Router(),
        bookController = require('../controllers/bookController')(Book);

    bookRouter
        .route('/')
        /**
         * @swagger
         * /api/books:
         *   post:
         *     tags:
         *       - Books
         *     description: Добавить новую книгу
         *     produces:
         *       - application/json
         *     parameters:
         *       - $ref: '#/definitions/Book/properties/title'
         *       - $ref: '#/definitions/Book/properties/author'
         *       - $ref: '#/definitions/Book/properties/genre'
         *       - $ref: '#/definitions/Book/properties/read'
         *     responses:
         *       201:
         *         description: Created
         *       400:
         *         description: Bad Request
         *       500:
         *         description: Internal Server Error
         */
        .post(bookController.post)
        /**
         * @swagger
         * /api/books:
         *   get:
         *     tags:
         *       - Books
         *     description: Получить список книг
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: genre
         *         description: Жанр
         *         in: query
         *         type: string
         *         enum: ['ужасы', 'детектив', 'обучение', 'детский', 'фантастика', 'фэнтези']
         *     responses:
         *       200:
         *         description: Ok
         *       500:
         *         description: Internal Server Error
         */
        .get(bookController.get);

    // обощаем обработку запроса книги по id
    bookRouter.use('/:bookId', (req, res, next) => {
        Book.findById(req.params.bookId, (err, book) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (book) {
                    // возвращаем полученную книгу и пробрасываем её дальше
                    req.book = book;
                    next();
                } else {
                    res.status(404).send('no book found');
                }
            }
        });
    });

    bookRouter
        .route('/:bookId')
        // выборка книги по id
        /**
         * @swagger
         * /api/books/{bookId}:
         *   get:
         *     tags:
         *       - Books
         *     description: Получить информацию о книге по id
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: bookId
         *         description: id книги
         *         in: path
         *         required: true
         *         type: string
         *     responses:
         *       200:
         *         description: Ok
         *       500:
         *         description: Internal Server Error
         */
        .get((req, res) => res.json(req.book))
        // перезаписать информацию по выбранной книги по id
        /**
         * @swagger
         * /api/books/{bookId}:
         *   put:
         *     tags:
         *       - Books
         *     description: Обновить информацию о книге
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: bookId
         *         description: id книги
         *         in: path
         *         required: true
         *         type: string
         *       - $ref: '#/definitions/Book/properties/title'
         *       - $ref: '#/definitions/Book/properties/author'
         *       - $ref: '#/definitions/Book/properties/genre'
         *       - $ref: '#/definitions/Book/properties/read'
         *     responses:
         *       200:
         *         description: Ok
         *       500:
         *         description: Internal Server Error
         */
        .put((req, res) => {
            // должны быть перезаписаны все параметры
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;

            req.book.save((err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            });
        })
        // обновить информацию по выбранной книги по id
        /**
         * @swagger
         * /api/books/{bookId}:
         *   patch:
         *     tags:
         *       - Books
         *     description: Изменить информацию о книге
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: bookId
         *         description: id книги
         *         in: path
         *         required: true
         *         type: string
         *       - name: title
         *         description: Название книги
         *         in: formData
         *         type: string
         *       - $ref: '#/definitions/Book/properties/author'
         *       - $ref: '#/definitions/Book/properties/genre'
         *       - $ref: '#/definitions/Book/properties/read'
         *     responses:
         *       200:
         *         description: Ok
         *       500:
         *         description: Internal Server Error
         */
        .patch ((req, res) => {
            if (req.body._id)
                delete req.body._id;

            for (let p in req.body) {
                req.book[p] = req.body[p];
            }

            req.book.save((err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            });
        })
        // удалить выбранную книгу по id
        /**
         * @swagger
         * /api/books/{bookId}:
         *   delete:
         *     tags:
         *       - Books
         *     description: Удалить книгу
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: bookId
         *         description: id книги
         *         in: path
         *         required: true
         *         type: string
         *     responses:
         *       204:
         *         description: No Content
         *       542:
         *         description: ICS Error
         */
        .delete((req, res) => req.book.remove((err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('Removed');
            }
        }));

    bookRouter
        .route('/authors')
        /**
         * @swagger
         * /api/books/authors:
         *   get:
         *     deprecated: true
         *     tags:
         *       - Books
         *     description: Получить список книг по авторам
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Ok
         *       500:
         *         description: Internal Server Error
         */
        .get((req, res) => {
            Book.find((err, books) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(books);
                }
            })
        });

    return bookRouter;
};

module.exports = routes;