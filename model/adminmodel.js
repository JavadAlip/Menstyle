const mongoose=require('mongoose')


mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/javadp",{useNewUrlParser:true});



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
