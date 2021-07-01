const express=require('express');
const router=express.Router();

router.post('/signup',require('./signup'));
router.post('/login',require('./login'));
router.post('/logout',require('./logout'));
router.get('/info',require('./info'));

module.exports=router;