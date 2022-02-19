import mysql from 'mysql'

const connection = mysql.createConnection({
  port: "3307",
  host: "localhost",
  user: "root",
  password: "password",
  database: "database"
})

connection.connect()

export { connection }