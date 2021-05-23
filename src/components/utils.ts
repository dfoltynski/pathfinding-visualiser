export default function resetGrid() {
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
