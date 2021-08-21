import html from "choo/html";
import choo from "choo";

import ImageCarousel from "./components/ImageCarousel/ImageCarousel";
import Post from "./components/Post/Post";

import "./index.css";

// TODO: server render this
window.initialState = {
  items: [
    { src: "zero", caption: "Mauris pharetra rhoncus euismod." },
    {
      src: "one",
      caption: "Praesent aliquam, just id vestibulum iaculis.",
    },
    { src: "two", caption: "Cras vel velit ultricies." },
    {
      src: "three",
      caption: "Vivamus euismod eros diam, ac hendrerit.",
    },
    { src: "four", caption: "Morbi sagittis feugiat commodo." },
  ],
};

const app = choo();
app.use(stateHandler);
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

          ${ImageCarousel({
            items: state.items,
            activeIndex: constrainNumber(
              [0, state.items.length - 1],
              state.activeSlide
            ),
            onClick: (index) => emit("setSlide", index),
            onPrev: () => emit("prevSlide"),
            onNext: () => emit("nextSlide"),
          })}
        `)}
        ${Post.Prose(html`
          <p>
            Praesent at <a href="http://www.google.se">porttitor turpis</a>.
            Praesent consequat metus turpis, scelerisque ultrices urna dapibus
            ac. Mauris pharetra rhoncus euismod. Morbi fermentum tristique urna
            quis pretium. Nulla facilisi. Quisque sit amet vulputate erat. Sed
            nisl lorem, dignissim at vehicula et
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

function stateHandler(state, emitter) {
  state.activeSlide = 0;

  emitter.on("setSlide", function (index) {
    state.activeSlide = constrainNumber([0, state.items.length - 1], index);
    emitter.emit("render");
  });
  emitter.on("nextSlide", function () {
    emitter.emit("setSlide", (state.activeSlide += 1));
    emitter.emit("render");
  });
  emitter.on("prevSlide", function () {
    emitter.emit("setSlide", (state.activeSlide -= 1));
    emitter.emit("render");
  });
  emitter.on("DOMContentLoaded", function () {
    emitter.emit("setSlide", (state.activeSlide = 0));
    emitter.emit("render");
  });
}

function constrainNumber([min, max], num) {
  if (num < min) return min;
  if (num > max) return max;
  return num;
}
