if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null;

    sequelize = new Sequelize('delphicare', 'delphi', 'care', {
            protocol: 'postgres',
            host: 'localhost',
            dialect:'postgres',
            loggin:true
    });
  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    Temperatura:   sequelize.import(__dirname + '/temperatura'),
    Oxigeno:   sequelize.import(__dirname + '/oxigeno')
  } 
}
module.exports = global.db