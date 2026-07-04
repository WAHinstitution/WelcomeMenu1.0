function polyAudio(path, copies = 8) {
  const audios = Array.from({ length: copies }, () => new Audio(path));
  let index = 0;

  return {
    play: () => {
      audios[index].currentTime = 0;
      audios[index].play();
      index = (index + 1) % copies;
    }
  };
}

const hoverSound = polyAudio("snd/hover.mp3");
const clickSound = polyAudio("snd/click.mp3");

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("button");

  buttons.forEach(button => {
    button.addEventListener("mouseenter", () => {
      hoverSound.play();
    });

    button.addEventListener("click", () => {
      clickSound.play();
    });
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const bgm = document.getElementById('bgm');


  const startBgm = () => {
    bgm.volume = 0.5;
    bgm.play().catch(err => console.warn("BGM autoplay blocked:", err));
    document.removeEventListener('click', startBgm);
  };

  document.addEventListener('click', startBgm);
});
