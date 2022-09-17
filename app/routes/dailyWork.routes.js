module.exports = (app) => {
  const dailyWork = require("../controllers/dailyWork.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", dailyWork.create);

  // Retrieve all dailyWork
  router.get("/", dailyWork.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", dailyWork.findOne);

  // Update a Tutorial with id
  router.put("/:id", dailyWork.update);

  // Delete a Tutorial with id
  router.delete("/:id", dailyWork.delete);

  app.use("/api/dailyWork", router);
};
