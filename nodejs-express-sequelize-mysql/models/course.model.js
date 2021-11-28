module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("course", {
      course_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      school_code: {
        type: Sequelize.STRING
      },
      major_id: {
        type: Sequelize.STRING
      },
      course_code: {
        type: Sequelize.STRING
      }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'course'
    });

    return Course;
};