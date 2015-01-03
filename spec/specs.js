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
  });

  describe("find", function() {
    it("returns a space given two coordinates", function() {
      var testSpace = Object.create(Space);
      testSpace.initialize(1, 2);
      testSpace.find(1,2).should.eql(testSpace);
    });
  });
});

describe("Board", function() {
  describe("initialize", function() {
    it("creates 9 spaces", function() {
      var testBoard = Object.create(Board);
      testBoard.initialize();
      testBoard.spaces[0].xCoordinate.should.eql(1)
      testBoard.spaces[0].yCoordinate.should.eql(1)
    })
  });

  describe("playerMarks", function() {
    it("finds and marks the appropriate space, given coordinates and player", function(){
      var testBoard = Object.create(Board);
      testBoard.initialize();
      var testPlayer = Object.create(Player);
      testPlayer.initialize("X");
      testBoard.playerMarks(testPlayer,2,2);
      testBoard.spaces[4].markedBy.should.eql(testPlayer);
    });
  });

  describe("threeRow", function() {
    it("determines if 3 spaces in a row or column are marked by the same player", function() {
      var testBoard = Object.create(Board);
      testBoard.initialize();
      var testPlayer = Object.create(Player);
      testPlayer.initialize("X");
      testBoard.playerMarks(testPlayer,2,2);
      testBoard.playerMarks(testPlayer,2,1);
      testBoard.playerMarks(testPlayer,2,3);
      testBoard.threeRow(testPlayer).should.eql(true);
    });
  });
});
