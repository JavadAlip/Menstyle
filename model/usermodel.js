const mongoose=require('mongoose')


mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/javadp",{useNewUrlParser:true});

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
