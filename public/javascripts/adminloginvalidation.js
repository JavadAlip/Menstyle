function adminloginvalidation(){
    var Username=document.submission.Username.value
    var Password=document.submission.Password.value


    let pass=document.getElementsByClassName("text-danger")
    const PasswordRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/gm


    
    if(Username==""&&Password==""){
        let i=0
        while(i<pass.length){
            pass[i].innerHTML="Please fill the field"
            i++
        }                   
        return false;
    }                                       
   
    if(Username==""){
        pass[0].innerHTML="The username is empty"
        return false;
    }

    if(Username.length<5){
        pass[0].innerHTML="Username should be have 5 Letters"
        return false;
    }
    
    if(Password==""){
        pass[1].innerHTML="The Password is empty"
        return false;
    }

    if(PasswordRegex.test(Password)==false){
        pass[1].innerHTML="Enter proper password"
        return false
    }
    return true;
}

function clearform(){
    let pass=document.getElementsByClassName("text-danger")
    let i=0
    while(i<pass.length){
        pass[i].innerHTML=""
        i++
    }
}


