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
    if (this.isActive) {
      return;
    }

    const countDownTime = stopTime;
    this.isActive = true;
    this.IntervalId = setInterval(() => {
      const currentTime = new Date();
      const deltaTime = countDownTime - currentTime;
      const time = this.convertMs(deltaTime);
      // changes the look of the clock
      this.onTick(time);
      console.log(time);

      if (deltaTime <= 0) {
        clearInterval(this.IntervalId);
        this.isActive = false;
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
  refs.dataDays.textContent = `${days}`;
  refs.dataHours.textContent = `${hours}`;
  refs.dataMinutes.textContent = `${minutes}`;
  refs.dataSeconds.textContent = `${seconds}`;
}

refs.startBtn.addEventListener('click', timer.start.bind(timer));
