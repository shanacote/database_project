module.exports = app => {
    const student_club_relation = require("../controllers/student_club_relation.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
//    router.post("/", student_club_relation.create);

    // Retrieve all student_club_relation
    router.get("/", student_club_relation.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", student_club_relation.findOne);

    // Update a Tutorial with id
//    router.put("/:id", student_club_relation.update);

    // Delete a Tutorial with id
//    router.delete("/:id", student_club_relation.delete);

    // Delete all student_club_relation
//    router.delete("/", student_club_relation.deleteAll);

    app.use('/api/student_club_relation', router);
};