module.exports = (sequelize, Sequelize) => {
    const StudentCoursesRelation = sequelize.define("student_courses_relation", {
      student_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      course_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'student_courses_relation'
    });

    return StudentCoursesRelation;
};