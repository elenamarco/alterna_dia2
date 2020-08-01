const express =require('express')
const db = require('../db.js')
const app = express()
const {saveUser, readUser,editUser, deleteUser,listUsers, editActivity, deleteActivity} = require('../agenda.js')
const path = require('path')
const {keyNames, activityData, createTableTitle, createTableBody} = require('../tableFunc.js')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.static('public'))
const database = 'agendadb'

const path1 = path.resolve(__dirname, '../agenda.json')

app.get('/user/:username',(req,res)=>{

    const user = readUser(req.params.username, path1)
    res.header('Access-Control-Allow-Origin','*')
    res.send(user)
    
})
app.get('/users',(req,res)=>{
    // const userList = listUsers
    res.header('Access-Control-Allow-Origin','*')
    // res.send(userList)
    db.load((userList)=>{
        res.send(userList)
    })
})
app.post('/user/add', (req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    const datos = [req.body.username,req.body.name,req.body.lastname,req.body.email,req.body.phone]
    try{
        const newUser = saveUser(datos)
        res.send(newUser)

    }catch(e){
        res.send('Username taken')
    }   
})
app.options('/user/add',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','*')
    res.send('OK')
})

app.post('/user/:username/delete',(req,res)=>{
    try{
        deleteUser(req.params.username, path1)
        res.send(`${req.params.username} has been deleted.`)
    }catch(err){
        res.send(`${req.params.username} does not exist.`)
    }
})
app.post('/user/:username/edit',(req,res)=>{
    const datos = [req.body.username,req.body.name,req.body.lastName,req.body.email,req.body.phone]
    const modifiedUser = editUser(datos,path1)
    res.send(modifiedUser)    
})
app.post('/user/:username/:activityName/edit',(req,res)=>{
    const modifications = [req.body.date, req.body.time]
    const modifiedActivity = editActivity(req.body.username, req.body.activityName, modifications, path1)
    res.send(modifiedActivity)
})
app.post('/user/:username/:activityName/delete',(req,res)=>{
    try{
        deleteActivity(req.body.username, req.body.activityName, path1)
        res.send(`${req.body.activityName} has been deleted`)
    }catch(err){
        res.send(`${req.body.activityName} does not exist.`)
    }   
})
app.get('/front/users', (req,res)=>{
    let html= `<head><link rel="stylesheet" type="text/css" href="mystyle.css""> <style> table {
    border-collapse: collapse;
    }
    table, th, td {
        border: 1px solid black;
    }
    th, td{
        padding: 15px;
        text-align: left;
    }
    } </style></head><body><h2>List of users:</h2>`
    html += `<table>`

    const title = keyNames(path1)
    for (let i=0; i<title.length; i++){
        if(title[i] == "activityList"){
            title.splice(i,1)
        }
    }
    html += createTableTitle(title)
    const userList = listUsers(path1)
    let userDataList = []
    for (let i=0; i<userList.length; i++){
        userData = readUser(userList[i].username, path1)
        if ("activityList" in userData){
            delete userData.activityList
        }
        userDataList.push(userData)

    }
    html += createTableBody(userDataList, title)
    html += '</table></body>'
    res.send(html)
})
app.get('/front/activities/:username', (req,res)=>{
    let html= `<head><link rel="stylesheet" type="text/css" href="mystyle.css""> <style> table {
        border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td{
            padding: 15px;
            text-align: left;
        }
        } </style></head><body><h2>List of activities of ${req.params.username}:</h2>`
    html += `<table>`
    
    const actList = activityData(req.params.username, path1)
    html += createTableTitle(["Activity", "Date", "Time"]) 
    // for (i=0; i<actList.length; i++){
    //     activityRow = ''
    //     for (j=0; j< actList[i].length; j++){
    //         activityRow += `<td>${actList[i][j]}`
    //     }
    //     html += `<tr>${activityRow}<tr>`
    // }
    html += createTableBody(actList,["Activity", "Date", "Time"])
    html += '</table></body>'
    res.send(html)
})

app.listen(8003)