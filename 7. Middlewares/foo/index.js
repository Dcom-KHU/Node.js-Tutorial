const express=require('express');
const router=express.Router();

const bar=require('./bar');
const baz=require('./baz');

router.get('/bar',bar.Bar);
router.get('/baz',baz.Baz);

module.exports=router;