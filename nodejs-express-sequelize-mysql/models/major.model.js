module.exports = (sequelize, Sequelize) => {
    const Major = sequelize.define("major", {
      major_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    }, {
      timestamps: false,
        freezeTableName: true,
        tableName: 'major'
    });

    return Major;
};