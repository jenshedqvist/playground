import html from "choo/html";
import "./Image.css";

export default function Image(srcs) {
  return html` <img class="Media" srcset="${srcs}" src="${srcs[0]}" alt="#" />`;
}

export function createSrcSet(
  fileName,
  sizes = [
    [480, 270],
    [960, 540],
    [1440, 810],
    [1920, 1080],
  ]
) {
  return sizes
    .map(
      ([width, height]) =>
        `http://placehold.it/${width}x${height}/?text=${fileName}%20(${width}x${height}) ${width}w`
    )
    .join(",");
}
