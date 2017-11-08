module.exports = (clientsRepo) => {
    return (req, res, next) => {
        return clientsRepo.getAll()
            .then(clients => {
                return res.status(200).json(clients);
            }).catch(next);
    };
};
