const submit = document.querySelector("button[type='submit']");
const input = document.querySelector("#inputNum");
const guesses = document.querySelector("#guesses");
const attempts = document.querySelector("#attempts-left");
const lessOrHigh = document.querySelector("#low-or-high");
const newGameBtn = document.querySelector("#new-game-btn");

const p = document.createElement("p");

let randomNum = Math.round(Math.random() * 100 + 1);
let previousGuesses = [];
let totalAttempts = 10;
let playGame = true;

if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    let guess = parseInt(input.value);
    validateGuess(guess);
  });
}

const validateGuess = (guess) => {
  if (isNaN(guess)) {
    alert("Please enter a valid number");
  } else if (guess < 1) {
    alert("Please enter a number greater than 1");
  } else if (guess > 100) {
    alert("Please enter a number less than 100");
  } else {
    displayResults(guess);
  }
};

const displayResults = (guess) => {
  if (guess < randomNum) {
    handleGuess(guess, "Your guess is less than the actual number.");
  } else if (guess > randomNum) {
    handleGuess(guess, "Your guess is greater than the actual number.");
  } else if (guess === randomNum) {
    handleGuess(guess, "Congratulations! You guessed the correct number!");
  }
};

const handleGuess = (guess, message) => {
  displayMessage(message);

  if (guess !== randomNum) {
    previousGuesses.push(guess);
    guesses.innerHTML = previousGuesses;
    totalAttempts--;
    if (totalAttempts > 0) {
      attempts.innerHTML = totalAttempts;
    } else {
      attempts.innerHTML = "Your attempts are finished";
      displayMessage(`Game Over Correct Answer was ${randomNum}`);
      endGame();
    }
  } else {
    endGame();
  }
};

const displayMessage = (message) => {
  lessOrHigh.innerHTML = `${message}`;
};

function endGame() {
  input.value = "";
  input.setAttribute("disabled", "");
  p.classList.add("button");
  p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
  p.style.backgroundColor = "yellow";
  p.style.padding = "4px";
  newGameBtn.appendChild(p);
  playGame = false;
  newGame();
}

const newGame = () => {
  newGameBtn.addEventListener("click", function () {
    previousGuesses = [];
    input.value = "";
    guesses.innerHTML = "";
    lessOrHigh.innerHTML = "";
    attempts.innerHTML = "";
    input.removeAttribute("disabled");
    newGameBtn.removeChild(p);
    totalAttempts = 10;
    randomNum = Math.round(Math.random() * 100 + 1);
    playGame = true;
  });
};
