var sys = require('sys');
var Game = require("./game").Game;

var GameList = function() {
  this.playing = [];
};

GameList.prototype.start = function(white,black) {
  game = new Game({ white: white, black: black});
  this.playing.push(game);
  sys.log("new game: "+white.name+" vs "+black.name+"\t\n");
};

exports.GameList = GameList;
