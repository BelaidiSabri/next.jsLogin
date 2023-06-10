export const ValidateForm =(values)=>{
    let errors={}
    if (!values.username) {
        errors.username='please enter a username'
    } 
    //we can add here a validation for the length but because is a sensitive info i chose not to add it 
    //else if (values.username.length <5 || values.username.length>10 ){
    //    errors.username='username is between 5 and 10 characters'
    //}
    if (!values.password){
        errors.password='please enter a password'
    }
    return errors
}