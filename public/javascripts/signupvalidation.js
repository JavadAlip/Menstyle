function usersignupval(){
    var Username=document.submission.Username.value
    var Password=document.submission.Password.value
    var Confirmpassword=document.submission.Confirmpassword.value
    var Mobilenumber=document.submission.Mobilenumber.value
    var Email=document.submission.Email.value


let pass=document.getElementsByClassName("text-danger")
const PasswordRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/gm
const MobilenumberRegex= /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
const EmailRegex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


if(Username==""&&Password==""&&Confirmpassword==""&&Mobilenumber==""&&Email==""){
    let i=0
    while(i<pass.length){
        pass[i].innerHTML="please fill the field"
        i++
    }
    return false   
}
if(Username==""){
    pass[0].innerHTML="The username is empty"
    return false
}
if(Username.length<5){
    pass[0].innerHTML="Username should be 5 letters"
    return false
}
if(Password==""){
    pass[4].innerHTML="Password is empty"
    return false
}
if(PasswordRegex.test(Password)==false){
    pass[4].innerHTML="Password must have a 8character include letters & numbers"
    return false
}
if(Confirmpassword!=Password){
    pass[5].innerHTML="Password is incorrect"
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
if(Email==""){
    pass[1].innerHTML="Email is empty"
    return false
}
if(EmailRegex.test(Email)==false){
    pass[1].innerHTML="Invalid Email"
    return false
}
return true
}

function clearform(){
    let pass=document.getElementsByClassName("text-danger")
    let i=0
    while(i<pass.length){
        pass[i].innerHTML=""
        i++
    }
}

