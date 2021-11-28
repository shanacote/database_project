module.exports = (sequelize, Sequelize) => {
    const Club = sequelize.define("club", {
      club_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'club'
    });

    return Club;
};