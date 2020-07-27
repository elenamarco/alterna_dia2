const {addUser, saveUser, readUser, addActivity, editUser,deleteUser, listUsers, editActivity, deleteActivity} = require("../lib/agenda.js")
const db = require("../lib/db.js")
const path = require('path')

describe ("addUser function",()=>{
    const newUser= ["username","Elena", "Marco", "elenamarco96@gmail.com", "610976608"]
    const newActivity = ["work", "monday", "9:00"]
    const newActivity2 = ["home", "tuesday", "18:00"]
    function expectedUser(newUser){
        const expUser = addUser(...newUser)
        expect(expUser).toEqual({username: "username", name:"Elena", lastName:"Marco", email: "elenamarco96@gmail.com", phone: "610976608"})
    }
    it("works creating new function",()=>{
        user = expectedUser(newUser)
 
    })
})

describe ("Save user function",()=>{
    const newUser= ["ElenaMarco2", "Elena", "Marco", "email", "phone"]
    const path1 = path.resolve(__dirname, '../lib/agenda.json')
    it ("writes new user",()=>{
        const data = saveUser(newUser, path1)
        const loadedData = db.load(path1)
        expect(loadedData[newUser[0]].username).toEqual("ElenaMarco2")
    })

})
describe ("Read user function",()=>{
    const username = "ElenaMarco"
    const path1 = path.resolve(__dirname, '../lib/agenda.json')
    it ("reads info from existing user", ()=>{
        const data = readUser(username, path1)
        expect(data.username).toEqual("ElenaMarco")

    }) 

})
// describe ("Add activity function",()=>{
//     const newActivity = ["ElenaMarco", "work", "monday", "9:00"]
//     const newActivity2 = ["ElenaMarco","home", "tuesday", "18:00"]
//     const path1 = path.resolve(__dirname, '../lib/agenda.json')
//     const expUserAct = addActivity(newActivity,path1)  
//     it ("works adding activity",()=>{    
//         const loadedData = db.load(path1)   
//         expect(loadedData).toEqual({ElenaMarco:{username:"ElenaMarco", name:"Elena", lastName:"Marco", email: "email", phone: "phone", activityList: ["work", "monday", "9:00"]}})
        
//     })

//     it ("works when the activity already exists",()=>{
//         const expNewAct = addActivity(newActivity, path1)
//         const loadedData = db.load(path1)
//         expect(loadedData).toEqual({ElenaMarco:{username: "ElenaMarco",name:"Elena", lastName:"Marco", email: "email", phone: "phone", activityList: ["work", "monday", "9:00"]}})

//     })
//     it ("works when adding another activity",()=>{
//         const expnewAct = addActivity(newActivity2, path1)
//         const loadedData = db.load(path1)
//         expect(loadedData[newActivity[0]].activityList).toEqual(["work", "monday", "9:00","home", "tuesday", "18:00"])
//     })

// })
describe ("Edit user function", ()=>{
    const editedUser = ["ElenaMarco", "Elena2", "Marco", "email", "phone"]
    const editedUser2 = ["ElenaMarco2", "Elena2", "Marco", "email", "phone"]
    const path1 = path.resolve(__dirname, '../lib/agenda.json')
    console.log(path1)
    const loadedData = db.load(path1)
    it ("works modifying one element when there is an activity", ()=>{
        newuser = editUser(editedUser, path1)
        expect(loadedData[editedUser[0]].name).toEqual("Elena2")
            
    })
    it("works modifying one element when there is no activity",()=>{
        newuser = editUser(editedUser2, path1)
        expect(loadedData[editedUser2[0]]).toEqual({"username":"ElenaMarco2","name":"Elena2","lastName":"Marco","email":"email","phone":"phone"})
    })
})
describe("Delete user function",()=>{
    const username = "ElenaMarco3"
    const path1 = path.resolve(__dirname, '../lib/agenda.json')
    
    const loadedData = db.load(path1)
    
    it("works eliminating user",()=>{
        deleteUser(username,path1)
        expect(loadedData[username]).toEqual(undefined)
        
    })

})
describe ("List of users function", ()=>{
    const path1 = path.resolve(__dirname, '../lib/agenda.json')
    const list = listUsers(path1)
    expect(list[0].username).toEqual("ElenaMarco")

})
describe ("Edit activity function", ()=>{
    const path1 = path.resolve(__dirname, '../lib/agenda.json')
    activityName = "work"
    modifications = ["today", "2"]
    modifiedActivity = editActivity("ElenaMarco", activityName, modifications, path1)
    expect(modifiedActivity[1]).toEqual("today")
})
describe ("Delete activity function", ()=>{
    const path1 = path.resolve(__dirname, '../lib/agenda.json')
    activityName = "home"
    username = "ElenaMarco"
    deleteActivity(username, activityName, path1)
    loadedData=db.load(path1)
    expect(loadedData[username].activityList[0]).not.toEqual("home")
})