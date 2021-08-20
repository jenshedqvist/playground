import html from "choo/html";
import choo from "choo";

import ImageCarousel from "./components/ImageCarousel/ImageCarousel";
import Figure from "./components/Figure/Figure";
import Image, { createSrcSet } from "./components/Image/Image";

import "./index.css";

const app = choo();
app.use(navigateSlides);
app.route("/", mainView);
app.mount("body");

function mainView(state, emit) {
  return html`
    <body>
      <div>
        <h2>Latest photos</h2>
        <button>Focus on photo ${state.currentSlide - 1}</button>
        ${ImageCarousel([
          Figure(Image(createSrcSet("one")), "caption for one"),
          Figure(Image(createSrcSet("two")), "caption for two"),
          Figure(Image(createSrcSet("three")), "caption for three"),
        ])}

        <button>Focus on photo ${state.currentSlide + 1}</button>
      </div>
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
