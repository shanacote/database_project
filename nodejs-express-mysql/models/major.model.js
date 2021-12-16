const sql = require("./db.js");
const TABLE_NAME='major';
const KEY_FIELD='major_id';
// constructor
const Major = function(major) {
  this.major_id = major.major_id;
  this.name = major.name;
};

Major.create = (newItem, result) => {
  sql.query(`INSERT INTO ${TABLE_NAME} SET ?`, newItem, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(`created ${TABLE_NAME}: `, { id: res.insertId, ...newItem });
    result(null, { id: res.insertId, ...newItem });
  });
};

Major.findById = (id, result) => {
  sql.query(`SELECT * FROM ${TABLE_NAME} WHERE ${KEY_FIELD} = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log(`found ${TABLE_NAME}: `, res[0]);
      result(null, res[0]);
      return;
    }

    // not found Major with the id
    result({ kind: "not_found" }, null);
  });
};

Major.findAll = (name, result) => {
  let query = `SELECT * FROM ${TABLE_NAME}`;

  if (name) {
      query += ` WHERE name LIKE '%${name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`${TABLE_NAME}`, res);
    result(null, res);
  });
};


Major.updateById = (id, major, result) => {
  sql.query(
    `UPDATE ${TABLE_NAME} SET name = ? WHERE ${KEY_FIELD} = ?`,
    [major.name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Major with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log(`updated ${TABLE_NAME}: `, { id: id, ...major });
      result(null, { id: id, ...major });
    }
  );
};

Major.remove = (id, result) => {
  sql.query(`DELETE FROM ${TABLE_NAME} WHERE ${KEY_FIELD} = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Major with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted ${TABLE_NAME} with ${KEY_FIELD}: ${id}`);
    result(null, res);
  });
};


module.exports = Major;
