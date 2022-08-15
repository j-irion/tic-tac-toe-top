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

const test = [
  ["x", "o", "x"],
  ["o", "x", "o"],
  ["o", "o", "x"],
];

//gameboard.setBoard(test);
gameboard.show();
