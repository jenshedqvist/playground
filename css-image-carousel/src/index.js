import html from "choo/html";
import choo from "choo";

import ImageCarousel from "./components/ImageCarousel/ImageCarousel";
import Post from "./components/Post/Post";

import "./index.css";

// TODO: server render this
const img1 = require("./assets/img1.jpg");
const img2 = require("./assets/img2.jpg");
const img3 = require("./assets/img3.jpg");
const img4 = require("./assets/img4.jpg");
const img5 = require("./assets/img5.jpg");

window.initialState = {
  autoPlay: !userPrefersReducedMotion(),
  isPlaying: false,
  playbackSpeedMs: 6000,
  autoPlayIntervalHandle: null,
  items: [
    {
      img: {
        ...img1,
        alt: "Woman walking on street in eventing light in front of graffiti wall",
      },
      caption: "Mauris pharetra rhoncus euismod.",
    },
    {
      img: {
        ...img2,
        alt: "Yoiung man chilling against wall with black and white wall painting",
      },
      caption: "Praesent aliquam, just id vestibulum iaculis.",
    },
    {
      img: {
        ...img3,
        alt: "Guy in shorts ordering night time takeout from a curb side restaurant",
      },
      caption: "Cras vel velit ultricies.",
    },
    {
      img: { ...img4, alt: "Old vintage Renault" },
      caption: "Vivamus euismod eros diam, ac hendrerit.",
    },
    {
      img: {
        ...img5,
        alt: "Two colorfully dressed women with flowing hair walking away with their backs turned",
      },
      caption: "Morbi sagittis feugiat commodo.",
    },
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
            mi nec nisl.
          </p>
          <h2>Hendrerit erat fi</h2>
          <p>
            Vivamus euismod
            <a href="http://www.google.se">cras vel velit ultricies</a>, rhoncus
            lectus viverra, efficitur ligula. Vivamus euismod eros diam, ac
            hendrerit erat finibus a.
          </p>
        `)}
        ${Post.Aside(html`
          ${ImageCarousel({
            uid: "carousel-1",
            items: state.items,
            activeIndex: constrainNumber(
              [0, state.items.length - 1],
              state.activeSlide
            ),
            isPlaying: state.isPlaying,
            autoPlaySpeed: state.playbackSpeedMs,
            onSelect: (index) => emit("setSlide", index),
            onPlay: () => emit("play"),
            onPause: () => emit("pause"),
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
          <h3>Hendrerit erat fi</h3>
          <p>
            Aliquam pulvinar justo. Sed sit amet imperdiet nisl. Quisque ac ante
            sit amet dolor venenatis ultricies. Cras interdum, felis sed commodo
            aliquam, sem metus facilisis dolor, condimentum condimentum elit
            nunc sit amet felis. Phasellus interdum mauris sed semper euismod.
          </p>
          <h4>Hendrerit erat fi</h4>
          <p>
            Aliquam pulvinar justo. Sed sit amet imperdiet nisl. Quisque ac ante
            sit amet dolor venenatis ultricies. Phasellus interdum mauris sed
            semper euismod.
          </p>
          <small>Authored 2021-08-22 by Jens</small>
        `)}
      `)}
    </body>
  `;
}

function stateHandler(state, emitter) {
  state.activeSlide = 0;

  emitter
    .on("setSlide", function (index) {
      state.activeSlide = constrainNumber([0, state.items.length], index);
      const lastItemNum = state.items.length;
      if (state.isPlaying && state.activeSlide === lastItemNum) {
        emitter.emit("setSlide", 0);
      }
      emitter.emit("render");
    })
    .on("nextSlide", function () {
      emitter.emit("setSlide", (state.activeSlide += 1));
      emitter.emit("render");
    })
    .on("prevSlide", function () {
      emitter.emit("setSlide", (state.activeSlide -= 1));
      emitter.emit("render");
    })
    .on("play", function () {
      if (userPrefersReducedMotion()) return;
      state.isPlaying = true;
      clearInterval(state.autoPlayIntervalHandle);
      state.autoPlayIntervalHandle = setInterval(
        () => emitter.emit("nextSlide"),
        state.playbackSpeedMs
      );
      emitter.emit("render");
    })
    .on("pause", function () {
      state.isPlaying = false;
      clearInterval(state.autoPlayIntervalHandle);
      emitter.emit("render");
    })
    .on("DOMContentLoaded", function () {
      emitter.emit("setSlide", (state.activeSlide = 0));
      emitter.emit("render");

      if (state.autoPlay) {
        emitter.emit("play");
      }
    });
}

function userPrefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function constrainNumber([min, max], num) {
  if (num <= min) return min;
  if (num >= max) return max;
  return num;
}
