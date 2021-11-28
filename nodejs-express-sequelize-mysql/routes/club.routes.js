module.exports = app => {
    const club = require("../controllers/club.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
//    router.post("/", club.create);

    // Retrieve all club
    router.get("/", club.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", club.findOne);

    // Update a Tutorial with id
//    router.put("/:id", club.update);

    // Delete a Tutorial with id
//    router.delete("/:id", club.delete);

    // Delete all club
//    router.delete("/", club.deleteAll);

    app.use('/api/club', router);
};