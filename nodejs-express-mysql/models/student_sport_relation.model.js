const sql = require("./db.js");
const TABLE_NAME='student_sport_relation';
// constructor
const StudentSportRelation = function(studentSportRelation) {
  this.student_id = studentSportRelation.student_id;
  this.sport_id = studentSportRelation.sport_id;
};

StudentSportRelation.create = (newItem, result) => {
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

StudentSportRelation.findById = (studentId, result) => {
  sql.query(`SELECT * FROM ${TABLE_NAME} WHERE student_id = ${studentId}`, (err, res) => {
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

    // not found StudentSportRelation with the id
    result({ kind: "not_found" }, null);
  });
};

StudentSportRelation.findAll = (student_id, sport_id, result) => {
  let query = `SELECT * FROM ${TABLE_NAME}`;

  if (student_id||sport_id) {
    const cond=[];
    if(student_id) cond.push(` student_id LIKE '%${student_id}%'`);
    if(sport_id) cond.push(` sport_id LIKE '%${sport_id}%'`);
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


StudentSportRelation.remove = (student_id, sport_id, result) => {
    sql.query(`DELETE FROM ${TABLE_NAME} WHERE student_id = ${student_id} AND sport_id = ${sport_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found StudentSportRelation with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted ${TABLE_NAME} with student_id: ${student_id}, sport_id: ${sport_id}`);
    result(null, res);
  });
};



module.exports = StudentSportRelation;
