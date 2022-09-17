const sql = require("./db.js");

// constructor
const DailyWork = function (dailyWork) {
  this.title = dailyWork.title;
  this.time_from = dailyWork.time_from;
  this.time_to = dailyWork.time_to;
  this.description = dailyWork.description;
};

DailyWork.create = (newDailyWork, result) => {
  sql.query("INSERT INTO dailywork SET ?", newDailyWork, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created dailywork: ", { id: res.id, ...newDailyWork });
    result(null, { id: res.id, ...newDailyWork });
  });
};

DailyWork.findById = (id, result) => {
  sql.query(`SELECT * FROM dailywork WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found DailyWork: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found DailyWork with the id
    result({ kind: "not_found" }, null);
  });
};

DailyWork.getAll = (title, result) => {
  let query = "SELECT * FROM dailywork";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("dailywork: ", res);
    result(null, res);
  });
};

DailyWork.updateById = (id, DailyWork, result) => {
  sql.query(
    "UPDATE dailywork SET title = ?, description = ?, time_from = ?, time_to = ? WHERE id = ?",
    [
      DailyWork.title,
      DailyWork.description,
      DailyWork.time_from,
      DailyWork.time_to,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found DailyWork with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated DailyWork: ", { id: id, ...DailyWork });
      result(null, { id: id, ...DailyWork });
    }
  );
};

DailyWork.remove = (id, result) => {
  sql.query("DELETE FROM dailywork WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found DailyWork with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted dailywork with id: ", id);
    result(null, res);
  });
};

// Tutorial.removeAll = (result) => {
//   sql.query("DELETE FROM tutorials", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} tutorials`);
//     result(null, res);
//   });
// };

module.exports = DailyWork;
