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
//function saveUser(username,name, lastName, email, phone){
  //  const newUser= {username: username, ...addUser(name, lastName, email, phone)}
    //data.push(newUser)
    //return data


//}

module.exports = {addUser, addActivity}