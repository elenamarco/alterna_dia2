const fs = require("fs")
var mysql = require('mysql');
let connection
const db = {
    //  load: (callback)=>{
    //         var connection = mysql.createConnection({
    //         host     : 'localhost',
    //         user     : 'root',
    //         password : 'rel106',
    //         database : 'agendadb'
    //       });
    //       let loadedData = [] 
    //       connection.connect();
          
    //       connection.query('SELECT * FROM users', function (error, results, fields) {
    //         if (error) throw error;
    //         return callback(results)
    //       });
          
          // connection.end();          
        // const contents = fs.readFileSync(path)
        // const parseDb = JSON.parse(contents)
        // return parseDb  
    // },
    databaseName: 'agendadb',
    getConnection: ()=>{
      if (connection === undefined){
        connection = mysql.createConnection({
          host     : 'localhost',
          user     : 'root',
          password : 'rel106',
          database : db.databaseName
        });
        connection.connect();
      }
      return connection
    },
    startTransaction: async ()=>{
      await db.executeQuery('START TRANSACTION')
    },
    rollbackTransaction: async ()=>{
      await db.executeQuery('ROLLBACK')
    },
    commitTransaction: async ()=>{
      await db.executeQuery('COMMIT')
    },
    connectionEnd: async ()=>{
      connection.end()
      connection = undefined
    },
    executeQuery:(sql)=>{
      
      return new Promise((resolve,reject)=>{
        db.getConnection().query(sql, function (error, results, fields) {
          if (error) reject(error);
          resolve(results)
        })
    })       
        // const userString = JSON.stringify(user)
        // fs.writeFileSync(fileName,userString)
    }
    
}


module.exports = db