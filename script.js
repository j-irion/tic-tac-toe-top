const gameboard = (() => {
  let gameboardArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  let isCross = true;

  const setBoard = (array) => {
    gameboardArray = array;
  };

  const reset = () => {
    gameboardArray = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    document.querySelector(".gameboard").innerHTML = "";
    document.getElementById("p1").value = "";
    document.getElementById("p2").value = "";
    document.getElementById("msg").style.display = "block";
    isCross = true;
  };

  const show = () => {
    document.querySelector(".gameboard").innerHTML = "";
    for (i = 0; i < 3; ++i) {
      for (j = 0; j < 3; j++) {
        let field = document.createElement("div");
        field.textContent = gameboardArray[i][j];
        field.className = "field";
        field.id = `${i}-${j}`;
        document.querySelector(".gameboard").appendChild(field);
      }
    }
    _addClickEvent();
  };

  const getRow = (element) => {
    return element.id.charAt(0);
  };

  const getColumn = (element) => {
    return element.id.charAt(2);
  };

  const _addClickEvent = () => {
    document.querySelectorAll(".field").forEach((field) => {
      field.addEventListener("click", () => {
        if (field.textContent !== "") return;
        gameboardArray[getRow(field)][getColumn(field)] = isCross ? "x" : "o";
        isCross = !isCross;
        show();
        if (game.checkWin(gameboardArray)) {
          _displayWinner();
          game.reset();
        }
        if (game.checkDraw(gameboardArray)) {
          _displayDraw();
          game.reset();
        }
      });
    });
  };

  const _displayWinner = () => {
    let winner = !isCross ? game.getP1() : game.getP2();
    alert(`${winner.name} has won!`);
  };

  const _displayDraw = () => {
    alert("It's a draw!");
  };

  return {
    show,
    setBoard,
    getRow,
    getColumn,
    gameboardArray,
    reset,
  };
})();

const game = (() => {
  let players = new Array(2);

  const initializeGame = (event) => {
    event.preventDefault();
    players[0] = playerFactory(document.getElementById("p1").value, true);
    players[1] = playerFactory(document.getElementById("p2").value, false);
    console.log(players);
    document.getElementById("msg").style.display = "none";
    document.getElementsByClassName("gameboard")[0].style.display = "grid";
    gameboard.show();
  };

  const reset = () => {
    players = new Array(2);
    gameboard.reset();
  };

  const getP1 = () => {
    return players[0];
  };

  const getP2 = () => {
    return players[1];
  };

  const checkWin = (field) => {
    if (
      _checkRowWin(field) ||
      _checkColumnWin(field) ||
      _checkDiagonalWin(field)
    ) {
      return true;
    }
    return false;
  };

  const checkDraw = (field) => {
    if (field.every((row) => row.every((x) => x !== "")) && !checkWin(field)) {
      return true;
    }
    return false;
  };

  const _checkRowWin = (field) => {
    let result = false;

    field.forEach((row) => {
      if (row.every((element) => element === row[0] && row[0] !== "")) {
        result = true;
      }
    });

    return result;
  };

  const _checkColumnWin = (field) => {
    for (let i = 0; i < 3; i++) {
      let column = _arrayColumn(field, i);
      if (column.every((element) => element === column[0] && column[0] !== ""))
        return true;
    }
    return false;
  };

  const _arrayColumn = (arr, n) => arr.map((x) => x[n]);

  const _checkDiagonalWin = (field) => {
    let condition = field[1][1];
    if (condition === "") return false;
    if (field[0][0] === condition && field[2][2] === condition) return true;
    if (field[0][2] === condition && field[2][0] === condition) return true;
    return false;
  };

  return {
    initializeGame,
    checkWin,
    checkDraw,
    getP1,
    getP2,
    reset,
  };
})();

const test = [
  ["x", "o", "x"],
  ["o", "x", "o"],
  ["o", "o", "x"],
];

const playerFactory = (name, isCross) => {
  return { name, isCross };
};
