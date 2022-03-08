const refresh1 = document.getElementById("refresh");

class Player {
  constructor(batu, kertas, gunting) {
    this.batu = batu;
    this.kertas = kertas;
    this.gunting = gunting;
  }
}

class Computer {
  constructor(batu, kertas, gunting) {
    this.batu = batu;
    this.kertas = kertas;
    this.gunting = gunting;
  }
}

class Result {
  constructor(text, win, lose, draw) {
    this.text = text;
    this.win = win;
    this.lose = lose;
    this.draw = draw;
  }
}

const player1 = new Player(
  document.querySelector("#rock-player"),
  document.querySelector("#paper-player"),
  document.querySelector("#scissors-player")
);

const computer1 = new Computer(
  document.querySelector("#rock-com"),
  document.querySelector("#paper-com"),
  document.querySelector("#scissors-com")
);

const result1 = new Result(
  document.querySelector("#vs"),
  document.querySelector("#player-win"),
  document.querySelector("#computer-win"),
  document.querySelector("#draw")
);

function getComChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomNumber = Math.trunc(Math.random() * 3);

  if (randomNumber == 0) {
    computer1.batu.style.border = "3px solid #531345";
    computer1.batu.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    computer1.batu.style.borderRadius = "40%";
    computer1.kertas.removeAttribute("style");
    computer1.gunting.removeAttribute("style");
  } else if (randomNumber == 1) {
    computer1.kertas.style.border = "3px solid #531345";
    computer1.kertas.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    computer1.kertas.style.borderRadius = "40%";
    computer1.batu.removeAttribute("style");
    computer1.gunting.removeAttribute("style");
  } else {
    computer1.gunting.style.border = "3px solid #531345";
    computer1.gunting.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    computer1.gunting.style.borderRadius = "40%";
    computer1.kertas.removeAttribute("style");
    computer1.batu.removeAttribute("style");
  }
  return choices[randomNumber];
}

function win(playerHand, comHand) {
  result1.win.style.display = "block";
  result1.draw.style.display = "none";
  result1.lose.style.display = "none";
  result1.text.style.display = "none";
  console.log(`Player : ${playerHand} VS Computer : ${comHand}`);
}
function draw(playerHand, comHand) {
  result1.win.style.display = "none";
  result1.draw.style.display = "block";
  result1.lose.style.display = "none";
  result1.text.style.display = "none";
  console.log(`Player : ${playerHand} VS Computer : ${comHand}`);
}
function lose(playerHand, comHand) {
  result1.win.style.display = "none";
  result1.draw.style.display = "none";
  result1.lose.style.display = "block";
  result1.text.style.display = "none";
  console.log(`Player : ${playerHand} VS Computer : ${comHand}`);
}

function play(playerHand) {
  const comHand = getComChoice();
  if (
    (playerHand === "rock" && comHand === "scissors") ||
    (playerHand === "paper" && comHand === "rock") ||
    (playerHand === "scissors" && comHand === "paper")
  ) {
    win(playerHand, comHand);
  } else if (
    (playerHand === "rock" && comHand === "paper") ||
    (playerHand === "paper" && comHand === "scissors") ||
    (playerHand === "scissors" && comHand === "rock")
  ) {
    lose(playerHand, comHand);
  } else {
    draw(playerHand, comHand);
  }
}

function main() {
  player1.batu.addEventListener("click", function () {
    play("rock");
    player1.batu.style.border = "3px solid #531345";
    player1.batu.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    player1.batu.style.borderRadius = "40%";
    player1.kertas.removeAttribute("style");
    player1.gunting.removeAttribute("style");
  });
  player1.kertas.addEventListener("click", function () {
    play("paper");
    player1.kertas.style.border = "3px solid #531345";
    player1.kertas.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    player1.kertas.style.borderRadius = "40%";
    player1.batu.removeAttribute("style");
    player1.gunting.removeAttribute("style");
  });
  player1.gunting.addEventListener("click", function () {
    play("scissors");
    player1.gunting.style.border = "3px solid #531345";
    player1.gunting.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    player1.gunting.style.borderRadius = "40%";
    player1.kertas.removeAttribute("style");
    player1.batu.removeAttribute("style");
  });
}

main();

refresh1.addEventListener("click", () => {
  player1.batu.removeAttribute("style");
  computer1.batu.removeAttribute("style");
  player1.kertas.removeAttribute("style");
  computer1.kertas.removeAttribute("stylee");
  player1.gunting.removeAttribute("style");
  computer1.gunting.removeAttribute("style");
  result1.win.removeAttribute("style");
  result1.draw.removeAttribute("style");
  result1.lose.removeAttribute("style");
  result1.text.style.display = "block";
});
