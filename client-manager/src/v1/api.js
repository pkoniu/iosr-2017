const express = require('express');

module.exports = (mongodb) => {
    const app = express();

    const clientsRepo = require('./repositories/clients')(mongodb.collection('clients'));
    app.use('/clients', require('./routes/clients')(clientsRepo));
    
    return app;
};
