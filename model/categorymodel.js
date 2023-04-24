const mongoose=require('mongoose')
require('dotenv').config()


mongoose.set('strictQuery',false);
mongoose.connect(process.env.mongo,{useNewUrlParser:true});



const categorySchema=new mongoose.Schema({
    category:{
        type:String,
        require:true
    },
    edit:{
        type:String,
        require:true
    },
   
    Status:{
        type:Boolean,
        require:true
    },
   
})

const collection4=new mongoose.model("categorydata",categorySchema)
module.exports={collection4}