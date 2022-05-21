import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  dateInput: document.querySelector('#datetime-picker'),
  divTimer: document.querySelector('.timer'),
};

refs.startBtn.addEventListener('click', () => {
  timer.start();
});

refs.startBtn.disabled = true;
let stopTime = null;

let countDownTime = null;
let currentTime = null;
let deltaTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      alert('Please choose a date in the future');
      // refs.startBtn.disabled = true;
    }
    refs.startBtn.disabled = false;
    stopTime = selectedDates[0];
    console.log(stopTime);
    // console.log(selectedDates[0]);
  },
};

const timer = {
  // properties of this timer
  setIntervalId: null,
  isActive: false,
  // updateClockFace(),
  start() {
    // if timer is active , just leave this code and don't fulfill the body of the function
    if (this.isActive) {
      return;
    }
    // when start method is called , save current time, start time at the point
    // countDownTime = selectedDates[0];
    countDownTime = stopTime;
    this.isActive = true;
    this.setIntervalId = setInterval(() => {
      // startTime is always the same

      //  time when the interval function is colled,
      // this time is new all the time, countdown of the timer
      currentTime = new Date();

      // console.log('delta time (ms)', currentTime - countDownTime);
      deltaTime = countDownTime - currentTime;
      // console.log(deltaTime);
      // const { days, hours, minutes, seconds } = convertMs(ms);
      const { days, hours, minutes, seconds } = convertMs(deltaTime);

      if (deltaTime <= 0) {
        clearInterval(this.setIntervalId);
        this.isActive = false;
        return;
      }
      // changes the look of the clock 2h08m32s
      updateClockFace({ days, hours, minutes, seconds });
      console.log(`${days}:${hours}:${minutes}:${seconds}`);
    }, 1000);
  },
};

flatpickr(refs.dateInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.divTimer.textContent = `${days}:${hours}:${minutes}:${seconds}`;
}
