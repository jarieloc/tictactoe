// This is not a pleasant sight, but I coded this while watching TV

//  A bit hacky, not very elegant - find a solution later.
m = [[0,0,0],[0,0,0],[0,0,0]];
taken = [[false,false,false],[false,false,false],[false,false,false]];

// I don't need this many booleans
// TODO
player1 = true;
plauer2 = false;
playerx = false;
playero = false;
gameover = false;
counter = 0;
sequence = [];

function gamestart() {
  document.getElementById('menu').style.display = 'none';
  document.getElementById('game').style.display = 'block';
}

function returnToMenu() {
  document.getElementById('menu').style.display = 'block';
  document.getElementById('game').style.display = 'none';
  reset();
}

function ticMatrix(){
  i = 3;
  j = 3;
  matrix = []
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      matrix_element = document.getElementById('tic-'+i.toString(10)+j.toString(10));
      matrix.push(matrix_element)
    }
  }
  return matrix
}

function reset() {
  m = [[0,0,0],[0,0,0],[0,0,0]];
  taken = [[false,false,false],[false,false,false],[false,false,false]];
  player1 = true;
  plauer2 = false;
  playerx = false;
  playero = false;
  gameover = false;
  counter = 0;
  sequence = [];
  buttons = document.getElementsByClassName('tic-button');
  ticbuttons = ticMatrix()
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].innerHTML = '&nbsp;';
    ticbuttons[i].style.backgroundColor = '';

  }
  document.getElementById('gamestate').innerHTML = '';
  document.getElementById('player').innerHTML = 'X';
}

// The placing function needs to be shortened
// Too many repeated operations
function placing(i,j){
  if (gameover == false){
    if (player1) {
      if (taken[i][j] == false) {
        document.getElementById('player').innerHTML = 'Player O\'s turn to place'
        taken[i][j] = true
        ticplace = document.getElementById('tic-'+i.toString(10)+j.toString(10));
        ticplace.innerHTML = 'X';
        m[i][j] = 1;
        // placing function
        player1 = false;
        player2 = true;
        gameover = win_checker(m);
        counter++;
        sequence.push([i,j]);
      }else if((taken[i][j] == true) && (sequence[sequence.length-1][0] == i) && (sequence[sequence.length-1][1] == j)){
        sequence.pop()
        taken[i][j] = false
        ticplace = document.getElementById('tic-'+i.toString(10)+j.toString(10));
        ticplace.innerHTML = '&nbsp;';
        player1 = false;
        player2 = true;
        counter--;
        document.getElementById('player').innerHTML = 'Player O\'s turn to place'
      }
    }
    else if (player2) {
      if (taken[i][j] == false) {
        document.getElementById('player').innerHTML = 'Player X\'s turn to place'
        taken[i][j] = true
        ticplace = document.getElementById('tic-'+i.toString(10)+j.toString(10));
        ticplace.innerHTML = 'O';
        m[i][j] = 2;
        // placing function
        player1 = true;
        player2 = false;

        gameover = win_checker(m);
        counter++;
        sequence.push([i,j]);
      }else if((taken[i][j] == true) && (sequence[sequence.length-1][0] == i) && (sequence[sequence.length-1][1] == j)){
        sequence.pop()
        taken[i][j] = false
        ticplace = document.getElementById('tic-'+i.toString(10)+j.toString(10));
        ticplace.innerHTML = '&nbsp;';
        player1 = true;
        player2 = false;
        counter--;
        document.getElementById('player').innerHTML = 'Player X\'s turn to place'
      }
    }
    if ((counter >= 9)&&(gameover == false)){
      gameover = win_checker(m);
    }
  }
}

function line_victory(line_win, player_win){
  row = document.getElementsByClassName(line_win);
  for (var i = 0; i < row.length; i++) {
    row[i].style.backgroundColor = 'orange';
    console.log("hot-potato")
  }
  document.getElementById('gamestate').innerHTML = 'Player ' + player_win +' wins!';
  document.getElementById('player').innerHTML = 'Victory!';
}

function diag_victory(diagonal_win, player_win){
  if (diagonal_win == 1) {
    document.getElementById('tic-00').style.backgroundColor = 'orange';
    document.getElementById('tic-11').style.backgroundColor = 'orange';
    document.getElementById('tic-22').style.backgroundColor = 'orange';
    document.getElementById('gamestate').innerHTML = 'Player ' + player_win +' wins!';
    document.getElementById('player').innerHTML = 'Victory!'
  }
  else if(diagonal_win == 2) {
    document.getElementById('tic-02').style.backgroundColor = 'orange';
    document.getElementById('tic-11').style.backgroundColor = 'orange';
    document.getElementById('tic-20').style.backgroundColor = 'orange';
    document.getElementById('gamestate').innerHTML = 'Player ' + player_win +' wins!';
    document.getElementById('player').innerHTML = 'Victory!'
  }
}

// I can definitely shorten this... I will do it later
function win_conditions(m){
  if ((m[0][0] == 1) && (m[0][1] == 1) && (m[0][2] == 1)){
    playerx = true;
    gameover = true;
    line_victory('row1', 'X');
  }
  else if ((m[0][0] == 2) && (m[0][1] == 2) && (m[0][2] == 2)){
    playero = true;
    gameover = true;
    line_victory('row1', 'O');
  }
  else if ((m[1][0] == 1) && (m[1][1] == 1) && (m[1][2] == 1)){
    playerx = true;
    gameover = true;
    line_victory('row2', 'X');
  }
  else if ((m[1][0] == 2) && (m[1][1] == 2) && (m[1][2] == 2)){
    playero = true;
    gameover = true;
    line_victory('row2', 'O');
  }
  else if ((m[2][0] == 1) && (m[2][1] == 1) && (m[2][2] == 1)){
    playerx = true;
    gameover = true;
    line_victory('row3', 'X');
  }
  else if ((m[2][0] == 2) && (m[2][1] == 2) && (m[2][2] == 2)){
    playero = true;
    gameover = true;
    line_victory('row3', 'O');
  }// Columns
  else if ((m[0][0] == 1) && (m[1][0] == 1) && (m[2][0] == 1)){
    playerx = true;
    gameover = true;
    line_victory('col1', 'X');
  }
  else if ((m[0][0] == 2) && (m[1][0] == 2) && (m[2][0] == 2)){
    playero = true;
    gameover = true;
    line_victory('col1', 'O');
  }
  else if ((m[0][1] == 1) && (m[1][1] == 1) && (m[2][1] == 1)){
    playerx = true;
    gameover = true;
    line_victory('col2', 'X');
  }
  else if ((m[0][1] == 2) && (m[1][1] == 2) && (m[2][1] == 2)){
    playero = true;
    gameover = true;
    line_victory('col2', 'O');
  }
  else if ((m[0][2] == 1) && (m[1][2] == 1) && (m[2][2] == 1)){
    playerx = true;
    gameover = true;
    line_victory('col3', 'X');
  }
  else if ((m[0][2] == 2) && (m[1][2] == 2) && (m[2][2] == 2)){
    playero = true;
    gameover = true;
    line_victory('col3', 'O');
  }// Diagonals
  else if ((m[0][0] == 1) && (m[1][1] == 1) && (m[2][2] == 1)){
    playerx = true;
    gameover = true;
    diag_victory(1, 'X');
  }
  else if ((m[0][0] == 2) && (m[1][1] == 2) && (m[2][2] == 2)){
    playero = true;
    gameover = true;
    diag_victory(1, 'O');
  }
  else if ((m[0][2] == 1) && (m[1][1] == 1) && (m[2][0] == 1)){
    playerx = true;
    gameover = true;
    diag_victory(2, 'X');
  }
  else if ((m[0][2] == 2) && (m[1][1] == 2) && (m[2][0] == 2)){
    playero = true;
    gameover = true;
    diag_victory(2, 'O');
  }
  return gameover;
}

// This is terribly coded
function win_checker(m){
  // Checker
  if (counter < 8) {
    gameover = win_conditions(m)
  }
  else if (counter == 8) {
    gameover = win_conditions(m)
  }
  else {
    // Draw
    gameover = true;
    document.getElementById('gamestate').innerHTML = 'DRAW'
    document.getElementById('player').innerHTML = 'Oh no!'
  }
  return gameover;
}
