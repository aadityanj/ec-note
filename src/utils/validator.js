const splNumPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0123456789]/
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const alphaNumeric  = /^[a-z0-9]+$/i


function isNotEmpty(val){
  if(val === undefined)
    return null
  if(!val)
    return "error"
  return "success"
}

function isAlphaNumeric(pincode){
   if(pincode === undefined) return null
   if(!pincode) return "error"
   if(!alphaNumeric.test(pincode)) return "error"
   return "success"
}

function isValidName(firstName,lastName){
  if(firstName === undefined || lastName === undefined)
    return null
  if(!firstName || !lastName)
    return "error"
  if(splNumPattern.test(firstName) || splNumPattern.test(lastName))
    return "error"
  return "success"
}

function isWithoutSplNum(val){
  if(val === undefined)
    return null
  if(!val)
    return "error"
  if(splNumPattern.test(val))
    return "error"
  return "success"
}

function isValidEmail(val){
  if(val === undefined)
    return null
  if(!val)
    return "error"
  if(emailPattern.test(val))
    return "success"
  return "error"
}

function isNumber(val){
  if(val === undefined)
    return null
  if(Number(val))
    return "success"
  return "error"
}

export {isValidName, isWithoutSplNum, isNotEmpty, isNumber, isValidEmail, isAlphaNumeric}