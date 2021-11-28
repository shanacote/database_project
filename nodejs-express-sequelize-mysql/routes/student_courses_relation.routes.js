module.exports = app => {
    const student_courses_relation = require("../controllers/student_courses_relation.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
//    router.post("/", student_courses_relation.create);

    // Retrieve all student_courses_relation
    router.get("/", student_courses_relation.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", student_courses_relation.findOne);

    // Update a Tutorial with id
//    router.put("/:id", student_courses_relation.update);

    // Delete a Tutorial with id
//    router.delete("/:id", student_courses_relation.delete);

    // Delete all student_courses_relation
//    router.delete("/", student_courses_relation.deleteAll);

    app.use('/api/student_courses_relation', router);
};