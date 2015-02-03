describe("Player", function() {
  describe("initialize", function() {
    it("is initialized with a symbol", function() {
      var testPlayer = Object.create(Player);
      testPlayer.initialize("X");
      testPlayer.symbol.should.equal("X");
    });
  });
});

describe("Space", function() {
  describe("initialize", function() {
    it("is initialized with an x and y coordinate", function() {
      var testSpace = Object.create(Space);
      testSpace.initialize(1,2);
      testSpace.xCoordinate.should.equal(1);
      testSpace.yCoordinate.should.equal(2);
    });
  });

  describe("mark", function() {
    it("lets a player mark the space", function() {
      var testPlayer = Object.create(Player);
      testPlayer.initialize("X");
      var testSpace = Object.create(Space);
      testSpace.initialize(1, 2);
      testSpace.mark(testPlayer);
      testSpace.markedBy.should.equal(testPlayer);
    });

    it("does not let a player mark an already marked space", function() {
      var testPlayer = Object.create(Player);
      testPlayer.initialize("X");
      var testPlayer2 = Object.create(Player);
      testPlayer2.initialize("O");
      var testSpace = Object.create(Space);
      testSpace.initialize(1, 2);
      testSpace.mark(testPlayer);
      testSpace.mark(testPlayer2).should.eql("already marked");
    });
  });
});

describe("Board", function() {
  describe("initialize", function() {
    it("creates 9 spaces", function() {
      var testBoard = Object.create(Board);
      testBoard.initialize();
      testBoard.spaces[0].xCoordinate.should.eql(1);
      testBoard.spaces[0].yCoordinate.should.eql(1);
    });
  });

  describe("findSpace", function() {
    it("returns a space object from given coordinates", function() {
      var testBoard = Object.create(Board);
      testBoard.initialize();
      var thisSpace = testBoard.findSpace(1,2);
      thisSpace.xCoordinate.should.eql(1);
      thisSpace.yCoordinate.should.eql(2);
    });
  });

  describe("threeRow", function() {
    it("determines if 3 spaces in a row or column are marked by the same player", function() {
      var testGame = Object.create(Game);
      testGame.initialize();
      var testPlayer = testGame.player1.player;
      testGame.board.spaces[0].mark(testPlayer);
      testGame.board.spaces[1].mark(testPlayer);
      testGame.board.spaces[2].mark(testPlayer);
      testGame.board.threeRow(testPlayer).should.eql(true);
    });

    it("determines if 3 spaces diagonally are marked by the same player", function () {
      var testGame2 = Object.create(Game);
      testGame2.initialize();
      var testPlayer = testGame2.player1.player;
      testGame2.board.spaces[0].mark(testPlayer);
      testGame2.board.spaces[4].mark(testPlayer);
      testGame2.board.spaces[8].mark(testPlayer);
      testGame2.board.threeRow(testPlayer).should.eql(true);
    });
  });
});

describe("Game", function() {
  describe("initialize", function() {
    it("creates a new game with 2 players", function() {
      var testGame = Object.create(Game);
      testGame.initialize("Homer", "Marge");
      testGame.player1.name.should.eql("Homer");
      testGame.player1.player.symbol.should.eql('X');
      testGame.player2.name.should.eql("Marge");
      testGame.player2.player.symbol.should.eql('O');
    });

    it("creates the board", function() {
      var testGame = Object.create(Game);
      testGame.initialize();
      Board.isPrototypeOf(testGame.board).should.eql(true);
      testGame.board.spaces[4].yCoordinate.should.eql(2);
    });
  });

  describe("totalMoves", function() {
    it("counts the total number of spaces marked in a game", function() {
      var testGame = Object.create(Game);
      testGame.initialize();
      var testPlayer1 = testGame.player1.player;
      var testPlayer2 = testGame.player2.player;
      testGame.board.spaces[0].mark(testPlayer1);
      testGame.board.spaces[1].mark(testPlayer2);
      testGame.board.spaces[2].mark(testPlayer1);
      testGame.totalMoves().should.eql(3);
    });
  });

  describe("whoWon", function() {
    it("determines who the winner is", function() {
      var testGame = Object.create(Game);
      testGame.initialize("Bart", "Marge");
      var testPlayer1 = testGame.player1.player;
      testGame.board.spaces[6].mark(testPlayer1);
      testGame.board.spaces[7].mark(testPlayer1);
      testGame.board.spaces[8].mark(testPlayer1);
      testGame.whoWon().should.eql("Bart");
    });

    it("determines if a game has ended in a draw", function() {
      var testGame = Object.create(Game);
      testGame.initialize("Maggie", "Lisa");
      testGame.board.spaces[0].mark(testGame.player1.player);
      testGame.board.spaces[1].mark(testGame.player2.player);
      testGame.board.spaces[2].mark(testGame.player1.player);
      testGame.board.spaces[6].mark(testGame.player2.player);
      testGame.board.spaces[7].mark(testGame.player1.player);
      testGame.board.spaces[5].mark(testGame.player2.player);
      testGame.board.spaces[3].mark(testGame.player1.player);
      testGame.board.spaces[4].mark(testGame.player2.player);
      testGame.board.spaces[8].mark(testGame.player1.player);
      testGame.whoWon().should.eql("draw");
    });

    it("determines if a game is in progress", function() {
      var testGame = Object.create(Game);
      testGame.initialize("Apu", "Homer");
      var testPlayer1 = testGame.player1.player;
      var testPlayer2 = testGame.player2.player;
      testGame.board.spaces[0].mark(testPlayer1);
      testGame.board.spaces[3].mark(testPlayer2);
      testGame.board.spaces[4].mark(testPlayer1);
      testGame.whoWon().should.eql("in progress");
    });
  });
});
