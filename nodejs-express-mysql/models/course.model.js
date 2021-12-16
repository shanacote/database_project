const sql = require("./db.js");
const TABLE_NAME='course';
const KEY_FIELD='course_id';
// constructor
const Course = function(course) {
  this.course_id = course.course_id;
  this.school_code = course.school_code;
  this.major_id = course.major_id;
  this.course_code = course.course_code;
  this.name = course.name;
};

Course.create = (newItem, result) => {
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

Course.findById = (id, result) => {
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

    // not found Course with the id
    result({ kind: "not_found" }, null);
  });
};

Course.findAll = (school_code, major_id, course_code, name, result) => {
  let query = `SELECT * FROM ${TABLE_NAME}`;

  if (school_code||major_id||course_code||name) {
      const cond=[];
      if(school_code) cond.push(` school_code LIKE '%${school_code}%'`);
      if(major_id) cond.push(` major_id LIKE '%${major_id}%'`);
      if(course_code) cond.push(` course_code LIKE '%${course_code}%'`);
      if(name) cond.push(` name LIKE '%${name}%'`);
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


Course.updateById = (id, course, result) => {
  sql.query(
    `UPDATE ${TABLE_NAME} SET school_code=?, major_id = ?, course_code=?, name = ? WHERE ${KEY_FIELD} = ?`,
    [course.school_code, course.major_id, course.course_code, course.name, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Course with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log(`updated ${TABLE_NAME}: `, { id: id, ...course });
      result(null, { id: id, ...course });
    }
  );
};

Course.remove = (id, result) => {
  sql.query(`DELETE FROM ${TABLE_NAME} WHERE ${KEY_FIELD} = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Course with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted ${TABLE_NAME} with ${KEY_FIELD}: ${id}`);
    result(null, res);
  });
};


module.exports = Course;
