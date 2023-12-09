const encrypt = (password) => {
  var passcode = "sidbi@123";
  var result = "";
  var passLen = passcode.length;
  for(var i = 0; password && i < password.length; i++) {
    var passOffset = i % passLen;
    var calAscii = (password.charCodeAt(i)) + passcode.charCodeAt(passOffset);    
    result += "__" + calAscii;
  }
  return result.substring(2);
}

export default encrypt;