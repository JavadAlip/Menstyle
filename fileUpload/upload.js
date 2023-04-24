var express=require('express');

const multer=require('multer')

const storage=multer.diskStorage({
    destination:'public/productimages/',
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload=multer({
    storage:storage,
    fileFilter:function(req,file,callback){
        if(
            file.mimetype=="Productimage/jpg"||
            file.mimetype=="Productimage/png"
        ){
            callback(null,true)
        }else{
            console.log("Only jpg & png file supported")
            callback(null,true)
        }

    },limits:{
        fileSize:1024* 1024* 2
    }
})

module.exports=upload






// const multer=require("multer");

// const path=require("path");

// const storage=multer.diskStorage({
//   destination:function(req,file,cb){
//     cb(null,path.join(__dirname,'public/productimages/'));
//   },
//   filename:function(req,file,cb){
//     const name=Date.now()+'-'+file.originalname;
//  cb(null,name);
//   }
// });

// const upload=multer({storage:storage})

// module.exports =upload