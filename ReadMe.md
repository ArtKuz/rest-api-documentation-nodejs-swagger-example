RESTful Web Services with Node.js, Express and Swagger
======================================================

Пример разработки REST API на Node.js.  

Пример на основе библиотеки книг.  

**DataBase**: MongoDB  

`npm i -g gulp`  
`npm i`  
`gulp` - запуск проекта.  

Документация будет доступна по адресам:
* [http://localhost:8000/api-doc-ui2/](http://localhost:8000/api-doc-ui2/)
* [http://localhost:8000/api-doc-ui3/](http://localhost:8000/api-doc-ui3/)

API
---

* [GET http://localhost:8000/api/books](http://localhost:8000/api/books) - список книг  
* [GET http://localhost:8000/api/books?genre=фантастика](http://localhost:8000/api/books?genre=фантастика) - список книг с выборкой по жанру  
* [GET http://localhost:8000/api/books/:id](http://localhost:8000/api/books/:id) - выбор книги по id  
* [POST http://localhost:8000/api/books](http://localhost:8000/api/books) - добавить книгу.  
* [PUT http://localhost:8000/api/books/:id](http://localhost:8000/api/books/:id) - перезаписать информацию по выбранной книги по id  
* [PATCH http://localhost:8000/api/books/:id](http://localhost:8000/api/books/:id) - обновить информацию по выбранной книги по id  
* [DELETE http://localhost:8000/api/books/:id](http://localhost:8000/api/books/:id) - удалить выбранную книгу по id  

Tests (unit tests with mocha and integration tests)
---------------------------------------------------

`gulp test`  

Как развернуть БД с тестовыми данными
-------------------------------------
Через **Tertminal** заходим в корень проекта.  
```bash
mongo
load('./migrations/init.js')
quit()
```
