const express =require('express')
const app = express()
const {saveUser, readUser,editUser, deleteUser,listUsers, editActivity, deleteActivity} = require('../agenda.js')
const path = require('path')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const path1 = path.resolve(__dirname, '../agenda.json')

app.get('/user/:username',(req,res)=>{
    const user = readUser(req.params.username, path1)
    res.send(user)
    
})
app.get('/users',(req,res)=>{
    const userList = listUsers(path1)
    res.send(userList)
})
app.post('/user/add', (req,res)=>{
    const datos = [req.body.username,req.body.name,req.body.lastName,req.body.email,req.body.phone]
    const newUser = saveUser(datos ,path1)
    res.send(newUser)
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



app.listen(8003)