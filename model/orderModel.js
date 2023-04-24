const mongoose=require('mongoose')

mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/javadp",{useNewUrlParser:true});

const orderSchema=new mongoose.Schema({
   
    orderdUser:{
        type:String,
        required:true
    },
    orderStatus:{
        type:String,
        required:true
    },
    date :{
        type:String,
        required:true
    }, 
   
    Address:{
        type:Array,
        required:true
    },
  
    products:{
        type:Array,
        required:true
    },
    grandTotal:{
        type:Number,
        required:true
    },

    deliverydate:{
        type:String,
        required:true
    },
    paymentmethod:{
        type:String,
        required:true
    },
    // status:{
    //     type:String,
    //     require:true
    // },
   
  
  
});

const collection7 =new mongoose.model("orderdata", orderSchema)
module.exports = { collection7 }



