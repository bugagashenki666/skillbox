let aAs = [13.123456789, 13.890123, 13.890123];
let aBs = [2.123, 2.891564, 2.891564];
let aNs = [5, 2, 3];

let aResults = [[12345, 12300], [89, 89], [890, 891] ];

function getRest(a, n)
{
    a = Math.abs(a);
    return Math.floor((a - Math.floor(a)) * Math.pow(10, n));
}

function getRests(arrAs, arrNs)
{
    var aResult = [];
    for(i = 0 ; i < arrAs.length ; i++)
    {
        aResult.push(getRest(arrAs[i], arrNs[i]));
    }

    return aResult;
}

function checkConditions(aAs, aBs, aRestsA, aRestsB, aNs)
{
    
    var checkList = {};
    for(i = 0 ; i < aAs.length ; i++)
    {
        var aConditions = {};
        aConditions[aRestsA[i] + ">" + aRestsB[i]] = (aRestsA[i]>aRestsB[i]);
        aConditions[aRestsA[i] + "<" + aRestsB[i]] = (aRestsA[i]<aRestsB[i]);
        aConditions[aRestsA[i] + "<=" + aRestsB[i]] = (aRestsA[i]<=aRestsB[i]);
        aConditions[aRestsA[i] + ">=" + aRestsB[i]] = (aRestsA[i]>=aRestsB[i]);
        aConditions[aRestsA[i] + "===" + aRestsB[i]] = (aRestsA[i]===aRestsB[i]);
        aConditions[aRestsA[i] + "!==" + aRestsB[i]]= (aRestsA[i]!==aRestsB[i]);

        checkList['case a = ' + aAs[i] + "; b = " + aBs[i] + "; n = " + aNs[i]] = aConditions;
    }
    return checkList;
}

function checkResults(aAs, aBs, aRestsA, aRestsB, aNs, aResults)
{
    var checkList = {};
    for(i = 0 ; i < aResults.length ; i++)
    {
        checkList['case a=' + aAs[i] + "; b=" + aBs[i] + "; n=" + aNs[i] + "; restA=" + aRestsA[i] +
         "; restB=" + aRestsB[i] + "; expected restA=" + aResults[i][0] + " restB=" + aResults[i][0]] = 
            (aRestsA[i] == aResults[i][0]) && (aRestsB[i] == aResults[i][1])?"test passed":"test failed";  
    }
    return checkList;
}

console.log(checkResults(aAs, aBs, getRests(aAs, aNs), getRests(aBs, aNs), aNs, aResults));

console.log(checkConditions(aAs, aBs, getRests(aAs, aNs), getRests(aBs, aNs), aNs));