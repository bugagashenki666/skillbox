let aValidPasswords = ["1234-", "4321_", "qaz-xsw", "_zxd"];
let aInvalidPasswords = ["_-a", "qaz", "_-3", "123456789"];

let aPasswords = aValidPasswords.concat(aInvalidPasswords);

function checkPasswordRegExp(strPassword)
{
    var regExp1 = /[A-Za-z0-9_-]{1}/gi;
    var regExp2 = /[-_]{1}/gi;
    var matches1 = strPassword.match(regExp1);
    if(matches1 === null) return false;
    var matches2 = strPassword.match(regExp2);
    if(matches2 === null) return false
    return (matches1.length >= 4) && (matches2.length >= 1); 
}

function checkPasswordClassic(strPassword)
{
    if(strPassword.length < 4) return false;
    if(strPassword.includes("-") || strPassword.includes("_")) return true;
    return false;
}

function testAll(aPass)
{
    var aResults = {};
    for(var i = 0 ; i < aPass.length ; i++)
    {
        aResults["password: \'" + aPass[i] + "\'"] = checkPasswordClassic(aPass[i])?"is valid":"is invalid"; 
    }
    return aResults;
}

console.log(testAll(aPasswords));