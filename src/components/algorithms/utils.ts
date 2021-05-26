export function reconstructPath(
  startNode: HTMLTableCellElement,
  endNode: HTMLTableCellElement,
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

export function heuristic(
  neighbour: HTMLTableCellElement,
  endNode: HTMLTableCellElement
): number {
  const neighbourX: number = parseInt(neighbour.id.split(":")[0]);
  const neighbourY: number = parseInt(neighbour.id.split(":")[1]);

  const endNodeX: number = parseInt(endNode.id.split(":")[0]);
  const endNodeY: number = parseInt(endNode.id.split(":")[1]);

  let h = Math.floor(
    Math.sqrt(
      Math.pow(endNodeX - neighbourX, 2) + Math.pow(endNodeY - neighbourY, 2)
    )
  );
  return h;
}

export function addNeighbours(currentNode: HTMLTableCellElement): any {
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

export function removeFromList(
  openList: Array<HTMLTableCellElement>,
  current: HTMLTableCellElement
) {
  for (let i = openList.length; i >= 0; i--) {
    if (openList[i] == current) {
      openList.splice(i, 1);
    }
  }
}
export default { reconstructPath, heuristic, addNeighbours, removeFromList };
