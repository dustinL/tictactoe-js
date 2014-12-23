var Player = {
  initialize : function(symbol) {
    this.symbol = symbol;
  },

  create : function(symbol) {
    var newPlayer = Object.create(Player);
    newPlayer.initialize(symbol);
    return newPlayer;
  }
}

var Space = {
  initialize : function(x,y) {
    this.xCoordinate = x;
    this.yCoordinate = y;
    this.markedBy = false;
  },

  create : function(x,y) {
    var newSpace = Object.create(Space);
    newSpace.initialize(x, y);
    return newSpace;
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
    // this.spaces : [];
    for (var i=1; i<=3; i++) {
      for (var j=1; j<=3; j++) {
        var currentSpace = Object.create(Space);
        currentSpace.initialize(i,j);
        this.spaces.push(currentSpace);
      }
    }
  }
}
