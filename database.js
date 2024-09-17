const {createPool} = require('mysql')

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    connectionLimit: 10
})

pool.query(`select * from apidb.users`, (err, res)=>{
    return console.log(res)
})