const MongoClient = require('mongodb').MongoClient;

const seedData = require('./storage-items.json');

const {
    MONGO_HOST = 'localhost',
    MONGO_PORT = '27017',
    DB_NAME = 'iosr2017-storage'
} = process.env;

const mongoUrl = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${DB_NAME}`;

const insertItems = db => {
    console.log(`Connected to ${DB_NAME}.`);
    console.log(`Inserting ${seedData.length} storage items.`);
    return db.collection('storage-items').insertMany(seedData);
};

const actAfterInsert = result => {
    console.log(`Inserted ${result.insertedCount} storage items.`);
    return process.exit(0);
};

const actOnError = error => {
    console.log(`Couldn't finish seeding: ${error}`);
    return process.exit(1);
};

return MongoClient.connect(mongoUrl)
    .then(insertItems)
    .then(actAfterInsert)
    .catch(actOnError);
