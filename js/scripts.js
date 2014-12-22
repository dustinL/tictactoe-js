var Player = {
  initialize : function(symbol) {
    this.symbol = symbol;
  }
}

var Space = {
  initialize : function(x, y) {
    this.xCoordinate = x;
    this.yCoordinate = y;
  },

  mark : function (symbol) {
    if (this.markedBy) {
      return "marked";
    } else {
      this.markedBy = symbol;
      return true;
    }
  }
}
