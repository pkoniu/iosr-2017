module.exports = (storageRepo) => {
    return (req, res, next) => {
        return storageRepo.getAll()
            .then(storageItems => {
                return res.status(200).json(storageItems);
            }).catch(next);
    };
};
