let aX1 = [2, 10, -5, 5, 8, 6];
let aY1 = [3, 5, 8, 8, 1, 6];
let aX2 = [10, 2, 10, 5, 5, 7];
let aY2 = [5, 3, 5, 5, 1, 7];

let aResults = [16, 16, 45, 0, 0, 100000000];

function square(width, height)
{
    return width * height;
}

function calcWidth(x1, x2)
{
    return Math.abs(Math.max(x1, x2) - Math.min(x1, x2));
}

function calcHeight(y1, y2)
{
    return Math.abs(Math.max(y1, y2) - Math.min(y1, y2));
}

function test(x1, y1, x2, y2, result)
{
    var width = calcWidth(x1, x2);
    var height = calcHeight(y1, y2);
    var testPassed = square(width, height) === result;
    const s = (width.toString() + "*" + height.toString() + (testPassed?"=":"!=") + result.toString()).toString();
    var hResult = {};
    hResult[s] = testPassed?"test passed":"test failed";
    return  hResult;
}

function testAllCases(x1, y1, x2, y2, results)
{
    var checkList = {};
    for(i = 0 ; i < results.length ; i++)
    {
        checkList['calculation N' + (i + 1)] = test(x1[i], y1[i], x2[i], y2[i], results[i]);
        //testChecks = Object.assign({}, testChecks, test(x1[i], y1[i], x2[i], y2[i], results[i])); // delete all equal keys
    }
    return checkList;
}



console.log(testAllCases(aX1, aY1, aX2, aY2, aResults));