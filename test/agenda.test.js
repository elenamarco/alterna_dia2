const {addUser, addActivity} = require("../lib/agenda.js")

describe ("addUser function",()=>{
    const newUser= ["Elena", "Marco", "elenamarco96@gmail.com", "610976608"]
    const newActivity = ["work", "monday", "9:00"]
    const newActivity2 = ["home", "tuesday", "18:00"]
    function expectedUser(newUser){
        const expUser = addUser(...newUser)
        expect(expUser).toEqual({name:"Elena", lastName:"Marco", email: "elenamarco96@gmail.com", phone: "610976608"})
    }
    it("works creating new function",()=>{
        user = expectedUser(newUser)
 
    })
})
describe ("Add activity function",()=>{
    const newUser= ["Elena", "Marco", "elenamarco96@gmail.com", "610976608"]
    const newActivity = ["work", "monday", "9:00"]
    const newActivity2 = ["home", "tuesday", "18:00"]
    const expUserAct = addActivity(addUser(...newUser), ...newActivity)
    it ("works adding activity",()=>{       
        expect(expUserAct).toEqual({name:"Elena", lastName:"Marco", email: "elenamarco96@gmail.com", phone: "610976608", activityList: ["work", "monday", "9:00"]})
        
    })
    it ("works adding another activty", ()=>{
        const expNewAct = addActivity(expUserAct, ...newActivity2)
        expect(expNewAct).toEqual({name:"Elena", lastName:"Marco", email: "elenamarco96@gmail.com", phone: "610976608", activityList: ["work", "monday", "9:00","home", "tuesday", "18:00"]})

    })

})