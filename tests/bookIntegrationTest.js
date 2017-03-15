'use strict';

const should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    agent = request.agent(app);

describe('Book Crud Test:', () => {
    describe('Post', () => {
        // после добавления новой книги, нам должены вернуть её id и статус непрочитана
        it('Should allow a book to be posted and return a read and _id', (done) => {
            const bookPost = {
                title: 'New Book',
                author: 'Jon',
                genre: 'Fiction'
            };

            // имитируем запрос на добавление книги
            agent
                .post('/api/books')
                .send(bookPost)
                .expect(200)
                .end((err, results) => {
                    results.body.read.should.equal(false);
                    results.body.should.have.property('_id');
                    done();
                })
        });

        // после выполнения теста, удаляем из БД информацию о добавленной книге
        afterEach((done) => {
            Book
                .remove()
                .exec();
            done();
        })
    })
});