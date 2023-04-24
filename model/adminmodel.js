const mongoose=require('mongoose')
require('dotenv').config()


mongoose.set('strictQuery',false);
mongoose.connect(process.env.mongo,{useNewUrlParser:true});



const adminSchema=new mongoose.Schema({
    Username:{
        type:String,
        require:true
    },
    Password:{
        type:String,
        require:true
    },
})

const collection1=new mongoose.model("admindata",adminSchema)
module.exports={collection1}
