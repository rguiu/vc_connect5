var sys = require('sys');

var PlayerList = function(options) {
  this.playing = [];
  this.available = [];
  this.unknown = [];
  this.games = options.games;
};

PlayerList.prototype.logged = function(player) {
  this.unknown.push(player);
  sys.log("New player connected");
};

PlayerList.prototype.identify = function(player) {
  this.unknown.remove(player);
  this.available.push(player);
  sys.log("Player '"+player.name+"' identified");
  this.startMatches();
};

// @todo
// this match making should be changed
PlayerList.prototype.startMatches = function() {
  if(this.available.length >= 2) {
    white = this.available[0];
    this.available.trim(0);
    black = this.available[0];
    this.available.trim(0);
    this.games.start(white,black);
  }
};

exports.PlayerList = PlayerList;
