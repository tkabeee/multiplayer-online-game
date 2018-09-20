const game = new Phaser.Game(24*32, 17*32, Phaser.Auto, document.getElementById('game'));
const socket = io.connect();
const client = new Client(socket);
const gameState = new GameState(game, client);

socket.on('newplayer', function(data){
  console.log(data);
  gameState.addNewPlayer(data.id, data.x, data.y);
});

socket.on('allplayers', function(data){
  for (var i = 0; i < data.length; i++) {
    gameState.addNewPlayer(data[i].id, data[i].x, data[i].y);
  }
  socket.on('move', function(data) {
    gameState.movePlayer(data.id, data.x, data.y);
  });
  socket.on('remove', function(id) {
    gameState.removePlayer(id);
  });
});

game.state.add('Game', gameState);
game.state.start('Game');