module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Temperatura", {
    nivel: DataTypes.STRING,
  })
}