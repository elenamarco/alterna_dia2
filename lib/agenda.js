const db = require("./db")
const path = require('path')

function addUser(username,name, lastName, email, phone){

    const user = {username:username, name: name, lastName: lastName, email: email, phone: phone}
    return user
}

function saveUser(datos, path){
    const loadedData = db.load(path)
    const newUsername = datos[0]
    if (newUsername in loadedData){
        console.log(`Err: ${newUsername} already exists`)
    }else{
        const newUser= addUser(...datos)
        loadedData[newUsername] = newUser
        db.write(loadedData, path) 
    }
    newUserData = db.load(path)
    return newUserData[newUsername] 
}
function readUser(username, path){
    const loadedData = db.load(path)
    if (username in loadedData){  
        return loadedData[username]
    }else{
        console.log(`Err: ${username} doesn't exist`)
    }  
}

function addActivity(datos, path){ 
    const loadedData = db.load(path)  
    let newactivityList = [datos[1], datos[2], datos[3]]
    const user = datos[0]
    const userData = loadedData[user]
    let flag = 0
    if (user in loadedData){
        if ("activityList" in loadedData[user]){
            for (let i=0; i<loadedData[user].activityList.length; i++){
                if (loadedData[user].activityList[i] == newactivityList[0]){
                    flag = 1
                    console.log(`Activity name "${datos[1]}" already exists`)
                    activityList = [...userData.activityList]
                    break
                }
           }
            if (flag == 0){             
                activityList = [...userData.activityList, ...newactivityList]
                console.log(activityList)
            }                
        }
        else{
            activityList = newactivityList
        }
        flag = 0
        loadedData[user] = {...userData, activityList: activityList}
        db.write(loadedData, path)

    }else{
        console.log(`${user} doesn't exist`)
    }
}
function editUser(datos, path){
    const username = datos[0]
    const loadedData = db.load(path)

    const currentData = readUser(username,path)
    const newData = addUser(...datos)
    if ("activityList" in currentData){
        loadedData[newData.username] = {...newData, activityList: currentData.activityList}
        
    }else{
        loadedData[newData.username] = {...newData}
    }
    db.write(loadedData, path)
    const modifiedUser=readUser(username, path)
    return modifiedUser
}

function deleteUser(username, path){
    const loadedData = db.load(path)
    try{
        delete loadedData[username]
        db.write(loadedData, path)
    }
    catch(err){
        console.log(`"${username} doesn't exist`)
        throw error
    }
}
function listUsers(path){
    const loadedData=db.load(path)
    let userList = []
    for (let key in loadedData){
        let user = readUser(key, path)
        userList.push(user)        
    }
    
    return userList
}
function editActivity(username,activityName, modifications, path){
    const loadedData = db.load(path)
    const currentData = readUser(username,path)
    let flag = 0
    try{
        for (let i=0; i<loadedData[username].activityList.length; i++){
            if(loadedData[username].activityList[i]==activityName){              
                loadedData[username].activityList[i+1]=modifications[0]
                loadedData[username].activityList[i+2]=modifications[1]
                flag = 1
            }
        }
        if (flag == 1){
            db.write(loadedData,path)
            editedActivity = readUser(username,path)
            return (editedActivity.activityList)
        }    
    }catch(err){
        if (flag==0){
            console.log(`Activity ${activityName} does not exist`)
            throw Error
        }
        
    }
    

}
function deleteActivity(username,activityName,path){
    const loadedData = db.load(path)
    const currentData = readUser(username,path)
    let flag = 0
    try{
        for (let i=0; i<loadedData[username].activityList.length; i++){
            if(loadedData[username].activityList[i]==activityName){              
                loadedData[username].activityList.splice(i,3)
                flag = 1
            }
        }
        if (flag == 1){
            db.write(loadedData,path)
        }
    }catch(err){
        if (flag == 0){
            console.log(`Activity ${activityName} does not exist.`)
            throw Error
        }
    }
}


module.exports = {addUser, saveUser, readUser, addActivity, editUser,deleteUser, listUsers, editActivity, deleteActivity}