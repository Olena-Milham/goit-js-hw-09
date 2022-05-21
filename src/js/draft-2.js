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
let countDownTime = null;
let currentTime = null;
let ms = null;
let stopTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      alert('Please choose a date in the future');
    }
    refs.startBtn.disabled = false;
    stopTime = selectedDates[0];
    console.log(stopTime);
    // console.log(selectedDates[0]);

    // When you click the "Start" button,
    // the countdown to the selected date starts from
    //  the time of clicking.
    const timer = {
      // properties of this timer
      setIntervalId: null,
      isActive: false,
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
          ms = countDownTime - currentTime;
          console.log(ms);
          // const { days, hours, minutes, seconds } = convertMs(ms);
          const { days, hours, minutes, seconds } = convertMs(ms);

          if (ms <= 0) {
            clearInterval(this.setIntervalId);
            this.isActive = false;
          }
          // changes the look of the clock 2h08m32s
          updateClockFace({ days, hours, minutes, seconds });
          console.log(`${days}:${hours}:${minutes}:${seconds}`);
        }, 1000);
      },
      // stop() {
      //   clearInterval(this.setIntervalId);
      //   this.isActive = false;
      // },
    };
    // turn on timer on click
    // refs.startBtn.addEventListener('click', () => {
    //   timer.start();
    // if (countDownTime === currentTime)
    // if ({ days, hours, minutes, seconds } === 0)
    //   if (ms === 0) {
    //     timer.stop();
    //   }
    // });

    // when this method is called startTime is being created
    // and we'll call interval, which will be calling another function every second
    // timer.start();
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

// refs.startBtn.addEventListener('click', timer.start.bind(timer));
// **********************

// const timer = {
//   start() {
//     // when start method is called , save current time, start time
//     // const startTime = options.defaultDate;
//     setInterval(() => {
//       // startTime is always the same
//       // console.log('start -> startTimr' startTime);
//       //  time when the interval function is colled, this time is new all the tiome , countdown of the timer
//       const currentTime = Date.now();
//       console.log('start -> startTimr', currentTime);
//     }, 1000);
//   },
// };

// // when this method is called startTime is being created
// // and we'll call interval, which will be calling another function every second
// timer.start();
