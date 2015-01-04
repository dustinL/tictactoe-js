var Player = {
  initialize : function(symbol) {
    this.symbol = symbol;
  },

  create : function(symbol) {
    var playerInstance = Object.create(Player);
    playerInstance.initialize(symbol);
    return playerInstance;
  }

}

var Space = {
  initialize : function(x,y) {
    this.xCoordinate = x;
    this.yCoordinate = y;
    this.markedBy = false;
  },


  find : function(x,y) {
    if (this.xCoordinate === x && this.yCoordinate === y) {
      return this;
    } else {
      return 0;
    }
  },

  mark : function(symbol) {
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
  initialize : function() {
    for (var i=1; i<=3; i++) {
      for (var j=1; j<=3; j++) {
        var currentSpace = Object.create(Space);
        currentSpace.initialize(i,j);
        this.spaces.push(currentSpace);
      }
    }
  },

  playerMarks : function(player,x,y) {
    this.spaces.forEach(function(space) {
      if (space.find(x,y) !== 0) {
        return space.markedBy = player;
      }
    });
  },

  threeRow : function(player) {
    var marks = [ [0,1,2], [3,4,5], [6,7,8], [2,5,8], [1,4,7], [0,3,6], [0,4,8], [2,4,6]];
    var board = this;
    return marks.some(function(winning) {
      return (board.spaces[winning[0]].markedBy === player && board.spaces[winning[1]].markedBy === player && board.spaces[winning[2]].markedBy === player);
    });
  }
}

var Game = {
  initialize : function(player1name, player2name) {
    this.board = Object.create(Board);
    this.board.initialize();
    this.player1 = {name: player1name, letter: Player.create('X') };
    this.player2 = {name: player2name, letter: Player.create('O') };
  }
}
