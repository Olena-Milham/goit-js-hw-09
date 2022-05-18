const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let timerId = null;
const INTERVAL = 1000;
refs.startBtn.disabled = false;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtn.addEventListener('click', () => {
  if ((refs.startBtn.disabled = false)) {
    refs.startBtn.disabled = true;
    // console.log('it has already been clicked once');
    return;
  }
  refs.startBtn.disabled = true;
  timerId = setInterval(() => {
    console.log('change the color');
    refs.body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL);
});

refs.stopBtn.addEventListener('click', () => {
  console.log('stop the color change');
  clearInterval(timerId);
  refs.startBtn.disabled = false;
});

// OR with function being written separetely
// refs.startBtn.addEventListener('click', onClick);

// function onClick() {
//   timerId = setInterval(() => {
//     refs.body.style.backgroundColor = getRandomHexColor();
//   }, NTERVAL);
// }
