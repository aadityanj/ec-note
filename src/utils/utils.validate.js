import {isNotEmpty, isValidEmail, isValidName, isAlphaNumeric} from './validator';

function loginValidator (emailId, password) {
    var errMsg;
    var valid = true
    
    if(!(emailId && isValidEmail(emailId) === "success")){
        errMsg = "Please provide valid Email"
        valid = false
    } else if(!(password && isNotEmpty(password) === "success")){
        errMsg = "password cannot be empty"
        valid = false
    }

    if (!valid) {
        return { valid:false, errMsg:errMsg}
    }
    return {valid:true, errMsg:"Success"}
}

function signUpValidator (firstName, lastName, emailId, userName, password) {
    var errMsg;
    var valid = true

    if(!(firstName && lastName && isValidName(firstName,lastName)=="success")){
        errMsg="First Name and Last Name is mandatory and cannot contain special characters or numbers"
        valid = false
    } else if(!(emailId && isValidEmail(emailId)=="success")){
        errMsg = "Please provide valid Email"
        valid = false
    } else if(!(password && isNotEmpty(password)=="success")){
        errMsg = "Address Line1 is mandatory."
        valid = false
    } else if(!(userName && isAlphaNumeric(userName)=="success")){
        errMsg = "Please provid valid user name"
        valid = false
    }

    if (!valid) {
        return { valid:false, errMsg:errMsg}
    }
    return {valid:true, errMsg:"Success"}

}


export { loginValidator, signUpValidator }


