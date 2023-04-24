var express = require('express')
var router = express.Router();
var productget= require('../controller/product-ctrlr')
const { ObjectId } = require('mongodb');
const upload = require('../fileUpload/upload');
const prodcutinfo = require('../model/productmodel').collection3





// get---------
router.get('/addproduct',productget.addproductget)
router.get('/edit/:id',productget.addeditget)


// post-------
router.post('/productadd',productget.addproductpost)
router.post('/addproduct',upload.array('Productimage'),productget.productDetails)
router.post('/productList/:id',upload.array('Productimage'),productget.addeditpost)


module.exports=router;