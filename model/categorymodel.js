const mongoose=require('mongoose')


mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/javadp",{useNewUrlParser:true});



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