const Sport = require("../models/sport.model.js");
const TABLE_NAME='Sport';


// Create and Save a new student
exports.create = (req, res) => {
    // Validate request
    if (!req.body.gender || !req.body.sport || !req.body.season) {
        res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Create a Tutorial
    const data = new Sport(req.body);

    // Save Tutorial in the database
    Sport.create(data, (err, data) => {
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
    const gender = req.query.gender;
    const sport = req.query.sport;
    const season = req.query.season;

    Sport.findAll(gender, sport, season, (err, data) => {
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
    const id = req.params.id;
    Sport.findById(id, (err, data) => {
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

// Update a student by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    console.log(req.body);

    Sport.updateById(
      req.params.id,
      new Sport(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found ${TABLE_NAME} with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: `Error updating ${TABLE_NAME} with id ${req.params.id}`
            });
          }
        } else res.send(data);
      }
    );
};

// Delete a student with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Sport.remove(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ${TABLE_NAME} with id ${id}.`
          });
        } else {
          res.status(500).send({
            message: `Could not delete ${TABLE_NAME} with id ${id}`
          });
        }
      } else res.send({ message: `${TABLE_NAME} was deleted successfully!` });
    });
};
