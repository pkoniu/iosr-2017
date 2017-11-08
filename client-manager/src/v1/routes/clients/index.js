const express = require('express');

module.exports = (clientsRepo) => {
    const app = express();

    app.get('/', require('./handlers/get-all')(clientsRepo));
    app.get('/:id', require('./handlers/get-by-id')(clientsRepo));
    app.post('/', require('./handlers/create-new')(clientsRepo));
    app.delete('/:id', require('./handlers/delete-by-id')(clientsRepo));
    app.patch('/:id', require('./handlers/update-by-id')(clientsRepo));

    return app;
}