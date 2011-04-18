var BOARD_SIZE = 15;
var MAX_MOVES = BOARD_SIZE * BOARD_SIZE;
function Game(white, black) {
  this.BOARD_SIZE = 15;
  this.white = white;
  this.black = black;
  this.squares = new Array(BOARD_SIZE);
  this.squares.forEach(function(a) {a = new Array(BOARD_SIZE);});
  this.turn = 0;
  this.start();
  this.moves = 0;
};

Game.prototype.start = function() {
  this.white.startGame(1);
  this.black.startGame(2);
  this.turn = 1;
  this.white.yourTurn();
};

Game.prototype.move = function(player, x, y) {
  if (this.turn != player.colour) {
    return "KO: Not your turn";
  } else if (this.squaresturn[x][y] !== null || x >= BOARD_SIZE || x<0 || y >= BOARD_SIZE || y < 0) {
    return "KO: Not a valid move";
  } else {
    moves++;
    squares[x][y] = player.colour;
    this.turn = (player.colour==1?2:1);
    if (this.isOver(player.colour)) {
      player.msg("You WON");
      player.getPlayerToMove().opponentMove(x,y);
      player.getPlayerToMove().msg("You LOST");
      return "OK";
      // @todo tells players who won
    } else if (moves >= TOTAL_MOVES) {
      player.msg("Game DRAW. No more moves available.");
      player.getPlayerToMove().opponentMove(x,y);
      player.getPlayerToMove().msg("Game DRAW. No more moves available.");
    } else {
      player.getPlayerToMove().opponentMove(x,y);
      player.getPlayerToMove().yourTurn();
      return "OK";
    }
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
        if(j < BOARD_SIZE-5) {
          if (this.squares[i][j+1]==index && 
              this.squares[i][j+2]==index && 
              this.squares[i][j+3]==index &&
              this.squares[i][j+4]==index) {
            return true;
          }
        }
        // vertical
        if(i < BOARD_SIZE-5) {
          if (this.squares[i+1][j]==index && 
              this.squares[i+2][j]==index && 
              this.squares[i+3][j]==index &&
              this.squares[i+4][j]==index) {
            return true;
          }
        }
        // diagonal
        if(i < BOARD_SIZE - 5 && j < BOARD_SIZE - 5) {
          if (this.squares[i+1][j+1]==index && 
              this.squares[i+2][j+2]==index && 
              this.squares[i+3][j+3]==index &&
              this.squares[i+4][j+4]==index) {
            return true;
          }
        }

      }
    }
  }
  return false;
};
