function reconstructPath(
  startNode: HTMLTableCellElement,
  endNode: HTMLTableCellElement,
  openList: Array<HTMLTableDataCellElement>,
  closedList: Array<HTMLTableDataCellElement>
) {
  let path: Array<HTMLTableCellElement> = [];
  let current: HTMLTableCellElement = endNode;

  while (current != startNode) {
    path.push(current);
    current = document.getElementById(
      current.getAttribute("parent") as string
    ) as HTMLTableCellElement;
  }
  path.reverse();

  // drawing the shortest path from startNode to endNode
  console.log(path);

  let j = 0;
  let drawVisited = setInterval(() => {
    closedList[j].classList.add("visited");
    j++;
    if (j == closedList.length) {
      clearInterval(drawVisited);
      let i = 0;
      let drawPath = setInterval(() => {
        path[i].classList.add("path");
        i++;
        if (i == path.length) {
          clearInterval(drawPath);
        }
      }, 10);
    }
  }, 10);
}

function heuristic(
  neighbour: HTMLTableCellElement,
  endNode: HTMLTableCellElement
): number {
  const neighbourX: number = parseInt(neighbour.id.split(":")[0]);
  const neighbourY: number = parseInt(neighbour.id.split(":")[1]);

  const endNodeX: number = parseInt(endNode.id.split(":")[0]);
  const endNodeY: number = parseInt(endNode.id.split(":")[1]);
  // console.log(neighbourX, neighbourY, endNodeX, endNodeY);

  let h = Math.floor(
    Math.sqrt(
      Math.pow(endNodeX - neighbourX, 2) + Math.pow(endNodeY - neighbourY, 2)
    )
  );
  return h;
}

function addNeighbours(currentNode: HTMLTableCellElement): any {
  let x: number = parseInt(currentNode.id.split(":")[0]);
  let y: number = parseInt(currentNode.id.split(":")[1]);

  if (currentNode) {
    currentNode.setAttribute(
      // 36x20
      "neighbours",
      JSON.stringify({
        left: x - 1 < 1 ? undefined : `${x - 1}:${y}`,
        right: x + 1 > 36 ? undefined : `${x + 1}:${y}`,
        top: y - 1 < 1 ? undefined : `${x}:${y - 1}`,
        bottom: y + 1 > 20 ? undefined : `${x}:${y + 1}`,
      })
    );
  }
  return JSON.stringify({
    left: x - 1 < 1 ? undefined : `${x - 1}:${y}`,
    right: x + 1 > 36 ? undefined : `${x + 1}:${y}`,
    top: y - 1 < 1 ? undefined : `${x}:${y - 1}`,
    bottom: y + 1 > 20 ? undefined : `${x}:${y + 1}`,
  });
}

function removeFromList(
  openList: Array<HTMLTableCellElement>,
  current: HTMLTableCellElement
) {
  for (let i = openList.length; i >= 0; i--) {
    if (openList[i] == current) {
      openList.splice(i, 1);
    }
  }
}

export default function astar(
  startNode: HTMLTableDataCellElement,
  endNode: HTMLTableDataCellElement,
  wallNodes: NodeListOf<HTMLTableDataCellElement>,
  grid: HTMLTableElement
) {
  console.log(startNode);
  console.log(endNode);
  console.log(wallNodes);
  console.log(grid);

  const openList: Array<HTMLTableDataCellElement> = [];
  const closedList: Array<HTMLTableDataCellElement> = [];

  let path: Array<HTMLTableDataCellElement> = [];

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
      console.log("DONE");
      reconstructPath(startNode, endNode, openList, closedList);

      return;
    }

    listOfAllNeighboursIDs = addNeighbours(current);
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

        if (!openList.includes(currentNeighbour)) {
          openList.push(currentNeighbour);
        }
      }

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
  console.log(closedList);
}
