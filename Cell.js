function Cell(i, j) {
  this.i = i;
  this.j = j;
  // Top, Right, Bottom, Left
  this.walls = [true, true, true, true]; // which walls are active in cell
  this.visited = false;

  // Check the neighbors around the cell
  // Choose a random neighbor that exists and
  // Hasn't been visited, else return undefined
  this.checkNeighbors = function () {
    var neighbors = [];
    var top = grid[index(i, j - 1)];
    var right = grid[index(i + 1, j)];
    var bottom = grid[index(i, j + 1)];
    var left = grid[index(i - 1, j)];

    // Check if there's a neighbor in each direction
    // Check if they've been visited before
    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    // If the cell has neighbors, pick one
    // at random and return it
    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  };

  // Highlight the current cell
  this.highlight = function () {
    var x = this.i * w + halfWindow * 0.5 + 3; // cell corner x
    var y = this.j * w + 3; // cell corner y
    noStroke();
    fill(0, 0, 255, 100); // cell highlight color: rgb(0,0,255,100)
    rect(x, y, w, w);
  };

  // Prints borders around the cell
  this.show = function () {
    var x = this.i * w + 3 + halfWindow * 0.5; // cell corner x
    var y = this.j * w + 3; // cell corner y

    stroke(255, 204, 0); // Cell color: rgb(255,204,0)

    //Prints a line for each wall
    if (this.walls[0]) {
      line(x, y, x + w, y); // Top
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w); // Right
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w); // Bottom
    }
    if (this.walls[3]) {
      line(x, y + w, x, y); // Left
    }

    // If the cell has been visited, highlight it
    if (this.visited) {
      noStroke(); // set the cell to visited and make it purple
      fill(98, 102, 101, 75); // cell color rgb(98, 102, 101, 75)
      rect(x, y, w, w);
    }
  };

  this.lineTrace = function (direction) {
    if (direction == 0) {
    }
  };
}
