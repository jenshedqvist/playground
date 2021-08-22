import html from "choo/html";
import "./Post.css";

const Post = (contents) => html`<article class="Post">${contents}</article>`;

export const Aside = (contents) =>
  html`<aside class="Post-aside">${contents}</aside>`;

export const Prose = (contents) =>
  html`<div class="Post-prose">${contents}</div>`;

Post.Aside = Aside;
Post.Prose = Prose;
export default Post;
