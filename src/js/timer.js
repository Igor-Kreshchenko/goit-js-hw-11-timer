class CountdownTimer {
  constructor({ selector, targetDate, onTick }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.onTick = onTick;
    this.refs = {
      daysRef: document.querySelector(`${this.selector} [data-value="days"]`),
      hoursRef: document.querySelector(`${this.selector} [data-value="hours"]`),
      minsRef: document.querySelector(`${this.selector} [data-value="mins"]`),
      secsRef: document.querySelector(`${this.selector} [data-value="secs"]`),
    };

    this.start();
  }

  start() {
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      const { days, hours, mins, secs } = this.getTimeComponents(deltaTime);

      this.onTick({ days, hours, mins, secs });
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

// Вызов экземпляра класса Timer

const countdownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Dec 31, 2021'),
  onTick: updateTimerFace,
});

function updateTimerFace({ days, hours, mins, secs }) {
  countdownTimer.refs.daysRef.textContent = days;
  countdownTimer.refs.hoursRef.textContent = hours;
  countdownTimer.refs.minsRef.textContent = mins;
  countdownTimer.refs.secsRef.textContent = secs;
}
