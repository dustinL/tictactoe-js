var Player = {
  initialize : function(symbol) {
    this.symbol = symbol;
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
  }
}
