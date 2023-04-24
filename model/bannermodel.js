const mongoose=require('mongoose')


mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/javadp",{useNewUrlParser:true});


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
