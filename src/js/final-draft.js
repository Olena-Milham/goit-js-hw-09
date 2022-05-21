import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  dateInput: document.querySelector('#datetime-picker'),
  divTimer: document.querySelector('.timer'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
  field: document.querySelectorAll('div .field'),
};

// disables the start btn
refs.startBtn.disabled = true;

let stopTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      // stops the countdown completely
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

      // console.log('delta time', currentTime - countDownTime);
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
  //  refs.divTimer.textContent = `${days}:${hours}:${minutes}:${seconds}`;
  refs.dataDays.textContent = `${days}`;
  refs.dataHours.textContent = `${hours}`;
  refs.dataMinutes.textContent = `${minutes}`;
  refs.dataSeconds.textContent = `${seconds}`;
}

refs.startBtn.addEventListener('click', timer.start.bind(timer));

// refs.divTimer.style.display = 'flex';
// // // console.log(refs.field);
// refs.field.forEach(el => {
//   el.style.display = 'flex';
//   el.style.flexDirection = 'column';
//   el.style.alignItems = 'center';
//   el.style.width = 'auto';
//   el.style.margin = '20px';
//   el.style.fontSize = '25px';
//   el.style.fontWeight = '500';
//   el.style.textTransform = 'uppercase';
// });

// Notiflix.Notify.init({
//   width: '320px',
//   position: 'top-right',
//   distance: '50px',
//   borderRadius: '10px',
//   clickToClose: true,
//   useIcon: false,
//   fontSize: '25px',
// });

// ------ options ------
// // one by one
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// then
//  Notify.failure("Please choose a date in the future")

// if using object method as call back, use it after initializing otherwise you ca use arrow functionat the begining
// refs.startBtn.addEventListener('click', () => {
//   timer.start();
// });
