import http  from 'http'

const PORT = 3333
const DELAY = 100
const LIMIT = 20

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8")
  res.setHeader("Transfer-Encoding", "chunked")
  startTickle(res)

})


server.listen(PORT)
server.on("listening", () => {
  console.log('Server is running')
})

let tickle = 0
function startTickle(res){
  setTimeout(function tick(){
    console.log(tickle)
    if(++tickle > LIMIT){
      tickle = 0
      res.write('END\n')
      res.end()
    }else{
      setTimeout(tick, DELAY)
    }
  }, DELAY)

}
