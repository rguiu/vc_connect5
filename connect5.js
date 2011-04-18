var player = require("./player");
var gameMod = require("./game");
var net = require('net');


var players = [];
var game = null;

net.createServer(function (socket) {
  socket.write("Connect 5 server - you soon will be allocated to a game\r\n");
  
//  socket.on("data", function(data) {
//        socket.write(proccess(data));
//        for (int = i=0;i<players.length;i++) {
//          players[i].write("someone said something\n");
//        }
//    }
//  );
  console.log(playerMod);
  var newPlayer = new Player(socket);
  players.push(newPlayer);
  if (players.length == 2) {
    game = new Game(players[0], players[1]);
  }
  //socket.pipe(socket);
}).listen(8123, "127.0.0.1");
console.log('Socket Server running at 127.0.0.1:8123');

/*
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(8180, "127.0.0.1");
console.log('Http Server running at http://127.0.0.1:8180/');
*/


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

// commands



// Util stuff
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};


