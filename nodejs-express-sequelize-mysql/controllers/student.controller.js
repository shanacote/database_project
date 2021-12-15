const db = require("../models");
const Student = db.student;
const Op = db.Sequelize.Op;

// Create and Save a new student
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.major_id || !req.body.password) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    // Create a student
    const student = {
      name: req.body.name,
      major_id: req.body.major_id,
      password: req.body.password
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
    const name = req.query.name;
    const major_id = req.query.major_id;
    const password = req.query.password;
    const condition = (name||major_id||password)?{
        name: name?{[Op.like]: `%${name}%`}:undefined,
        major_id: major_id?{[Op.like]: `%${major_id}%`}:undefined,
        password: password?{[Op.like]: `%${password}%`}:undefined
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
    const id = req.params.id;

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
    const id = req.params.id;

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
    const id = req.params.id;

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