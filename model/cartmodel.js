const mongoose=require('mongoose')


mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/javadp",{useNewUrlParser:true});


const cartSchema=new mongoose.Schema({
    User:{
        type:String,
        require:true
    },
    Product:{
        type:Array,
        require:true
    } 
        
})

const collection5=new mongoose.model("cartdata",cartSchema)
module.exports={collection5}

