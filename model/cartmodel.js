const mongoose=require('mongoose')
require('dotenv').config()


mongoose.set('strictQuery',false);
mongoose.connect(process.env.mongo,{useNewUrlParser:true});


const cartSchema=new mongoose.Schema({
    User:{
        type:String,
        require:true
    },
    Product:{
        type:Array,
        require:true
    } 
        
})

const collection5=new mongoose.model("cartdata",cartSchema)
module.exports={collection5}

