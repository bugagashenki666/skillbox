let aNamesSurnames = [{'name':'ВАсилий', 'surname': "ПУПкиН"}, 
                      {'name':"VoLandeMoRT", 'surname':"GitLer"}, 
                      {'name':"Гадя", 'surname':"хренова"}, 
                      {'name':"ВжиштеК", 'surname':"Мразишь"},
                      {'name':"Обама", 'surname':"ЧМО"}];

function capitolizeNames(aNames)
{
    var fixedNames = [];
    for(var i = 0 ; i < aNames.length ; i++)
    {
        fixedNames[i] = {'name':"", 'surname':""};
        fixedNames[i]['name'] = aNames[i]['name'][0].toUpperCase() +  
                                aNames[i]['name'].substr(1, aNames[i]['name'].length - 1).toLowerCase();
        fixedNames[i]['surname'] = aNames[i]['surname'][0].toUpperCase() +  
                                    aNames[i]['surname'].substr(1, aNames[i]['surname'].length - 1).toLowerCase();
    }
    return fixedNames;
}

function checkCommits(capitalizedNames, sourceNames)
{
    var logUpdates = {};
    for(var i = 0 ; i < sourceNames.length ; i++)
    {
        logUpdates["Record N" + i + " name: " + capitalizedNames[i]["name"]] = 
        (sourceNames[i]['name'] === capitalizedNames[i]['name'])?"wasn\'t changed":"was changed. Initial value of name is " + 
        sourceNames[i]["name"];
        logUpdates["Record N" + i + " surname: " + capitalizedNames[i]["surname"]] = 
        (sourceNames[i]['surname'] === capitalizedNames[i]['surname'])?"wasn\'t changed":"was changed. Initial value of surname is " + 
        sourceNames[i]["surname"];
    }
    return logUpdates;
}

console.log(checkCommits(capitolizeNames(aNamesSurnames), aNamesSurnames));