const StudentSportRelation = require("../models/student_sport_relation.model.js");
const TABLE_NAME='Student_sport_relation';

// Create and Save a new student
exports.create = (req, res) => {
    // Validate request
    if (!req.body.student_id || !req.body.sport_id) {
        res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Create a Tutorial
    const data = new StudentSportRelation(req.body);

    // Save Tutorial in the database
    StudentSportRelation.create(data, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || `Some error occurred while creating the ${TABLE_NAME}.`
        });
      else res.send(data);
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const student_id = req.query.student_id;
    const sport_id = req.query.sport_id;

    StudentSportRelation.findAll(student_id, sport_id, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || `Some error occurred while retrieving ${TABLE_NAME}.`
          });
        else res.send(data);
      });
};

// Find a single student with an id
exports.findOne = (req, res) => {
    const id = req.params.student_id;
    StudentSportRelation.findById(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ${TABLE_NAME} with id ${id}.`
          });
        } else {
          res.status(500).send({
            message: `Error retrieving ${TABLE_NAME} with id ${id}"`
          });
        }
      } else res.send(data);
    });
};


// Delete a student with the specified id in the request
exports.delete = (req, res) => {
    StudentSportRelation.remove(req.query.student_id, req.query.sport_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ${TABLE_NAME} with id ${req.query.student_id} and id ${req.query.sport_id}.`
          });
        } else {
          res.status(500).send({
            message: `Could not delete ${TABLE_NAME} with id ${req.query.student_id} and id ${req.query.sport_id}`
          });
        }
      } else res.send({ message: `${TABLE_NAME} was deleted successfully!` });
    });
};
