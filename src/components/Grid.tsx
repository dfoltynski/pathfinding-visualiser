import React, { useEffect, useRef, useState } from "react";
import resetGrid from "./utils";

export default function Grid() {
  let mouseDown: boolean = false;
  let nodeClass: string = "";

  const tableRef = useRef<HTMLTableElement>(document.createElement("table"));

  const handleMouseDown = (ev: any | MouseEvent) => {
    if (ev.path[0].classList[0] === "start") {
      console.log(ev.path[0]);
      mouseDown = true;
      nodeClass = "start";
    } else if (ev.path[0].classList[0] === "end") {
      console.log(ev.path[0]);
      mouseDown = true;
      nodeClass = "end";
    } else if (ev.path[0].classList[0] === "grid__node") {
      console.log(ev.path[0]);
      mouseDown = true;
      nodeClass = "wall";

      ev.path[0].classList.replace("grid__node", "wall");
    } else if (ev.path[0].classList[0] === "wall") {
      ev.path[0].classList.replace("wall", "grid__node");
      console.log(ev.path[0]);
      mouseDown = true;
      nodeClass = "wall";
    }
  };

  const handleMouseUp = (ev: any | MouseEvent) => {
    mouseDown = false;
  };

  const handleMouseMove = (ev: any | MouseEvent) => {
    if (mouseDown) {
      let hoveredNode: HTMLTableDataCellElement = ev.path[0];
      if (nodeClass !== "wall") {
        let node: HTMLTableDataCellElement = document.querySelector(
          `.${nodeClass}`
        ) as HTMLTableDataCellElement;

        if (node) {
          node.classList.replace(`${nodeClass}`, `${hoveredNode.classList[0]}`);

          hoveredNode.classList.replace(
            `${hoveredNode.classList[0]}`,
            `${nodeClass}`
          );
        }
      } else {
        if (hoveredNode.classList[0] === "wall") {
          hoveredNode.classList.replace("wall", "grid__node");
        } else {
          hoveredNode.classList.replace("grid__node", "wall");
        }
      }
    }
  };

  const createNode = (x: number, y: number): HTMLTableDataCellElement => {
    const node: HTMLTableDataCellElement = document.createElement("td");
    node.classList.add("grid__node");
    node.id = `${x}:${y}`;
    node.addEventListener("mouseover", handleMouseMove);

    node.addEventListener("mousedown", handleMouseDown);
    node.addEventListener("mouseup", handleMouseUp);

    node.setAttribute("cost", "0");

    node.setAttribute("h", "0");

    node.setAttribute("g", "0");

    return node;
  };

  const generateRandomCoords = (): string => {
    const randomCoords: string = `${Math.floor(
      Math.random() * 31
    )}:${Math.floor(Math.random() * 21)}`;
    return randomCoords;
  };

  useEffect(() => {
    const startNodeCoords = generateRandomCoords();
    const endNodeCoords = generateRandomCoords();

    for (let y = 1; y < 21; y++) {
      let row: HTMLTableRowElement = document.createElement("tr");
      row.classList.add("gird__row");
      for (let x = 1; x < 37; x++) {
        let node: HTMLTableDataCellElement = createNode(x, y);
        row.appendChild(node);
      }
      tableRef.current.appendChild(row);
    }

    const startNode = document.getElementById(startNodeCoords);
    const endNode = document.getElementById(endNodeCoords);
    if (startNode && endNode) {
      startNode.classList.replace("grid__node", "start");
      endNode.classList.replace("grid__node", "end");
    }
  }, []);

  return (
    <table className="grid" ref={tableRef} onMouseDown={resetGrid}></table>
  );
}
