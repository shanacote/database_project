const sql = require("./db.js");
const TABLE_NAME='sport';
const KEY_FIELD='sport_id';
// constructor
const Sport = function(sport) {
  this.sport_id = sport.sport_id;
  this.gender = sport.gender;
  this.sport = sport.sport;
  this.season = sport.season;
};

Sport.create = (newItem, result) => {
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

Sport.findById = (id, result) => {
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

    // not found Sport with the id
    result({ kind: "not_found" }, null);
  });
};

Sport.findAll = (gender, sport, season, result) => {
  let query = `SELECT * FROM ${TABLE_NAME}`;

  if (gender||sport||season) {
    const cond=[];
    if(gender) cond.push(` gender LIKE '%${gender}%'`);
    if(sport) cond.push(` sport LIKE '%${sport}%'`);
    if(season) cond.push(` season LIKE '%${season}%'`);
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


Sport.updateById = (id, sport, result) => {
  sql.query(
    `UPDATE ${TABLE_NAME} SET gender = ?, sport = ?, season = ? WHERE ${KEY_FIELD} = ?`,
    [sport.gender, sport.sport, sport.season, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Sport with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log(`updated ${TABLE_NAME}: `, { id: id, ...sport });
      result(null, { id: id, ...sport });
    }
  );
};

Sport.remove = (id, result) => {
  sql.query(`DELETE FROM ${TABLE_NAME} WHERE ${KEY_FIELD} = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Sport with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted ${TABLE_NAME} with ${KEY_FIELD}: ${id}`);
    result(null, res);
  });
};


module.exports = Sport;
