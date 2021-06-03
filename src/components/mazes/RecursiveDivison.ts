import { resetGrid } from "../utils";

export function recursiveDivison(grid: HTMLTableElement) {
  resetGrid();
  document
    .querySelectorAll(".wall")
    .forEach((wall) => wall.classList.replace("wall", "grid__node"));

  let gridHeight: number = grid.rows.length as number;
  let gridWidth: number = grid.children[0].childNodes.length as number;

  const walls: HTMLTableDataCellElement[] = [];

  while (gridWidth % 2 == 0 || gridHeight % 2 == 0) {
    let direction: string = randomDirection() == 1 ? "VERTICAL" : "HORIZONTAL";
    let leftOrRight: number = randomDirection();

    let middle = document.getElementById(
      direction == "HORIZONTAL" ? `1:${gridHeight / 2}` : `${gridWidth / 2}:1`
    );

    const randomDoor: number = randomGap(
      direction == "HORIZONTAL" ? gridWidth : gridHeight
    );

    for (
      let i = 1;
      i <= (direction == "HORIZONTAL" ? gridWidth : gridHeight);
      i++
    ) {
      if (i == randomDoor) {
        continue;
      }
      walls.push(
        document.getElementById(
          direction == "HORIZONTAL"
            ? `${i}:${gridHeight / 2}`
            : `${gridWidth / 2}:${i}`
        ) as HTMLTableDataCellElement
      );
    }

    gridHeight = direction == "HORIZONTAL" ? gridHeight / 2 : gridHeight;
    gridWidth = direction == "VERTICAL" ? gridWidth / 2 : gridWidth;

    console.log("current middle element: ", middle);
    console.log("walls: ", walls);
    console.log("grid Height: ", gridHeight);
    console.log("grid Width: ", gridWidth);

    // TEMPORARY DRAW FUNCTION
    let a = 0;
    let as = setInterval(() => {
      walls[a].classList.add("wall");
      if (a == walls.length) {
        clearInterval(as);
      }
      a++;
    }, 10);
  }
}

const randomDirection = (): number => {
  // 1 - left
  // 2 - right
  return Math.floor(Math.random() * 2) + 1;
};

const randomGap = (width: number): number => {
  return Math.floor(Math.random() * width) + 1;
};
