const express = require('express');

module.exports = (mongodb) => {
    const app = express();

    const ordersRepo = require('./repositories/menu')(mongodb.collection('orders'));
    app.use('/menu', require('./routes/menu')(ordersRepo));

    return app;
};