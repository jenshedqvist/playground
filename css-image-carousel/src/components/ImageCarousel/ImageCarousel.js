import html from "choo/html";
import classNames from "classnames";
import Image from "../Image/Image";
import "./ImageCarousel.css";

function ImageCarousel({
  uid,
  items,
  activeIndex,
  isPlaying,
  onSelect,
  onPlay,
  onPause,
}) {
  return html`<div
    id="${uid}"
    class="ImageCarousel"
    style="--ext-items-num: ${items.length}; --ext-active-item-index: ${activeIndex};"
    onmouseenter="${onPause}"
    onmouseleave="${onPlay}"
  >
    ${PlayBackButton({ onPlay, onPause, isPlaying, uid })}
    <ol class="ImageCarousel-list">
      ${items.map((item, index) =>
        Item({
          onSelect,
          onPause,
          onPlay,
          isPlaying,
          index,
          uid,
          active: index === activeIndex,
          ...item,
        })
      )}
    </ol>
  </div>`;
}

function Item({ img, active, caption, index, onSelect, onPause }) {
  return html`<li
    class="${classNames("ImageCarousel-item", {
      "ImageCarousel-item--focus": active,
    })}"
    id="item-${index}"
    style="--ext-item-index: ${index}"
    onclick="${(event) => onSelect(index, event.target)}"
    onfocus="${(event) => onSelect(index, event.target) && onPause()}"
    tabindex="0"
  >
    ${Figure(Image(img), caption)}
  </li>`;
}

function Figure(img, caption) {
  return html` <figure>
    ${img}
    ${caption &&
    html`<figcaption class="ImageCarousel-caption">${caption}</figcaption>`}
  </figure>`;
}

function PlayBackButton({ onPlay, onPause, isPlaying, uid }) {
  const label = isPlaying ? "Pause auto play" : "Start auto play";
  const text = isPlaying ? "Pause" : "Play";
  return html` <button
    class="ImageCarousel-playbackControl"
    aria-label="${label}"
    aria-controls="${uid}"
    aria-pressed="${!isPlaying}"
    onclick="${isPlaying ? onPause : onPlay}"
  >
    <span class="ImageCarousel-playbackControl-icon">
      <svg
        width="100%"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 80 80"
      >
        ${isPlaying
          ? html`
              <rect x="28" y="25" width="8" height="30" rx="2" />
              <rect x="42 " y="25" width="8" height="30" rx="2" />
            `
          : html` <polygon stroke-width="0" points="30 20, 60 40, 30 60" /> `}
        <ellipse
          cx="40"
          cy="40"
          rx="35"
          ry="35"
          fill="transparent"
          stroke="black"
          stroke-width="5"
        />
      </svg>
    </span>
    ${text}
  </button>`;
}

ImageCarousel.Figure = Figure;
ImageCarousel.Item = Item;
export default ImageCarousel;
