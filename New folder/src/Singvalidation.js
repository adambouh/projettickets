export function validation(values) {
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //singupconst password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    let errors = {};
    if (values.firstName ==="") {
        errors.firstName = "First name should not be empty";
    }
    else{
        errors.firstName ="";
    }

    if (values.lastName ==="") {
        errors.lastName = "Last name should not be empty";
    }
    else{
        errors.lastName ="";
    }

    if (values.country ==="") {
        errors.country = "Country should not be empty";
    }
    else{
        errors.country ="";
    }

    if (values.passport ==="") {
        errors.passport = "Passport should not be empty";
    }
    else{
        errors.passport ="";
    }
   
    
    if (values.email ==="") {
        errors.email = "Email shoud not be empty";
    }
    else if (!email_pattern.test(values.email)) {
        errors.email = "email didn't match";
    }
    else{
        errors.email ="";
    }
    if (values.password ==="") {
        errors.password = "password shoud not be emptyy";
    }
   
   else if (values.password2 !== values.password){
        errors.password = "password incorrect";}
    else{
        errors.password ="";
    }
    if (values.password2 ==="") {
        errors.password2 = "password shoud not be emptyy";
    }

    else if (values.password2 !== values.password){
        errors.password2 = "password incorrect";}
    else{
        errors.password2 ="";
    }

  


  
    return errors;
}
export default validation;
