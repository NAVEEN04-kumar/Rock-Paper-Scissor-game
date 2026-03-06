let gameSave  =  JSON.parse(localStorage.getItem('gameSave')) || {
  Wins:0,
  Lose:0,
  Tie:0,
  lastResult : '',
  lastPlayerMove : '',
  lastComputerMove : ''
};
let isAutoPlay = false;
let intervalId;

updateScore();


document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock');
})

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper');
})

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('Scissors');
})

document.querySelector('.js-reset-button').addEventListener('click', () => {
  playGame('Reset');
})

document.querySelector('.js-autoplay-button').addEventListener('click', () => {
  autoPlay();
})

document.body.addEventListener('keydown', (event) => {
  
  const key = event.key.toLowerCase();

  if (key === 'r') {
    playGame('Rock');
  } else if (key=== 'p') {
    playGame('Paper');
  } else if (key === 's') {
    playGame('Scissors');
  }
})

function playGame(playerMove) {
  const randomMove = computerMove();
  if(playerMove === 'Reset') {
    gameSave.Wins = 0;
    gameSave.Lose = 0;
    gameSave.Tie = 0;
    gameSave.lastResult = '';
    gameSave.lastPlayerMove = '';
    gameSave.lastComputerMove = '';

    localStorage.removeItem('gameSave');
    updateScore();
    resultMoves('','','');
    return;
  }

  const result = playerMoveResult(playerMove,randomMove)
  

  if(result === 'You Win') {
    gameSave.Wins++;
  }
  else if(result ==='Tie') {
    gameSave.Tie++;
  }
  else if(result === 'You Lose') {
    gameSave.Lose++;
  }

  gameSave.lastResult = result;
  gameSave.lastPlayerMove = playerMove;
  gameSave.lastComputerMove = randomMove;

  localStorage.setItem('gameSave',JSON.stringify(gameSave));

  resultMoves(result,playerMove,randomMove);
  updateScore();
}

function computerMove() {
  let computerMove = '';
  const randomNumber = Math.random();

  if(randomNumber>= 0 && randomNumber < (1/3)) {
    computerMove = 'Rock';
  }
  else if(randomNumber < (2/3)) {
    computerMove = 'Paper';
  }
  else {
    computerMove = 'Scissors';
  }
  return computerMove;
}

function playerMoveResult(playerMove,randomMove) {
  let result = '';
  if(playerMove === 'Rock') {
    if(randomMove === 'Rock') {
      result = 'Tie';
    }
    else if(randomMove === 'Paper') {
      result = 'You Lose';
    }
    else if(randomMove === 'Scissors') {
      result = 'You Win';
    }
  }

  else if(playerMove === 'Paper') {
    if(randomMove === 'Rock') {
        result = 'You Win';
    }
    else if(randomMove === 'Paper') {
      result = 'Tie';
    }
    else if(randomMove === 'Scissors') {
      result = 'You Lose';
    }

  }

  else if(playerMove === 'Scissors') {
    if(randomMove === 'Rock') {
      result = 'You Lose';
    }
    else if(randomMove === 'Paper') {
      result = 'You Win';
    }
    else if(randomMove === 'Scissors') {
      result = 'Tie';
    }
  }

  return result;
}

function resultMoves(result,playerMove,randomMove) {
  if(result === '' && playerMove === '' && randomMove ==='') {
    document.querySelector('.js-result')
      .innerHTML = 'None';

    document.querySelector('.js-moves')
      .innerHTML = `Reseted`;
    return;
  }
  document.querySelector('.js-result')
    .innerHTML = result;
  
  document.querySelector('.js-moves')
    .innerHTML = `You
    <img src="images/${playerMove}-emoji.png" class="css-moves">
    <img src="images/${randomMove}-emoji.png" class="css-moves">
    computer`;
}

function autoPlay() {

  if(!isAutoPlay) {
    intervalId = setInterval(() => {
      const playerMove = computerMove();
      playGame(playerMove);
      },1000);
    isAutoPlay = true;
  }
  else {
    clearInterval(intervalId)
    isAutoPlay = false;
  }
}

function updateScore() {
  if(gameSave.lastResult) {
    resultMoves(gameSave.lastResult,
    gameSave.lastPlayerMove,
    gameSave.lastComputerMove)
  }
  document.querySelector('.js-scores')
    .innerHTML = `Wins:${gameSave.Wins},Losses:${gameSave.Lose},Ties:${gameSave.Tie}`;
}
