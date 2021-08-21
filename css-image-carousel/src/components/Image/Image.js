import html from "choo/html";
import "./Image.css";

export default function Image(responsiveImage) {
  return html` <img
    class="Image"
    srcset="${responsiveImage.srcSet}"
    src="${responsiveImage.src}"
    sizes="(min-width: 1024px) 1024px, 100vw"
    loading="lazy"
  />`;
}
