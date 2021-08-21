import html from "choo/html";
import "./Figure.css";

export default function Figure(media, caption) {
  return html` <figure class="Figure">
    ${media} ${caption && html`<figcaption>${caption}</figcaption>`}
  </figure>`;
}
