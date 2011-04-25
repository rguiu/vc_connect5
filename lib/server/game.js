var sys = require('sys');

var BOARD_SIZE = 15;
var MAX_MOVES = BOARD_SIZE * BOARD_SIZE;
function Game(options) {
  this.BOARD_SIZE = 15;
  this.white = options.white;
  this.black = options.black;
  this.squares = new Array(BOARD_SIZE);

  //this.squares.forEach(function(a) {a = new Array(BOARD_SIZE);});
  for (i=0;i<BOARD_SIZE;i++) {
    this.squares[i] = new Array(BOARD_SIZE);
  }
  
  this.turn = 0;
  this.start();
  this.moves = 0;
};

Game.prototype.start = function() {
  this.white.startGame(1, this);
  this.black.startGame(2, this);
  this.turn = 1;
  this.white.yourTurn();
};

Game.prototype.isValidMove = function(player, x, y) {
  return (this.turn == player.colour && x < BOARD_SIZE && x>=0 && y < BOARD_SIZE && y >= 0 && this.squares[x][y] == null );
};

Game.prototype.move = function(player, x, y) {
  if (!this.isValidMove(player,x,y)) {
    return "KO: not a valid move";
  } else {
    this.moves++;
    this.squares[x][y] = player.colour;
    sys.log(player.name+" moved "+x+","+y);
    this.turn = (player.colour==1?2:1);
    
    this.paint();

    if (this.isOver(player.colour)) {
      player.message("You WON");
      sys.log(player.name+" WON");
      this.getPlayerToMove().opponentMove(x,y);
      this.getPlayerToMove().message("You LOST");
      this.over();
      return "OK";
      // @todo tells players who won
    } else if (this.moves >= MAX_MOVES) {
      player.message("Game DRAW. No more moves available.");
      sys.log("GAME DRAWN");
      this.getPlayerToMove().opponentMove(x,y);
      this.over();
      this.getPlayerToMove().message("Game DRAW. No more moves available.");
      return "OK";
    } else {
      this.getPlayerToMove().opponentMove(x,y);
      this.getPlayerToMove().yourTurn();
      return "OK";
    }
  }
};

Game.prototype.over = function() {
  sys.log("White time: "+white.clock.total_time);
  sys.log("Black time: "+black.clock.total_time);
};

Game.prototype.paint = function() {
    // @todo log
    for(i=0;i<BOARD_SIZE;i++) {
      row = "";
      for(j=0;j<BOARD_SIZE;j++) {
        if (this.squares[i][j] == null) {
          row += ".";
        } else if(this.squares[i][j]==1) {
          row += "o";
        } else {
          row += "x";
        }
      }
      console.log(row);
    }
};

Game.prototype.getPlayerToMove = function() {
  return this.turn==1?this.white:this.black;
};

Game.prototype.isOver = function(index) {
  for (var i = 0;i<BOARD_SIZE;i++) {
    for(var j = 0;j<BOARD_SIZE;j++) {
      if (this.squares[i][j]==index) {
        // horizontal
        if(j < BOARD_SIZE-4) {
          if (this.squares[i][j+1]==index && 
              this.squares[i][j+2]==index && 
              this.squares[i][j+3]==index &&
              this.squares[i][j+4]==index) {
            return true;
          }
        }
        // vertical
        if(i < BOARD_SIZE-4) {
          if (this.squares[i+1][j]==index && 
              this.squares[i+2][j]==index && 
              this.squares[i+3][j]==index &&
              this.squares[i+4][j]==index) {
            return true;
          }
        }
        // diagonal
        if(i < BOARD_SIZE - 4 && j < BOARD_SIZE - 4) {
          if (this.squares[i+1][j+1]==index && 
              this.squares[i+2][j+2]==index && 
              this.squares[i+3][j+3]==index &&
              this.squares[i+4][j+4]==index) {
            return true;
          }
        }
         // diagonal
        if(i >= 4 && j < BOARD_SIZE - 4) {
          if (this.squares[i-1][j+1]==index && 
              this.squares[i-2][j+2]==index && 
              this.squares[i-3][j+3]==index &&
              this.squares[i-4][j+4]==index) {
            return true;
          }
        }

      }
    }
  }
  return false;
};

exports.Game = Game;
