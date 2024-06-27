// IMAGES ELEMENTS
var imagesDiv = [
  document.getElementById("lastImageDiv"),
  document.getElementById("currentImageDiv"),
  document.getElementById("nextImageDiv")
]

var lastImage = document.getElementById("lastImage");
var currentImage = document.getElementById("currentImage");
var nextImage = document.getElementById("nextImage");

// CONFIGURATION ELEMENTS
var backTrack = document.getElementById("_backTrack");
backTrack.checked = true;

var pitchTone = document.getElementById("pitchTone");
pitchTone.value = "0";

var helpCheck = document.getElementById("_help");
helpCheck.checked = true;

var nextChordMethodology = document.getElementById("nextChordMethodology");

// LOOPS
var lastUpdate = Date.now();
var myInterval = setInterval(tick, DELTA_TIME);

var timeNow = 0;
var nextKlack = 0;

var currentBeatText = document.getElementById("currentBeatText");
var beatCount = -1;

var lastElt = document.getElementById("_lastChord");
var currentElt = document.getElementById("_currentChord");
var nextElt = document.getElementById("_nextChord");

var lastChord = new Chord(lastElt, lastImage, permNumbersElt, permNotesElt);
var currentChord = new Chord(currentElt, currentImage, permNumbersElt, permNotesElt);
var nextChord = new Chord(nextElt, nextImage, permNumbersElt, permNotesElt);

var metronomeElt = document.getElementById("_metronome");
var plingElt = document.getElementById("_pling");

var firstChord = true;

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

    nextKlack = timeNow + MILLISECONDS_PER_MINUTE / slider.value;

    beatCount++;
    beatCount = beatCount % sliderBeats.value;

    currentBeatText.textContent = beatCount + 1;

    if (beatCount == 0 && !firstChord) {
      chordStep();

      if (plingElt.checked) {

        pling.pause();
        pling.currentTime = 0;
        pling.play();
      }
      else {
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

function chordStep() {

  // if app is playing
  if (metronomeElt.checked) {
    var currentAnswer = getAnswer();
    var answerKey = currentAnswer.semitone + currentAnswer.mode;


    let prevAnswer = answers.find(chordAnswer => chordAnswer.hasOwnProperty(answerKey))
    if (prevAnswer !== undefined) {
      prevAnswer[answerKey].maxValue += 4;
      prevAnswer[answerKey].occurrence++;
    }
    else {

      let answerToAdd = {
        semitone: currentAnswer.semitone,
        mode: currentAnswer.mode,
        value: currentAnswer.value,
        maxValue: 4,
        occurrence: 1
      }

      answers.push({ [answerKey]: answerToAdd });

      answers.sort((a, b) => {

        let keyA = Object.keys(a)[0];
        let chordA = a[keyA];

        let keyB = Object.keys(b)[0];
        let chordB = b[keyB];

        return chordA.semitone - chordB.semitone;
      });

    }

    resultsElt.innerHTML = answersToStringFormat();
  }

  switch (nextChordMethodology.value) {
    case "spacedRepetition":
      leitnerSystem.nextCard();

      lastChord.setChord(currentChord);
      currentChord.setChord(nextChord);

      nextChord.setNextChordByInfo(leitnerSystem.seeNextCard());
      break;

    case "fifthProgression":
      lastChord.setChord(currentChord);
      currentChord.setChord(nextChord);

      nextChord.setNextFifthChord();
      break;

    case "random":
      lastChord.setChord(currentChord);
      currentChord.setChord(nextChord);

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

// LEITNER_SYSTEM
var leitnerSystem = new LeitnerSystem();
setInitialChords();

var answers = [];
var resultsElt = document.getElementById("results");

function setInitialChords() {
  leitnerSystem.setArrayOfCards(getAvailableChords());

  let currentChordMethodologyValue = nextChordMethodology.value;
  nextChordMethodology.value = INITIAL_NEXT_CHORD_METHODOLOGY;
  for (let i = 0; i < INITIAL_CHORDS_COUNT; i++) {
    chordStep();
  }
  nextChordMethodology.value = currentChordMethodologyValue;
  answers = [];
}

function getAnswer() {

  return {
    semitone: currentChord.semitone,
    mode: currentChord.mode,
    value: correctNotesCount
  }
}

function answersToStringFormat() {

  return answers.map((answer) => {

    let key = Object.keys(answer)[0];
    let chord = answer[key];

    let desiredSemitone = Chord.formatSemitoneCount(chord.semitone + parseInt(pitchTone.value));
    let note = Chord.semitoneIntToNote(desiredSemitone);

    let name = note.name + "<sup>" + note.stringAlteration + "</sup><sub>" + chord.mode + "</sub>";
    let currentValue = chord.value;
    let maxValue = chord.maxValue;
    let percentString = (chord.value / chord.maxValue) * 100 + "%";

    return name + ": " + percentString + " (" + currentValue + "/" + maxValue + ")";
  }).join("<br>");
}

// LOAD RESOURCES
var klack;
var pling;
var loadedSounds = false;

var audioNotes = {};

function loadNoteAudios() {

  Object.entries(NOTES_AUDIO).forEach(([key, value]) => {
    audioNotes[value.semitone] = { name: key, audio: new Audio(value.url) };
  });

}

function loadSounds() {
  klack = new Audio(KLACK_AUDIO);
  pling = new Audio(PLING_AUDIO);

  klack.volume = 0.3;
  pling.volume = 0.2;

  // Sound recording by Mirko Horstmann via freesound.org
  // https://freesound.org/people/m1rk0/sounds/50070/
  // https://freesound.org/people/m1rk0/sounds/50071/

  loadNoteAudios();

  currentChord.play();

}

// UPDATE UI
function updatePitchTone() {
  update();
  draw();
}

function enableMetronome() {

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

  imagesDiv.forEach(element => element.style.display = display);
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
