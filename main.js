
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

var fifthsProgression = document.getElementById("_fifthProgression");
fifthsProgression.checked = true;

var lastElt = document.getElementById("_lastChord");
var actualElt = document.getElementById("_actualChord");
var nextElt = document.getElementById("_nextChord");

var lastChord = new Chord(lastElt, lastImage);
var actualChord = new Chord(actualElt, actualImage);
var nextChord = new Chord(nextElt, nextImage);

var majChord = document.getElementById("_maj7");
var dominantChord = document.getElementById("_dom");
var minorChord = document.getElementById("_min7");
var semiDismChord = document.getElementById("_semiDism7");
var augChord = document.getElementById("_aug7");
var minorMaj7Chord = document.getElementById("_minMaj7");

majChord.checked = true;
dominantChord.checked = false;
minorChord.checked = false;
semiDismChord.checked = false;
augChord.checked = false;
minorMaj7Chord.checked = false;

chordStep();
chordStep();
chordStep();

function chordStep() {

  lastChord.setChord(actualChord);
  actualChord.setChord(nextChord);
  
  if (fifthsProgression.checked) {
    nextChord.setNextFifthChord();
  }
  else {
    nextChord.setRandomChord();
  }

  lastChord.draw();
  actualChord.draw();
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
        chordStep();

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

function checkMaj7() {
  if (!isThereAnyChordSelected()) {
    majChord.checked = true;
  }
}

function check7() {
  if (!isThereAnyChordSelected()) {
    dominantChord.checked = true;
  }
}

function checkMin7() {
  if (!isThereAnyChordSelected()) {
    minorChord.checked = true;
  }
}

function checkSemiDism() {
  if (!isThereAnyChordSelected()) {
    semiDismChord.checked = true;
  }
}

function checkAug7() {
  if (!isThereAnyChordSelected()) {
    augChord.checked = true;
  }
}

function checkMinorMaj7() {
  if (!isThereAnyChordSelected()) {
    minorMaj7Chord.checked = true;
  }
}

function isThereAnyChordSelected() {
  return (
      majChord.checked ||
      dominantChord.checked ||
      minorChord.checked ||
      semiDismChord.checked ||
      augChord.checked ||
      minorMaj7Chord.checked
    );
}

function canSetMode(_mode) {

  switch(_mode) {
      case 0:
          return majChord.checked;
      case 1:
          return dominantChord.checked;
      case 2:
          return minorChord.checked;
      case 3:
          return semiDismChord.checked;
      case 4:
          return augChord.checked;
      case 5:
          return minorMaj7Chord.checked;
  }
}

function getSemitone(tone, alter) {

  let result = 0;
  switch (tone) {
      case 'A':
          result = 0;
          break;
      case 'B':
          result = 2;
          break;
      case 'C':
          result = 3;
          break;
      case 'D':
          result = 5;
          break;
      case 'E':
          result = 7;
          break;
      case 'F':
          result = 8;
          break;
      case 'G':
          result = 10;
          break;
  }

  return result + alter;
}
