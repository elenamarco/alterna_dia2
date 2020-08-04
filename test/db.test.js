const db = require("../lib/db.js")
db.databaseName = 'agendadb_test'
const {saveUser, listUsers, addActivity, readUser, readUserActivities, updateUser, editActivity, deleteActivity, deleteUser} = require("../lib/agenda.js")

const path = require('path')

beforeEach(()=>{
    return db.startTransaction()
})

afterEach(()=>{
    return db.rollbackTransaction().then(()=>{
        return db.connectionEnd()
    })
})

describe("db function",()=>{
    it('works adding user', ()=>{
        const newUser = ['Elena1', 'Elena', 'Marco', 'email', 'phone']
        return saveUser(newUser).then((queryResult)=>{
            db.executeQuery('SELECT * FROM users WHERE username="Elena1"').then((queryResult)=>{
                expect(queryResult.length).toBe(1)
            })
        })
    })
    it ('works listing users', ()=>{
        return listUsers().then((queryResult)=>{
            expect(queryResult.length).toBe(2)
        })
    })
    it ("works reading one user", ()=>{
        return readUser('Calu').then((queryResult)=>{
            db.executeQuery('SELECT * FROM users WHERE username="Calu"').then((queryResult)=>{
                expect(queryResult[0].surname).toEqual('marco')
            })
        })
    })
    it ("works adding activity", ()=>{
        const newAct = ["Calu", "home", "tuesday", "2"]
        return addActivity(newAct).then((queryResult)=>{
            db.executeQuery('SELECT * FROM activities WHERE user = "Calu"').then((queryResult)=>{
                expect(queryResult[1].activity_name).toEqual('home')
            })
        })

     })
    it ("works reading activities", ()=>{
        return readUserActivities("Calu").then((queryResult)=>{
            expect(queryResult[0].activity_name).toEqual('work')
        })
    })
    it ("works updating user", ()=>{
        newData = {surname : 'garcia', phone : 'phone2'}
        return updateUser("Calu", newData).then((queryResult)=>{
            db.executeQuery('SELECT * FROM users WHERE username="Calu"').then((queryResult)=>{
                expect(queryResult[0].phone).toEqual('phone2')
            })
        })
    })
    it ("works updating activity", ()=>{
        newData = {activity_hour: '10'}
        return editActivity("Calu", "work", newData).then((queryResult)=>{
            db.executeQuery('SELECT * FROM activities WHERE user = "Calu" AND activity_name = "work"').then((queryResult)=>{
                expect(queryResult[0].activity_hour).toEqual('10')
            })
        })
    })    
    it ("works deleting activity", ()=>{
        return deleteActivity("Calu", "gym").then((queryResult)=>{
            readUserActivities("Calu").then((queryResult)=>{
                expect(queryResult.length).toEqual(1)
            })
        })
    })
    it("works deleting user", ()=>{
        return deleteUser("Elen").then((queryResult)=>{
            db.executeQuery('SELECT * FROM users WHERE username = "Elen"').then((queryResult)=>{
                expect(queryResult).toThrow(error) //medir que lance un error
            
        })
    })
    })
    })