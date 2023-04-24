var express = require('express');
var router = express.Router();
var userget= require('../controller/user-ctrlr')
const { ObjectId } = require('mongodb');
var userinfo = require('../model/usermodel').collection
var nocache=require('nocache')



// get method------
router.get('/login',nocache(),userget.userlogin)
router.get('/',nocache(),userget.homePage)
router.get('/signup',nocache(),userget.signup)
router.get('/loginpage',userget.logout)
router.get('/userShop',userget.userShop)



router.get('/productDetail/:id',userget.productDetaildeep)
router.get('/productDetail',userget.productAccessget)


router.get('/userProfile',userget.userprofile)
router.get('/editUserprofile/:id',userget.editProfile)
router.get('/logout',userget.userlogout)
router.get('/changePassword',userget.changePasswordpage)
router.get('/addCart',userget.usercart)
router.get('/deletecart/:id',userget.deletecart)
router.get('/checkOut',userget.checkout)
router.get('/userAddress',userget.addressManage)
router.get('/placeorder',userget.placeorder)
router.get('/savedAddress/:indexof',userget.savedAddress)
router.get('/userSideOrder',userget.userOrder)
router.get('/forgotPassword',userget.forgetPaswrd)
router.get('/otpLogin',userget.otpLogin)
router.get('/orderCancel/:id',userget.orderDelete)
// router.get('/pageChange',userget.changePage)
router.get('/viewProducts/:id',userget.viewProducts)
router.get('/allProducts',userget.allProducts)
router.get('/frgtPasschange',userget.frgtPasschange)
router.get('/Contact',userget.Conatct)

router.get('/wishList',userget.wishList)
router.get('/deleteWish/:id',userget.deleteWish)
router.get('/about',userget.about)








// post method------
router.post('/signup',userget.usersignupval)
router.post('/',userget.userloginval)
router.post('/userProfile/:id',userget.editprofilelast)
router.post('/userProfile',userget.userprofilePost)
router.post('/changePassword',userget.changePassword)
router.post('/addCart/:id',userget.addtocart)
router.post('/updatequantity',userget.updatequantity)
router.post('/userAddress',userget.userAddress)
router.post('/placeorder',userget.proceed)
router.post('/verify-payment',userget.usergetverifypayment)
router.post('/otpLogin',userget.otpVerification)
router.post('/verifyOtp',userget.verifyotpp)
router.post('/userShop',userget.searchh)
router.post('/coupentry',userget.UserTryCoupen)
router.post('/selectCategory',userget.selectCategory)

router.post('/forgotPassword',userget.otppVerification)
router.post('/verifyOtpp',userget.verifyotppp)
router.post('/frgtPasschange',userget.changefrgtPass)

router.get('/wishListPost/:id',userget.wishListPost)
router.post('/',userget.searchhh)










module.exports = router;
