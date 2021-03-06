import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// // one by one
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// then
//  Notify.failure("Please choose a date in the future")

const refs = {
  startBtn: document.querySelector('[data-start]'),
  dateInput: document.querySelector('#datetime-picker'),
  divTimer: document.querySelector('.timer'),

  // dataDays: document.querySelector('[data-days]'),
  // dataHours: document.querySelector('[data-hours]'),
  // dataMinutes: document.querySelector('[data-minutes]'),
  // dataSeconds: document.querySelector('[data-seconds]'),
};

// if using object method as call back, use it after initializing
// refs.startBtn.addEventListener('click', () => {
//   timer.start();
// });

refs.startBtn.disabled = true;
let stopTime = null;
// refs.divTimer.style.display = 'flex';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      // alert('Please choose a date in the future');
      // refs.startBtn.disabled = true;
      // we need return to stop continue the cod and counting
      return;
    }
    refs.startBtn.disabled = false;
    stopTime = selectedDates[0];
    console.log(stopTime);
  },
};
flatpickr(refs.dateInput, options);

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
    this.init();
  }
  init() {
    // shows the clock at the begining
    const time = this.convertMs(0);
    this.onTick(time);
  }
  start() {
    // if timer is active , just leave this code and don't fulfill the body of the function
    if (this.isActive) {
      return;
    }
    // when start method is called , save current time (start time at the point)/countDownTime
    // countDownTime = selectedDates[0];
    const countDownTime = stopTime;
    this.isActive = true;
    this.IntervalId = setInterval(() => {
      // startTime is always the same

      //  time when the interval function is colled,
      // this time is new all the time, countdown of the timer
      const currentTime = new Date();

      // console.log('delta time (ms)', currentTime - countDownTime);
      const deltaTime = countDownTime - currentTime;
      // console.log(deltaTime);
      // const { days, hours, minutes, seconds } = convertMs(deltaTime);

      const time = this.convertMs(deltaTime);
      // changes the look of the clock
      this.onTick(time);
      console.log(time);
      // updateClockFace({ days, hours, minutes, seconds });
      // console.log(`${days}:${hours}:${minutes}:${seconds}`);

      if (deltaTime <= 0) {
        clearInterval(this.IntervalId);
        this.isActive = false;
        // // clear interface, but we don't need it here
        // const time = this.convertMs(0);
        // this.onTick(time);
        return;
      }
    }, 1000);
  }
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

const timer = new Timer({
  onTick: updateClockFace,
});

function updateClockFace({ days, hours, minutes, seconds }) {
  //   refs.divTimer.textContent = `${days}:${hours}:${minutes}:${seconds}`;
  refs.divTimer.textContent = `${days} DAYS : ${hours} HOURS : ${minutes} MINUTES : ${seconds} SECONDS`;
}

refs.startBtn.addEventListener('click', timer.start.bind(timer));

// ****
//!!! const result = flatpickr(refs.dataPicker, options);
// intervalId = setInterval(()=> {
//         const newDate = new Date();
//        !!! const selectedData = result.selectedDates[0];
//         const timerData = selectedData.getTime() - newDate.getTime();

// function updateClockFace(config) {
//   refs.dataDays.textContent = config.days;
//   refs.dataHours.textContent = config.hours;
//   refs.dataMinutes.textContent = config.minutes;
//   refs.dataSeconds.textContent = config.seconds;
// }
