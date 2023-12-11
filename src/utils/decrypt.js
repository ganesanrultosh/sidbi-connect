const decrypt = (password) => {
  if(password) {
    var passcode = "sidbi@123";
    var codesArry = password.split("__");
    var result = "";
    for(var i = 0; i < codesArry.length; i++) {
      var passOffset = i % passcode.length;
      var calAscii = (codesArry[i]) - passcode.charCodeAt(passOffset);
      result += String.fromCharCode(calAscii);
    }
    return result;
  }  
}

export default decrypt;