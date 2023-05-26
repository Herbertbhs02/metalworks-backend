const router = require('express').Router()
const bodyParser = require('body-parser');
const { Router } = require('express');
const Metalworks = require('./model/upload')
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req,res)=>{
  console.log(req.body.link)
    const metalworks = new Metalworks({ 
        image: req.body.link,
        product: req.body.product,
        category: req.body.category,
        description:req.body.description
      });

      metalworks.save(function(err){
        if (!err){ 
            res.redirect("/");
        }
      });
    
    
})

module.exports = router
