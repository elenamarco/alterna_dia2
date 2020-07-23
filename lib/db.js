const fs = require("fs")
const db = {
    load: (path)=>{
        try{
        const contents = fs.readFileSync(path)
        const parseDb = JSON.parse(contents)
        return parseDb
        }
        catch(error){
            if(error.code == 'ENOENT'){
                console.log(`couldn't find ${path}`)
                return {}
            }else{
                throw error
            }
        }      
    },
    write:(username,fileName)=>{
        const userString = JSON.stringify(username)
        fs.writeFileSync(fileName,userString)
    }
}
module.exports = db