import html from "choo/html";
import "./Post.css";

function Post(contents) {
  return html`<article class="Post">${contents}</article>`;
}

export function Aside(contents) {
  return html`<aside class="Post-aside">${contents}</aside>`;
}

export function Prose(contents) {
  return html`<div class="Post-prose">${contents}</div>`;
}

Post.Aside = Aside;
Post.Prose = Prose;
export default Post;
