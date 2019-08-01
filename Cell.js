function Cell(i, j) {
    this.i = i;
    this.j = j;
    //Top, Right, Bottom, Left
    this.walls = [true, true, true, true]; //which walls are active in cell
    this.visited = false;
  
  
    this.checkNeighbors = function(){
      var neighbors = [];
      var top    = grid[index(i, j - 1)];
      var right  = grid[index(i + 1, j)];
      var bottom = grid[index(i, j + 1)];
      var left   = grid[index(i - 1, j)];
  
      //add to the list of existing neighbors
      if (top && !top.visited){
        neighbors.push(top);
      }
      if (right && !right.visited){
        neighbors.push(right);
      }
      if (bottom && !bottom.visited){
        neighbors.push(bottom);
      }
      if (left && !left.visited){
        neighbors.push(left);
      }
  
      if (neighbors.length > 0){
        var r = floor(random(0, neighbors.length));
        return neighbors[r];
      } else {
        return undefined;
      }
    }
  
    this.highlight = function() {
      var x = this.i * w; //cell corner x
      var y = this.j * w; //cell corner y
      noStroke();
      fill(0, 0, 255, 100);
      rect(x, y, w, w);
    }
  
    this.show = function() {
      var x = this.i * w; //cell corner x
      var y = this.j * w; //cell corner y
      stroke(255);
  
      //Prints a line for each wall
      if (this.walls[0]){
        line(x    , y    , x + w, y    ); //Top
      }
      if (this.walls[1]){
      line(x + w, y    , x + w, y + w); //Right
      }
      if (this.walls[2]){
      line(x + w, y + w, x    , y + w); //Bottom
      }
      if (this.walls[3]){
      line(x    , y + w, x    , y    ); //Left
      }
  
      if (this.visited){
        noStroke();
        fill(255, 0, 255, 100);
        rect(x, y, w, w);
      }
  
    }
  }