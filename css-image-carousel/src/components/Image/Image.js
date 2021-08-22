import html from "choo/html";
import "./Image.css";

const Image = ({ srcSet, src }) =>
  html` <img
    class="Image"
    srcset="${srcSet}"
    src="${src}"
    sizes="(min-width: 1024px) 1024px, 100vw"
    loading="lazy"
  />`;

export default Image;
