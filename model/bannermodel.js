const mongoose=require('mongoose')
require('dotenv').config()


mongoose.set('strictQuery',false);
mongoose.connect(process.env.mongo,{useNewUrlParser:true});


const bannerSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    subtitle:{
        type:String,
        require:true
    },
    bannerimage:{
        type:Array,
        require:true
    },
   
        
})

const collection9=new mongoose.model("bannerdata",bannerSchema)
module.exports={collection9}
