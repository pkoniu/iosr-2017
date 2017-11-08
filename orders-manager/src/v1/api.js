const express = require('express');

module.exports = (mongodb) => {
    const app = express();

    app.use('/orders', require('./routes/orders')(mongodb.collections('orders')));

    return app;
};