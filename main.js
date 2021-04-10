
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

var sliderBeats = document.getElementById("beatsRange");
var outputBeats = document.getElementById("beatsSpan");
outputBeats.innerHTML = sliderBeats.value;

sliderBeats.oninput = function() {
  outputBeats.innerHTML = this.value;
}

var imagesDiv = document.getElementById("imagesDiv");
var lastImage = document.getElementById("lastImage");
var actualImage = document.getElementById("actualImage");
var nextImage = document.getElementById("nextImage");

var imageCheck = document.getElementById("_images");
imageCheck.checked = true;

function enableImages() {
  let visibility;
  let display;

  if (imageCheck.checked) {
    visibility = 'visible';
    display = "";
  }
  else {
    visibility = 'hidden';
    display = "none";
  }

  lastImage.style.visibility = visibility;
  actualImage.style.visibility = visibility;
  nextImage.style.visibility = visibility;

  imagesDiv.style.display = display;
}

const deltaTime = 16.67;
var lastUpdate = Date.now();
var myInterval = setInterval(tick, deltaTime);

var timeNow = 0;
var nextKlack = 0;

var myBeats = document.getElementById("myBeats");
var beatCount = 0;

var lastElt = document.getElementById("_lastChord");
var actualElt = document.getElementById("_actualChord");
var nextElt = document.getElementById("_nextChord");

var lastChord = new Chord(lastElt, lastImage);
var actualChord = new Chord(actualElt, actualImage);
var nextChord = new Chord(nextElt, nextImage);

function randomTonality() {
  nextChord.draw();
}

function tick() {
    // var now = Date.now();
    // var dt = now - lastUpdate;
    // lastUpdate = now;

    // update(dt);
    // render(dt);

    timeNow += deltaTime;

    if (timeNow > nextKlack) {

      nextKlack = timeNow + 60000/slider.value;

      beatCount++;
      beatCount = beatCount % sliderBeats.value;

      myBeats.textContent = beatCount + 1;

      if (beatCount == 0) {
        randomTonality();

        // if (plingActived) {
        //     // pling.play();
        // }
        // else  {
        //     // klack.play();
        // }
    }
    else {
        // klack.play();
    }

  }
}