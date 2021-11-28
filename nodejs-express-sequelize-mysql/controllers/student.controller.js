const db = require("../models");
const Student = db.student;
const Op = db.Sequelize.Op;

// Create and Save a new student
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    // Create a student
    const student = {
      gender: req.body.gender,
      student: req.body.student,
      season: req.body.season
    };

    // Save student in the database
    Student.create(student)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the student."
        });
      });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const gender = req.query.gender;
    const student = req.query.student;
    const season = req.query.season;
    const condition = (gender||student||season)?{
        gender: gender?{[Op.like]: `%${gender}%`}:undefined,
        student: student?{[Op.like]: `%${student}%`}:undefined,
        season: season?{[Op.like]: `%${season}%`}:undefined
    }:null;

    Student.findAll({ where: condition })
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

// Find a single student with an id
exports.findOne = (req, res) => {
    const id = req.params.student_id;

    Student.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find student with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving student with id=" + id
        });
      });
};

// Update a student by the id in the request
exports.update = (req, res) => {
    const id = req.params.student_id;

    Student.update(req.body, {
      where: { student_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "student was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update student with id=${id}. Maybe student was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating student with id=" + id
        });
      });
};

// Delete a student with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.student_id;

    Student.destroy({
      where: { student_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "student was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete student with id=${id}. Maybe student was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete student with id=" + id
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Student.destroy({
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
    Student.findAll({ where: { published: true } })
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