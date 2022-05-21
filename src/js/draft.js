import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  dateTimePicker: document.querySelector('#datetime-picker'),
  timer: document.querySelector('.timer'),
};

// let countDownDate = null;
// let currentDate = new Date();
// refs.startBtn.disabled = true;

let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(refs.dateTimePicker, options);

// data model
class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
    this.init();
  }

  init() {
    const time = this.convertMs(0);
    this.onTick(time);
  }
  start() {
    if (this.isActive) {
      return;
    }
    // save start time/ current time at the function call

    const countDownDate = date.now('March 16, 2030 14:25:00');

    this.isActive = true;
    this.intervalId = setInterval(() => {
      // time at function call
      const endTime = new Date();

      const ms = countDownDate - endTime;

      //   const timeConvert = convertMs(deltaTime);
      // const { days, hours, minutes, seconds } = convertMs(ms);
      const time = this.convertMs(ms);
      // console.log(`${days}:${hours}:${minutes}:${seconds}`);
      this.onTick(time);
      // updateClockFace(time);
    }, 1000);
  }

  // stop() {
  //   clearInterval(this.intervalId);
  //   this.isActive = false;
  //   // resset timer!!!!!!!!!!!
  //   const time = this.convertMs(0);
  //   this.onTick(time);
  // }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }
  addLeadingZero(value) {
    return String(value).padStart(2, 0);
  }
}

const timer = new Timer({ onTick: updateClockFace });

// starts counting
// refs.startBtn.addEventListener('click', () => {
//   timer.start();
// });

// bind context
refs.startBtn.addEventListener('click', timer.start.bind(timer));
// stops timer
// timer.stop();
// refs.startBtn.addEventListener('click', timer.stop.bind(timer));

// outer functions
function updateClockFace({ days, hours, minutes, seconds }) {
  refs.timer.textContent = `${days}:${hours}:${minutes}:${seconds}`;
}

//  if (selectedDates[0] < Date.now()) {
//    refs.startBtn.disabled = true;
//    alert('выберите дату в будущем');
//  } else {
//    refs.startBtn.disabled = false;
//    selectedDate = selectedDates[0];
//  }
