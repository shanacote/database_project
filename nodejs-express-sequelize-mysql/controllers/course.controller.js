const db = require("../models");
const Course = db.course;
const Op = db.Sequelize.Op;

// Create and Save a new course
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    // Create a course
    const course = {
      gender: req.body.gender,
      course: req.body.course,
      season: req.body.season
    };

    // Save course in the database
    Course.create(course)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the course."
        });
      });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const gender = req.query.gender;
    const course = req.query.course;
    const season = req.query.season;
    const condition = (gender||course||season)?{
        gender: gender?{[Op.like]: `%${gender}%`}:undefined,
        course: course?{[Op.like]: `%${course}%`}:undefined,
        season: season?{[Op.like]: `%${season}%`}:undefined
    }:null;

    Course.findAll({ where: condition })
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

// Find a single course with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Course.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find course with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving course with id=" + id
        });
      });
};

// Update a course by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Course.update(req.body, {
      where: { course_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "course was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update course with id=${id}. Maybe course was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating course with id=" + id
        });
      });
};

// Delete a course with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Course.destroy({
      where: { course_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "course was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete course with id=${id}. Maybe course was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete course with id=" + id
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Course.destroy({
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
    Course.findAll({ where: { published: true } })
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