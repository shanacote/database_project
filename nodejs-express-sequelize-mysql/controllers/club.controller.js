const db = require("../models");
const Club = db.club;
const Op = db.Sequelize.Op;

// Create and Save a new club
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name||!req.body.type) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    // Create a club
    const club = {
        name: req.body.name,
        type: req.body.type
    };

    // Save club in the database
    Club.create(club)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the club."
        });
      });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    const type = req.query.type;
    const condition = (name||type)?{
        name: name?{[Op.like]: `%${name}%`}:undefined,
        type: type?{[Op.like]: `%${type}%`}:undefined
    }:null;

    Club.findAll({ where: condition })
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

// Find a single club with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Club.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find club with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving club with id=" + id
        });
      });
};

// Update a club by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Club.update(req.body, {
      where: { club_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "club was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update club with id=${id}. Maybe club was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating club with id=" + id
        });
      });
};

// Delete a club with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Club.destroy({
      where: { club_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "club was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete club with id=${id}. Maybe club was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete club with id=" + id
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Club.destroy({
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
    Club.findAll({ where: { published: true } })
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