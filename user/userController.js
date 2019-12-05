const express = require('express');
const UserRouter = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs')
const adminAuth = require('../middleware/adminAuth')
UserRouter.get('/admin/users',adminAuth, (req,res)=>{
    User.findAll().then((users)=>{
        res.render('admin/users',{users: users})
    })

});
UserRouter.get('/admin/users/create', adminAuth , (req,res)=>{
    res.render('admin/users/create')
})
UserRouter.post('/users/create', adminAuth, (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    User.findOne({where:{email: email}}).then( user => {
        if(user == undefined)
        {
            User.create({
                email: email,
                password: hash
            }).then(()=>{
                res.redirect('/')
            }).catch((err)=>{
                res.redirect('/')
            })
        } else {
            res.redirect('/admin/users/create')
        }
    })
})
UserRouter.get('/login',(req,res)=>{
    res.render('admin/users/login')
})

UserRouter.post('/authenticate',(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({
        where:{
            email : email
        }
    })
    .then(user=>{
        if(user != undefined)
        {
            let correct = bcrypt.compareSync(password, user.password);
            if(correct)
            {
                req.session.user = {
                    id : user.id,
                    email: user.email
                }
                res.redirect('/')
            } else {
                res.redirect('/login')
            }
        } else {
            res.redirect('/login')
        }
    })
})

UserRouter.get('/logout',(req,res)=>{
    req.session.user = undefined;
    res.redirect('/')
})
module.exports = UserRouter;