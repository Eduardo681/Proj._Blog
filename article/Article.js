const Sequilize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category')
const Article = connection.define('articles',{
    title:{
        type: Sequilize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequilize.STRING,
        allowNull: false
    },
    body: {
        type: Sequilize.TEXT,
        allowNull: false
    }
});
Category.hasMany(Article);
Article.belongsTo(Category); 
Article.sync({force: false}).then(()=>{})
module.exports = Article;