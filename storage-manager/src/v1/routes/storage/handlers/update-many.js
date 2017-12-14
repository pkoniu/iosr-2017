const _ = require('lodash');

module.exports = (storageRepo) => {
    return (req, res, next) => {
        const toUpdate = _.get(req, 'body', {});
        var itemsToFind = []
        var amounts = {}
        for( var i = 0; i <toUpdate.length; i++ ) {
            ingredient = toUpdate[i]
            if(ingredient.name == null || ingredient.amount == null){
                continue
            }
            itemsToFind.push(ingredient.name)
            amounts[ingredient.name]=ingredient.amount
        }

        return storageRepo.findByNames(itemsToFind)
        .then(foundItems => {
            var updates = [];
            for( var i = 0; i <foundItems.length; i++ ) {
                var item = foundItems[i]
                var amountChange = amounts[item.name]
                var newAmount = item.amount + amountChange
                if(newAmount < 0)
                    return Promise.reject({status: 400, message:"There are not enough supplies in the storage."})
                updates.push({id: item._id, toUpdate: {amount: newAmount}})
            }
            return Promise.all( updates.map( update => {
                return storageRepo.updateOne(update.id, update.toUpdate);
            } ) ).then( updateResults => {
                return res.status(200).json(updateResults);
            } );
        })
        .catch(next);
    };
};
