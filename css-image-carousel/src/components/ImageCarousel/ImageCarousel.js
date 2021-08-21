import html from "choo/html";
import classNames from "classnames";
import Figure from "../Figure/Figure";
import Image from "../Image/Image";
import "./ImageCarousel.css";

function ImageCarousel({
  items,
  activeIndex,
  onClick,
  onPrev,
  onNext,
  onPlay,
  onPause,
}) {
  return html`<div
    class="ImageCarousel"
    style="--ext-items-num: ${items.length}; --ext-active-item-index: ${activeIndex}"
    onmouseenter="${onPause}"
    onmouseleave="${onPlay}"
  >
    <ol class="ImageCarousel-list">
      ${items.map((item, index) =>
        Item({ onClick, index, active: index === activeIndex, ...item })
      )}
    </ol>
  </div>`;
}

function Item({ img, active, caption, index, onClick }) {
  return html`<li
    class="${classNames("ImageCarousel-item", {
      "ImageCarousel-item--focus": active,
    })}"
    id="item-${index}"
    style="--ext-item-index: ${index}"
    onclick="${(event) => onClick(index, event.target)}"
  >
    ${Figure(Image(img), caption)}
  </li>`;
}

ImageCarousel.Item = Item;
export default ImageCarousel;
