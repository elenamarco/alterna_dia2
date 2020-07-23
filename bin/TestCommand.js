const stdio =require('stdio')

gatherData().then((res)=>{
    console.log(res) //funcion para crear el usuario
}).catch((error)=>{
    console.log(error)
}) //then necesario para la funcion asincrona, siempre el catch con el then
//console.log(data)

async function gatherData(){
    const answer = await stdio.ask('Question?') //que espere a tener la respuesta para imprimirla
    const answer2 = await stdio.ask('Question2?')
    return (answer, answer2)
}


//console.log(answer)