const db = require("../models");
const Major = db.major;
const Op = db.Sequelize.Op;

// Create and Save a new major
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    // Create a major
    const major = {
        name: req.body.name
    };

    // Save major in the database
    Major.create(major)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the major."
        });
      });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    const condition = (name)?{
        name: name?{[Op.like]: `%${name}%`}:undefined
    }:null;

    Major.findAll({ where: condition })
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

// Find a single major with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Major.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find major with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving major with id=" + id
        });
      });
};

// Update a major by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Major.update(req.body, {
      where: { major_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "major was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update major with id=${id}. Maybe major was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating major with id=" + id
        });
      });
};

// Delete a major with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Major.destroy({
      where: { major_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "major was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete major with id=${id}. Maybe major was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete major with id=" + id
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Major.destroy({
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
    Major.findAll({ where: { published: true } })
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