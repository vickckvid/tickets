const express = require('express');
const routes = require('./routes');
const logger = require('morgan');
const mongodb = require('mongodb');
const errorhandler = require('errorhandler');
const bodyparser = require('body-parser');
const aggregation = require('aggregation/src/aggregation-es6');
const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/list-tickets', {useNewUrlParser: true, useUnifiedTopology: true});

const url = 'mongodb://localhost:27017/list-tickets';

let app = express();
app.use(logger('dev'));
app.use(bodyparser.json());

mongodb.MongoClient.connect(url,(error, client) => {
    if(error) return process.exit(1);
    var db = client.db('list-tickets');

    app.use((req, res, next) => {
        req.db = db;
        req.mongodb = mongodb;
        req.error = error;
        next();
    })

    app.get('/tickets', routes.f_tickets.getTickets);
    app.get('/tickets/:id', routes.f_tickets.getTicketId);
    app.post('/tickets', routes.f_tickets.postTicket);
    app.put('/tickets/:id', routes.f_tickets.putTicket);
    app.delete('/tickets/:id', routes.f_tickets.deleteTicket);

    app.get('/users', routes.f_users.getUsers);
    app.get('/users/:id', routes.f_users.getUserId);
    app.post('/users', routes.f_users.postUser);
    app.put('/users/:id', routes.f_users.putUser);
    app.delete('/users/:id', routes.f_users.deleteUser);

    app.use(errorhandler);
    app.listen(3000);
});

