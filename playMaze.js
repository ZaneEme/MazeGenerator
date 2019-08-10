function keyPressed (){
    if(keyCode == 27){
        gameRunning = false;
    }

    if (playable){
        if(keyCode == UP_ARROW || keyCode == 87){
            //console.log("Up Arrow")
            if(!current.walls[0]){ 
                current = grid[index(current.i, current.j - 1)];
            }            
        } else if(keyCode == RIGHT_ARROW || keyCode == 68){
            //console.log("Right Arrow");
            if(!current.walls[1]){
                current = grid[index(current.i + 1, current.j)];
            }
        }else if (keyCode == DOWN_ARROW || keyCode == 83){
            //console.log("Down Arrow");
            if (!current.walls[2]){ 
                current = grid[index(current.i, current.j + 1)];
            }
        } else if (keyCode == LEFT_ARROW || keyCode == 65){
            //console.log("Left Arrow");
            if(!current.walls[3]){
                current = grid[index(current.i - 1, current.j)];
            }
        } 
    }
}


function runGame(){
    noStroke();
    fill(86, 115, 108); //create starting green square
    rect(halfWindow * 0.5 + 3, 3, w - 1, w - 1);
    fill(191, 15, 18); //create ending red square
    rect(halfWindow * 1.5 - w + 4, halfWindow - w + 4, w - 2, w - 2);

    playable = true;
    current.highlight();
}