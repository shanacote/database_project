module.exports = (sequelize, Sequelize) => {
    const StudentSportRelation = sequelize.define("student_sport_relation", {
      student_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      sport_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'student_sport_relation'
    });

    return StudentSportRelation;
};