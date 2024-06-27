var majChord = document.getElementById("_maj7");
var dominantChord = document.getElementById("_dom");
var minorChord = document.getElementById("_min7");
var semiDismChord = document.getElementById("_semiDism7");
var augChord = document.getElementById("_aug7");
var minorMaj7Chord = document.getElementById("_minMaj7");

// Per defecte, l'únic acord activat és el "majChord"
majChord.checked = true;

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

function loadNextChordMethodologyChords() {
  switch (nextChordMethodology.value) {
    case "spacedRepetition":
      leitnerSystem.setArrayOfCards(getAvailableChords());
      break;

    case "fifthProgression":
      break;

    case "random":
      break;

    default:
      break;
  }
}

function onChangeNextChordMethodology() {
  loadNextChordMethodologyChords();
}

function onClickMaj7Chord() {
  if (!isThereAnyChordSelected()) {
    majChord.checked = true;
  }
  else {
    loadNextChordMethodologyChords();
  }
}

function onClick7Chord() {
  if (!isThereAnyChordSelected()) {
    dominantChord.checked = true;
  }
  else {
    loadNextChordMethodologyChords();
  }
}

function onClickMin7Chord() {
  if (!isThereAnyChordSelected()) {
    minorChord.checked = true;
  }
  else {
    loadNextChordMethodologyChords();
  }
}

function onClickSemiDismChord() {
  if (!isThereAnyChordSelected()) {
    semiDismChord.checked = true;
  }
  else {
    loadNextChordMethodologyChords();
  }
}

function onClickAug7Chord() {
  if (!isThereAnyChordSelected()) {
    augChord.checked = true;
  }
  else {
    loadNextChordMethodologyChords();
  }
}

function onClickMinorMaj7Chord() {
  if (!isThereAnyChordSelected()) {
    minorMaj7Chord.checked = true;
  }
  else {
    loadNextChordMethodologyChords();
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

  switch (_mode) {
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
    default:
      break;
  }
}