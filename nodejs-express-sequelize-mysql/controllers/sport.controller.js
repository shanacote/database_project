const db = require("../models");
const Sport = db.sport;
const Op = db.Sequelize.Op;

// Create and Save a new sport
exports.create = (req, res) => {
    // Validate request
    if (!req.body.gender || !req.body.sport || !req.body.season) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    // Create a sport
    const sport = {
      gender: req.body.gender,
      sport: req.body.sport,
      season: req.body.season
    };

    // Save sport in the database
    Sport.create(sport)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the sport."
        });
      });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const gender = req.query.gender;
    const sport = req.query.sport;
    const season = req.query.season;
    const condition = (gender||sport||season)?{
        gender: gender?{[Op.like]: `%${gender}%`}:undefined,
        sport: sport?{[Op.like]: `%${sport}%`}:undefined,
        season: season?{[Op.like]: `%${season}%`}:undefined
    }:null;

    Sport.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

// Find a single sport with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Sport.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find sport with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving sport with id=" + id
        });
      });
};

// Update a sport by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Sport.update(req.body, {
      where: { sport_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "sport was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update sport with id=${id}. Maybe sport was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating sport with id=" + id
        });
      });
};

// Delete a sport with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Sport.destroy({
      where: { sport_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "sport was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete sport with id=${id}. Maybe sport was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete sport with id=" + id
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Sport.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Sport.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};