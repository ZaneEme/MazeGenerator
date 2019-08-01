
var cols, rows;
var canvasSize = window.innerWidth / 1.5;
var w = canvasSize / 15  //size of each grid square
var grid = [];
var current;
var stack = [];



function setup() {
  createCanvas(canvasSize, canvasSize);
  cols = 15;  //number of columns
  rows = 15; //number of rows
  frameRate(15);

  for(var j = 0; j < rows; j++){
    for(var i = 0; i < cols; i++){
      var cell = new Cell(i, j); //creates a new cell at i, j location
      grid.push(cell);          //adds cell to grid list
    }
  }

  current = grid[0]; //starts the current cell in the first corner
}

function draw() {
  background(51);
  for (var i = 0; i < grid.length; i++){
    //prints all the lines for each cell
    grid[i].show(); //run .show() function for each cell in list
  }
  current.visited = true; //set the current box to be visited
    //STEP 1 
  var next = current.checkNeighbors(); //check neighbors and return random unvisited one
  if (next){
    current.highlight(); //highlight the current cell
    next.visited = true;
    //STEP 2
    stack.push(current);
    //STEP 3
    removeWalls(current, next);
    //STEP 4
    current = next;
  } else if (stack.length > 0) { //if the length of the array is greater than 0
    current = stack.pop(); //the new current cell is off the top of the stack
    current.highlight();
  }
  noStroke();
  fill(95, 128, 93);
  rect(0, 0, w, w);
  fill(191, 15, 18);
  rect(canvasSize - w, canvasSize - w, canvasSize, canvasSize);
}

//find the index in the grid of a certain cell
function index(i, j){
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1){
    return -1;
  }
  return i + j * cols;
}


function removeWalls(a, b){
  var x = a.i - b.i; 
  if (x == 1){
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x == -1){
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y == 1){
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y == -1){
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
