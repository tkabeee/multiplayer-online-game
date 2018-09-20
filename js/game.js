class GameState {
  constructor(game, client) {
    this.game = game;
    this.client = client;
  }

  init() {
    this.game.stage.disableVisibilityChange = true;
  }

  preload() {
    this.game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.spritesheet('tileset', 'assets/map/tilesheet.png', 32, 32);
    this.game.load.image('sprite', 'assets/sprites/sprite.png');
  }

  create() {
    this.playerMap = {}
    const testKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    testKey.onDown.add(() => {
      this.client.sendTest();
    }, this);
    const map = this.game.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
    let layer;
    for (var i = 0; i < map.layers.length; i++) {
      layer = map.createLayer(i);
    }
    layer.inputEnabled = true; // Allows clicking on the map ; it's enough to do it on the last layer
    layer.events.onInputUp.add((layer, pointer) => {
      this.getCoordinates(layer, pointer);
    }, this);
    this.client.askNewPlayer();
  }

  getCoordinates(layer, pointer) {
    this.client.sendClick(pointer.worldX, pointer.worldY);
  }

  addNewPlayer(id, x, y) {
    this.playerMap[id] = this.game.add.sprite(x, y, 'sprite');
  }

  movePlayer(id, x, y) {
    const player = this.playerMap[id];
    const distance = Phaser.Math.distance(player.x, player.y, x, y);
    const tween = this.game.add.tween(player);
    const duration = distance * 10;
    tween.to({x:x, y:y}, duration);
    tween.start();
  }

  removePlayer(id) {
    this.playerMap[id].destroy();
    delete this.playerMap[id];
  }
}