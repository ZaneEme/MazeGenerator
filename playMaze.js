/**
 * A way to play the maze. Reads the key pressed and moves the player accordingly.
 * Accepts WASD and arrow keys.
 * KeyPressed is a P5 function that runs whenever a key is pressed.
 * If the key is pressed and there's no wall, make new current cell as neighbor
 * and highlight it.
 */
function keyPressed() {
  if (keyCode == 27) {
    gameRunning = false;
  }

  if (playable) {
    if (keyCode == UP_ARROW || keyCode == 87) {
      if (!current.walls[0]) {
        current = grid[index(current.i, current.j - 1)];
      }
    } else if (keyCode == RIGHT_ARROW || keyCode == 68) {
      if (!current.walls[1]) {
        current = grid[index(current.i + 1, current.j)];
      }
    } else if (keyCode == DOWN_ARROW || keyCode == 83) {
      if (!current.walls[2]) {
        current = grid[index(current.i, current.j + 1)];
      }
    } else if (keyCode == LEFT_ARROW || keyCode == 65) {
      if (!current.walls[3]) {
        current = grid[index(current.i - 1, current.j)];
      }
    }
  }
}

function runGame() {
  // Set the starting square and make the game playable
  noStroke();
  fill(86, 115, 108); // create starting green square rgb(86,115,108)
  rect(halfWindow * 0.5 + 3, 3, w - 1, w - 1);
  fill(191, 15, 18); //create ending red square rgb(191,15,18)
  rect(halfWindow * 1.5 - w + 4, halfWindow - w + 4, w - 2, w - 2);

  playable = true;
  current.highlight();
}
