const sql = require("./db.js");
const TABLE_NAME='student_club_relation';
// constructor
const StudentClubRelation = function(studentClubRelation) {
  this.student_id = studentClubRelation.student_id;
  this.club_id = studentClubRelation.club_id;
};

StudentClubRelation.create = (newItem, result) => {
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

StudentClubRelation.findById = (studentId, result) => {
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

    // not found StudentClubRelation with the id
    result({ kind: "not_found" }, null);
  });
};

StudentClubRelation.findAll = (student_id, club_id, result) => {
  let query = `SELECT * FROM ${TABLE_NAME}`;

  if (student_id||club_id) {
    const cond=[];
    if(student_id) cond.push(` student_id LIKE '%${student_id}%'`);
    if(club_id) cond.push(` club_id LIKE '%${club_id}%'`);
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

StudentClubRelation.remove = (student_id, club_id, result) => {
    sql.query(`DELETE FROM ${TABLE_NAME} WHERE student_id = ${student_id} AND club_id = ${club_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found StudentClubRelation with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted ${TABLE_NAME} with student_id: ${student_id}, club_id: ${club_id}`);
    result(null, res);
  });
};



module.exports = StudentClubRelation;
