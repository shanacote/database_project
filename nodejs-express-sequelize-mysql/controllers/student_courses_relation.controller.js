const db = require("../models");
const Student_courses_relation = db.student_courses_relation;
const Op = db.Sequelize.Op;

// Create and Save a new student_courses_relation
exports.create = (req, res) => {
    // Validate request
    if (!req.body.student_id || !req.body.course_id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a student_courses_relation
    const student_courses_relation = {
        student_id: req.body.student_id,
        course_id: req.body.course_id
    };

    // Save student_courses_relation in the database
    Student_courses_relation.create(student_courses_relation)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the student_courses_relation."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const student_id = req.query.student_id;
    const course_id = req.query.course_id;
    const condition = (student_id||course_id)?{
        student_id: student_id?{[Op.like]: `%${student_id}%`}:undefined,
        course_id: course_id?{[Op.like]: `%${course_id}%`}:undefined
    }:null;

    Student_courses_relation.findAll({ where: condition })
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

// Find a single student_courses_relation with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Student_courses_relation.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find student_courses_relation with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving student_courses_relation with id=" + id
        });
      });
};

// Update a student_courses_relation by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Student_courses_relation.update(req.body, {
      where: { student_courses_relation_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "student_courses_relation was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update student_courses_relation with id=${id}. Maybe student_courses_relation was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating student_courses_relation with id=" + id
        });
      });
};

// Delete a student_courses_relation with the specified id in the request
exports.delete = (req, res) => {
    const student_id = req.params.student_id;
    const course_id = req.params.course_id;

    Student_courses_relation.destroy({
      where: { student_id: student_id, course_id: course_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "student_courses_relation was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete student_courses_relation with student_id=${student_id} course_id=${course_id}. Maybe student_courses_relation was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Could not delete student_courses_relation with student_id=${student_id} course_id=${course_id}`
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Student_courses_relation.destroy({
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
    Student_courses_relation.findAll({ where: { published: true } })
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