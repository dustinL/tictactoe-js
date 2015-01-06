var Player = {
  initialize: function(symbol) {
    this.symbol = symbol;
  },

  create: function(symbol) {
    var playerInstance = Object.create(Player);
    playerInstance.initialize(symbol);
    return playerInstance;
  }

}

var Space = {
  initialize: function(x,y) {
    this.xCoordinate = x;
    this.yCoordinate = y;
    this.markedBy = false;
  },


  find: function(x,y) {
    if (this.xCoordinate === x && this.yCoordinate === y) {
      return this;
    } else {
      return 0;
    }
  },

  mark: function(symbol) {
    if (this.markedBy) {
      return "marked";
    } else {
      this.markedBy = symbol;
      return true;
    }
  }
}

var Board = {
  spaces : [],
  initialize: function() {
    for (var i=1; i<=3; i++) {
      for (var j=1; j<=3; j++) {
        var currentSpace = Object.create(Space);
        currentSpace.initialize(i,j);
        this.spaces.push(currentSpace);
      }
    }
  },

  playerMarks: function(player,x,y) {
    this.spaces.forEach(function(space) {
      if (space.find(x,y) !== 0) {
        return space.markedBy = player;
      }
    });
  },

  threeRow: function(player) {
    var marks = [ [0,1,2], [3,4,5], [6,7,8], [2,5,8], [1,4,7], [0,3,6], [0,4,8], [2,4,6]];
    var board = this;
    return marks.some(function(winningCombo) {
      return (board.spaces[winningCombo[0]].markedBy === player && board.spaces[winningCombo[1]].markedBy === player && board.spaces[winningCombo[2]].markedBy === player);
    });
  }
}

var Game = {
  initialize: function(player1name, player2name) {
    this.board = Object.create(Board);
    this.board.initialize();
    this.player1 = {name: player1name, letter: Player.create('X'), turn: true };
    this.player2 = {name: player2name, letter: Player.create('O'), turn: false };

    if(Math.random() >= .5) {
      this.player1.turn = true;
      return this.player1.name;
    } else {
      this.player1.turn = false;
      return this.player2.name;
    }
  },

  changeTurn: function() {
    if(this.player1.turn) {
      this.player1.turn = false;
      this.player2.turn = true;
    } else {
      this.player1.turn = true;
      this.player2.turn = false;
    }
  },

  totalMoves: function() {
    var moves = 0;
    for (var i=0; i < 9; i++) {
      if(this.board.spaces[i].markedBy === this.player1.letter || this.board.spaces[i].markedBy === this.player2.letter) {
        moves += 1;
      }
    }
    return moves;
  },

  whoWon: function() {
    if(this.board.threeRow(this.player1.name)) {
      return this.player1.name;
    } else if(this.board.threeRow(this.player2.name))  {
      return this.player2.name;
    } else if(this.totalMoves() === 9) {
      return "draw";
    } else {
      return "in progress";
    }
  }
}
