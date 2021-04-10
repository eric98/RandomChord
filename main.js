
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

var backTrack = document.getElementById("_backTrack");
backTrack.checked = true;

var pitch = document.getElementById("pitch");
pitch.value = "2";

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

var metronomeElt = document.getElementById("_metronome");
var metronomeSoundElt = document.getElementById("_metronomeSound");
var plingElt = document.getElementById("_pling");
metronomeSoundElt.checked = true;

function chordStep() {

  lastChord.setChord(actualChord);
  actualChord.setChord(nextChord);
  
  if (fifthsProgression.checked) {
    nextChord.setNextFifthChord();
  }
  else {
    nextChord.setRandomChord();
  }

  if (loadedSounds) {
    actualChord.printChordNotes();
    actualChord.play();
  }

  draw();
}

function draw() {
  lastChord.draw();
  actualChord.draw();
  nextChord.draw();
}

function tick() {

    timeNow += deltaTime;

    if (metronomeElt.checked && timeNow > nextKlack) {

      nextKlack = timeNow + 60000/slider.value;

      beatCount++;
      beatCount = beatCount % sliderBeats.value;

      myBeats.textContent = beatCount + 1;

      if (beatCount == 0) {
        chordStep();

        if (metronomeSoundElt.checked) {
          if (plingElt.checked) {
            
            pling.pause();
            pling.currentTime = 0;
            pling.play();
          }
          else  {
            klack.play();
          }
        }
      }
      else if (metronomeSoundElt.checked) {
        klack.play();
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

var klack;
var pling;
var loadedSounds = false;

const rootUrl = "https://www.musiklehre.at/all_piano_chords/";
const notesSound = {
  "1C": { url: "media/523-C.mp3", semitone: -9},
  "1Cs": { url: "media/545-C-sharp.mp3", semitone: -8},
  "1D": { url: "media/587-D.mp3", semitone: -7},
  "1Ds": { url: "media/622-D-sharp.mp3", semitone: -6},
  "1E": { url: "media/659-E.mp3", semitone: -5},
  "1F": { url: "media/698-F.mp3", semitone: -4},
  "1Fs": { url: "media/698-F-sharp.mp3", semitone: -3},
  "1G": { url: "media/783-G.mp3", semitone: -2},
  "1Gs": { url: "media/830-G-sharp.mp3", semitone: -1},
  "2A": { url: "media/880-A.mp3", semitone: 0},
  "2As": { url: "media/932-A-sharp.mp3", semitone: 1},
  "2B": { url: "media/987-B.mp3", semitone: 2},
  "2C": { url: "media/1046-C.mp3", semitone: 3},
  "2Cs": { url: "media/1090-C-sharp.mp3", semitone: 4},
  "2D": { url: "media/1174-D.mp3", semitone: 5},
  "2Ds": { url: "media/1244-D-sharp.mp3", semitone: 6},
  "2E": { url: "media/1318-E.mp3", semitone: 7},
  "2F": { url: "media/1396-F.mp3", semitone: 8},
  "2Fs": { url: "media/1396-F-sharp.mp3", semitone: 9},
  "2G": { url: "media/1566-G.mp3", semitone: 10},
  "2Gs": { url: "media/1660-G-sharp.mp3", semitone: 11},
  "3A": { url: "media/1760-A.mp3", semitone: 12},
  "3As": { url: "media/1864-A-sharp.mp3", semitone: 13},
  "3B": { url: "media/1974-B.mp3", semitone: 14}
}

var audioNotes = {};

function loadNoteAudios() {

  Object.entries(notesSound).forEach(([key, value]) => {
    audioNotes[value.semitone] = {name: key, audio: new Audio(rootUrl+value.url)};
  });

  // https://www.musiklehre.at/all_piano_chords/

}

function loadSounds() {
  klack = new Audio('metronom-klack.mp3');
  // pling = new Audio('metronom-pling.mp3');
  pling = new Audio('metronom-pling.wav');

  klack.volume = 0.3;
  pling.volume = 0.2;

  // Sound recording by Mirko Horstmann via freesound.org
  // https://freesound.org/people/m1rk0/sounds/50070/
  // https://freesound.org/people/m1rk0/sounds/50071/

  loadNoteAudios();

  actualChord.play();

}

function checkMetronome() {

  if (!loadedSounds) {
    loadSounds();

    loadedSounds = true;
  }

}
