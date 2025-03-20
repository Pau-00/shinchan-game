let board = Array(9).fill('');
let playerX = 'X';
let gameOver = false;
let isPlayerTurn = true; // Variable para controlar el turno del jugador

const winScreen = document.getElementById('win-screen');
const loseScreen = document.getElementById('lose-screen');

const btnResetWin = document.getElementById('btn-reset-win');
const btnResetLose = document.getElementById('btn-reset-lose');
const startButton = document.getElementById('btn-start');
const backgroundMusic = document.getElementById('background-music');


document.addEventListener('DOMContentLoaded', function () {
  const startScreen = document.getElementById('start-screen');
  const gameScreen = document.getElementById('game-screen');
  const startButton = document.getElementById('btn-start');




  startButton.addEventListener('click', function () {
    startScreen.style.display = 'none'; // Oculta la pantalla de inicio
    gameScreen.style.display = 'flex'; // Muestra la pantalla del juego
    backgroundMusic.play();
  });



  /* Agregar el evento de clic al botón de reiniciar */
  btnResetWin.addEventListener('click', resetGame);
  btnResetLose.addEventListener('click', resetGame);
});


/* Función para reiniciar el juego */
function resetGame() {
  board = Array(9).fill('');
  gameOver = false;
  winScreen.style.display = 'none'; // Oculta la pantalla de victoria
  loseScreen.style.display = 'none'; // Oculta la pantalla de derrota
  updateBoard();
  isPlayerTurn = true; // El jugador comienza el juego
}

/*Función para mostrar las pantallas*/
function showWinScreen() {
  winScreen.style.display = 'flex'; // Muestra la pantalla de victoria
}

function showLoseScreen() {
  loseScreen.style.display = 'flex'; // Muestra la pantalla de derrota
}

/*Función del Humano*/
function handleClick(index) {
  if (gameOver === false && board[index] === '' && isPlayerTurn) {
    board[index] = playerX;
    isPlayerTurn = false; // Cambia el turno a la máquina
    updateBoard();
    checkWinner();

    if (!gameOver) {
      setTimeout(computerMove, 1000); // Espera 1 segundo antes de que la máquina juegue
    }
  }
}

/*Función de la máquina*/
function computerMove() {
  if (!isPlayerTurn && !gameOver) {
    let emptyCells = board
      .map((val, index) => (val === '' ? index : null)) // Si la consola está vacía, guarda su índice
      .filter((v) => v !== null); // Filtrar los valores nulos

    // Si hay espacios vacíos, la máquina elige uno al azar
    if (emptyCells.length > 0) {
      let randomIndex =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[randomIndex] = 'O'; // La máquina juega con "O"
      isPlayerTurn = true; // Cambia el turno al jugador
      updateBoard(); // Actualiza la interfaz
      checkWinner(); // Verifica si alguien ganó
    }
  }
}

/*Función para actualizar el tablero*/
function updateBoard() {
  document.querySelectorAll('.btn-square').forEach((cell, i) => {
    cell.textContent = board[i];
    cell.disabled = board[i] !== ''; // Deshabilitar botón si ya está ocupado
  });
}

/*Función por turnos*/



/*Función para verificar el ganador*/
function checkWinner() {
  let winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6] // Diagonales
  ];

  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      if (board[a] === playerX) {
        showWinScreen(); // Muestra la pantalla de victoria
      } else {
        showLoseScreen(); // Muestra la pantalla de derrota
      }
      return;
    }
  }

  /*Si no hay espacios vacíos y nadie ganó, es empate*/
  if (!board.includes('')) {
    gameOver = true;
    showLoseScreen(); // Muestra la pantalla de derrota en caso de empate
  }
}



//Bucle del gif//
const gif = document.getElementById('mi-gif');

// Reinicia el GIF cada 3 segundos (ajusta el tiempo según la duración del GIF)
setInterval(() => {
  gif.src = gif.src; // Reinicia el GIF cambiando su src
}, 1000); // 1000 ms = 1 segundos