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
    this.markedBy = 0;
  },

  mark: function(symbol) {
    if (this.markedBy) {
      return "already marked";
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

  findSpace: function(x,y) {
    var foundSpace;
    this.spaces.forEach(function(space) {
      if (space.xCoordinate === x && space.yCoordinate === y) {
        foundSpace = space;
      }
    });
    return foundSpace;
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
    this.player1 = {name: player1name, player: Player.create('X'), turn: true };
    this.player2 = {name: player2name, player: Player.create('O'), turn: false };

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

  currentPlayer: function() {
    return this.player1.turn ? this.player1 : this.player2
  },

  totalMoves: function() {
    var moves = 0;
    for (var i=0; i < 9; i++) {
      if(this.board.spaces[i].markedBy === this.player1.player || this.board.spaces[i].markedBy === this.player2.player) {
        moves += 1;
      }
    }
    return moves;
  },

  whoWon: function() {
    if(this.board.threeRow(this.player1.player)) {
      return this.player1.name;
    } else if(this.board.threeRow(this.player2.player))  {
      return this.player2.name;
    } else if(this.totalMoves() === 9) {
      return "draw";
    } else {
      return "in progress";
    }
  }
}

var markAndChange = function(game,x,y) {
  var currentSpace = game.board.findSpace(x,y);
  currentSpace.mark(game.currentPlayer().player)

  if(game.whoWon() === "draw") {
    $("#turn-display").hide();
    $("#game-draw").show();
    $("#play-again").show();
  } else if (game.whoWon() !== "in progress") {
    $("#turn-display").hide();
    $("#game-winner").show();
    $("#winner-name").text(game.whoWon());
    $("#play-again").show();
  }

  game.changeTurn();
  if(game.player1.turn) {
    $("#player-turn-symbol").text(game.player1.player.symbol);
    $("#player-turn-name").text(game.player1.name);
  } else {
    $("#player-turn-symbol").text(game.player2.player.symbol);
    $("#player-turn-name").text(game.player2.name);
  }
}


$(document).ready(function() {
  $("#new-game").submit(function(event) {
    $("#new-game").hide();
    var player1name = $("input#player1-name").val();
    var player2name = $("input#player2-name").val();
    $(".space-button").empty();
    $("input#player1-name").val("");
    $("input#player2-name").val("");
    $("#board-div").slideDown('slow');

    var newGame = Object.create(Game);
    newGame.initialize(player1name, player2name);
    if(newGame.player1.turn) {
      $("#player-turn-symbol").text(newGame.player1.player.symbol);
      $("#player-turn-name").text(newGame.player1.name);
    } else {
      $("#player-turn-symbol").text(newGame.player2.player.symbol);
      $("#player-turn-name").text(newGame.player2.name);
    };
    $("#turn-display").show();

    var clickSpace = function(spaceID,x,y) {
      $(spaceID).click(function(event) {
        var space = newGame.board.findSpace(x,y)
        if (space.markedBy) {
          return("taken")
        } else {
          if(newGame.player1.turn) {
            $(spaceID).text(newGame.player1.player.symbol);
          } else {
            $(spaceID).text(newGame.player2.player.symbol);
          }
          markAndChange(newGame,x,y);
        }
      });
    }

    clickSpace("#space-0",1,1);
    clickSpace("#space-1",1,2);
    clickSpace("#space-2",1,3);
    clickSpace("#space-3",2,1);
    clickSpace("#space-4",2,2);
    clickSpace("#space-5",2,3);
    clickSpace("#space-6",3,1);
    clickSpace("#space-7",3,2);
    clickSpace("#space-8",3,3);

    $("#play-again").click(function(){
      location.reload();
    });
    event.preventDefault();
  });
});
