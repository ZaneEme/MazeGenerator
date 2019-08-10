function settingsPage(){

    //text for header
    noStroke();
    fill(0);
    textAlign(CENTER);
    textSize(35);
    textFont(crimsonItalic);
    fill(255, 204, 0);
    text("Maze Generator", halfWindow, halfWindow * 0.17);
  
    //text for RowsColsSel
    textSize(20);
    textFont(crimsonRoman);
    text("Size of Maze:", halfWindow, halfWindow * 0.30);
  
    //text for frameRateSel
    textSize(20);
    textFont(crimsonRoman);
    text("Frame Rate:", halfWindow, halfWindow * 0.45);
  
    //submit button
    rectMode(CORNER);
    submitSquare = rect(halfWindow - (85 / 2), halfWindow * 0.65, 85, 35, 10);
    fill(51);
    textAlign(LEFT, TOP);
    submitText = text("Run Maze", halfWindow - (85 / 2), halfWindow * 0.65 + 5);

    textAlign(CENTER, BOTTOM);
    rowsColsSel.position(halfWindow - 15, halfWindow * 0.35);
    frameRateSel.position(halfWindow - 15, halfWindow * 0.5);
    
    frameRateSel.show();
    rowsColsSel.show();
    noLoop();
}
  
function mousePressed(){
    //Square submit button x, y, width and height
    if(mouseX >= halfWindow - (85 / 2) && mouseX <= halfWindow + (85 / 2) && mouseY >= halfWindow * 0.65 && mouseY <= halfWindow * 0.65 + 35 && gameRunning == false){     
        RunButton();
    }
    if(hasTouchscreen == true && mouseX >= halfWindow * 0.5 + 3 && mouseX <= halfWindow + 3 && mouseY >= 3 && mouseY <= halfWindow + 3){
        gameRunning = false;
    }
}
  
function RunButton(){
rebuildMaze();
gameRunning = true;
frameRateSel.hide();
rowsColsSel.hide();
loop();
}



  