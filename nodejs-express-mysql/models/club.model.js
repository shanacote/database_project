const sql = require("./db.js");
const TABLE_NAME='club';
const KEY_FIELD='club_id';
// constructor
const Club = function(club) {
  this.club_id = club.club_id;
  this.name = club.name;
  this.type = club.type;
};

Club.create = (newItem, result) => {
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

Club.findById = (id, result) => {
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

    // not found Club with the id
    result({ kind: "not_found" }, null);
  });
};

Club.findAll = (name, type, result) => {
  let query = `SELECT * FROM ${TABLE_NAME}`;

  if (name||type) {
    const cond=[];
    if(name) cond.push(` name LIKE '%${name}%'`);
    if(type) cond.push(` type LIKE '%${type}%'`);
    query += ' WHERE '+cond.join('AND');
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


Club.updateById = (id, club, result) => {
  sql.query(
    `UPDATE ${TABLE_NAME} SET name = ?, type = ? WHERE ${KEY_FIELD} = ?`,
    [club.name, club.type, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Club with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log(`updated ${TABLE_NAME}: `, { id: id, ...club });
      result(null, { id: id, ...club });
    }
  );
};

Club.remove = (id, result) => {
  sql.query(`DELETE FROM ${TABLE_NAME} WHERE ${KEY_FIELD} = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Club with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted ${TABLE_NAME} with ${KEY_FIELD}: ${id}`);
    result(null, res);
  });
};


module.exports = Club;
