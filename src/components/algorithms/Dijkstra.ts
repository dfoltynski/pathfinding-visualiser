import {
  reconstructPath,
  heuristic,
  addNeighbours,
  removeFromList,
} from "./utils";

import { disableVisualisationControl } from "../utils";

export default function dijskstra(
  startNode: HTMLTableDataCellElement,
  endNode: HTMLTableDataCellElement
) {
  disableVisualisationControl(
    document.querySelector(".nav__button") as HTMLButtonElement
  );
  const openList: Array<HTMLTableDataCellElement> = [];
  const closedList: Array<HTMLTableDataCellElement> = [];

  let current: HTMLTableDataCellElement;
  let listOfAllNeighboursIDs: string;
  let currentNeighbour: HTMLTableDataCellElement;
  openList.push(startNode);

  while (openList.length > 0) {
    current = openList[0];

    for (let i = 0; i < openList.length; i++) {
      if (
        parseInt(openList[i].getAttribute("g") as string) <
        parseInt(current.getAttribute("g") as string)
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

      let GScore = heuristic(currentNeighbour, startNode);

      if (
        GScore < parseInt(currentNeighbour.getAttribute("g") as string) ||
        !openList.includes(currentNeighbour)
      ) {
        currentNeighbour.setAttribute("g", `${GScore}`);
        openList.push(currentNeighbour);
        currentNeighbour.setAttribute("parent", `${current.id}`);
      }

      // drawing in case of not finding end node
      let j = 0;
      let drawVisited = setInterval(() => {
        closedList[j].classList.add("visited");
        j++;
        if (j == closedList.length) {
          clearInterval(drawVisited);
        }
      }, 10);
    }
  }
}
