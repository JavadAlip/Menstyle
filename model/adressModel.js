const mongoose=require('mongoose')


mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/javadp",{useNewUrlParser:true});


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

