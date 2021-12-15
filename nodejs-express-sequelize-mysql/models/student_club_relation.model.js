module.exports = (sequelize, Sequelize) => {
    const StudentClubRelation = sequelize.define("student_club_relation", {
      student_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      club_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'student_club_relation'
    });

    return StudentClubRelation;
};