import {
  reconstructPath,
  heuristic,
  addNeighbours,
  removeFromList,
} from "./utils";

import {
  disableVisualisationControl,
  enableVisualisationControl,
} from "../utils";

export default function astar(
  startNode: HTMLTableDataCellElement,
  endNode: HTMLTableDataCellElement
) {
  disableVisualisationControl(
    document.querySelector(".nav__button") as HTMLButtonElement
  );
  const openList: Array<HTMLTableDataCellElement> = [];
  const closedList: Array<HTMLTableDataCellElement> = [];

  let current: HTMLTableDataCellElement;

  let currentNeighbour: HTMLTableCellElement;
  let listOfAllNeighboursIDs: string;

  openList.push(startNode);

  while (openList.length > 0) {
    current = openList[0];

    for (let i = 0; i < openList.length; i++) {
      if (
        parseInt(openList[i].getAttribute("cost") as string) <
        parseInt(current.getAttribute("cost") as string)
      ) {
        current = openList[i];
      }
    }

    removeFromList(openList, current);
    closedList.push(current);

    if (current == endNode) {
      reconstructPath(startNode, endNode, closedList);

      return;
    }

    addNeighbours(current);
    listOfAllNeighboursIDs = JSON.parse(
      current.getAttribute("neighbours") as string
    );

    for (let i = 0; i < Object.keys(listOfAllNeighboursIDs).length; i++) {
      currentNeighbour = document.getElementById(
        Object.values(listOfAllNeighboursIDs)[i]
      ) as HTMLTableCellElement;

      if (
        currentNeighbour.classList.contains("wall") ||
        closedList.includes(currentNeighbour)
      ) {
        continue;
      }

      let tentativeGScore =
        parseInt(current.getAttribute("g") as string) +
        heuristic(current, currentNeighbour);

      if (
        tentativeGScore <
          parseInt(currentNeighbour.getAttribute("g") as string) ||
        !openList.includes(currentNeighbour)
      ) {
        currentNeighbour.setAttribute(
          "h",
          `${heuristic(currentNeighbour, endNode)}`
        );
        currentNeighbour.setAttribute("g", `${tentativeGScore}`);

        currentNeighbour.setAttribute(
          "cost",
          `${
            parseInt(currentNeighbour.getAttribute("g") as string) +
            parseInt(currentNeighbour.getAttribute("h") as string)
          }`
        );

        currentNeighbour.setAttribute("parent", `${current.id}`);

        openList.push(currentNeighbour);
      }

      // drawing in case of not finding end node
      let j = 0;
      let drawVisited = setInterval(() => {
        closedList[j].classList.add("visited");
        j++;
        if (j == closedList.length) {
          clearInterval(drawVisited);
          enableVisualisationControl();
        }
      }, 10);
    }
  }
}
