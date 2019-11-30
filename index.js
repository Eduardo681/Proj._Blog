// variaveis
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3002;
const connection = require('./database/database');

const Article = require('./article/Article');
const Category = require('./categories/Category')
const categoriesController = require('./categories/CategoriesControler')
const articlesController = require('./article/ArticlesControler')


//conexao com o banco
connection
    .authenticate()
    .then(()=>{
        console.log('Conexão feita com sucesso!')
    }).catch((error)=>{
        console.log(error);
    })

//config
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(port, ()=>{
    console.log(`O servidor esta rodando! Na porta ${port}`);
});


//rotas
app.use('/',categoriesController)
app.use('/',articlesController)
app.get('/',(req,res)=>{
    Article.findAll({
        order:[
            ['id','DESC']
        ],
        limit: 4
    }).then(articles=>{
        Category.findAll().then(categories=>{
            res.render('index.ejs', {articles:articles, categories: categories})
        })
        
    })
    
})
app.get('/:slug',(req,res)=>{
    let slug = req.params.slug;
    Article.findOne({
        where:{
            slug : slug
        }
    }).then(article=>{
        if (article != undefined){
            Category.findAll().then(categories=>{
                res.render('article.ejs', {article:article, categories: categories})
        })} else {
            res.redirect('/')
        }
    }).catch(error =>{
        res.redirect('/')
    })
})
app.get('/category/:slug',(req,res)=>{
    let slug = req.params.slug;
    Category.findOne({
        where:{
            slug:slug
        },
        include: [{model: Article}]
    }).then(category=>{
        if (category != undefined){
            Category.findAll().then(categories =>{
                res.render('index.ejs',{articles: category.articles, categories: categories})
            })
        } else {
            res.redirect('/')
        }
    }).catch(error=>{
        res.redirect('/')
    })
})