var express = require('express');
var router = express.Router();
var adminget= require('../controller/admin-ctrlr')
const { ObjectId } = require('mongodb');
const admininfo = require('../model/adminmodel').collection1
const categoryinfo = require('../model/categorymodel').collection4
const productinfo = require('../model/productmodel').collection3
const upload=require('../fileUpload/upload');
const session = require('express-session');
const coupeninfo = require('../model/coupenmodel').collection8




// get method-----------
router.get('/adminlogin',adminget.adminLogin)
router.get('/adminhome',adminget.adminDashBoard)
router.get('/productList',adminget.productlist)
router.get('/userlist',adminget.userlist)
router.get('/Block/:id',adminget.Block)
router.get('/Unblock/:id',adminget.Unblock)
router.get('/deleteOne/:id',adminget.deleteOne)
router.get('/deleteproduct/:id',adminget.deleteproduct)
router.get('/Category',adminget.CategoryProduct1)
router.get('/categoryDelete/:id',adminget.categoryDelete)
router.get('/editCategory/:id',adminget.EditCategory)
router.get('/OrderList',adminget.orderPage)
router.get('/orderedProducts/:id',adminget.orderProducts)
router.get('/coupenAdmin',adminget.coupenAdmin)
router.get('/Block1/:id',adminget.Block1)
router.get('/Unblock1/:id',adminget.Unblock1)
router.get('/cancel/:id',adminget.adminCancelOrder)
router.get('/pending/:id',adminget.adminPendingOrder)
router.get('/delivered/:id',adminget.adminDeliveredOrder)
router.get('/confirm/:id',adminget.adminConfirmOrder)
router.get('/salesReport',adminget.adminGetSalesReport)
router.get('/banner',adminget.bannerlist)
router.get('/addbanner',adminget.addbannerget)
router.get('/deleteBanner/:id',adminget.deleteBanner)



// post method-------------
router.post('/adminlogin',adminget.adminloginvalidation)
router.post('/Category',adminget.categoryPost)
router.post('/Category/:id',adminget.editCategoryLast)
router.post('/coupenAdmin',adminget.coupenPost)
router.post('/banner',upload.single('filename'),adminget.bannerDetails)





module.exports=router;
