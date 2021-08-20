import html from "choo/html";

export default function Figure(media, caption) {
  return html` <figure>
    ${media} ${caption && html`<figcaption>${caption}</figcaption>`}
  </figure>`;
}
