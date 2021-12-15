const db = require("../models");
const Course = db.course;
const Op = db.Sequelize.Op;

// Create and Save a new course
exports.create = (req, res) => {
    // Validate request
    if (!req.body.school_code || !req.body.major_id || !req.body.course_code || !req.body.name) {
        res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    // Create a course
    const course = {
        school_code: req.body.school_code,
        major_id: req.body.major_id,
        course_code: req.body.course_code,
        name: req.body.name
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
    const school_code= req.query.school_code;
    const major_id=req.query.major_id;
    const course_code= req.query.course_code;
    const name= req.query.name;
    const condition = (school_code||major_id||course_code||name)?{
        school_code: school_code?{[Op.like]: `%${school_code}%`}:undefined,
        major_id: major_id?{[Op.like]: `%${major_id}%`}:undefined,
        course_code: course_code?{[Op.like]: `%${course_code}%`}:undefined,
        name: name?{[Op.like]: `%${name}%`}:undefined
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