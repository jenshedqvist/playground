import html from "choo/html";
import choo from "choo";

import ImageCarousel from "./components/ImageCarousel/ImageCarousel";
import Post from "./components/Post/Post";

import "./index.css";

const app = choo();
app.use(navigateSlides);
app.route("/", mainView);
app.mount("body");

function mainView(state, emit) {
  return html`
    <body>
      ${Post(html`
        ${Post.Prose(html`
          <h1>An article</h1>
          <p>
            Nunc tristique aliquam justo ac auctor. Suspendisse fringilla dictum
            aliquet. Etiam vel eros in eros pharetra rhoncus. Morbi sagittis
            feugiat commodo.
          </p>
          <p>
            Nullam condimentum sapien ex, et gravida quam rutrum id. Fusce at
            porta dolor. Curabitur sed volutpat lectus. Praesent aliquam, justo
            id vestibulum iaculis, erat nunc lacinia turpis, non facilisis purus
            mi nec nisl. Cras vel velit ultricies, rhoncus lectus viverra,
            efficitur ligula. Vivamus euismod eros diam, ac hendrerit erat
            finibus a.
          </p>
        `)}
        ${Post.Aside(html`
          <h2>Latest photos</h2>
          <button>Focus on photo ${state.currentSlide - 1}</button>
          ${ImageCarousel([
            { src: "one" },
            { src: "two", active: true },
            { src: "three" },
          ])}
          <button>Focus on photo ${state.currentSlide + 1}</button>
        `)}
        ${Post.Prose(html`
          <p>
            Praesent at porttitor turpis. Praesent consequat metus turpis,
            scelerisque ultrices urna dapibus ac. Mauris pharetra rhoncus
            euismod. Morbi fermentum tristique urna quis pretium. Nulla
            facilisi. Quisque sit amet vulputate erat. Sed nisl lorem, dignissim
            at vehicula et
          </p>
          <p>
            Aliquam pulvinar justo. Sed sit amet imperdiet nisl. Quisque ac ante
            sit amet dolor venenatis ultricies. Cras interdum, felis sed commodo
            aliquam, sem metus facilisis dolor, condimentum condimentum elit
            nunc sit amet felis. Phasellus interdum mauris sed semper euismod.
          </p>
        `)}
      `)}
    </body>
  `;
}

function navigateSlides(state, emitter) {
  state.currentSlide = 0;

  emitter.on("DOMContentLoaded", function (index) {
    state.currentSlide = index;
    console.log("LOADED");
    //emitter.emit('render')
  });
  emitter.on("setSlide", function (index) {
    state.currentSlide = index;
    emitter.emit("render");
  });
  emitter.on("nextSlide", function () {
    state.currentSlide += 1;
    emitter.emit("render");
  });
  emitter.on("prevSlide", function () {
    state.currentSlide -= 1;
    emitter.emit("render");
  });
}
