// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';

// const refs = {
//   startBtn: document.querySelector('[data-start]'),
//   dateTimePicker: document.querySelector('#datetime-picker'),
// };

// flatpickr(refs.dateTimePicker, options);

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };

// const date = new Date();
// console.log(date);
// console.log(date.getDate());
// console.log(date.getDay());
// console.log(date.getMonth());
// console.log(date.getFullYear());
// console.log('getUTCDate(): ', date.getUTCDate());
// console.log('getUTCHours(): ', date.getUTCHours());
// console.log(date.setFullYear(2040, 4, 8));
// console.log(new Date('March 16, 2030 14:25:00'));
// // date.toString();
// const preciseTeamMeetingDate = new Date('March 16, 2030 14:25:00');
// console.log(preciseTeamMeetingDate);
// const date2 = new Date(2220095790833);
// console.log(date2);

// const DELAY = 3000;
// const date3 = Date.now();
// console.log(date3);

// setTimeout(() => {
//   const date4 = Date.now();

//   console.log(date4);
//   console.log(date4 - date3);
// }, DELAY);

const timer = {
  // start timer
  start() {
    // save start time/ current time at function call
    const startTme = Date.now();
    setInterval(() => {
      // time at function call
      const currentTime = Date.now();
      const deltaTime = currentTime - startTme;
      // const ms = endTime - currentTime;
      //   const timeConvert = convertMs(deltaTime);
      //   console.log(timeConvert);
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      console.log(`${days}:${hours}:${minutes}:${seconds}`);
    }, 1000);
  },
};
// starts counting
timer.start();

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// Напиши функцию addLeadingZero(value),
// которая использует метод метод padStart()
//  и перед отрисовкой интефрейса форматируй значение.
function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
