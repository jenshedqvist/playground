import html from "choo/html";
import "./Image.css";

export default function Image(srcs) {
  return html` <img class="Image" srcset="${srcs}" src="${srcs[0]}" alt="#" />`;
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
        `https://via.placeholder.com/${width}x${height}/?text=${fileName} ${width}w`
    )
    .join(",");
}
