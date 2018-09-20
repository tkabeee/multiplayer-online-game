class Client {
  constructor(io) {
    this.socket = io.connect();
  }

  sendTest() {
    console.log('test sent');
    this.socket.emit('test');
  }

  askNewPlayer() {
    this.socket.emit('newplayer');
  }

  sendClick(x, y) {
    this.socket.emit('click', {x:x, y:y});
  }
}