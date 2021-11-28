module.exports = (sequelize, Sequelize) => {
    const Student_courses_relation = sequelize.define("student_courses_relation", {
      student_id: {
        type: Sequelize.STRING
      },
      course_id: {
        type: Sequelize.STRING
      }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'student_courses_relation'
    });

    return Student_courses_relation;
};