function addUser(name, lastName, email, phone){

    const user = {name: name, lastName: lastName, email: email, phone: phone}
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

module.exports = {addUser, addActivity}