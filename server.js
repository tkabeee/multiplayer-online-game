const express = require('express')
const http = require('http')
const io = require('socket.io')

const app = express()
const server = http.Server(app)

io.listen(server)

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
})

server.listen(8081, function(){
  console.log('Listening on ' + server.address().port)
})