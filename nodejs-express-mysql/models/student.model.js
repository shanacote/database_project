const sql = require("./db.js");
const TABLE_NAME='student';
const KEY_FIELD='student_id';
// constructor
const Student = function(student) {
  this.student_id = student.student_id;
  this.name = student.name;
  this.major_id = student.major_id;
  this.password = student.password;
};

Student.create = (newItem, result) => {
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

Student.findById = (id, result) => {
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

    // not found Student with the id
    result({ kind: "not_found" }, null);
  });
};

Student.findAll = (name, major_id, result) => {
  let query = `SELECT * FROM ${TABLE_NAME}`;

  if (name||major_id) {
    const cond=[];
    if(name) cond.push(` name LIKE '%${name}%'`);
    if(major_id) cond.push(` major_id LIKE '%${major_id}%'`);
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


Student.updateById = (id, student, result) => {
  sql.query(
    `UPDATE ${TABLE_NAME} SET name = ?, major_id = ?, password = ? WHERE ${KEY_FIELD} = ?`,
    [student.name, student.major_id, student.password, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Student with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log(`updated ${TABLE_NAME}: `, { id: id, ...student });
      result(null, { id: id, ...student });
    }
  );
};

Student.remove = (id, result) => {
  sql.query(`DELETE FROM ${TABLE_NAME} WHERE ${KEY_FIELD} = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Student with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted ${TABLE_NAME} with ${KEY_FIELD}: ${id}`);
    result(null, res);
  });
};


module.exports = Student;
