const stdio =require('stdio')
const {saveUser} = require('../lib/agenda.js')
const path = require('path')

gatherData().then((res)=>{
    console.log(res)
    saveUser(res,path.resolve(__dirname, '../lib/dbtest.json')) //funcion para crear el usuario
}).catch((error)=>{
    console.log(error)
}) //then necesario para la funcion asincrona, siempre el catch con el then
//console.log(data)

async function gatherData(){
    const username = await stdio.ask('Username?') //que espere a tener la respuesta para imprimirla
    const name = await stdio.ask('Name?')
    const lastName = await stdio.ask('Last Name?')
    const email = await stdio.ask('Email?')
    const phone = await stdio.ask('Phone?')
    return [username, name, lastName, email, phone]
}


//console.log(answer)