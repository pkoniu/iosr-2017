const express = require('express');

module.exports = (mongodb) => {
    const app = express();

    const storageRepo = require('./repositories/storage')(mongodb.collection('storage-items'));
    app.use('/storage/items', require('./routes/storage')(storageRepo));

    return app;
};