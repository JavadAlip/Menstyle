const { ObjectId } = require('mongodb')

const productinfo = require('../model/productmodel').collection3
const categoryinfo = require('../model/categorymodel').collection4

let id2



const addproductget =async function (req, res, next) {
  try{
    const categorynew=await categoryinfo.find({})
    res.render('addproduct',{categorynew})
  }catch(error){
    console.log(error.messgae);
  }
  // res.render('addproduct')
}


const productDetails = async function (req, res) {
  const length=req.files.length
  let image=[]
  console.log(length);
  for(let i=0;i<length;i++){
    image[i]=req.files[i].filename
  }
  const product = new productinfo({
    productname: req.body.productname,
    price: req.body.price,
    category: req.body.category,
    brand: req.body.brand,
    stock: req.body.stock,
    discription: req.body.discription,
    Productimage:image,           
  })
   try{

    await product.save()
    console.log(product);
    res.redirect('/productList')
  }catch{
    res.render('addproduct')
  }
}

const addproductpost =  function (req, res, next) {
  res.redirect("/product/addproduct")
}



// editprodcut---------------------

const addeditget= async function (req,res,next){
 const id2 = req.params.id
 const edit =await productinfo.findOne({_id:id2})
  console.log(edit);
  res.render('edit',{edit})
}



const addeditpost=async function(req,res,next){
 let id2=req.params.id
 let items=req.body
 let editImage=req.files
 let image=[]
 req.files.forEach(file => {
  image.push(file.filename)
  
 });



  await productinfo.updateOne({_id:id2},{
    $set:{
    productname: req.body.productname,
    price: req.body.price,
    brand: req.body.brand,
    stock: req.body.stock,  
    discription: req.body.discription,
    Productimage:image,
   
    }
  })
  // await productinfo.updateOne({_id:new ObjectId(id2)},{$push:{"image":image}})
  res.redirect("/productList")
}



module.exports = { addproductget, addproductpost, productDetails,
  addeditget,addeditpost}



  // const addeditpost=async function(req,res,next){
  //   let id2=req.params.id
  //   console.log(req.file);
  //    await productinfo.updateOne({_id:id2},{
  //      $set:{
  //      productname: req.body.productname,
  //      price: req.body.price,
  //      brand: req.body.brand,
  //      stock: req.body.stock,  
  //      discription: req.body.discription,
  //      Productimage:req.file.filename,
  //      }})
  //    res.redirect("/productList")
  //  }




  
// const addeditpost=async function(req,res,next){
//   let id2=req.params.id
//   console.log(req.files);
//   let image=[]
//   for(let i=0;i<req.files;i++){
//    image[i]=req.files[i].filename
//   }
//    await productinfo.updateOne({_id:id2},{
//      $set:{
//      productname: req.body.productname,
//      price: req.body.price,
//      brand: req.body.brand,
//      stock: req.body.stock,  
//      discription: req.body.discription,
//      Productimage:image,
//      }})
//    res.redirect("/productList")
//  }
   