// variaveis
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const connection = require('./database/database');
const categoriesController = require('./categories/CategoriesControler')
const articlesController = require('./article/ArticlesControler')

const Article = require('./article/Article');
const Category = require('./categories/Category')
//config
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(port, ()=>{
    console.log('O servidor esta rodando!');
});
//conexao com o banco
connection
    .authenticate()
    .then(()=>{
        console.log('Conexão feita com sucesso!')
    }).catch((error)=>{
        console.log(error);
    })
//rotas
app.use('/',categoriesController)
app.use('/',articlesController)