module.exports = app => {
    const major = require("../controllers/major.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
//    router.post("/", major.create);

    // Retrieve all major
    router.get("/", major.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", major.findOne);

    // Update a Tutorial with id
//    router.put("/:id", major.update);

    // Delete a Tutorial with id
//    router.delete("/:id", major.delete);

    // Delete all major
//    router.delete("/", major.deleteAll);

    app.use('/api/major', router);
};