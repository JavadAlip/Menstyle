function addeditpost(){
    var productname=document.submission.productname.value
    var price=document.submission.price.value
    var brand=document.submission.brand.value
    var stock=document.submission.stock.value
    var discription=document.submission.discription.value
    var Productimage=document.submission.Productimage.value


    let pass=document.getElementsByClassName("text-danger")
    const priceRegex=/^\d{0,8}(\.\d{1,4})?$/

    if(productname ==""&& price=="" && brand=="" && stock=="" && discription==""){
        let i=0
        while(i< pass.length){
            pass[i].innerHTML="Please fill the field"
            i++
        }
        console.log("ajjjjjjjjjjjjjjjjjjjjjjjjjj");
        return false
    }
    if(productname==""){
        pass[0].innerHTML="The productname is empty"
        return false;
    }
    if(productname.length<4){
        pass[0].innerHTML="productname should be have 5 Letters"
        return false;
    }
      
    if(price==""){
        pass[3].innerHTML="Brand is required"
        return false;
    }
    if(priceRegex.test(price)==false){
        pass[3].innerHTML="Enter currect price"
        return false
    }

    if(brand==""){
        pass[5].innerHTML="Brand is required"
        return false;
    }
    if(stock==""){
        pass[4].innerHTML="Stock is required"
        return false;
    }
    console.log("ajjjjjjjjjjjjjjjjjjjjjjjjjj");
    if(discription==""){
        pass[7].innerHTML="Discription is required"
        return false;
    }
}
    // if(discription.length >20){
    //     pass[7].innerHTML="Discription is required"
    //     return false;
    // }
    
function clearform(){
    let pass=document.getElementsByClassName("text-danger")
    let i=0
    while(i<pass.length){
        pass[i].innerHTML=""
        i++
    }
}

