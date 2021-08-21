import html from "choo/html";
import classNames from "classnames";
import Figure from "../Figure/Figure";
import Image, { createSrcSet } from "../Image/Image";
import "./ImageCarousel.css";

function ImageCarousel({ items, activeIndex, onClick, onPrev, onNext }) {
  return html`<div
    class="ImageCarousel"
    style="--ext-items-num: ${items.length}; --ext-active-item-index: ${activeIndex}"
  >
    <button
      onclick="${onPrev}"
      aria-label="Focus on previous photo"
      aria-controls="${`item-${activeIndex - 1}`}"
    >
      Prev
    </button>
    <button
      onclick="${onNext}"
      aria-label="Focus on next photo"
      aria-controls="${`item-${activeIndex + 1}`}"
    >
      Next
    </button>
    <ol class="ImageCarousel-list">
      ${items.map((item, index) =>
        Item({ onClick, index, active: index === activeIndex, ...item })
      )}
    </ol>
  </div>`;
}

function Item({ src, active, caption, index, onClick }) {
  return html`<li
    class="${classNames("ImageCarousel-item", {
      "ImageCarousel-item--focus": active,
    })}"
    id="item-${index}"
    style="--ext-item-index: ${index}"
    onclick="${(event) => onClick(index, event.target)}"
  >
    ${Figure(Image(createSrcSet(src)), caption)}
  </li>`;
}

ImageCarousel.Item = Item;
export default ImageCarousel;
