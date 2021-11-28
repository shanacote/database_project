module.exports = app => {
    const course = require("../controllers/course.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
//    router.post("/", course.create);

    // Retrieve all course
    router.get("/", course.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", course.findOne);

    // Update a Tutorial with id
//    router.put("/:id", course.update);

    // Delete a Tutorial with id
//    router.delete("/:id", course.delete);

    // Delete all course
//    router.delete("/", course.deleteAll);

    app.use('/api/course', router);
};