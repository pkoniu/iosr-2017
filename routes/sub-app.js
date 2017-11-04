const express = require('express');

module.exports = (printer) => {
    const app = express();
    
    app.get('/test', (req, res, next) => {
        printer.print();
        res.status(200).send('test XD')
    });
    
    return app;
};
