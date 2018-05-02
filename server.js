import express from 'express'
import http from 'http'
import io from 'socket.io'

const app = express()
const server = http.Server(app)

io.listen(server)

server.listen(8081, function(){
  console.log('Listening on ' + server.address().port)
})