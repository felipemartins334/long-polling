import http from 'http'
import { connection } from './db.js'
import { runMigrations } from './runMigrations.js'

runMigrations('migrations')

const PORT = 3333
const DELAY = 1000
const LIMIT = 20

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8")
  res.setHeader("Transfer-Encoding", "chunked")
  startTickle(res)
  setInterval(() => {
    res.write('Coloquei um valor')
    connection.query(`
    INSERT INTO info_table()
    VALUES()`)
    connection.emit("sent", res)
  
  }, 5000)
  
})


server.listen(PORT)
server.on("listening", () => {
  console.log('Server is running')
})

connection.on("sent", (res) => {
  connection.query(`SELECT * FROM info_table ORDER BY created_at DESC LIMIT 1`, function(error, results, fields){
    const result = JSON.parse(JSON.stringify(results))
    printData(res, result)
  })})

function printData(res, result){
  res.write(`O evento ocorreu o id do usuário é: ${result[0].id} e a hora foi: ${result[0].created_at}\n`)
}

function startTickle(res){
  setTimeout(function tick(){
    
      res.write(`Tick\n`)
      setTimeout(tick, DELAY)
    
  }, DELAY)

}


