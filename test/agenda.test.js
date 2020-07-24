const {addUser, addActivity, saveUser} = require("../lib/agenda.js")
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
describe ("Add activity function",()=>{
    const newUser= ["username","Elena", "Marco", "email", "phone"]
    const newActivity = ["work", "monday", "9:00"]
    const newActivity2 = ["home", "tuesday", "18:00"]
    const expUserAct = addActivity(addUser(...newUser), ...newActivity)
    it ("works adding activity",()=>{       
        expect(expUserAct).toEqual({username:"username", name:"Elena", lastName:"Marco", email: "email", phone: "phone", activityList: ["work", "monday", "9:00"]})
        
    })
    it ("works adding another activty", ()=>{
        const expNewAct = addActivity(expUserAct, ...newActivity2)
        expect(expNewAct).toEqual({username: "username",name:"Elena", lastName:"Marco", email: "email", phone: "phone", activityList: ["work", "monday", "9:00","home", "tuesday", "18:00"]})

    })

})
describe ("Save user function",()=>{
    const newUser= ["ElenaMarco", "Elena", "Marco", "email", "phone"]
    const path1 = path.resolve(__dirname, '../lib/dbtest.json')
    it ("writes user",()=>{
        const data = saveUser(newUser, path1)
        const loadedData = db.load(path1)
        expect(loadedData).toEqual({"ElenaMarco":{username: "ElenaMarco",name:"Elena", lastName:"Marco", email: "email", phone: "phone"}})
    })
})