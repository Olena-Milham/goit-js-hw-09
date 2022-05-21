// module-9 video 1 1h40-2h
const timer = {
  start() {
    // when start method is called , save current time, start time at the point
    const countDownTime = selectedDates[0];
    setInterval(() => {
      // startTime is always the same

      //  time when the interval function is colled,
      // this time is new all the time, countdown of the timer
      const currentTime = new Date();

      // console.log('delta time (ms)', currentTime - countDownTime);
      const ms = countDownTime - currentTime;
      const { days, hours, minutes, seconds } = convertMs(ms);
      console.log(`${days}:${hours}:${minutes}:${seconds}`);
    }, 1000);
  },
};

// when this method is called startTime is being created
// and we'll call interval, which will be calling another function every second
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

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
