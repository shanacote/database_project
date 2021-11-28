module.exports = (sequelize, Sequelize) => {
    const Student_sport_relation = sequelize.define("student_sport_relation", {
      student_id: {
        type: Sequelize.STRING
      },
      sport_id: {
        type: Sequelize.STRING
      }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'student_sport_relation'
    });

    return Student_sport_relation;
};