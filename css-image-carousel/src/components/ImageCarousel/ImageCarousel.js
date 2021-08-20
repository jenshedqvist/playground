import html from "choo/html";
import "./ImageCarousel.css";

function ImageCarousel(items) {
  return html`<ol class="ImageCarousel">
    ${items.map(Item)}
  </ol>`;
}

function Item(contents, index) {
  return html` <li class="ImageCarousel-item" id="item-${index}">
    ${contents}
  </li>`;
}

ImageCarousel.Item = Item;
export default ImageCarousel;
