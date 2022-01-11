var aNs = [0, 2, 100, -3];
var aMs = [100, 5, -5, -10];

function getOddRandom(limit1, limit2)
{
    var max = Math.max(limit1, limit2);
    var min = Math.min(limit1, limit2);
    var res = Math.round((max - min) * Math.random()) + min;
    if(Math.abs(res % 2) === 1) return res;
    else{
        if(res + 1 <= max ) return res + 1;
        else if(res - 1 >= min) return res - 1; 
    }
    return null;
}

function getRandom(limit1, limit2)
{
    return getOddRandom(limit1, limit2);
}

function getRandoms(aNs, aMs)
{
    var aRandoms = [];
    for(var i = 0 ; i < aNs.length ; i++)
    {
        aRandoms[i] = getRandom(aNs[i], aMs[i]);
    }
    return aRandoms;
}

function test(aNs, aMs, amountTests)
{
    var aTests = {};
    for(var i = 0 ; i < amountTests ; i++)
    {
        aTests["test N" + (i + 1)] = check(aNs, aMs, getRandoms(aNs, aMs));
    }
    return aTests;
}

function check(aLimits1, aLimits2, aResults)
{
    var results = {}
    for(var i = 0 ; i < aResults.length ; i++)
    {
        var min = Math.min(aLimits1[i], aLimits2[i]);
        var max =  Math.max(aLimits1[i], aLimits2[i]);
        results[("min=" + min + "; max=" + max)] = min + "<=" + aResults[i] + "<=" + max + ": " + 
        (((min <= aResults[i]) && (aResults[i] <= max) && (Math.abs(aResults[i] % 2) === 1))?"test passed":"test failed");
    }
    return results;
}

console.log(test(aNs, aMs, 10));