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
        console.log(game.checkWin(gameboardArray));
      });
    });
  };

  return {
    show,
    setBoard,
    getRow,
    getColumn,
    gameboardArray,
  };
})();

const game = (() => {
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
    checkWin,
  };
})();

const test = [
  ["x", "o", "x"],
  ["o", "x", "o"],
  ["o", "o", "x"],
];

//gameboard.setBoard(test);
gameboard.show();
