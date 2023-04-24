function userAddress(){
    var Firstname=document.submission.Firstname.value
    var Lastname=document.submission.Lastname.value
    var Email=document.submission.Email.value
    var Mobilenumber=document.submission.Mobilenumber.value
    var Postcode=document.submission.Postcode.value
    var State=document.submission.State.value
    var City=document.submission.City.value


    let pass=document.getElementsByClassName("text-danger")
    // const priceRegex=/^\d{0,8}(\.\d{1,4})?$/
    const EmailRegex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const MobilenumberRegex= /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/

    if(Firstname ==""&& Lastname=="" && Email=="" && Mobilenumber=="" && Postcode==""&&State==""&&City==""){
        let i=0
        while(i< pass.length){
            pass[i].innerHTML="Please fill the field"
            i++
        }
        return false
    }
    if(Firstname==""){
        pass[0].innerHTML="The Firstname is empty"
        return false;
    }
    if(Firstname.length<4){
        pass[0].innerHTML="Firstname should be have 5 Letters"
        return false;
    }

    if(Lastname==""){
        pass[0].innerHTML="The Lastname is empty"
        return false;
    }

    if(Email==""){
        pass[1].innerHTML="Email is empty"
        return false
    }
    if(EmailRegex.test(Email)==false){
        pass[1].innerHTML="Invalid Email"
        return false
    }

    if(Mobilenumber==""){
        pass[2].innerHTML="Mobile number is empty"
        return false
    }
    if(MobilenumberRegex.test(Mobilenumber)==false){
        pass[2].innerHTML="Enter 10 numbers"
        return false
    }

    if(Postcode==""){
        pass[4].innerHTML="Postcode is required"
        return false;
    }

    if(State==""){
        pass[7].innerHTML="State is required"
        return false;
    }
    
    if(City==""){
        pass[7].innerHTML="City is required"
        return false;
    }


}
  
function clearform(){
    let pass=document.getElementsByClassName("text-danger")
    let i=0
    while(i<pass.length){
        pass[i].innerHTML=""
        i++
    }
}