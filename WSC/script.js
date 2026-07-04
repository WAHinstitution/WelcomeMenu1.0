// Load audio elements
const hoverSound = new Audio('hover.mp3');
const clickSound = new Audio('click.mp3');

// Prevent delay by forcing load
hoverSound.load();
clickSound.load();

// Play sound safely
function playSound(sound) {
  // Required for Chrome autoplay policy
  try {
    sound.currentTime = 0;
    sound.play().catch(() => {});
  } catch (e) {
    // Do nothing on error
  }
}

// Attach hover sound
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('button, input[type="file"]').forEach(el => {
    el.addEventListener('mouseenter', () => playSound(hoverSound));
  });

  document.querySelectorAll('button').forEach(el => {
    el.addEventListener('click', () => playSound(clickSound));
  });
});

const bgm = new Audio('bgm.mp3');
bgm.loop = true;
bgm.volume = 0.4; // Adjust to taste

function startBGM() {
  bgm.play().catch(() => {
    // If autoplay fails, wait for interaction
    document.addEventListener('click', () => {
      bgm.play().catch(() => {});
    }, { once: true });
  });
}

// Start BGM when page is loaded
document.addEventListener('DOMContentLoaded', () => {
  startBGM();
});
