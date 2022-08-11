const gameboard = (() => {
  let gameboardArray = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const setBoard = (array) => {
    gameboardArray = array;
  };

  const show = () => {
    document.querySelector(".gameboard").innerHTML = "";
    for (i = 0; i < 3; ++i) {
      for (j = 0; j < 3; j++) {
        let field = document.createElement("div");
        field.textContent = gameboardArray[i][j];
        document.querySelector(".gameboard").appendChild(field);
      }
    }
  };

  return {
    show,
    setBoard,
    gameboardArray,
  };
})();

const test = [
  ["x", "o", "x"],
  ["o", "x", "o"],
  ["o", "o", "x"],
];

gameboard.setBoard(test);
console.log(gameboard.gameboardArray);
console.log(gameboard.gameboardArray[0][0]);
gameboard.show();
