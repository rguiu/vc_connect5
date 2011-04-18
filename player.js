var Player = function(socket) {
    this.socket = socket;
    this.name = null;
    this.wins = 0;
    this.loses = 0;
    this.game = null;
    this.turn = false;
    this.colour = 0;
    socket.on("data", function(data) {
      socket.write(proccess(data));
    });
}

Player.prototype.message = function(msg) {
  socket.write("msg: "+ msg + "\t\n");    
};

Player.prototype.startGame = function(colour, game) {
  this.colour = colour;
  this.game = game;
  this.socket("Match start: you play "+ (colour==1?"white":"black") +" vs " + game.black.name);
};

Player.prototype.opponentMove = function(x,y) {
  socket.write("opponent: "+x+","+y);
};

Player.prototype.yourTurn = function() {
  socket.write("Your turn"); // here we can say how much time left
};


var proccess = function (data) {
  value = data.toString();
  params = value.split(' ');
  return dispatch(params);
};

var dispatch = function(params) {
  command = params[0];
  params.remove(0);
  return command + " args:{ " + params.join(',') +"}\n"
}



