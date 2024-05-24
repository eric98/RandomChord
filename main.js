var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

const CORRECT_NOTES_COLOR = "#4CAF50";
const NOTES_COLOR = "#86c8ff";

slider.oninput = function() {
  output.innerHTML = this.value;
}

var metronomeVolumenSlider = document.getElementById("vol_metronome_range");
var metronomeVolumenText = document.getElementById("vol_metronome");
metronomeVolumenText.innerHTML = metronomeVolumenSlider.value;
metronomeVolumenSlider.oninput = function() {
  metronomeVolumenText.innerHTML = this.value;
}

var backtrackVolumenSlider = document.getElementById("vol_backtrack_range");
var backtrackVolumenText = document.getElementById("vol_backtrack");
backtrackVolumenText.innerHTML = backtrackVolumenSlider.value;
backtrackVolumenSlider.oninput = function() {
  backtrackVolumenText.innerHTML = this.value;
}

var sliderBeats = document.getElementById("beatsRange");
var outputBeats = document.getElementById("beatsSpan");
outputBeats.innerHTML = sliderBeats.value;

sliderBeats.oninput = function() {
  outputBeats.innerHTML = this.value;
}

var imagesDiv = document.getElementById("imagesDiv");
var lastImage = document.getElementById("lastImage");
var currentImage = document.getElementById("currentImage");
var nextImage = document.getElementById("nextImage");

var backTrack = document.getElementById("_backTrack");
backTrack.checked = true;

var pitchTone = document.getElementById("pitchTone");
pitchTone.value = "2";

var helpCheck = document.getElementById("_help");
helpCheck.checked = true;

const DELTA_TIME = 16.67;
const MILLISECONDS_PER_MINUTE = 60000;
var lastUpdate = Date.now();
var myInterval = setInterval(tick, DELTA_TIME);

var timeNow = 0;
var nextKlack = 0;

var myBeats = document.getElementById("myBeats");
var beatCount = -1;
var firstChord = true;

var nextChordMethodology = document.getElementById("nextChordMethodology");


var lastElt = document.getElementById("_lastChord");
var currentElt = document.getElementById("_currentChord");
var nextElt = document.getElementById("_nextChord");

var permDivsElt = [
  document.getElementById("permutationDiv1"),
  document.getElementById("permutationDiv3"),
  document.getElementById("permutationDiv5"),
  document.getElementById("permutationDiv7")
]

var permNumbersElt = [
  document.getElementById("permutation1"),
  document.getElementById("permutation3"),
  document.getElementById("permutation5"),
  document.getElementById("permutation7")
];

var permNotesElt = [
  document.getElementById("note1"),
  document.getElementById("note3"),
  document.getElementById("note5"),
  document.getElementById("note7")
];

var lastChord = new Chord(lastElt, lastImage, permNumbersElt, permNotesElt);
var currentChord = new Chord(currentElt, currentImage, permNumbersElt, permNotesElt);
var nextChord = new Chord(nextElt, nextImage, permNumbersElt, permNotesElt);

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

var metronomeElt = document.getElementById("_metronome");
var plingElt = document.getElementById("_pling");

function getAvailableChords() {

  let availableChords = [];

  for (let index = 0; index < 12; index++) {

    let formatSemitoneCount = Chord.formatSemitoneCount(index);

    if (majChord.checked) {
      availableChords.push({
        semitone: formatSemitoneCount,
        mode: "Δ",
        box: 1,
        updateBox: false,
        correctAnswer: false
      });
    }
    if (dominantChord.checked) {
      availableChords.push({
        semitone: formatSemitoneCount,
        mode: "7",
        box: 1,
        updateBox: false,
        correctAnswer: false
      });
    }
    if (minorChord.checked) {
      availableChords.push({
        semitone: formatSemitoneCount,
        mode: "-7",
        box: 1,
        updateBox: false,
        correctAnswer: false
      });
    }
    if (semiDismChord.checked) {
      availableChords.push({
        semitone: formatSemitoneCount,
        mode: "ø",
        box: 1,
        updateBox: false,
        correctAnswer: false
      });
    }
    if (augChord.checked) {
      availableChords.push({
        semitone: formatSemitoneCount,
        mode: "7♯5",
        box: 1,
        updateBox: false,
        correctAnswer: false
      });
    }
    if (minorMaj7Chord.checked) {
      availableChords.push({
        semitone: formatSemitoneCount,
        mode: "-Δ",
        box: 1,
        updateBox: false,
        correctAnswer: false
      });
    }
  }

  return shuffle(availableChords);
}

var correctNotes = 0;
const MAX_CORRECT_NOTES = 4;

var leitnerSystem = new LeitnerSystem();
getAvailableChords().forEach(element => leitnerSystem.addCard(element));
leitnerSystem.closeDeck();

let currentChordMethodologyValue = nextChordMethodology.value;
nextChordMethodology.value = "random";
for (let i = 0; i < 3; i++) {
  chordStep();
}
nextChordMethodology.value = currentChordMethodologyValue;


function getAnswer() {
  return correctNotes == MAX_CORRECT_NOTES;
}

function chordStep() {

  leitnerSystem.nextCard();
  lastChord.setChord(currentChord);
  currentChord.setChord(nextChord);


  switch (nextChordMethodology.value) {
    case "spacedRepetition":
      nextChord.setNextChordByInfo(leitnerSystem.seeNextCard());
      break;
    case "fifthProgression":
      nextChord.setNextFifthChord();
      break;
    case "random":
      nextChord.setRandomChord();
      break;
    default:
      break;
  }
  
  if (loadedSounds) {
    currentChord.play();
  }

  update();
  draw();

  resetPermutationDivs();
}

document.body.onkeyup = function(e) {
  if (e.key == " " ||
      e.code == "Space" ||      
      e.keyCode == 32      
  ) {
    correctNotes = 4;
  }
}


function update() {
  lastChord.update();
  currentChord.update();
  nextChord.update();
}

function draw() {
  lastChord.draw();
  currentChord.draw();
  currentChord.drawPermutations();
  nextChord.draw();
}

function tick() {

    timeNow += DELTA_TIME;

    // VOLUME
    if (loadedSounds) {
      let metronomeVolume = metronomeVolumenSlider.value / 100;
      pling.volume = metronomeVolume;
      klack.volume = metronomeVolume * 0.67;
      currentChord.updateVolume();
    }

    // METRONOME
    if (metronomeElt.checked && timeNow > nextKlack) {

      nextKlack = timeNow + MILLISECONDS_PER_MINUTE/slider.value;

      beatCount++;
      beatCount = beatCount % sliderBeats.value;

      myBeats.textContent = beatCount + 1;

      if (beatCount == 0 && !firstChord) {
        chordStep();

        if (plingElt.checked) {
          
          pling.pause();
          pling.currentTime = 0;
          pling.play();
        }
        else  {
          klack.play();
        }
      }
      else {
        klack.play();

        if (firstChord) {
          firstChord = false;
        }
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

const ROOT_URL = "https://www.musiklehre.at/all_piano_chords/";
const NOTES_SOUND = {
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

  Object.entries(NOTES_SOUND).forEach(([key, value]) => {
    audioNotes[value.semitone] = {name: key, audio: new Audio(ROOT_URL+value.url)};
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

  currentChord.play();

}

function checkMetronome() {

  if (!loadedSounds) {
    loadSounds();

    loadedSounds = true;
  }

}

function enableImages(inputChecked) {
  let visibility;
  let display;

  if (inputChecked) {
    visibility = 'visible';
    display = "";
  }
  else {
    visibility = 'hidden';
    display = "none";
  }

  lastImage.style.visibility = visibility;
  currentImage.style.visibility = visibility;
  nextImage.style.visibility = visibility;

  imagesDiv.style.display = display;
}

function enablePermutationNotes(inputChecked) {
  let display;

  if (inputChecked) {
    display = "";
  }
  else {
    display = "none";
  }

  permNotesElt[0].style.display = display;
  permNotesElt[1].style.display = display;
  permNotesElt[2].style.display = display;
  permNotesElt[3].style.display = display;
}

function enableHelp() {
  enableImages(helpCheck.checked);
  enablePermutationNotes(helpCheck.checked);
}

function resetPermutationDivs() {

  correctNotes = 0;

  permDivsElt.forEach(
    (element) => element.style.background = NOTES_COLOR
    );
}

function highlightPermutationDiv(note) {
  
  let highlightPermutationDiv;
  switch (note) {
    case 1:
      correctNotes++;
      highlightPermutationDiv = permDivsElt[0];
      break;
      case 3:
      correctNotes++;
      highlightPermutationDiv = permDivsElt[1];
      break;
      case 5:
      correctNotes++;
      highlightPermutationDiv = permDivsElt[2];
      break;
      case 7:
      correctNotes++;
      highlightPermutationDiv = permDivsElt[3];
      break;

    default:
      return;
  }

  highlightPermutationDiv.style.background = CORRECT_NOTES_COLOR;
}
