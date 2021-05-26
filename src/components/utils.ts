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

export function disableRunButton(button: HTMLButtonElement) {
  console.log(button.disabled);

  button.disabled = true;
  button.classList.add("nav__button--disabled");
}

export default { resetGrid, disableRunButton };
