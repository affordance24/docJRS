let font
let buffer;
let imagePixels = [];
let song;
let fft;

// Additional parameters for adjusting movement and intensity
let waveSpeed = 20; // Adjust the speed of the waves

let intensityMultiplier = 100; // Adjust the intensity of the waves
let numberOfLines = 150; // Adjust the number of lines

function preload() {
  font = loadFont('/00_Assets/00_Glenn.ttf');
  song = loadSound('/00_Assets/Yaeji - Feel It Out (Nick Godmode Remix).m4a');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(width / 3);
  textAlign(CENTER, CENTER);
  buffer = createGraphics(windowWidth / 6, windowHeight / 6);
  buffer.fill(255);
  buffer.background(0, 0, 0);
  buffer.textFont(font);
  buffer.textAlign(CENTER, CENTER);
  buffer.textSize(height/13);
  buffer.text("move", buffer.width / 2, buffer.height / 1.5);
  buffer.filter(BLUR, 6);

  for (let x = 0; x < buffer.width; x++) {
    imagePixels[x] = [];
    for (let y = 0; y < buffer.height; y++) {
      let pixelColor = buffer.get(x, y);
      let r = red(pixelColor);
      imagePixels[x][y] = r / 20;
    }
  }

  fft = new p5.FFT();
 // song.play();
}
function draw() {
  // Draw black background
  background(0);

  let stepX = windowWidth / buffer.width;
  let stepY = windowHeight / buffer.height;

  let spectrum = fft.analyze();

  // Additional parameters for adjusting movement and intensity
  let waveIntensity = mouseY / height * intensityMultiplier / 6;
  let noiseScale = mouseY / height;
  let noiseMultiplier = mouseY / height;

  // loop through all the pixels in the buffer
  for (let i = 0; i < numberOfLines; i++) {
    beginShape();
    fill(0)
    for (let x = 0; x < buffer.width; x++) {
      let h =
        imagePixels[x][i % buffer.height] *
        (spectrum[x] / 100) *
        waveIntensity +
        noise(x / noiseScale, i / noiseScale, frameCount / noiseScale / 2) *
        noiseMultiplier;

      // Map the color based on lower frequencies
      let colorValue = map(spectrum[x], 0, 100, 50, 200);
      
      // Set stroke color explicitly
      stroke(colorValue, 180, 255);

      // Remove frameCount * waveSpeed to keep the waves stationary
      let waveX = x * stepX;

      curveVertex(waveX, ((i % buffer.height) * stepY) - h);
    }
    endShape();
  }

  // Draw the buffer background
  // image(buffer, 0, 0);
}




function mousePressed(){
  if(!song.isPlaying()) {
    song.play();
  }
}