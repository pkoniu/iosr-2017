const express = require('express');

module.exports = (mongodb) => {
    const app = express();
    
    app.get('/', (req, res, next) => {
        return mongodb.collection('users').find().toArray()
            .then(usersDocs => {
                return res.status(200).json(usersDocs);
            }).catch(next);
    });
    
    app.post('/', (req, res, next) => {
        const newUser = req.body;
        return mongodb.collection('users').insertOne(newUser)
            .then(result => {
                return res.status(201).json(result);
            }).catch(next);
    });
    
    return app;
};
