const _ = require('lodash');

const queriesBuilder = require('./queries-builder')();

module.exports = (collection) => {
    return {
        getAll() {
            return collection.find().toArray();
        },
        getById(id) {
            const filter = queriesBuilder.getByIdQuery(id);
            return collection.find(filter).toArray();
        },
        createNew(details) {
            return collection.insertOne(details)
                .then(insertResponse => {
                    const createdClient = _.get(insertResponse, 'ops.0', {});
                    return {
                        createdClient
                    };
                });
        },
        deleteOne(id) {
            const filter = queriesBuilder.getByIdQuery(id);
            return collection.findOneAndDelete(filter)
                .then(deleteResponse => {
                    const deletedClient = _.get(deleteResponse, 'value', {});
                    return {
                        deletedClient
                    };
                });
        },
        updateOne(id, toUpdate) {
            const filter = queriesBuilder.getByIdQuery(id);
            const update = {$set:toUpdate};
            const options = {returnOriginal: false};
            debugger;
            return collection.findOneAndUpdate(filter, update, options)
                .then(updateResponse => {
                    const updatedClient = _.get(updateResponse, 'value', {});
                    return {
                        updatedClient
                    };
                });
        }
    };
};