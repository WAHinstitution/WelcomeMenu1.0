const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");

let img = new Image();

const topTextInput = document.getElementById("topText");
const bottomTextInput = document.getElementById("bottomText");

document.getElementById("imageInput").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(event) {
    img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      drawMeme();
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

document.getElementById("generateBtn").addEventListener("click", drawMeme);

function drawMeme() {
  if (!img.src || !canvas.width) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const fontSize = Math.floor(canvas.width / 10);
  ctx.font = `${fontSize}px Impact`;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = fontSize / 20;
  ctx.textAlign = "center";

  ctx.textBaseline = "top";
  drawOutlinedText(topTextInput.value, canvas.width / 2, 10);

  ctx.textBaseline = "bottom";
  drawOutlinedText(bottomTextInput.value, canvas.width / 2, canvas.height - 10);
}

function drawOutlinedText(text, x, y) {
  const upper = text.toUpperCase();
  ctx.fillText(upper, x, y);
  ctx.strokeText(upper, x, y);
}

document.getElementById("downloadBtn").addEventListener("click", function() {
  if (!canvas.width || !canvas.height) return;

  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL("image/png", 1.0);
  link.click();
});

document.getElementById("resetBtn").addEventListener("click", function() {
  // Clear image reference
  img = new Image();

  // Reset input fields
  topTextInput.value = "";
  bottomTextInput.value = "";
  document.getElementById("imageInput").value = "";

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Optionally reset canvas size to default
  canvas.width = 500;
  canvas.height = 500;
});
