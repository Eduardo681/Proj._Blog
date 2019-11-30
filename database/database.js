const Sequelize = require('sequelize');
const connection = new Sequelize('guiapress','root','1234',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00',
    port : 3307
});
module.exports = connection;


