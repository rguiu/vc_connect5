var Clock = require("./clock").Clock;

var Player = function(options) {
    this.socket = options.socket;
    this.name = null;
    this.wins = 0;
    this.loses = 0;
    this.game = null;
    this.turn = false;
    this.colour = 0;
    this.list = options.list;
    var me = this;
    this.socket.on("data", function(data) {
      options.socket.write(me.dispatch(data));
    });
    this.clock = new Clock();
};

Player.prototype.message = function(msg) {
  this.socket.write("msg: "+ msg + "\t\n");    
};

Player.prototype.startGame = function(colour, game) {
  this.colour = colour;
  this.game = game;
  this.clock.reset();
  opponent = colour==1 ? game.black.name : game.white.name;
  this.socket.write("Match start: you play "+ (colour==1?"white":"black") +" vs " + opponent +"\t\n");
};

Player.prototype.opponentMove = function(x,y) {
  this.socket.write("opponent: "+x+" "+y+"\t\n");
};

Player.prototype.yourTurn = function() {
  this.clock.restart();
  this.socket.write("Your turn ("+ this.clock.total_time +")\t\n");
};

Player.prototype.dispatch = function(data) {
  value = data.toString();
  params = value.split(' ');
  command = params[0];
  params.trim(0);
  try {
    // @todo is not safe and could have all kind of nasty code injections... so restrict the commans later
    return this[command](params) +"\t\n";
  } catch (err) {
    return "KO: " + err +"\t\n";
  }
};

Player.prototype.nick = function(args) {
  this.name = args.join(' ').trim();
  this.list.identify(this);
  return "OK: identified as: "+this.name;
};

Player.prototype.move = function(args) {
  try {
    x = parseInt(args[0]);
    y = parseInt(args[1]);
    
    if (this.game.isValidMove(this,x,y)) {
      this.clock.stop();
      return this.game.move(this,x,y);
    } else {
      if (game.turn != this.colour) {
        sys.log(this.name+" tried to move out of his turn");
        return "KO not your turn";
      } else {
        sys.log(this.name+" tried to do an invalid move: "+x+","+y);
        return "KO invalid move ";
      }
    }
  } catch (err) {
    return "KO: "+err;
  }
};

exports.Player = Player;
