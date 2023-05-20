let xScoreT = document.querySelector("#xScore");
let oScoreT = document.querySelector("#oScore");
let xSN = xScoreT.getAttribute("score");
let oSN = oScoreT.getAttribute("score");
xScoreT.textContent = `X: ${xSN}`;
oScoreT.textContent = `O: ${oSN}`;
let board = document.querySelector("#board");
let info = document.querySelector(".info");
info.textContent = "Cross Start";
let turn = "cross";
let btn = document.querySelector("button")
let winnings = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];
let option = ["", "", "", "", "", "", "", "", ""];

for (let i = 0; i < option.length; i++) {
  let square = document.createElement("div");
  square.classList.add("square");
  square.setAttribute("index", i);
  board.appendChild(square)
}
let squares = Array.from(document.querySelectorAll(".square"));

initalizeGame()

function initalizeGame() {
  squares.forEach((cell => {
    cell.addEventListener("click", squareClick);
  }))
  btn.addEventListener("click", ristart);
  info.textContent = `${turn} start`;
}
function squareClick() {
  let squareIndex = this.getAttribute("index");
  let game = document.createElement("div");
  game.classList.add(turn);
  this.appendChild(game);
  option[squareIndex] = turn
  changePlayer();
  info.textContent = `${turn}'s turn`;
  check();
  this.removeEventListener("click",squareClick)
}
function changePlayer() {
  if (turn === "cross") {
    turn = "circle"
  } else {
    turn = "cross"
  }
};
function check() {
  let win = false;
  for (let i = 0; i < winnings.length; i++) {
    let condition = winnings[i];
    let A = option[condition[0]];
    let B = option[condition[1]];
    let C = option[condition[2]];
    if (A === "cross" && B === "cross" && C === "cross") {
      win = true;
      info.textContent = "Cross WINS";
      xSN = Number(xSN + 1);
      xScoreT.textContent = `X: ${xSN}`;
    } else if (A === "circle" && B === "circle" && C === "circle") {
      win = true;
      info.textContent = "Circle WINS";
      oSN = Number(oSN + 1);
      oScoreT.textContent = `O: ${oSN}`;
    } else if (!option.includes("")) {
      info.textContent = "Draw"
    }
  }
  if (win === true) {
    squares.forEach((ele => {
      ele.removeEventListener("click", squareClick);
    }))
  }
}
function ristart() {
  option = ["", "", "", "", "", "", "", "", ""];
  squares.forEach((ele => {
    ele.textContent = ""
  }))
  turn = "cross"
  initalizeGame()
}