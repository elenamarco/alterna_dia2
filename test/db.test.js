const db = require("../lib/db.js")
const {addUser} = require("../lib/agenda.js")

const path = require('path')

describe("db function",()=>{
    user = addUser("username", "name", "apellidos", "email","phone")
    it ("Load file function",()=>{
     const data=db.load('')
     expect(data).toEqual({})
    })
    it ("works with existing file",()=>{
        const loadedData= db.load(path.resolve(__dirname, '../lib/dbtest2.json'))
        expect(loadedData.username).not.toBe(undefined)
    })
    it ("writes user on empty file",()=>{
        const path1 = path.resolve(__dirname, '../lib/dbtest2.json')
        const dataRead = db.load(path1)
        db.write(user,path1)
        const dataRead2 = db.load(path1)
        expect(dataRead).toEqual(user)
    })
})