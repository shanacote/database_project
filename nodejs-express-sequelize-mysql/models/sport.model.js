module.exports = (sequelize, Sequelize) => {
    const Sport = sequelize.define("sport", {
      sport_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      gender: {
        type: Sequelize.STRING
      },
      sport: {
        type: Sequelize.STRING
      },
      season: {
        type: Sequelize.STRING
      }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'sport'
    });

    return Sport;
};