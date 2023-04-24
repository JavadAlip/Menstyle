const mongoose=require('mongoose')
require('dotenv').config()


mongoose.set('strictQuery',false);
mongoose.connect(process.env.mongo,{useNewUrlParser:true});


const addressSchema=new mongoose.Schema({
    User:{
        type:String,
        require:true
    },
    Address:{
        type:Array,
        require:true
    } 
        
})

const collection6=new mongoose.model("addressdata",addressSchema)
module.exports={collection6}

