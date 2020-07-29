const db = require("./db")
const path = require('path')
const {}=require('./agenda.js')


function keyNames(path){
    const loadedData = db.load(path)
    const users = Object.keys(loadedData)
    const names = Object.keys(loadedData[users[0]])
    return names
}
function activityData(username, path1){
    const loadedData = db.load(path1)
    let completeActList =[]
    let j = 0
    if("activityList" in loadedData[username]){
        while( j<loadedData[username].activityList.length){
            let actList = []
            for (i=0; i<3; i++){
                actList.push(loadedData[username].activityList[i+j])
            }
            completeActList.push(actList)
            j+=3
        }
    }
    return completeActList
}
function createTableTitle(title){
    let title_row = ''
    for (let i=0; i<title.length; i++){
        title_row +=  `<th>${title[i]}</th>`
    }
    let html = `<tr>${title_row}</tr>`
    return html
}
function createTableBody(contents, title){
    let html = ''
    console.log(contents)
    for(j=0; j<contents.length; j++){
        let userRow = ''
        for (let key in contents[j]){
            userRow += `<td>${contents[j][key]}`
        }
        html += `<tr>${userRow}<tr>`      
    }
    return html

}

module.exports= {keyNames, activityData, createTableTitle, createTableBody}