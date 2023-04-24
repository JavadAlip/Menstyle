const mongoose=require('mongoose')
require('dotenv').config()


mongoose.set('strictQuery',false);
mongoose.connect(process.env.mongo,{useNewUrlParser:true});

const LogInSchema=new mongoose.Schema({
   
    Username:{
        type:String,
        require:true
    },  
    Password:{
        type:String,
        require:true
    },
    Confirmpassword:{
        type:String,
        require:true
    },
    Mobilenumber:{
        type:Number,
        require:true
    },
    Email:{
        type:String,
        require:true
    },
    Status:{
        type:Boolean,
        require:true
    },

   
})


const collection=new mongoose.model("userdata",LogInSchema)
module.exports={collection}
