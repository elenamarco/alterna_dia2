const stdio =require('stdio')
const {saveUser, addActivity, readUser} = require('../lib/agenda.js')
const path = require('path')

gatherData().then((res)=>{
    if (res[0]==1){
      saveUser(res[1],path.resolve(__dirname, '../lib/agenda.json')) //funcion para crear el usuario
    }
    else if (res[0]==2){
        addActivity(res[1],path.resolve(__dirname, '../lib/agenda.json'))
    }
    else if(res[0] == 3){
        loadedData = readUser(res[1], path.resolve(__dirname, '../lib/agenda.json'))
        console.table(loadedData)

    }
}).catch((error)=>{
    console.log(error)
}) //then necesario para la funcion asincrona, siempre el catch con el then
//console.log(data)

async function gatherData(){
    const option = await stdio.ask('1: Create user \n 2: Add activity \n 3: Show user data')
    if (option ==1){
        const username = await stdio.ask('Username?') //que espere a tener la respuesta para imprimirla
        const name = await stdio.ask('Name?')
        const lastName = await stdio.ask('Last Name?')
        const email = await stdio.ask('Email?')
        const phone = await stdio.ask('Phone?')
        const data = [username, name, lastName, email, phone]
        return ([option, data]) 
    }else if(option==2){
        const username = await stdio.ask('Username?')
        const name = await stdio.ask('Activity name?')
        const date = await stdio.ask('Date?')
        const time = await stdio.ask('Time?')
        const data = [username, name, date, time]
        return ([option, data])
    }
    else if(option==3){
        const username = await stdio.ask('Username?')
        return([option, username])
    }

}    


//console.log(answer)