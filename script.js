// Get DOM elements
const secondsInput = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const countdownEl = document.getElementById('countdown');
const dotEl = document.getElementById('dot');

let timer;
let remainingTime;
let dotAnimationDuration;

// Start the countdown
function startCountdown() {
  // Disable input and buttons
  secondsInput.disabled = true;
  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled = true;

  remainingTime = parseInt(secondsInput.value, 10);
  dotAnimationDuration = remainingTime * 1000; // Convert to milliseconds

  dotEl.style.animation = `move linear ${dotAnimationDuration}ms forwards`;

  timer = setInterval(() => {
    remainingTime--;
    updateCountdown();

    if (remainingTime <= 0) {
      stopCountdown();
    }
  }, 1000);
}

// Stop the countdown
function stopCountdown() {
  // Enable input and buttons
  secondsInput.disabled = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = false;

  clearInterval(timer);
  dotEl.style.animationPlayState = 'paused';
}

// Reset the countdown
function resetCountdown() {
  stopCountdown();
  countdownEl.textContent = '';
  dotEl.style.animation = 'none';
  dotEl.style.transform = 'rotate(0deg) translateX(90px)';
}

// Update the countdown display and dot's position
function updateCountdown() {
  countdownEl.textContent = remainingTime;

  const progress = (parseInt(secondsInput.value, 10) - remainingTime) / parseInt(secondsInput.value, 10);
  const degrees = 360 * progress;
  const radians = (degrees * Math.PI) / 180;
  const radius = 90;
  const x = Math.cos(radians) * radius;
  const y = Math.sin(radians) * radius;

  dotEl.style.transform = `rotate(${degrees}deg) translate(${x}px, ${y}px)`;
}

// Attach event listeners to buttons
startBtn.addEventListener('click', startCountdown);
stopBtn.addEventListener('click', stopCountdown);
resetBtn.addEventListener('click', resetCountdown);
