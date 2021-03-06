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
    //   Без следующей строки при запуске таймера 1 секунду отображаются значения из разметки
    this.updateValues();
    setInterval(this.updateValues.bind(this), 1000);
  }

  updateValues() {
    const currentTime = Date.now();
    const deltaTime = this.targetDate - currentTime;
    const { days, hours, mins, secs } = this.getTimeComponents(deltaTime);

    this.onTick({ days, hours, mins, secs });
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

function updateTimerFace({ days, hours, mins, secs }) {
  this.refs.daysRef.textContent = days;
  this.refs.hoursRef.textContent = hours;
  this.refs.minsRef.textContent = mins;
  this.refs.secsRef.textContent = secs;
}

// Вызов экземпляра класса Timer

const countdownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 1, 2022'),
  onTick: updateTimerFace,
});
