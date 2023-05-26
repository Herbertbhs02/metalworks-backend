const router = require('express').Router()
const Metalworks = require('./model/upload')

router.get("/retrievework", async(req, res)=>{
    //console.log(req.query.category) 
    const metalworks = await Metalworks.find({category:req.query.category})
    
    
    res.send(metalworks)
  
  });

  module.exports = router