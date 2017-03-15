'use strict';

const should = require('should'),
    sinon = require('sinon');

describe('Book Controller Tests:', () => {
    describe('Post', () => {
        // Нельзя добавить книгу без названия
        it('Should not allow an empty title on post', () => {
            // имитируем модель книги
            const Book = function(book) {
                    this.save = function (){}
                },
                // запрос на добавление книги
                req = {
                    body: {
                        author: 'Jon'
                    }
                },
                // имитируем ответ сервера
                res = {
                    status: sinon.spy(),
                    send: sinon.spy()
                },
                bookController = require('../controllers/bookController')(Book);

            bookController.post(req, res);

            res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`); // должен вернуться 400 стаутс
            res.send.calledWith('Title is required').should.equal(true); // должно быть сообщение об ошибке
        })
    })
});