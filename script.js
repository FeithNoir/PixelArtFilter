const imageUpload = document.getElementById("image-upload");
const pixelCanvas = document.getElementById("pixel-canvas");
const pixelSizeInput = document.getElementById("pixel-size");
const scaleSizeInput = document.getElementById("scale-size");
const downloadBtn = document.getElementById("download-btn");

const ctx = pixelCanvas.getContext("2d");
let originalImage = new Image();

imageUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      originalImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

originalImage.onload = () => {
  drawPixelatedImage();
};

pixelSizeInput.addEventListener("input", () => {
  drawPixelatedImage();
});

scaleSizeInput.addEventListener("input", () => {
  drawPixelatedImage();
});

function drawPixelatedImage() {
  const pixelSize = parseInt(pixelSizeInput.value, 10);
  const scaleSize = parseFloat(scaleSizeInput.value);

  // Resize canvas
  const scaledWidth = originalImage.width * scaleSize;
  const scaledHeight = originalImage.height * scaleSize;
  pixelCanvas.width = scaledWidth;
  pixelCanvas.height = scaledHeight;

  // Draw original image at smaller resolution
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");
  tempCanvas.width = scaledWidth / pixelSize;
  tempCanvas.height = scaledHeight / pixelSize;
  tempCtx.drawImage(originalImage, 0, 0, tempCanvas.width, tempCanvas.height);

  // Draw enlarged pixelated image on main canvas
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(
    tempCanvas,
    0,
    0,
    tempCanvas.width,
    tempCanvas.height,
    0,
    0,
    scaledWidth,
    scaledHeight
  );

  downloadBtn.classList.remove("hidden");
}

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "pixelated-image.png";
  link.href = pixelCanvas.toDataURL();
  link.click();
});
