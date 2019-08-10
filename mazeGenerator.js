/*
https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
http://keycode.info/

*/


var halfWindow = window.innerWidth * 0.5; //size of the canvas is always 3/4 of window width
var rowCols = 15; //number of rows and columns
var w = halfWindow / 15  //size of each grid square
var grid = []; //array of all cells
var current; //current cell
var stack = []; //stack array of visited cells
var rowsColsSel, frameRateSel, submitButton;
var hasTouchscreen = 'ontouchstart' in window; //var to test if on mobile
var playable = false; //test if maze is playable
var gameRunning = false; //test if the game is on the home screen

function preload(){
  crimsonItalic = loadFont('assets/Crimson-Italic.otf');
  crimsonRoman = loadFont('assets/Crimson-Roman.otf');
}



function setup() {
  createCanvas(halfWindow * 2, halfWindow * 2);
  
  console.log("Device has touchScreen: " + hasTouchscreen);
  console.log(halfWindow);

    //Code for RowsColsSel
    textAlign(CENTER);
    rowsColsSel = createSelect();
    rowsColsSel.position(halfWindow - 15, halfWindow * 0.35);
    for(var i = 5; i <= 30; i += 5){ //create the number of dropdowns
      rowsColsSel.option(i);
    }
  
    //Code for frameRateSel
    textAlign(CENTER);
    frameRateSel = createSelect();
    frameRateSel.position(halfWindow - 15, halfWindow * 0.5);
    for(var i = 5; i <= 30; i += 5){ //create the number of dropdowns
      frameRateSel.option(i);
    }

}



function draw() {
  //create board border
  fill(255, 204, 0);
  noStroke();
  rect(halfWindow * 0.5, 0, halfWindow + 6, halfWindow + 6);

  //create board
  fill(51);
  noStroke();
  rect(halfWindow * 0.5 + 3, 3, halfWindow, halfWindow);


  if (gameRunning == false){
    settingsPage();
  } else {
    for (var i = 0; i < grid.length; i++){
      //prints all the lines for each cell
      grid[i].show(); //run .show() function for each cell in list
    }

    if (playable == false){
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
    }
    
    if(stack.length == 0){ //if the game is done generating
      runGame();
    } else {
      playable = false;
      }
  }
}



//find the index in the grid of a certain cell
function index(i, j){
  if (i < 0 || j < 0 || i > rowCols - 1 || j > rowCols - 1){
    return -1;
  }
  return i + j * rowCols;
}



//removes the walls between two given cells
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

function rebuildMaze(){ //rebuilds maze after resize or submit button pressed
  clear();
  grid.length = 0;
  rowCols = rowsColsSel.value();
  halfWindow = window.innerWidth * 0.5;
  stack = [];
  playable = false;
  w = halfWindow / rowCols;

  //recreate cells
  for(var j = 0; j < rowCols; j++){
    for(var i = 0; i < rowCols; i++){
      var cell = new Cell(i, j); //creates a new cell at i, j location
      grid.push(cell);          //adds cell to grid list
    }
  }

  current = grid[0]; //starts the current cell in the first corner
  
  //change the framerate of the game
  var frameRateNum = frameRateSel.value();
  if (frameRateNum == 5){
    frameRate(5);
  } else if (frameRateNum == 10){
    frameRate(10);
  }else if (frameRateNum == 15){
    frameRate(15);
  } else if (frameRateNum == 20){
    frameRate(20);
  } else if (frameRateNum == 25){
    frameRate(25);
  } else if (frameRateNum == 30){
    frameRate(30);
  }
}

