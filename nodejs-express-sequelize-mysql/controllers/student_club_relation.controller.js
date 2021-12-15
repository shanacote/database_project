const db = require("../models");
const Student_club_relation = db.student_club_relation;
const Op = db.Sequelize.Op;

// Create and Save a new student_club_relation
exports.create = (req, res) => {
    // Validate request
    if (!req.body.student_id || !req.body.club_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    // Create a student_club_relation
    const student_club_relation = {
      student_id: req.body.student_id,
      club_id: req.body.club_id
    };

    // Save student_club_relation in the database
    Student_club_relation.create(student_club_relation)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the student_club_relation."
        });
      });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const student_id = req.query.student_id;
    const club_id = req.query.club_id;
    const condition = (student_id||club_id)?{
        student_id: student_id?{[Op.like]: `%${student_id}%`}:undefined,
        club_id: club_id?{[Op.like]: `%${club_id}%`}:undefined
    }:null;

    Student_club_relation.findAll({ where: condition })
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

// Find a single student_club_relation with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Student_club_relation.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find student_club_relation with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving student_club_relation with id=" + id
        });
      });
};

// Update a student_club_relation by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Student_club_relation.update(req.body, {
      where: { student_club_relation_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "student_club_relation was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update student_club_relation with id=${id}. Maybe student_club_relation was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating student_club_relation with id=" + id
        });
      });
};

// Delete a student_club_relation with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Student_club_relation.destroy({
      where: { student_club_relation_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "student_club_relation was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete student_club_relation with id=${id}. Maybe student_club_relation was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete student_club_relation with id=" + id
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Student_club_relation.destroy({
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
    Student_club_relation.findAll({ where: { published: true } })
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