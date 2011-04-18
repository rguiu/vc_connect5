var Player = require("./player").Player;
var Game = require("./game").Game;
var PlayerList = require("./player_list").PlayerList;
var GameList = require("./game_list").GameList;

var net = require('net');
var sys = require('sys');


var players = [];
var game = null;
var gameList = new GameList();
var playerList = new PlayerList({games: gameList});

net.createServer(function (socket) {
  socket.write("Connect 5 server - you soon will be allocated to a game\r\n");
  socket.write("You will need to set your nick ('nick nick_name')\r\n"); 
  var newPlayer = new Player({socket: socket, list: playerList});
  playerList.logged(newPlayer);

//  players.push(newPlayer);
//  if (players.length == 2) {
//    game = new Game({ white: players[0], black: players[1]});
//  }
}).listen(8123, "127.0.0.1");
console.log('Socket Server running at 127.0.0.1:8123');

// Util stuff
Array.prototype.trim = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

Array.prototype.remove = function(element) {
  var index = this.indexOf(element);
  if (index>=0) {
    this.trim(index);
    return element;
  } else {
    return null;
  }
};




