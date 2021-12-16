module.exports = app => {
    const sport = require("../controllers/sport.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", sport.create);

    // Retrieve all sport
    router.get("/", sport.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", sport.findOne);

    // Update a Tutorial with id
    router.put("/:id", sport.update);

    // Delete a Tutorial with id
    router.delete("/:id", sport.delete);

    // Delete all sport
//    router.delete("/", sport.deleteAll);

    app.use('/api/sport', router);
};