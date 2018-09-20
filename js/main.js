const game = new Phaser.Game(24*32, 17*32, Phaser.Auto, document.getElementById('game'));
const client = new Client(io);
const gameState = new GameState(game, client);

client.socket.on('newplayer', function(data){
  gameState.addNewPlayer(data.id, data.x, data.y);
});

client.socket.on('allplayers', function(data){
  for(var i = 0; i < data.length; i++) {
    gameState.addNewPlayer(data[i].id, data[i].x, data[i].y);
  }
  client.socket.on('move', function(data) {
    gameState.movePlayer(data.id, data.x, data.y);
  });
  client.socket.on('remove', function(id) {
    gameState.removePlayer(id);
  });
});

game.state.add('Game', gameState);
game.state.start('Game');