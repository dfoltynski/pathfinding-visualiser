export function resetGrid() {
  if (
    document.querySelectorAll(".visited").length > 0 ||
    document.querySelectorAll(".path").length > 0
  ) {
    document
      .querySelectorAll(".visited")
      .forEach((wall) => wall.classList.replace("visited", "grid__node"));

    document
      .querySelectorAll(".path")
      .forEach((wall) => wall.classList.replace("path", "grid__node"));
  }
}

export function disableVisualisationControl(button: HTMLButtonElement) {
  console.log(button.disabled);

  button.disabled = true;
  button.classList.add("nav__button--disabled");

  const grid = document.querySelector(".grid") as HTMLTableElement;

  grid.classList.add("grid--disabled");
}

export default { resetGrid, disableVisualisationControl };
