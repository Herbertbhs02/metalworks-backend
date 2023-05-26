const router = require('express').Router()
const bodyParser = require('body-parser');
const { Router } = require('express');
const multer = require('multer');
var multerS3 = require("multer-s3-transform");
const aws = require('aws-sdk');
const sharp = require('sharp')
const path = require('path')

require('dotenv').config({path:__dirname + '/.env'})

router.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config({path:__dirname + '/.env'})


//xxxxxxxxxxxxxxxxxxxx
const s3 = new aws.S3({
	//"endpoint": process.env.S3_END_POINT,
	"accessKeyId": process.env.AccessKey,
	"secretAccessKey": process.env.SecretKey,
	"region": "us-east-1",
	"s3ForcePathStyle": true
})
  
// xxxxxxxxxxxxxxxxxxxxxxxxxx
const upload = multer({  
  storage: multerS3({
    s3: s3,
    bucket: 'autoupload1',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    //acl: 'public-read-write',
	shouldTransform: function (req, file, cb) {
      cb(null, /^image/i.test(file.mimetype))
    },
	key: function (req, file, cb) {
		var filename = file.originalname.replace(path.extname(file.originalname), '@') + Date.now() +  path.extname(file.originalname);
		file.originalname = filename;
        cb(null, filename);
    },
    transforms: [

     {
      id: 'resized',
      key: function (req, file, cb) {
        cb(null, 'resized-' + file.originalname)
      },
      transform: function (req, file, cb) {
        
        cb(null, sharp().resize(200, 200, {
          kernel: sharp.kernel.nearest,
    fit: 'contain',
    position: 'left top',
    background: 'white'
        }))
      }
    }
  ]
  })
});

router.get('/', (req,res)=>{
    res.render('Uploadphoto')
})

router.post('/uploadandresize', upload.single('photo'), (req, res, next) => {
  
    //console.log(req.file.transforms[0].location); // Print upload details
    return res.render('Admin',{ message:req.file.transforms[0].location})
  });


module.exports = router