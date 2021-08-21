import html from "choo/html";
import classNames from "classnames";
import Figure from "../Figure/Figure";
import Image, { createSrcSet } from "../Image/Image";
import "./ImageCarousel.css";

function ImageCarousel(items, activeIndex = 0) {
  const currentlyActive = items.find((item) => item.active) || activeIndex;
  return html`<ol class="ImageCarousel">
    ${items.map(Item)}
  </ol>`;
}

function Item(item, index) {
  return html`<li
    class="${classNames("ImageCarousel-item", {
      "ImageCarousel-item--focus": item.active,
    })}"
    id="item-${index}"
  >
    ${Figure(Image(createSrcSet(item.src)), "caption for one")}
  </li>`;
}

ImageCarousel.Item = Item;
export default ImageCarousel;
