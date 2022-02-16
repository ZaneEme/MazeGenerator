/*
https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
http://keycode.info/
*/

var halfWindow = window.innerWidth * 0.5; // size of the canvas is always 3/4 of window width
var rowColsNum = 15; // number of rows and columns
var allCellsGrid = []; // array of all cells
var visitedCellsStack = []; // stack array of visited cells
var boardSizeSelector, frameRateSel, submitButton;
var hasTouchscreen = "ontouchstart" in window; // var to test if on mobile
var playable = false; // test if maze is playable
var gameRunning = false; // test if the game is on the home screen

// Load the fonts
function preload() {
  crimsonItalic = loadFont("assets/Crimson-Italic.otf");
  crimsonRoman = loadFont("assets/Crimson-Roman.otf");
}

/**
 * Set up the system, only runs once
 * Align the canvas to the center of the window
 * Create dropdown menus for board size and framerate
 */
function setup() {
  createCanvas(halfWindow * 2, halfWindow * 2);

  console.log("Device has touchScreen: " + hasTouchscreen);
  console.log(halfWindow);

  //Code to make a dropdown for the board size
  textAlign(CENTER);
  boardSizeSelector = createSelect();
  for (var i = 5; i <= 30; i += 5) {
    // create the number of dropdowns
    boardSizeSelector.option(i);
  }

  //Code for frameRateSel
  textAlign(CENTER);
  frameRateSel = createSelect();
  for (var i = 5; i <= 30; i += 5) {
    // create the number of dropdowns
    frameRateSel.option(i);
  }
}

/**
 * Main loop of game
 */
function draw() {
  // create board border rgb(255,204,0)
  fill(255, 204, 0);
  noStroke();
  rect(halfWindow * 0.5, 0, halfWindow + 6, halfWindow + 6);

  // create board
  fill(51);
  noStroke();
  rect(halfWindow * 0.5 + 3, 3, halfWindow, halfWindow);

  // if game isn't running, draw the settings page
  if (gameRunning == false) {
    settingsPage();
  } else {
    for (var i = 0; i < allCellsGrid.length; i++) {
      // prints all the lines for each cell
      allCellsGrid[i].show(); // show the borders for every cell
    }

    if (playable == false) {
      current.visited = true; // set the current box to be visited

      var next = current.checkNeighbors(); // check neighbors and return random unvisited one
      if (next) {
        current.highlight(); // highlight the current cell

        next.visited = true;

        visitedCellsStack.push(current);

        // remove the walls between the current and next cell
        removeWalls(current, next);
        // set the current cell to the next cell
        current = next;
      } else if (visitedCellsStack.length > 0) {
        // if the length of the array is greater than 0
        current = visitedCellsStack.pop(); // the new current cell is off the top of the stack
        current.highlight();
      }
    }

    if (visitedCellsStack.length == 0 && hasTouchscreen == false) {
      // if the game is done generating
      runGame();
    } else {
      playable = false;
    }
  }
}

// find the index in the grid of a certain cell
function index(i, j) {
  if (i < 0 || j < 0 || i > rowColsNum - 1 || j > rowColsNum - 1) {
    return -1;
  }
  return i + j * rowColsNum;
}

/**
 * removes the walls between two given cells
 */
function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x == 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x == -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y == 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y == -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

/**
 * rebuilds the maze after the window is resized
 * or the submit button is pressed
 *
 * Sets current cell to corner
 */
function rebuildMaze() {
  clear();
  allCellsGrid.length = 0;
  rowColsNum = boardSizeSelector.value();
  halfWindow = window.innerWidth * 0.5;
  visitedCellsStack = [];
  playable = false;
  w = halfWindow / rowColsNum;

  //recreate cells
  for (var j = 0; j < rowColsNum; j++) {
    for (var i = 0; i < rowColsNum; i++) {
      var cell = new Cell(i, j); // creates a new cell at i, j location
      allCellsGrid.push(cell); // adds cell to grid list
    }
  }

  current = allCellsGrid[0]; // starts the current cell in the first corner

  // change the framerate of the game
  changeFrameRate();
}

/**
 * Changes the frame rate based on a frame rate selector dropdown
 */
function changeFrameRate() {
  var frameRateNum = frameRateSel.value();

  if (frameRateNum == 5) {
    frameRate(5);
  } else if (frameRateNum == 10) {
    frameRate(10);
  } else if (frameRateNum == 15) {
    frameRate(15);
  } else if (frameRateNum == 20) {
    frameRate(20);
  } else if (frameRateNum == 25) {
    frameRate(25);
  } else if (frameRateNum == 30) {
    frameRate(30);
  }
}
