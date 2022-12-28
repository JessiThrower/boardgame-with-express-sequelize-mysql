const db = require("../models");
const Boardgame = db.boardgame;
const Op = db.Sequelize.Op;

//Create and save a new Boardgame
exports.create = (req, res) => {
    //Validate request
    if(!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    //Create a Boardgame
    const boardgame = {
        name: req.body.name,
        type: req.body.type,
        company: req.body.company,
        players: req.body.players,
        description: req.body.description,
        year: req.body.year
    };

    //Save boardgame in the database
    Boardgame.create(boardgame).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err-message || "Some error occurred while creating the boardgame."
        });
    });
};

// Retrieve all Boardgames from the database
exports.findAll = (req, res) => {
    Boardgame.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving boardgames."
        });
    });
};

//Find a single Boardgame with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Boardgame.findByPk(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: 'Cannot find boardgame with id=${id}.'
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving boardgame with id=" + id
        });
    });
};

//Update a Boardgame by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Boardgame.update(req.body, {
        where: {id: id}
    }).then(num => {
        if(num == 1) {
            res.send({
                message: "Boardgame was updated successfully."
            });
        } else {
            res.send({
                message: 'Cannot update boardgame with id=${id}. Maybe boardgame was not found or req.body is empty!'
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating boardgame with id=" + id
        });
    });
};

//Delete a Boardgame with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Boardgame.destroy({
        where: {id: id}
    }).then(num => {
        if(num == 1) {
            res.send({
                message: "Boardgame was deleted successfully."
            });
        } else {
            res.send({
                message: 'Cannot delete boardgame with id=${id}. Maybe boardgame was not found!'
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete boardgame with id=" + id
        });
    });
};

//Delete all boardgames from the database
exports.deleteAll = (req, res) => {
    Boardgame.destroy({ 
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ message: '${nums} Boardgames were deleted successfully!' });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error ocurred while removing all boardgames."
        });
    });
};

//Find all boardgames with type = board

exports.findAllBoards = (req, res) => {
    Boardgame.findAll({ where: { type: "board" } }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error ocurred while retrieving boardgames."
        });
    });
};