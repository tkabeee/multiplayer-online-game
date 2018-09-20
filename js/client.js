class Client {
  constructor(socket) {
    this.socket = socket;
  }

  sendTest() {
    console.log('test sent');
    console.log(this.socket);
    this.socket.emit('test');
  }

  askNewPlayer() {
    console.log('askNewPlayer');
    this.socket.emit('newplayer');
  }

  sendClick(x, y) {
    this.socket.emit('click', {x:x, y:y});
  }
}