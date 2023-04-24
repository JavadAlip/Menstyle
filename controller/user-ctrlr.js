const session = require('express-session');
const { status } = require('express/lib/response');
const async = require('hbs/lib/async');
const { ObjectId } = require('mongodb');


// const { uuid } = require('uuidv4');
const { v4: uuidv4 } = require('uuid');
const Razorpay = require('razorpay');
// const { default: orders } = require('razorpay/dist/types/orders');
// const { default: payments } = require('razorpay/dist/types/payments');
const nodemailer = require('nodemailer');
const { userInfo } = require('os');


var userinfo = require('../model/usermodel').collection
const productinfo = require('../model/productmodel').collection3
const categoryinfo = require('../model/categorymodel').collection4
const cartinfo = require('../model/cartmodel').collection5
const addressinfo = require('../model/adressModel').collection6
const orderinfo = require('../model/orderModel').collection7
const coupeninfo = require('../model/coupenmodel').collection8
const bannerinfo = require('../model/bannermodel').collection9
const wishlistinfo = require('../model/wishlistModel').collection10
var instance = new Razorpay({
  key_id: 'rzp_test_PpPTFLpvytFBKW',
  key_secret: 'n4N2aF5nVkzQNOdfbDGOYxYg',
});

let msg;
let search;
let sessionname;
let passerrmsg;
let grand_total;
let addresspass;
let orderdate;
let productCart;


let deldt;
var dt = new Date();
let order;
let payment;
let couponsid;

let totall;
let coupenerr;
let carterr;
let product;
let length;
let searchProduct;
let Password;






const userlogin = function (req, res, next) {
  user = req.session.user

  console.log(user);
  if (user) {
    res.redirect('/')
  } else {

    console.log(user);
    res.render('login', { msg })
    msg = null
  }
}


const signup = function (req, res, next) {
  res.render("signup")
}



const homePage = async function (req, res, next) {
  try {
    const categorynew = await categoryinfo.find({})
    user = req.session.user
    sessionname = user
    let pass = await productinfo.find()
    const bannerdeatails = await bannerinfo.find({})
    res.render("homePage", { pass, sessionname, categorynew, bannerdeatails })
  }
  catch (error) {
    console.log(error.message);
  }
}



const userlogout = function (req, res, next) {
  req.session.user = null
  res.redirect('/')
}



// user signup vaidation------------
const usersignupval = async function (req, res, next) {
  const usersignupvall = {
    Username: req.body.Username,
    Password: req.body.Password,
    Confirmpassword: req.body.Confirmpassword,
    Mobilenumber: req.body.Mobilenumber,
    Email: req.body.Email,

  }
  let signupval = await userinfo.findOne({ Username: usersignupvall.Username })
  if (signupval || usersignupvall.Password != usersignupvall.Confirmpassword) {
    res.redirect('/signup')
  }
  else {
    userinfo.insertMany([usersignupvall])
    console.log(usersignupvall);
    res.redirect('/')
  }
}


// userlogin validation--------------------------
const userloginval = async function (req, res, next) {
  const userloginvalidation = {
    Username: req.body.Username,
    Password: req.body.Password,
  }
  console.log(req.body.Username);


  let userloginfo = await userinfo.findOne({ Username: userloginvalidation.Username })
  console.log(userloginfo);


  if (userloginvalidation.Password == userloginfo.Password) {
      console.log("kkkkkkkkkkkkkkkkkkkkkkkk")
   
    if (userloginfo.Status == true) {
      req.session.user = userloginfo.Username
      sessionname = userinfo.Username
      res.redirect('/')
    } else {
      res.redirect('/login')
      msg = "User is blocked"
    }
  } else {
    res.redirect('/login')

  }

}


const userShop = async function (req, res, next) {
  try {



    // const pageNum = req.query.page
    // const perpage = 4
    // const shopProducts = await productinfo.find().skip((pageNum - 1) * perpage).limit(perpage)
    // req.session.shopProducts = shopProducts

    // const docs = await productinfo.find(query)
    const categorynew = await categoryinfo.find({})

    if (req.session.allProducts) {
      req.session.category = null
    }

    const categories = req.session.category;
    category = await categoryinfo.find()
    if (categories) {
      pass = await productinfo.find({ category: categories })
    } else {
      pass = await productinfo.find()
      console.log("hanan", pass);

    }
    console.log(pass);
    res.render("userShop", { pass, categorynew, })
    req.session.allProducts = null

  } catch (error) {
    console.log(error);

  }
}



const logout = function (req, res, next) {
  res.redirect('/')
}



// single product view------------

const productDetaildeep = async function (req, res, next) {
  search = req.params.id
  // console.log("gygygy");
  res.redirect('/productDetail')

}

const productAccessget = async function (req, res, next) {
  console.log(search);
  productview = await productinfo.find({ _id: search })
  res.render('productDetail', { productview })

}


// user profile----------------

const userprofile = async function (req, res, next) {
  let User = req.session.user
  let pass
  if (User) {
    pass = await userinfo.find({ Username: User })
    res.render('userProfile', { pass })

  }
  
  else {
    res.redirect('/login')

  }

 
}


const userprofilePost = async function (req, res, next) {
  const details = {
    Username: req.body.Username,
    Mobilenumber: req.body.Mobilenumber,
    Email: req.body.Email
  }
  console.log(details);
  await userinfo.insertMany([details])
  res.redirect("/userProfile")
}


// userprofile edit---------

const editProfile = async function (req, res, next) {
  const editprofile = req.params.id
  console.log(editprofile);
  const editprofiledata = await userinfo.findOne({ _id: editprofile })
  console.log(editprofiledata);
  res.render("editUserprofile", { editprofiledata })
}



const editprofilelast = async function (req, res, next) {
  let id = req.params.id
  // console.log(req.body)
  await userinfo.updateOne({ _id: id }, {
    $set: {
      Username: req.body.Username,
      Mobilenumber: req.body.Mobilenumber,
      Email: req.body.Email
    }
  })
  let user = await userinfo.findOne({ _id: id })
  req.session.user = user.Username
  res.redirect('/userProfile')

}


// change Password------
const changePasswordpage = function (req, res, next) {
  res.render("changePassword", { passerrmsg })
  passerrmsg = null
}


const changePassword = async function (req, res, next) {
  user = req.session.user
  paswrd = req.body
  let findpass = await userinfo.findOne({ Username: user })
  if (findpass.Password == paswrd.Password) {
    console.log(findpass.Password);
    await userinfo.updateOne({ Username: user }, { $set: { Password: paswrd.newPassword } })
    res.redirect('/userprofile')

  } else {
    res.redirect('/changePassword')
    passerrmsg = "Current Password is wrong"
  }
}



// addtocart get-----------


const usercart = async function (req, res, next) {
  User = req.session.user
  if (User) {

    productCart = await cartinfo.aggregate([{
      $match: { User: user }
    },
    { $unwind: '$Product' },
    { $project: { item: "$Product.item", quantity: "$Product.quantity" } },
    {
      $lookup: {
        from: 'productdatas',
        localField: 'item',
        foreignField: '_id',
        as: 'products'
      }

    },


    { $project: { item: 1, quantity: 1, Product: { $arrayElemAt: ['$products', 0] } } }
    ])

    console.log(productCart);

    for (var i = 0; i < productCart.length; i++) {
      totalPrice = productCart[i].quantity * productCart[i].Product.price
      productCart[i].totalPrice = totalPrice
    }

    grand_total = 0;
    for (i = 0; i < productCart.length; i++) {
      grand_total += productCart[i].totalPrice
    }
    console.log(grand_total);

    // -------------------------------------------------------------------------

    let coupensid = req.session.coupen
    if (coupensid) {
      console.log(coupensid);
      let val = await coupeninfo.find({ coupenCode: coupensid })
      console.log(val);
      min = val[0].minimumPrice
      if (grand_total < val[0].minimumPrice) {
        coupenerr = "Please By Upto " + min
      } else {
        console.log(val);
        dis = val[0].discountPrice
        console.log(val[0].discountPrice);
        grand_total -= val[0].discountPrice
        console.log(grand_total);
        console.log(dis);

        var success = "Successfully Discounted ₹" + dis
        // coupensid=req.session.coupen
        await userinfo.updateOne({ Username: req.session.user }, { $addToSet: { usedcoupen: coupensid } })
      }
    }
    // await userdata.updateOne({ username: req.session.user }, { $addToSet: { usedcoupen: coupensid } })
    res.render('addCart', { success, coupenerr, carterr, productCart, grand_total })
    req.session.coupen = null
    carterr = null
    coupenerr = null
    success = null


  }
  else {
    res.redirect('/login')
  }

}






//////////////////////////////////Add cart post//////////////////////////////////////

const addtocart = async function (req, res, next) {
  usersession = req.session.user
  if (usersession == null) {
    res.redirect('/login')
  }

  else {
    console.log("jaaafafafaffafafaffafafaaffa");
    const proId = req.params.id
    const userId = req.session.user

    const proObj = {
      item: new ObjectId(proId),
      quantity: 1
    }

    const userCart = await cartinfo.findOne({ User: userId })
    if (userCart) {
      let proExist = await cartinfo.findOne({ $and: [{ User: userId }, { "Product.item": proId }] })
      console.log(proExist);

      if (proExist != null && proExist != "") {
        await cartinfo.updateOne({ "Product.item": proId }, { $inc: { 'Product.$.quantity': 1 } })
      }
      else {
        await cartinfo.updateOne({ User: userId }, { $push: { Product: proObj } })
      }
    }
    else {
      let carObj = {
        User: userId,
        Product: [proObj]
      }
      await cartinfo.insertMany([carObj])
    }
    res.redirect("/addCart")
  }
}




/////////////////////////////////////////////////////////////////////ajax url/////////////////////////////////////

const updatequantity = async function (req, res, next) {

  try {
    User = req.session.user
    cartItem = req.body
    cartItem.count = parseInt(cartItem.count)

    for (i = 0; i < productCart.length; i++) {
      if (productCart[i]['item'] == cartItem.product) {
        productCart[i]['quantity'] = productCart[i]['quantity'] + cartItem.count
      }
    }

    const cartQauntity = await cartinfo.findOneAndUpdate({ $and: [{ User: User }, { 'Product.item': new ObjectId(cartItem.product) }] },
      { $inc: { 'Product.$.quantity': cartItem.count } }).lean();
    let cartElements = []

    for (i = 0; i < cartQauntity.Product.length; i++) {
      let cart = cartQauntity.Product[i]
      const productdata = await productinfo.findOne({ _id: new ObjectId(cart.item) })
      let quantity
      if (cart.item.toString() == cartItem.product) {
        quantity = cart.quantity + cartItem.count

        quant = quantity
      }
      else {
        quantity = cart.quantity
      }


      stock = productdata.stock

      let cartObj = {
        productId: cart.item,
        quantity: quantity,
        price: productdata.price,
        finalPrice: quantity * productdata.price
      }
      let ID = cartObj.productId
      console.log("productidddd", ID);
      console.log(stock);
      console.log(quant);
      req.session.quant = parseInt(quant)
      req.session.productId = ID
      cartElements.push(cartObj)
    }
    if (quant <= stock) {
      carterr = null
    } else {
      carterr = "out of stock"
    }


    res.json({
      status: true,
      cartElements: cartElements,
      stock: carterr

    })

  } catch (error) {

    console.log(error.message)

  }
}

// -------------delete cart----------------------

const deletecart = async function (req, res, next) {
  const deletecart = req.params.id
  await cartinfo.updateOne({ User: req.session.user }, { $pull: { Product: { item: new ObjectId(deletecart) } } })
  res.redirect("/addCart")
}


//  -----------------checkout page-------------------------------

const checkout = async function (req, res, next) {
  try {
    User = req.session.user
    let pos = req?.query?.q
    if (User) {
      let userCheck = await addressinfo.findOne({ User: req.session.user })

      if (userCheck == null) {
        res.redirect('/userProfile')
      }
      else {
        if (pos) {
          let clickk = await addressinfo.findOne({ User: req.session.user })
          addresspass = clickk?.Address[pos]
        }
        console.log(addresspass);

        res.render("checkOut", { addresspass, grand_total })
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}





// useraddress page render--------------

const addressManage = async function (req, res) {
  try {
    User = req.session.user
    let addressPage = await addressinfo.findOne({ User: user })
    let addresspass = addressPage.Address
    res.render("userAddress", { addresspass })
    // console.log(addressPage.Address);

  } catch (error) {
    console.log(error.message);
  }
}



// datas export to checkout---

const savedAddress = async function (req, res, next) {
  try {
    User = req.session.user
    passId = req.params.indexof

    let passAdd = await addressinfo.findOne({ User: user })
    addressPage = passAdd.Address[passId]
    console.log(passId);

    res.redirect('/checkOut?q=' + passId + '')
  } catch (error) {
    console.log(error.message);
  }
}



const userAddress = async function (req, res, next) {
  try {
    User = req.session.user
    let details = req.body
    details.id = uuidv4()
    console.log(details);
    userExt = await addressinfo.findOne({ User: user })
    if (userExt == null) {
      await addressinfo.insertMany([{ User: req.session.user, Address: details }])
    } else {
      await addressinfo.updateOne({ User: user }, { $push: { Address: details } })
    }

    res.redirect('/userAddress')
  } catch (error) {
    console.log(error.message);
  }
}



// placeorder page-------

// const placeorder =async function (req, res, next) {
//   try {
//     if(req.session.quant&&req.session.productId){
//       quant=-req.session.quant
//       ProId=req.session.productId
//       console.log(quant);
//       console.log(ProId);
//       await productinfo.updateOne({product:ProId},{$inc:{stock:quant}})
//     }else{
//       ProId=req.session.productidd
//       await productinfo.updateOne({product:ProId},{$inc:{stock:-1}})
//     }

//     res.render('placeOrder')
//   } catch (error) {
//     console.log(error.message)
//   }
// }

const placeorder = function (req, res, next) {
  res.render('placeOrder')
}




// -------data insert to database(orderdata)------

const proceed = async function (req, res, next) {
  try {
    User = req.session.user

    let status = req.body.paymentmethod === "COD" ? "Placed" : "Pending"
    const delivery = {
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Email: req.body.Email,
      Mobilenumber: req.body.Mobilenumber,
      Postcode: req.body.Postcode,
      State: req.body.State,
      City: req.body.City

    }


    payment = req.body.paymentmethod
    User = req.body.user
    grand_total = grand_total
    products = productCart
    orderdate = new Date().toLocaleString()
    status = status;
    let deliverydate = new Date();
    deliverydate.setDate(deliverydate.getDate() + 7)
    deliverydate = deliverydate.toLocaleString()
    let orderId = uuidv4()
    console.log(req.body);
    console.log(req.body.paymentmethod);
    // console.log(grand_total);


    if (req.body.paymentmethod === 'ONLINE') {
      await userinfo.updateOne({ Usename: req.session.user }, { $addToset: { UsedCoupon: couponsid } })
      orderss = {
        Address: delivery,
        grandTotal: grand_total,
        products: productCart,
        orderStatus: status,
        orderdUser: user,
        paymentmethod: payment,
        date: orderdate,
        deliverydate: deliverydate,

      }

      var option = {

        amount: grand_total * 100,
        currency: "INR",
        receipt: "" + orderId

      };
      // console.log(orderId);
      instance.orders.create(option, function (err, order) {
        if (err) {
          console.log(err);
        } else {
          orderinfo.insertMany([orderss])

          couponsid = req.session.coupen
          res.json({ status: true, order: order })

        }
      })

    } else {

      await orderinfo.insertMany([{
        Address: delivery, grandTotal: grand_total, orderdUser: user, products: products,
        date: orderdate, deliverydate: deliverydate, orderStatus: status, Firstname: delivery.Firstname, Lastname: delivery.Lastname, Email: delivery.Email,
        Mobilenumber: delivery.Mobilenumber, Postcode: delivery.Postcode, State: delivery.State, City: delivery.City, paymentmethod: payment
      }])
      await cartinfo.deleteOne({ User: req.session.user })

      console.log("{{{{{{{{{{{{{{{{{{{{{{{{{{{{");


      res.redirect("/placeorder")
    }
    if (req.session.quant && req.session.productId) {
      quant = -req.session.quant
      ProId = req.session.productId
      console.log(quant);
      console.log(ProId);
      await productinfo.updateOne({ _id: new ObjectId(ProId) }, { $inc: { stock: quant } })
    } else {
      ProId = req.session.productidd
      await productinfo.updateOne({ _id: new ObjectId(ProId) }, { $inc: { stock: -1 } })
    }


  }
  catch (error) {
    console.log(error.message);
  }
}




// ------------crypto node.js----------------

const usergetverifypayment = async function (req, res, next) {
  User = req.session.user
  if (User) {
    let raz = req.body
    console.log(raz);
    const crypto = require('crypto');
    let hmac = crypto.createHmac('sha256', 'n4N2aF5nVkzQNOdfbDGOYxYg')
    hmac.update(raz['payment[razorpay_order_id]'] + '|' + raz['payment[razorpay_payment_id]']);
    hmac = hmac.digest('hex')
    if (hmac == raz['payment[razorpay_signature']) {
      order == orderss
      console.log(order);
      order.orderdate = new Date()
      order.orderdate = order.orderdate.toLocaleString()
      let dt = new Date()
      order.deliverydate = new Date(dt.setDate(dt.getDate() + 7))
      order.deliverydate = order.deliverydate.toLocaleString()
      order.product[0].products.paymentid = uuidv4()

      for (i = 0; i < order.product[0].products.length; i++) {
        order.product[0].products[i].paymentid = req.body['payment[razorpay_payment_id']
      }
      await orderinfo.insertMany([order])
      await cartinfo.deleteOne({ User: req.session.user })
      req.session.user.order = null;
      res.json({ PaymentSuccess: true })
    }

  } else {
    res.redirect('/')
  }
}


// -------------user-side-order-----------------
const userOrder = async function (req, res, next) {
  let orderdetailss = await orderinfo.find()
  res.render("userSideOrder", { orderdetailss })
}






//----------------orderDelete//----------------------

const orderDelete = async function (req, res, next) {
  const orderDelete = req.params.id
  await orderinfo.updateOne({ _id: orderDelete }, { $set: { orderStatus: "Cancelled" } })
  res.redirect("/userSideOrder")
}



// forgot password---------------

const forgetPaswrd = function (req, res, nex) {
  try {
    var User = req.session.user
    if (User) {
      res.redirect('/')
    } else {
      otp = req.session.otp
      data = req.session.otpData
      err = req.session.otpErr
      invalid = req.session.InvalidOtp
      res.render("forgotPassword", { otp, data, err, invalid })
      req.session.otpErr = null
      req.session.InvalidOtp = null
    }
  } catch (error) {
    console.log(error.message);
  }
}

// forgotpassword otpverification-------------

const otppVerification = async (req, res) => {
  try {
    let data = req.body;
    let response = {}
    let checkuser = await userinfo.findOne({ Email: data.Email })
    if (checkuser) {
      if (checkuser.Status) {
        otpEmail = checkuser.Email
        response.otp = OTP()
        let otp = response.otp
        let mailTransporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: 'phonetech3255@gmail.com',
            pass: 'hyyvyrvqywzhaevu'
          }
        })
        let details = {
          from: 'phonetech3255@gmail.com',
          to: otpEmail,
          subject: "PHONETECH Verification",
          text: otp + " is your PHONETECH verification code. Do not share OTP with anyone "
        }
        mailTransporter.sendMail(details, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("OTP Send Successfully ");
          }
        })

        function OTP() {
          OTP = Math.random() * 1000000
          OTP = Math.floor(OTP)
          return OTP
        }
        response.User = checkuser
        response.status = true
        if (response.status) {
          req.session.otp = response.otp;
          req.session.otpData = req.body;
          req.session.otpUser = response.User;
          res.redirect('/forgotPassword')
        }
        else {
          req.session.otpErr = "Entered email is blocked!";
          res.redirect('/forgotPassword');
          req.session.otpErr = null;
        }
      }

    }
    else {
      req.session.otpErr = "Email not registered!";
      res.redirect('/forgotPassword');
      req.session.otpErr = null;
    }
  } catch (error) {
    console.log(error.message);
  }

}

// ----------forgotpassword otpverify------------

const verifyotppp = async (req, res) => {
  try {
    otp = req.session.otp
    userOtp = req.body.digit
    var user = req.session.otpUser
    console.log(otp, userOtp);
    if (otp == userOtp) {
      req.session.user = user.name
      req.session.userId = user._id
      req.session.otp = null
      console.log("success");
      res.redirect('/frgtPasschange')
    } else {
      req.session.InvalidOtp = "Invalid Otp"
      console.log("err");
      res.redirect('/forgotPassword')
    }
  } catch (error) {
    console.log(error.message);
  }
}

// forgotpassword change-------
const frgtPasschange = async function (req, res, next) {
  res.render("frgtPasschange")
  // passerrmsg=null
}


const changefrgtPass = async function (req, res, next) {
  user = req.session.user

  let findpass = await userinfo.findOne({ Username: user })
  {
    res.redirect('/userShop')
    // passerrmsg = "Current Password is wrong"
  }
}








/////////////////////Otp-login////////////////////////

const otpLogin = function (req, res, nex) {
  try {
    var User = req.session.user
    if (User) {
      res.redirect('/')
    } else {
      otp = req.session.otp
      data = req.session.otpData
      err = req.session.otpErr
      invalid = req.session.InvalidOtp
      res.render("otpLogin", { otp, data, err, invalid })
      req.session.otpErr = null
      req.session.InvalidOtp = null
    }
  } catch (error) {
    console.log(error.message);
  }
}



// -------otp verification-------

const otpVerification = async (req, res) => {
  try {
    let data = req.body;
    let response = {}
    let checkuser = await userinfo.findOne({ Email: data.Email })
    if (checkuser) {
      if (checkuser.Status) {
        otpEmail = checkuser.Email
        response.otp = OTP()
        let otp = response.otp
        let mailTransporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: 'phonetech3255@gmail.com',
            pass: 'hyyvyrvqywzhaevu'
          }
        })
        let details = {
          from: 'phonetech3255@gmail.com',
          to: otpEmail,
          subject: "PHONETECH Verification",
          text: otp + " is your PHONETECH verification code. Do not share OTP with anyone "
        }
        mailTransporter.sendMail(details, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("OTP Send Successfully ");
          }
        })

        function OTP() {
          OTP = Math.random() * 1000000
          OTP = Math.floor(OTP)
          return OTP
        }
        response.User = checkuser
        response.status = true
        if (response.status) {
          req.session.otp = response.otp;
          req.session.otpData = req.body;
          req.session.otpUser = response.User;
          res.redirect('/otpLogin')
        }
        else {
          req.session.otpErr = "Entered email is blocked!";
          res.redirect('/otpLogin');
          req.session.otpErr = null;
        }
      }

    }
    else {
      req.session.otpErr = "Email not registered!";
      res.redirect('/otpLogin');
      req.session.otpErr = null;
    }
  } catch (error) {
    console.log(error.message);
  }

}



// ------verify otp-------

const verifyotpp = async (req, res) => {
  try {
    otp = req.session.otp
    userOtp = req.body.digit
    var user = req.session.otpUser
    console.log(otp, userOtp);
    if (otp == userOtp) {
      req.session.user = user.name
      req.session.userId = user._id
      req.session.otp = null
      console.log("success");
      res.redirect('/')
    } else {
      req.session.InvalidOtp = "Invalid Otp"
      console.log("err");
      res.redirect('/otpLogin')
    }
  } catch (error) {
    console.log(error.message);
  }
}





// categorybase filter------
const selectCategory = function (req, res) {
  var response = {}
  console.log("ggdggggggggggdgdgdgd", req.body.category);
  req.session.category = req.body.category
  console.log(response);
  res.json(response)
}


// ------- shop-search-product----

const searchh = async function (req, res, next) {

  try {
    

    const categorynew = await categoryinfo.find({})
    console.log("javaddddaa", categorynew)
    const searchValue = req.body.searchProduct

    console.log("jaabgducbdibsfff", searchValue);
    const searchProduct = searchValue.trim()
    console.log(searchProduct);


    if (searchProduct != '') {
      // let pass = await productinfo.find({ $and: [{ productname: { $regex: `^${searchProduct}`, $options: 'i' } }, { is_admin: 0 }] });
      let pass=await productinfo.find({productname:{$regex:new RegExp('^'+searchValue+',*','i')}}).exec();
      console.log("javadpppppppppppppppppppp", searchProduct);
      console.log("aliii", pass);

      res.render('userShop',{pass,categorynew})
    }
  } catch (error) {
    console.log(error);
  }
}



// const searchUser =async (req,res)=>{
//   try {

//    const searchValue =req.body.search
//    console.log(searchValue);
//    const search =searchValue.trim()

//    if(search!=''){
//        let users =await User.find({$and:[{name:{$regex: `^${search}`,$options:'i'}},{is_admin : 0}]});
       
//            res.render('dashboard',{users:users})
//    }  
//  }
//    catch (error) {

//    console.log(error.message);
   
//   }
 

// }






// -----------pagination-------------

// // const changePage = async function (req, res, next) {
//   const pageNum = req.query.page
//   const perpage = 4
//   const shopProducts = await productinfo.find().skip((pageNum - 1) * perpage).limit(perpage)

//   req.session.shopProducts = shopProducts

// //   res.redirect('/userShop')
// // }






// const UserTryCoupen = async function (req, res, next) {
//   try {
//     const coupenId = req.body.coupenCode;
//     const coupen = await coupeninfo.findOne({ coupenCode: coupenId });
//     req.session.coupon = coupen.discountPrice;

//     req.body.coupenCode=coupenId

//     console.log(coupenId);

//     let usedCouponCheck = await userinfo.findOne({ Username: req.session.user, usedcoupen: { $in: [coupenId] } });

//     if (usedCouponCheck) {
//       let coupencheck = await coupeninfo.findOne({ coupenCode: coupenId });
//       // console.log(coupencheck);

//       if (coupencheck) {
//         const currentDate = new Date();
//         const expireDate = new Date(coupencheck.expireDate);

//         if (currentDate <= expireDate) {
//           req.session.coupon = coupen.discountPrice;
//         } else {
//           req.session.coupen = coupenId;
//         }
//       } else {
//          coupenerr = "Invalid Coupon Code";

//       }
//     } else {
//        coupenerr = "This Coupon Is Already Used";

//     }
//     console.log("sjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");

//     res.redirect('/addCart');
//   } catch (error) {
//     console.log(error);
//     next();
//   }
// };






const UserTryCoupen = async function (req, res, next) {
  try {
    console.log("ghghghghghghghghg");
    console.log(req.body);
    const coupenId = req.body.coupenCode

    const coupen = await coupeninfo.findOne({ coupenCode: coupenId })
    req.session.coupon = coupen?.discountPrice;

    req.body.coupenCode = coupenId

    console.log(coupenId);

    let usedcoupencheck = await userinfo.findOne({ Username: req.session.user, usedcoupen: { $in: [coupenId] } })

    if (usedcoupencheck == null) {
      let coupencheck = await coupeninfo.findOne({ coupenCode: coupenId });
      console.log(coupencheck);
      if (coupencheck) {
        const date = new Date().toLocaleDateString()

        console.log(date);

        if (date < coupencheck.expireDate) {
          req.session.coupen = coupenId
        }

        // console.log("kkkkkkkkkkkkkkkkkkkkkkkkk"); 
      } else {
        coupenerr = "Invalid Coupencode"
      }
    } else {
      coupenerr = "This Coupon Is Already Used"
    }

    res.redirect('/addCart')
  } catch (error) {
    console.log(error);
    next()
  }
}



// view products----------

const viewProducts = async function (req, res) {
  try {
    let orderId = req.params.id
    let orderstatus = await orderinfo.findOne({ _id: new ObjectId(orderId) })
    let productCart = await orderinfo.aggregate([
      { $match: { _id: new ObjectId(orderId) } },
      { $unwind: "$products" },
      { $project: { item: "$products.item", quantity: "$products.quantity" } },
      { $lookup: { from: "productdatas", localField: "item", foreignField: "_id", as: "products" } },
      { $project: { item: 1, quantity: 1, Product: { $arrayElemAt: ["$products", 0] } } }
    ])
    res.render("viewProducts", { productCart, orderstatus, orderId })
    console.log(productCart);

  } catch (err) {
    console.error(err)
    // res.status(500).send("Server error")
  }
}

const allProducts = function (req, res) {
  req.session.allProducts = true
  res.redirect("/userShop")
}

// contact--------

const Conatct=async function (req,res){
  res.render("Contact")
}








// wishlist--------

const wishList=async function (req,res){

  User = req.session.user
  productWish = await productinfo.find()
  if (User) {

    productWish = await wishlistinfo.aggregate([{
      $match: { User: user }
    },
    { $unwind: '$Product' },
    { $project: { item: "$Product.item", quantity: "$Product.quantity" } },
    {
      $lookup: {
        from: 'productdatas',
        localField: 'item',
        foreignField: '_id',
        as: 'products'
      }

    },

    { $project: { item: 1, quantity: 1, Product: { $arrayElemAt: ['$products', 0] } } }
    ])

    res.render("wishList",{productWish})

  }
  else{
    res.redirect('/login')
  }
}



// wishList post--------------

const wishListPost = async function (req, res, next) {
  usersession = req.session.user
  if (usersession == null) {
    res.redirect('/login')
  }

  else {

    const proId = req.params.id
    const userId = req.session.user
    console.log("javaddadaaaaaali",proId);
    console.log(userId);

    const proObj = {
      item: new ObjectId(proId),
      quantity: 1
    }

    const userCart = await wishlistinfo.findOne({ User: userId })
   
    if (userCart) {
      let proExist = await wishlistinfo.findOne({ $and: [{ User: userId }, { "Product.item": proId }] })
      console.log(proExist);

      if (proExist != null && proExist != "") {
        await wishlistinfo.updateOne({ "Product.item": proId }, { $inc: { 'Product.$.quantity': 1 } })
      }
      else {
        await wishlistinfo.updateOne({ User: userId }, { $push: { Product: proObj } })
      }
    }
    else {
      let wishObj = {
        User: userId,
        Product: [proObj]
      }
      await wishlistinfo.insertMany([wishObj])
    }
    res.redirect("/wishList")
  }
  }


  // delete wishList-------------------

  const deleteWish =async function (req,res,next){
    const deleteWish= req.params.id
    await wishlistinfo.updateOne({User:req.session.user},{$pull:{Product:{item: new ObjectId(deleteWish)}}})
    res.redirect("/wishList")
  }


  // about us--------------------------------

  const about=async function(req,res,next){
    res.render('about')
  }

  // homepage serach product----------
  
const searchhh = async function (req, res, next) {

  try {
    

  
    const searchValue = req.body.searchProductt

    console.log("jaabgducbdibsfff", searchValue);
    const searchProductt = searchValue.trim()
    console.log(searchProductt);


    if (searchProductt != '') {
      // let pass = await productinfo.find({ $and: [{ productname: { $regex: `^${searchProduct}`, $options: 'i' } }, { is_admin: 0 }] });
      let pass=await productinfo.find({productname:{$regex:new RegExp('^'+searchValue+',*','i')}}).exec();
      console.log("javadpppppppppppppppppppp", searchProductt);
      console.log("aliii", pass);

      res.render('homePage',{pass})
    }
  } catch (error) {
    console.log(error);
  }
}





// const orderPage=async function(req,res){
//   let orderdetails=await orderinfo.find()
//   res.render('OrderList',{orderdetails})
// }



module.exports = {
  userlogin, signup, homePage, usersignupval, logout,
  userloginval, userShop, productDetaildeep, productAccessget,
  userprofile, changePassword, editProfile, editprofilelast
  , userlogout, userprofilePost, addtocart, changePasswordpage, usercart,
  updatequantity, checkout, addressManage, savedAddress, userAddress,
  placeorder, deletecart, forgetPaswrd, proceed, usergetverifypayment,
  userOrder, otpLogin, otpVerification, verifyotpp, orderDelete,
  UserTryCoupen, viewProducts, selectCategory, allProducts, searchh,
  otppVerification, verifyotppp, frgtPasschange, changefrgtPass,Conatct
  ,wishList,wishListPost,deleteWish,about,searchhh}


