const {keyNames, activityData} = require('../lib/tableFunc.js')
const db = require("../lib/db.js")
const path = require('path')
const path1 = path.resolve(__dirname, '../lib/agenda.json')

it("keyNames function works", ()=>{
    const names = keyNames(path1)

})
it("ActivityData function works", ()=>{
    const actList = activityData("ElenaMarco2", path1)
})