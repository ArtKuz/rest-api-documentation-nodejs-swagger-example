'use strict';

const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    swaggerJSDoc = require('swagger-jsdoc'); // для POST запросов

const app = express(),
    port = process.env.PORT || 3000,
    Book = require('./models/bookModel'), // определяем модель данных
    bookRouter = require('./routes/bookRoutes')(Book); // модель данных передаём в роутер

let db;

if (process.env.ENV == 'Test') {
    db = mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
    db = mongoose.connect('mongodb://localhost/bookAPI')
}

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/api/books', bookRouter);

app.get('/', (req, res) => {
    res.send('welcome to my API!');
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log('Running on PORT: ' + port);
});

const swaggerDefinition = {
    info: {
        title: 'Library API',
        version: '1.0.0',
        description: 'API для библиотеки',
    },
    host: `localhost:${port}`,
    basePath: '/'
};

const options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./routes/*.js', './models/*.yaml']
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

module.exports = app;