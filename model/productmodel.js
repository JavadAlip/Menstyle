const mongoose=require('mongoose')
require('dotenv').config()


mongoose.set('strictQuery',false);
mongoose.connect(process.env.mongo,{useNewUrlParser:true});


const productSchema=new mongoose.Schema({
    productname:{
        type:String,
        require:true
    },
    brand:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    stock:{
        type:Number,
        require:true
    },
    discription:{
        type:String,
        require:true
    },
    Productimage:{
        type:Array,
        require:true
    } ,
    // productId:{
    //     type:String,
    //     require:true
    // }

        
})

const collection3=new mongoose.model("productdata",productSchema)
module.exports={collection3}
