import { dir } from "console";
import { resetGrid } from "../utils";

function createBorderOnGrid(
  gridHeight: number,
  gridWidth: number
): HTMLTableDataCellElement[] {
  const borderElementsTable = [];

  for (let x = 1; x <= gridWidth; x++) {
    borderElementsTable.push(
      document.getElementById(`${x}:1`) as HTMLTableDataCellElement
    );
    borderElementsTable.push(
      document.getElementById(`${x}:22`) as HTMLTableDataCellElement
    );
  }

  for (let y = 1; y <= gridHeight; y++) {
    borderElementsTable.push(
      document.getElementById(`1:${y}`) as HTMLTableDataCellElement
    );
    borderElementsTable.push(
      document.getElementById(`49:${y}`) as HTMLTableDataCellElement
    );
  }

  return borderElementsTable;
}

function getWallStartingPointID(
  vertivalOrHorizontal: string,
  height: number,
  width: number
) {
  // return vertivalOrHorizontal === "VERTICAL"
  //   ? `${Math.floor(Math.random() * width) + 3}:1`
  //   : `1:${Math.floor(Math.random() * height) + 3}`;

  if (vertivalOrHorizontal === "VERTICAL") {
    let x = Math.floor(Math.random() * width) + 3;
    if (
      !document.getElementById(`${x - 1}:1`)?.classList.contains("wall") &&
      !document.getElementById(`${x + 1}:1`)?.classList.contains("wall")
    ) {
      if (!document.getElementById(`${x + 1}:1`)?.classList.contains("wall")) {
        return `${x - 1}:1`;
      } else if (
        !document.getElementById(`${x - 1}:1`)?.classList.contains("wall")
      ) {
        return `${x + 1}:1`;
      }

      return `${x}:1`;
    }
  } else {
    let y = Math.floor(Math.random() * height) + 3;
    if (
      !document.getElementById(`${y - 1}:1`)?.classList.contains("wall") ||
      !document.getElementById(`${y + 1}:1`)?.classList.contains("wall")
    ) {
      if (!document.getElementById(`${y + 1}:1`)?.classList.contains("wall")) {
        return `${y - 1}:1`;
      } else if (
        !document.getElementById(`${y - 1}:1`)?.classList.contains("wall")
      ) {
        return `${y + 1}:1`;
      }

      return `${y}:1`;
    }
    return `${y}:1`;
  }

  return "";
}

function getVerticalOrHorizontal(
  gridHeight: number,
  gridWidth: number
): string {
  if (gridWidth > gridHeight) {
    return "VERTICAL";
  } else if (gridHeight > gridWidth) {
    return "HORIZONTAL";
  } else {
    return Math.floor(Math.random() * 2) + 0 == 1 ? "VERTICAL" : "HORIZONTAL";
  }
}

function getRandomDoorID(
  vertivalOrHorizontal: string,
  wallStartingPointID: string
): string {
  if (vertivalOrHorizontal === "VERTICAL") {
    return `${wallStartingPointID.split(":")[0]}:${
      Math.floor(Math.random() * 20) + 2
    }`;
  } else {
    return `${Math.floor(Math.random() * 46) + 2}:${
      wallStartingPointID.split(":")[1]
    }`;
  }
}

function getSide(): string {
  return Math.floor(Math.random() * 2) + 0 == 1 ? "LEFT/TOP" : "RIGHT/BOTTOM";
}
const wallsArray: HTMLTableDataCellElement[] = [];

function divide(width: number, height: number) {
  if (width <= 1 || height <= 1) console.log("done");
  let direction: string = getVerticalOrHorizontal(height, width);

  let wallID: string = getWallStartingPointID(direction, height, width); // VERTICAL [rand]:1 HORIZONTAL 1:[rand]
  // wallsSet.add(wallID);

  let door: string = getRandomDoorID(direction, wallID);

  let side: string = getSide();

  for (
    let index = 1;
    index <= (direction === "VERTICAL" ? height : width);
    index++
  ) {
    if (direction === "VERTICAL") {
      if (Number(door.split(":")[1]) == index) {
        continue;
      }
    } else {
      if (Number(door.split(":")[0]) == index) {
        continue;
      }
    }

    wallsArray.push(
      document.getElementById(
        direction === "VERTICAL"
          ? `${wallID.split(":")[0]}:${index}`
          : `${index}:${wallID.split(":")[1]}`
      ) as HTMLTableDataCellElement
    );
  }

  // TEMPORARY DRAW FUNCTION
  // let a = 0;
  // let as = setInterval(() => {
  //   if (a == wallsArray.length) {
  //     clearInterval(as);
  //   } else {
  //     wallsArray[a].classList.add("wall");
  //     a++;
  //   }
  // }, 10);

  // wallsArray.forEach((e) => e.classList.add("wall"));

  debugger;
  if (direction === "VERTICAL") {
    divide(Number(wallID.split(":")[0]), height);
    divide(width - Number(wallID.split(":")[0]), height);
  } else if (direction === "HORIZONTAL") {
    divide(width, Number(wallID.split(":")[1]));
    divide(width, height - Number(wallID.split(":")[1]));
  }

  console.log(wallsArray);
}

export function recursiveDivison(
  grid: HTMLTableElement,
  width: number,
  height: number
) {
  console.log("asd");

  resetGrid();
  document
    .querySelectorAll(".wall")
    .forEach((wall) => wall.classList.replace("wall", "grid__node"));
  if (width < 2 || height < 2) return;
  // const wallsSet = new Set<string>();
  createBorderOnGrid(height, width).forEach((cell) => {
    wallsArray.push(cell);
  });

  divide(width, height);

  // const walls: HTMLTableDataCellElement[] = [];
  // const IDsOfWallStartingPoints: string[] = [];

  // const wallsSet = new Set<string>();

  // createBorderOnGrid(gridHeight, gridWidth).forEach((cell) => {
  //   walls.push(cell);
  // });

  // let vertivalOrHorizontal = getVerticalOrHorizontal(gridHeight, gridWidth);

  // let wallStartingPointID = getWallStartingPointID(vertivalOrHorizontal);
  // wallsSet.add(wallStartingPointID);

  /*
    0 - check if selected wall has any neighbours with .wall
    1 - left/top or right/bottom, first iteration don't care about it
    2 - vertical or horizontal
    3 - create passage
    4 - draw it
    5 - add wall to Set
  */

  // let randomDoorID = getRandomDoorID(vertivalOrHorizontal, wallStartingPointID);

  // let whichSide = getSide();

  // if (vertivalOrHorizontal === "VERTICAL") {
  //   for (let wallY = 2; wallY <= 21; wallY++) {
  //     if (Number(randomDoorID.split(":")[1]) !== wallY) {
  //       IDsOfWallStartingPoints.push(
  //         `${wallStartingPointID.split(":")[0]}:${wallY}`
  //       );
  //     }
  //   }
  // } else {
  //   for (let wallX = 2; wallX <= 48; wallX++) {
  //     if (Number(randomDoorID.split(":")[0]) !== wallX) {
  //       IDsOfWallStartingPoints.push(
  //         `${wallX}:${wallStartingPointID.split(":")[1]}`
  //       );
  //     }
  //   }
  // }
  // console.log(vertivalOrHorizontal, wallStartingPointID);

  // console.log(IDsOfWallStartingPoints, randomDoorID);

  // IDsOfWallStartingPoints.forEach((id) => {
  //   if (id) {
  //     walls.push(document.getElementById(id) as HTMLTableDataCellElement);
  //   }
  // });
  // let ww = 0;
  // while (ww != 300) {
  //   ww++;
  //   let direction: string = randomDirection() == 1 ? "VERTICAL" : "HORIZONTAL";
  //   let leftOrRight: number = randomDirection();

  //   let middle = document.getElementById(
  //     direction == "HORIZONTAL"
  //       ? `1:${Math.floor(gridHeight / 2)}`
  //       : `${Math.floor(gridWidth / 2)}:1`
  //   );

  //   const randomDoor: number = randomGap(
  //     direction == "HORIZONTAL" ? gridWidth : gridHeight
  //   );

  //   for (
  //     let i = 1;
  //     i <= (direction == "HORIZONTAL" ? gridWidth : gridHeight);
  //     i++
  //   ) {
  //     if (i == randomDoor) {
  //       continue;
  //     }
  //     walls.push(
  //       document.getElementById(
  //         direction == "HORIZONTAL"
  //           ? `${i}:${Math.floor(gridHeight / 2)}`
  //           : `${Math.floor(gridWidth / 2)}:${i}`
  //       ) as HTMLTableDataCellElement
  //     );
  //   }

  //   gridHeight =
  //     direction == "HORIZONTAL" ? Math.floor(gridHeight / 2) : gridHeight;
  //   gridWidth = direction == "VERTICAL" ? Math.floor(gridWidth / 2) : gridWidth;

  //   console.log("current middle element: ", middle);
  //   console.log("walls: ", walls);
  //   console.log("grid Height: ", gridHeight);
  //   console.log("grid Width: ", gridWidth);

  // TEMPORARY DRAW FUNCTION
  // let a = 0;
  // let as = setInterval(() => {
  //   if (a == wallsArray.length) {
  //     clearInterval(as);
  //   } else {
  //     wallsArray[a].classList.add("wall");
  //     a++;
  //   }
  // }, 10);
  // }
}

const randomDirection = (): number => {
  // 1 - left
  // 2 - right
  return Math.floor(Math.random() * 2) + 1;
};

const randomGap = (width: number): number => {
  return Math.floor(Math.random() * width) + 1;
};
