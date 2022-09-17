const DailyWork = require("../models/dailyWork.model.js");

// Create and Save a new DailyWork
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a DailyWork
  const dailyWork = new DailyWork({
    title: req.body.title,
    time_from: req.body.time_from,
    time_to: req.body.time_to,
    description: req.body.description,
  });

  // Save DailyWork in the database
  DailyWork.create(dailyWork, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the DailyWork.",
      });
    else res.send(data);
  });
};

// Retrieve all DailyWorks from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  DailyWork.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving DailyWorks.",
      });
    else res.send(data);
  });
};

// Find a single DailyWork by Id
exports.findOne = (req, res) => {
  DailyWork.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found DailyWork with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving DailyWork with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update a DailyWork identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  DailyWork.updateById(req.params.id, new DailyWork(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found DailyWork with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating DailyWork with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a DailyWork with the specified id in the request
exports.delete = (req, res) => {
  DailyWork.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found DailyWork with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete DailyWork with id " + req.params.id,
        });
      }
    } else res.send({ message: `DailyWork was deleted successfully!` });
  });
};

// Delete all DailyWorks from the database.
// exports.deleteAll = (req, res) => {
//   DailyWork.removeAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all DailyWorks.",
//       });
//     else res.send({ message: `All DailyWorks were deleted successfully!` });
//   });
// };
