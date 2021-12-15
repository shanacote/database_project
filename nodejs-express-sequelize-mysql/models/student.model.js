module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
      student_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      major_id: {
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING
      }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'student'
    });

    return Student;
};