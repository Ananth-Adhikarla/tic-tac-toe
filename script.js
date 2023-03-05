/**
 * Objectives of tic-tac-toe game
 * Use IIFE with modules export, 
 * Use Factory functions to create and return objects
 * No global variables
 * use closures
 */

/**
 * Splash Screen
 */

/**
 * Objectives of tic-tac-toe game
 * Use IIFE with modules export, 
 * Use Factory functions to create and return objects
 * No global variables
 * use closures
 */

/**
 * Player / AI : TO DO
 * 1) Mark / Sign 
 * 2) Index / Position of Marks
 * 3) Image
 * 4) Points
 * 5) Text Content - Current Turn / Win Message
 */

  // const winText = "You win the round!!!";
  // const turnText = 'Your Turn';

  const Player = ((newMark, newWinText, newTurnText, newIdentity) => {

    let mark = newMark;
    let winText = newWinText;
    let turnText = newTurnText;
    let identity = newIdentity;
    let index = -1;
    let points = 0;
    let moves = [];

    const getMark = () => {
      return mark;
    }
    
    const getWinText = () => {
      return winText;
    }
  
    const getTurnText = () => {
      return turnText;
    }
    
    const getIdentity = () => {
      return identity;
    }
  
    const getIndex = () => {
      return index;
    }
  
    const setIndex = (newIndex) => {
      index = newIndex;
    }
  
    const getPoints = () => {
      return points;
    }
  
    const setPoints = (newPoints) => {
      points = newPoints;
    }

    return {
      getMark,
      getWinText,
      getTurnText,
      getIdentity,
      getIndex,
      setIndex,
      getPoints,
      setPoints,
    };
});

/**
 * AI - Logic: TO DO
 * 1) AI play - based on type
 * 2) easy mode - get empty cell from array and set mark based on random index 
 * 3) Learn - min-max algorithm for advanced AI.. TO DO
 */
const AI = (() => {

  const easy = () => {
    let emptyCells = getEmptyCells();
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  const getEmptyCells = () => {
    return gameBoard.board.map((item, index) => item === '' ? index : '').filter(empty => empty !== '');
  }

  return {
    easy,
  };

})();

/**
 * Game Board : TO DO
 * 1. Create game board
 * 2. Get Mark / Set Mark - based on Player / AI
 * 2. Check mark index - wont happen but safety check
 * 3. reset board
 */

const gameBoard = (() => {

  let board = Array(9).fill('');

  const getMark = (index) => {
    if(checkIndexOutOfBounds(index)) return;
    return board[index];
  }

  const setMark = (index, mark) => {
    if(checkIndexOutOfBounds(index)) return;
    board[index] = mark;
  }

  const checkIndexOutOfBounds = (index) => {
    return (index < 0 || index > board.length);
  }

  const resetBoard = () => {
    board.fill('');
  }

  return {
    board,
    getMark,
    setMark,
    resetBoard,
  };
})();

/**
 * Splash Screen
 */

const splashScreenMain = ( () => {

  const leftSelect = document.getElementById('leftSelect');
  const rightSelect = document.getElementById('rightSelect');
  const numAvatars = 12;
  let currentAvatar = '';
  let oldAvatar = '';
  let currentAI = '';
  let oldAI = '';
  let playerImage = '';
  let aiImage = '';

  const createCards = (element,side) => {
    for(let i = 0; i < numAvatars; i++) {
      let card = document.createElement('div');
      let image = document.createElement('img');
      card.classList.add("card");
      card.id = `${side}card${i}`;
      image.src = `./assets/Icon${i+1}.png`;
      image.classList.add('card-image');
      card.addEventListener('click', selectAvatar, false);
      card.appendChild(image);
      element.appendChild(card);
    }
  }

  const selectAvatar = (event) => {
    currentAvatar = document.getElementById(event.target.id);
    if(oldAvatar !== '') oldAvatar.classList.remove('selectedAvatar');
    oldAvatar = currentAvatar;
    currentAvatar.classList.add('selectedAvatar');
    playerImage = currentAvatar.firstElementChild.src;
  }

  const selectAI = () => {
    let randomNum = Math.floor(Math.random() * (numAvatars - 1) + 1);
    currentAI = document.getElementById(`rightcard${randomNum}`);
    if(oldAI !== '') oldAI.classList.remove('selectedAvatar');
    oldAI = currentAI;
    currentAI.classList.add('selectedAvatar');
    aiImage = currentAI.firstElementChild.src;
  }

  const getPlayerImage = () => {
    return playerImage;
  }

  const getAiImage = () => {
    return aiImage;
  }

  return {
    leftSelect,
    rightSelect,
    playerImage,
    aiImage,
    getPlayerImage,
    getAiImage,
    selectAI,
    createCards,
  }
})();

/**
 * Display Controller : TO DO
 * 1) Add event listener for all cells
 */

const displayController = (() => {

  let cells = document.querySelectorAll('[data-index]');

  // Toolbar
  let toolbar = document.getElementById("toolbar");
  let playerScore = document.getElementById("leftScore");
  let aiScore = document.getElementById("rightScore");
  let currentRoundText = document.getElementById("currentRound");
  let currentTurnText = document.getElementById("currentTurn");
  let playerImage = document.getElementById("leftImage");
  let aiImage = document.getElementById("rightImage");

  // Game Container
  let gameContainer = document.getElementById("gameContainer");

  // Game Over Container
  let gameoverContainer = document.getElementById("gameoverContainer");
  let gameoverScore = document.getElementById("gameoverScore");
  let restartBtn = document.getElementById("restartGame");

  // Splash Screen
  let splashScreenContainer = document.getElementById("splashContainer");
  let avatarErrorText = document.getElementById("avatarErrorText");
  let startBtn = document.getElementById("startGame");

  const setText = (element, text) => {
    element.textContent = text;
  }

  const updateGameboard = () => {
    cells.forEach((cell,index) => cell.textContent = gameBoard.getMark(index));
  }

  const resetGameBoard = () => {
    cells.forEach((cell) => cell.textContent = "");
  }

  const setWinCells = async (winCells, count = 3) => {
    if (count <= 0){
      await removeWinCells(winCells)
      return;
    }
    setTimeout(function () {
        let cell = document.querySelector(`[data-index="${winCells[count - 1]}"]`);
        cell.style.background = 'green';
        setWinCells(winCells, --count);
    }, 200);
  }

  const removeWinCells = async (winCells) => {
    await gameController.sleep(1000);
    winCells.forEach((index) => {
      let cell = document.querySelector(`[data-index="${index}"]`);
      cell.style.background = '';
    });
  }

  const setDrawCells = () => {
    cells.forEach(cell => cell.style.background = "red");
    removeDrawCells(cells);
  }

  const removeDrawCells = async () => {
    await gameController.sleep(1000);
    cells.forEach((cell) => {  cell.style.background = '';  });
  }

  /**
   * Enable - gameover container
   * Disable - splash screen - toolbar - game container
   */
  const gameOverScreen = (gameOverText) => {
    splashScreenContainer.style.display = "none";
    toolbar.style.display = "none";
    gameContainer.style.display = "none";
    gameoverContainer.style.display = "flex";
    gameoverScore.textContent = gameOverText;
    restartBtn.addEventListener("click", splashScreen, false);
  }

  /**
   * Enable - splash screen 
   * Disable - gameover container - toolbar - game container
   */
  const splashScreen = () => {
    splashScreenContainer.style.display = "flex";
    toolbar.style.display = "none";
    gameContainer.style.display = "none";
    gameoverContainer.style.display = "none";
    leftSelect.textContent = "";
    rightSelect.textContent = "";
    splashScreenMain.createCards(splashScreenMain.leftSelect, "left");
    splashScreenMain.createCards(splashScreenMain.rightSelect, "right");
    aiSelector = setInterval(splashScreenMain.selectAI, 500);
    startBtn.addEventListener("click", startGame, false);
  }

  const startGame = async () => {
    avatarErrorText.textContent = '';
    if(!splashScreenMain.getPlayerImage().includes('.png') || !splashScreenMain.getPlayerImage() === undefined){
      avatarErrorText.textContent = 'Pick an Avatar.';
      return;
    }   
    playerImage.src = splashScreenMain.getPlayerImage();
    aiImage.src = splashScreenMain.getAiImage();
    clearInterval(aiSelector);
    await gameController.sleep(600);
    splashScreenContainer.style.display = 'none';
    gameoverContainer.style.display = "none";
    toolbar.style.display = "flex";
    gameContainer.style.display = "flex";
    gameController.init();
  }

  splashScreen();

  return {
    cells,
    currentRoundText,
    currentTurnText,
    playerScore,
    aiScore,
    setText,
    updateGameboard,
    resetGameBoard,
    setWinCells,
    setDrawCells,
    gameOverScreen,
    splashScreen,
  };

})();

/**
 * Game Controller : TO DO
 * 1. Initialize Player / AI 
 * 2. 
 */

const gameController = (() => {

  let playerX = null;
  let playerO = null;
  let winCells = [];

  const drawText = "It's a Draw";

  let AiType = 0;
  let round = 1;  
  let turnCount = 0;
  let isPlayerTurn = true;
  let isRoundOver = false;
  let isGameOver = false;
  let gameOverText = "";

  const init = (userChoice = 1) => {
    if(userChoice === 1) {
      playerX = Player('X', "You win the round", "Your Turn", "player");
      playerO = Player('O', "AI wins the round", "AI's Turn", "ai");
    }
    else {
      playerO = Player('O', "You win the round", "Your Turn", "player");
      playerX = Player('X', "AI wins the round", "AI's Turn", "ai");
    }
    displayController.cells.forEach(cell => cell.addEventListener('click', playerClick, false));
  }

  const setAiType = (newAiType) => {
    AiType = newAiType;
  }

  const getPlayer = () => {
    if(playerX.getIdentity() === 'player') return {player: playerX, ai: playerO};
    else return {player: playerO, ai: playerX};
  }

  const getAIMove = async (ai) => {
    ai.setIndex(AI.easy());
  }

  const playerClick = async (event) => {
    if(event.target.textContent !== "" || isGameOver || !isPlayerTurn) return;

    let humanPlayer = getPlayer().player;
    let aiPlayer = getPlayer().ai;

    humanPlayer.setIndex(parseInt(event.target.getAttribute('data-index')));
    playRound(humanPlayer.getIndex(), humanPlayer);
    if(!checkWinner(humanPlayer.getIndex(), humanPlayer) && !isRoundOver && turnCount < 9){
      isPlayerTurn = false;
      await toolbarText(aiPlayer);
      await sleep(300);
      getAIMove(aiPlayer);
      let promise = await playRound(aiPlayer.getIndex(), aiPlayer);
      if(promise) {
        isPlayerTurn = true;
        await toolbarText(humanPlayer);
      }
    }
  }
  
  const playRound = async (index, currentPlayer) => {
    gameBoard.setMark(index, currentPlayer.getMark());
    displayController.updateGameboard();
    isRoundOver = checkWinner(index, currentPlayer);
    turnCount++;
    await toolbarText(currentPlayer);
    // tie
    if(!isRoundOver && turnCount === 9) 
      isRoundOver = true;
    
    // Reset Round and start new round
    if(isRoundOver) {
      if(turnCount !== 9) currentPlayer.setPoints(currentPlayer.getPoints() + 1);
      await resetRound(currentPlayer);
    }   

    if(!isGameOver && round > 5) {
      // game over
      isRoundOver = true;
      isGameOver = true;
      await resetGame(currentPlayer);
    }

    return true;
  }

  /**
   * Possibilites - Same Row | Same Column | Diagonal - total possibilites = 8
   */

  const checkWinner = (index, currentPlayer) => {

    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let filteredArray = winConditions.filter((combination) => combination.includes(index));
    let isValid = null;
    for(let i = 0; i < filteredArray.length; i++){
      let temp = filteredArray[i];
      isValid = temp.every(index => gameBoard.getMark(index) === currentPlayer.getMark())
      if(isValid) {
        winCells = temp;
        break;
      }
    }
    return isValid
  }

  const toolbarText = async (currentPlayer) => {
    displayController.setText(displayController.currentRoundText, round);
    displayController.setText(displayController.currentTurnText, currentPlayer.getTurnText());
    displayController.setText(displayController.playerScore, getPlayer().player.getPoints());
    displayController.setText(displayController.aiScore, getPlayer().ai.getPoints());
  }

  const gameoverScoreDisplay = () => {
    let humanPlayer = getPlayer().player;
    let aiPlayer = getPlayer().ai;
    if(humanPlayer.getPoints() > aiPlayer.getPoints()) gameOverText = `You win with ${humanPlayer.getPoints()} points.`;
    else if(humanPlayer.getPoints() === aiPlayer.getPoints()) gameOverText = `DRAW with ${humanPlayer.getPoints()} points each.`;
    else gameOverText = `AI wins with ${aiPlayer.getPoints()} points.`;
  }

  const resetRound = async (currentPlayer) => {
    if(winCells.length > 0) displayController.setWinCells(winCells);
    else displayController.setDrawCells();
    winCells = [];
    await sleep(2000);
    gameBoard.resetBoard();
    displayController.resetGameBoard();
    isPlayerTurn = true;
    isRoundOver = false;
    turnCount = 0;
    round++;
    await toolbarText(currentPlayer);
  }

  const resetGame = async (currentPlayer) => {
    gameoverScoreDisplay();
    displayController.gameOverScreen(gameOverText);
    gameBoard.resetBoard();
    displayController.resetGameBoard();
    isPlayerTurn = true;
    isGameOver = false;
    isRoundOver = false;
    turnCount = 0;
    round = 1;
    getPlayer().player.setPoints(0);
    getPlayer().ai.setPoints(0);
    await toolbarText(currentPlayer);
  }

  const sleep = async milliseconds => {
    await new Promise(resolve => {
      return setTimeout(resolve, milliseconds)
    })
  }

  return {
    playerX,
    playerO,
    AiType,
    init,
    setAiType,
    getPlayer,
    sleep,
  };
})();




