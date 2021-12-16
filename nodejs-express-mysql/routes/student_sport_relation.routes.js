module.exports = app => {
    const student_sport_relation = require("../controllers/student_sport_relation.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", student_sport_relation.create);

    // Retrieve all student_sport_relation
    router.get("/", student_sport_relation.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", student_sport_relation.findOne);

    // Update a Tutorial with id
//    router.put("/:id", student_sport_relation.update);

    // Delete a Tutorial with id
    router.delete("/", student_sport_relation.delete);

    // Delete all student_sport_relation
//    router.delete("/", student_sport_relation.deleteAll);

    app.use('/api/student_sport_relation', router);
};