const mongoose=require('mongoose')
require('dotenv').config()


mongoose.set('strictQuery',false);
mongoose.connect(process.env.mongo,{useNewUrlParser:true});


const wishlistSchema=new mongoose.Schema({
    User:{
        type:String,
        require:true
    },
    Product:{
        type:Array,
        require:true
    } 
        
})

const collection10=new mongoose.model("wishlistdata",wishlistSchema)
module.exports={collection10}

