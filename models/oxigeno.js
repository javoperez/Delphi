module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Oxigeno", {
    nivel: DataTypes.STRING,
  })
}