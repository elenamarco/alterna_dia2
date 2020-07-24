const db = require("./db")

function addUser(username,name, lastName, email, phone){

    const user = {username:username, name: name, lastName: lastName, email: email, phone: phone}
    return user
}

function addActivity(user, name, date, time){   
    let activityList = [name, date,time]
    if ("activityList" in user){
        activityList = [...user.activityList, ...activityList]
    }
    const newUser = {...user, activityList: activityList}
    return newUser

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
}

module.exports = {addUser, addActivity, saveUser}