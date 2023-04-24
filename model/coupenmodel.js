const mongoose=require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery',false);
mongoose.connect(process.env.mongo,{useNewUrlParser:true});

const coupenSchema=new mongoose.Schema({
  coupenCode:{
        type:String,
        required:true
    },
   discountPrice:{
        type:Number,
        required:true
    },
    createDate:{
        type:String,
        required:true
    }, 
   
    minimumPrice:{
        type:Number,
        required:true
    },
  
    expireDate:{
        type:String,
        required:true
    },
    discountType:{
        type:String,
        required:true
    },

    status:{
        type:Boolean,
        required:true
    },
  
});

const collection8 =new mongoose.model("coupendata", coupenSchema)
module.exports = { collection8 }
