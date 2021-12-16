const sql = require("./db.js");
const TABLE_NAME='student_courses_relation';
// constructor
const StudentCoursesRelation = function(studentCoursesRelation) {
  this.student_id = studentCoursesRelation.student_id;
  this.course_id = studentCoursesRelation.course_id;
};

StudentCoursesRelation.create = (newItem, result) => {
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

StudentCoursesRelation.findById = (studentId, result) => {
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

    // not found StudentCoursesRelation with the id
    result({ kind: "not_found" }, null);
  });
};

StudentCoursesRelation.findAll = (student_id, course_id, result) => {
  let query = `SELECT * FROM ${TABLE_NAME}`;

  if (student_id||course_id) {
    const cond=[];
    if(student_id) cond.push(` student_id LIKE '%${student_id}%'`);
    if(course_id) cond.push(` course_id LIKE '%${course_id}%'`);
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


StudentCoursesRelation.remove = (student_id, course_id, result) => {
  sql.query(`DELETE FROM ${TABLE_NAME} WHERE student_id = ${student_id} AND course_id = ${course_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found StudentCoursesRelation with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted ${TABLE_NAME} with student_id: ${student_id}, course_id: ${course_id}`);
    result(null, res);
  });
};



module.exports = StudentCoursesRelation;
