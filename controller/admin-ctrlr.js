const async = require('hbs/lib/async')
const { ObjectId } = require('mongodb')

const admininfo = require('../model/adminmodel').collection1
var userinfo = require('../model/usermodel').collection
const productinfo = require('../model/productmodel').collection3
const categoryinfo = require('../model/categorymodel').collection4
const orderinfo = require('../model/orderModel').collection7
const cartinfo = require('../model/cartmodel').collection5
const coupeninfo = require('../model/coupenmodel').collection8
const bannerinfo = require('../model/bannermodel').collection9


let msg;
let orderId;
let orderstatus; 



const adminLogin=function(req,res,next){
  if(req.session.admin){
    res.redirect('/adminhome')
  }else{
    res.render("adminlogin")
  }
  }


  // adminvalidation---------
  const adminloginvalidation=async function(req,res,next){
    const adminvalidation={
       Username:req.body.Username,
       Password:req.body.Password,
     }
     let adminvalidate=await admininfo.findOne({Username:adminvalidation.Username})
     console.log(adminvalidate);
     if(adminvalidate==null){
 
       res.redirect('/adminlogin')
       
     }else{
       console.log(adminvalidate);
       if(adminvalidation.Password==adminvalidate.Password)
       req.session.admin=adminvalidate
       res.redirect('/adminhome')
     }
   }


 

// productlist-----------
  const productlist= async function(req,res,next){
    const table= await productinfo.find({})
    res.render("productList1",{table})
  }

  const editproduct=function(req,res,next){
    res.render("editProduct")
  }

  const deleteproduct= async function(req,res,next){
    const productdelete=req.params.id
    await productinfo.deleteOne({_id:productdelete})
    res.redirect("/productList")
  }
  
  
 


  // user list----------
  const userlist=async function(req,res,next){
    const finduser=await userinfo.find()
    res.render("userlist1",{finduser})
  }



  const Block=async function(req,res,next){
    const blockstatus=req.params.id
    await userinfo.updateOne({_id:blockstatus},{$set:{Status:false}})
    res.redirect("/userlist")
  }

  const Unblock=async function(req,res,next){
   const Unblockstatus=req.params.id
    await userinfo.updateOne({_id:Unblockstatus},{$set:{Status:true}})
    res.redirect("/userlist")
  }




  const deleteOne=async function(req,res,next){
   const Userdelete=req.params.id
    await userinfo.deleteOne({_id:Userdelete})
    res.redirect("/userlist")
  }



  // category--------

  const CategoryProduct1= async function(req,res,next){
    const findCategory=await categoryinfo.find({})
    console.log(findCategory);
    res.render('Category1',{findCategory,msg})
    msg=null
  }



  const categoryPost = async function (req, res, next) {
    let details={   
      category:req.body.category
    }
    if(details.category==""){
      res.redirect('/Category')
      findCategory="Category field is empty"

    }else{
      let checkCategory = await categoryinfo.findOne({category:details.category})
      if(checkCategory==null){
        await categoryinfo.insertMany([details])
        res.redirect("/Category")

      }else{
        res.redirect('/Category')
        msg="This category already exist"
      }
    }
    
   
  }
  

  
  const categoryDelete=async function(req,res,next){
    const categorydelete=req.params.id
     await categoryinfo.deleteOne({_id:categorydelete})
     res.redirect("/Category")
   }
   

  const EditCategory= async function(req,res,next){
    const editcategory=req.params.id
    const editcategorydata=await categoryinfo.findOne({_id:editcategory})
    console.log(editcategorydata);
    res.render("editCategory",{editcategorydata})
  }


  const editCategoryLast=async function(req,res){
    console.log(req.body);
    let id=req.params.id
    await categoryinfo.updateOne({_id:id},{$set:{
    category:req.body.category
    }})
    res.redirect('/category')

  }


    
  const CategoryProduct= async function(req,res,next){
    res.redirect('/Category')
  }


  

  // order list---------------------

  // const orderList =async function(req, res, next) {
  //   try{
  //     const orderId=req.query.orderdUser

      
  //     const productDataDetails=await orderinfo.aggregate([{$unwind:"$products"},{$match:{orderdUser:orderId}}])
  //     req.session.productDataDetails=productDataDetails
  //     const productData=await orderinfo.aggregate([{$unwind:"$products"},{$match:{orderdUser:orderId}},{$project:{product:"$products:product"}},{$match:{_id:new ObjectId(orderId)}}])
  //     req.session.productData=productData
  //     console.log(productData);

  //     res.redirect("/OrderList")
  //   }catch (error){
  //     console.log(error);
  //     next()
  //   }

  //   // res.render("OrderList");
  // }



// const orderPage=async function(req,res,next){
//   try{
//     let stat
   
//     console.log(orderid);
//     if (orderid==null){

//     }else{

//       let orderStatus=await orderinfo.findOne({_id:new ObjectId(orderid)})
//       console.log(orderStatus);
//       stat=orderStatus.status
      
//     }
//     console.log("sagggggggggggggggggggg");
//     let dataorder=await orderinfo.aggregate([{$match:{_id:new ObjectId(orderid)}},{$unwind:"$products"}, {$project:{products:'$products.Product'}}])
//     console.log("jjjjjjjjjjjj");
//     console.log(dataorder);

//     if(stat=='delivered'||stat=='item Returned'){
//       orderid=null

//     }
//     res.render('OrderList',{dataorder,orderid,stat})
//   }catch (error) {
//     console.log(error)  
//     next()   
// }
// }


  const orderPage=async function(req,res){
    let orderdetails=await orderinfo.find()
    console.log("tttttttttttttttttttttttttttttttt",orderdetails);
    res.render('OrderList',{orderdetails})
  }
  


  const orderProducts = async function(req, res) {
    try {
      let orderId = req.params.id
      console.log(orderId);
      console.log("javaddalipppppppppppppppppppppppppppppppppp");
      let orderstatus = await orderinfo.findOne({_id: new ObjectId(orderId)})
      let productCart = await orderinfo.aggregate([
        {$match: {_id:new ObjectId(orderId)}},
        {$unwind: "$products"},
        {$project: {item: "$products.item", quantity: "$products.quantity"}},
        {$lookup: {from: "productdatas", localField: "item", foreignField: "_id", as: "products"}},
        {$project: {item: 1, quantity: 1, Product: {$arrayElemAt: ["$products", 0]}}}
      ])



      res.render("orderedProducts", {productCart,orderstatus, orderId})
      console.log(productCart);
    
    } catch (err) {
      console.error(err)
      // res.status(500).send("Server error")
    }
  }



  // ----------coupen management-----------
  const coupenAdmin= async function(req,res,next){
    let findCoupen=await coupeninfo.find()
    res.render('coupenAdmin',{findCoupen})
  }



  const Block1=async function(req,res,next){
    const blockCoupen=req.params.id
    await coupeninfo.updateOne({_id:blockCoupen},{$set:{status:false}})
    res.redirect('/coupenAdmin')
  }
  const Unblock1=async function(req,res,next){
    const UnblockCoupen=req.params.id
    await coupeninfo.updateOne({_id:UnblockCoupen},{$set:{status:true}})
    res.redirect('/coupenAdmin')
    
  }


  const coupenPost =async function(req,res,next){
    console.log(req.body);
    let coupen=req.body
    coupen.status=true;
    await coupeninfo.insertMany([coupen])
    res.redirect('/coupenAdmin')
  }




  // const coupenPost = async function (req, res, next) {
  //   let details={   
  //     coupen:req.body.coupen
  //   }
  //   console.log(details);
  //   await coupeninfo.insertMany([details])
  //   res.redirect("/coupenAdmin")
  // }
 



  // order status------------------------


// cancel-----------
  const adminCancelOrder=async function(req,res,next){
    try{
      cancelid=req.params.id
      console.log("aaaaaaaaaaaaaaaaaa");
      console.log(cancelid);
      await orderinfo.updateOne({_id:new ObjectId(cancelid)},{$set:{orderStatus:'Canceled'}})
      console.log("lllllllllllllllllllllllllllllllllllllllllllllll");
      res.redirect('/OrderList')
    }catch(error){
      console.log(error);
      next()
    }
  }




// pending----------
  const adminPendingOrder=async function(req,res,next){
    try{
      pendingid=req.params.id
      console.log("aaaaaaaaaaaaaaaaaa");
      console.log(pendingid);
      await orderinfo.updateOne({_id:new ObjectId(pendingid)},{$set:{orderStatus:'Pending'}})
      res.redirect('/OrderList')
    }catch(error){
      console.log(error);
      next()
    }
  }

  // delivered----------
const adminDeliveredOrder=async function(req,res,next){
  try{
    deliveredid=req.params.id
    console.log('dddddddddddddddddd');
    console.log(deliveredid);
    await orderinfo.updateOne({_id:new ObjectId(deliveredid)},{$set:{statdelivered:'fun'}})
    await orderinfo.updateOne({_id:new ObjectId(deliveredid)},{$set:{orderStatus:'delivered'}})
    let newdate=new Date().toLocaleDateString()
    await orderinfo.updateOne({_id:new ObjectId(deliveredid)},{$set:{salesdate:newdate}})
    res.redirect('/OrderList')
  }catch(error){
    console.log(error);
    next()
  }
}

// confirm---------------
const adminConfirmOrder=async function(req,res,next){
  try{
    User=req.session.user
    confirmid=req.params.id
    console.log("haassssssssssssssssssssssssss");
    console.log(confirmid);
    await orderinfo.updateOne({_id:new ObjectId(confirmid)},{$set:{orderStatus:'Item Returned'}})

    await orderinfo.updateOne({_id:new ObjectId(confirmid)},{$set:{item:"return"}})
    await orderinfo.updateOne({_id:new ObjectId(confirmid)},{$set:{admin:"return"}})
    res.redirect('/OrderList')
  }catch(error){
    console.log(error);
    next()
  }
} 


// sales-report------------------------------


const adminGetSalesReport=async function(req,res,next){
  try{
    console.log("jaaaaaaaaaaaaaaaaaaaaaaaa");
    let salesdatas=await orderinfo.aggregate([{$match:{orderStatus:'delivered'}},
    {$unwind:"$products"},
    {$project:{item:"$products.item",quantity:"$products.quantity",orderdUser:"$orderdUser",date:"$date",paymentmethod:"$paymentmethod",grandTotal:"$grandTotal"}},
    // {$lookup: {from: "productdatas", localField: "item", foreignField: "_id", as: "products"}},
    // {$project: {item: 1, quantity: 1, Product: {$arrayElemAt: ["$products", 0]}}}
 
  ])
  res.render("salesReport",{salesdatas})
  }
  catch (err) {
    console.error(err)
    // res.status(500).send("Server error")
  }
 
}


// const adminGetSalesReport=async function (req,res,next){
//   let salesdatas=await orderinfo.find()
//   res.render("salesReport",{salesdatas})
// }






// admin-dashboard---------------
const adminDashBoard= async function(req,res,next){
  try{
    let totalrevenue

    let usercount=await userinfo.find().count()
    let blockeduser=await userinfo.find({Status:false}).count()
    let ordercout=await orderinfo.findOne({orderStatus:"delivered"}).count()
    let revenue=await orderinfo.aggregate([{$match:{orderStatus:"delivered"}},{$unwind:"$products"},
    {$group:{_id:null,sum:{$sum:"$products.totalPrice"}}},{$project:{_id:0}}])

    if(revenue.length !=0){
      totalrevenue=revenue[0].sum

    }else{
      totalrevenue=0
    }
    let pendingordercount=await orderinfo.findOne({orderStatus:"Pending"}).count()
    
  res.render("adminhome",{usercount,ordercout,totalrevenue,pendingordercount,blockeduser})
    
  }
  catch (error) {
    console.log(error)  
    next()
}
}


// ---------------banner-------------



const bannerlist=async function (req,res,next){
  const table=await bannerinfo.find({})
  res.render("banner",{table})
}

const addbannerget=async function (req,res,next){
  res.render('addbanner')

}


const bannerDetails=async function (req,res){
  const bannerproduct=new bannerinfo({
    title:req.body.title,
    subtitle:req.body.subtitle,
    bannerimage:req.file.filename,
  })
  try{

    await bannerproduct.save()
    res.redirect('/banner')
  }catch{
    res.render('addbanner')
  }
}

const deleteBanner=async function(req,res,next){
  const bannerdelete=req.params.id
  await bannerinfo.deleteOne({_id:bannerdelete})
  res.redirect("/banner")
}


  module.exports={adminLogin,productlist,
    editproduct,deleteproduct,adminloginvalidation,
    userlist,Block,Unblock,deleteOne,CategoryProduct,
   CategoryProduct1,categoryPost,categoryDelete
   ,EditCategory,editCategoryLast,orderPage,orderProducts,
   coupenAdmin,coupenPost,adminCancelOrder,adminPendingOrder,
   adminDeliveredOrder,adminConfirmOrder,adminGetSalesReport,
   adminDashBoard,bannerDetails,bannerlist,addbannerget,Block1,
   Unblock1,deleteBanner}