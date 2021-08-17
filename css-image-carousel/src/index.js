import html from 'choo/html';
import choo from 'choo';
import "./index.css";

const app = choo()
app.use(navigateSlides)
app.route('/', mainView)
app.mount('body')

function mainView (state, emit) {
  return html`
    <body>
      <div>        
        <h2>Latest photos</h2>
        <button>Focus on photo ${state.currentSlide - 1}</button>
        ${List(["one", "two", "three"])}
        <button>Focus on photo ${state.currentSlide + 1}</button>
      </div>
    </body>
  `;
}

function List (items) {
  return html`
  <ol>
    ${items.map(ListItem)}
  </ol>`
}

function ListItem (num) {
  return html`
    <li>
      <figure>
        <img src="http://placehold.it/1280x800/?text=${num}" alt="#" />
        <figcaption>A description ${num}</figcaption>
      </figure>
    </li>`
}

function navigateSlides (state, emitter) {
  state.currentSlide = 0

  emitter.on('DOMContentLoaded', function (index) {
    state.currentSlide = index
    console.log('LOADED')
    //emitter.emit('render')
  })
  emitter.on('setSlide', function (index) {
    state.currentSlide = index
    emitter.emit('render')
  })
  emitter.on('nextSlide', function () {
    state.currentSlide += 1
    emitter.emit('render')
  })
  emitter.on('prevSlide', function () {
    state.currentSlide -= 1
    emitter.emit('render')
  })
}