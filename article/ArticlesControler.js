const express = require('express');
const router = express.Router();
router.get('/articles', (req,res)=>{
    res.send('ROTA DE artigos')
})
router.get('/articles/admin/new',(req,res)=>{
    res.send('ROTA NOVA artigos')
})
module.exports = router;