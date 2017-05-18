'use strict';

const db1 = db.getSiblingDB('libraryAPI_test'),
    db2 = db.getSiblingDB('libraryAPI');

db1.dropDatabase();
db2.dropDatabase();

const books = [
    {
        title: 'Автостопом по Галактике',
        author: 'Адамс Дуглас',
        genre: 'фантастика',
        read: true,
    },
    {
        title: 'Стивен Кинг',
        author: 'Оно',
        genre: 'ужасы',
        read: false,
    },
    {
        title: 'Властелин колец',
        author: 'Толкин Джон Рональд Руэл',
        genre: 'фэнтези',
        read: true,
    }
];

db1.books.insert(books);
db2.books.insert(books);