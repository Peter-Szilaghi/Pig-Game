'use strict';

//////////////////////
/// Course Variant ///
//////////////////////
// const player0El = document.querySelector('.player--0');
// const player1El = document.querySelector('.player--1');

// const score0El = document.getElementById('score--0');
// const score1El = document.getElementById('score--1');
// const current0El = document.getElementById('current--0');
// const current1El = document.getElementById('current--1');

// const newGameBtn = document.querySelector('.btn--new');
// const rollBtn = document.querySelector('.btn--roll');
// const holdBtn = document.querySelector('.btn--hold');
// const diceEl = document.querySelector('.dice');

// let scores, currentScore, activePlayer, playing;

// function reset() {
//   scores = [0, 0];
//   currentScore = 0;
//   activePlayer = 0;
//   playing = true;

//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   current0El.textContent = 0;
//   current1El.textContent = 0;
//   player0El.classList.remove('player--winner');
//   player1El.classList.remove('player--winner');
//   player0El.classList.add('player--active');
//   player1El.classList.remove('player--active');

//   diceEl.classList.add('hidden');
// }

// reset();

// function switchPlayer() {
//   document.getElementById(`current--${activePlayer}`).textContent = 0;
//   activePlayer = activePlayer === 0 ? 1 : 0;
//   currentScore = 0;
//   player0El.classList.toggle('player--active');
//   player1El.classList.toggle('player--active');
// }

// rollBtn.addEventListener('click', () => {
//   if (playing) {
//     // 1. Generating a random dice roll
//     const dice = Math.trunc(Math.random() * 6 + 1);

//     // 2. Display dice
//     if (diceEl.classList.contains('hidden')) diceEl.classList.remove('hidden');
//     diceEl.src = `dice-${dice}.png`;

//     // 3. Check for rolled 1: if true, switch to next player
//     if (dice !== 1) {
//       // Add dite to the current score
//       currentScore += dice;
//       document.getElementById(`current--${activePlayer}`).textContent =
//         currentScore;
//     } else {
//       //Swithc to next player
//       switchPlayer();
//     }
//   }
// });

// holdBtn.addEventListener('click', () => {
//   if (playing) {
//     // 1. Add current scor to active player's score
//     scores[activePlayer] += currentScore;
//     document.getElementById(`score--${activePlayer}`).textContent =
//       scores[activePlayer];

//     // 2. Check if player's score is >= 100
//     if (scores[activePlayer] >= 100) {
//       // Finish the game
//       playing = false;
//       document
//         .querySelector(`.player--${activePlayer}`)
//         .classList.add('player--winner');
//       document
//         .querySelector(`.player--${activePlayer}`)
//         .classList.remove('player--active');
//     } else {
//       // Switch to the next player
//       switchPlayer();
//     }
//   }
// });

// newGameBtn.addEventListener('click', reset);

/////////////////////////
/// My Final  Variant ///
/////////////////////////
const player = [
  {
    containerEl: document.querySelector('.player--0'),
    nameEl: document.getElementById('name--0'),
    scoreEl: document.getElementById('score--0'),
    currentEL: document.getElementById('current--0'),
    score: 0,
  },
  {
    containerEl: document.querySelector('.player--1'),
    nameEl: document.getElementById('name--1'),
    scoreEl: document.getElementById('score--1'),
    currentEL: document.getElementById('current--1'),
    score: 0,
  },
];

const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');

const winNr = 10;
let activePlayer = 0;
let diceNr;
let current = 0;
let win = false;

//Generate a random dice roll
function rollDice() {
  return Math.trunc(Math.random() * 6 + 1);
}
//Swithc to next player
function switchPlayer() {
  player[activePlayer].containerEl.classList.remove('player--active');
  current = 0;
  player[activePlayer].currentEL.textContent = current;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player[activePlayer].containerEl.classList.add('player--active');
}
//Reset Game
function resetGame() {
  player[activePlayer].containerEl.classList.remove(`player--winner`);
  current = 0;
  win = false;
  player.forEach((p, i) => {
    p.nameEl.textContent = `Player ${i + 1}`;
    p.score = 0;
    p.scoreEl.textContent = p.score;
    p.currentEL.textContent = 0;
    p.containerEl.classList.remove(`player--active`); //Remove if you want win player start the game
  });
  activePlayer = 0; //Remove if you want win player start the game
  player[activePlayer].containerEl.classList.add(`player--active`); //Remove if you want win player start the game
}
resetGame();

rollBtn.addEventListener('click', () => {
  if (!win) {
    //1. Generating a random dice roll
    diceNr = rollDice();
    //2. Display dice
    diceEl.src = `dice-${diceNr}.png`;
    // 3. Check for rolled 1: if true, switch to next player
    if (diceNr !== 1) {
      // Add dice to the current score
      current += diceNr;
      player[activePlayer].currentEL.textContent = current;
    } else {
      //Swithc to next player
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', () => {
  if (!win) {
    // 1. Add current scor to active player's score
    player[activePlayer].score += current;
    player[activePlayer].scoreEl.textContent = player[activePlayer].score;
    // 2. Check if player's score is >= 100
    if (player[activePlayer].score >= winNr) {
      // Finish the game
      player[activePlayer].nameEl.textContent = `Player ${
        activePlayer + 1
      } Win!`;
      player[activePlayer].containerEl.classList.add(`player--winner`);
      win = true;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener('click', resetGame);
