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

var correctNotes = [false, false, false, false];
var correctNotesCount = 0;

function resetPermutationDivs() {

  correctNotesCount = 0;

  permDivsElt.forEach(
    (element) => element.style.background = NOTES_COLOR
  );

  correctNotes = [false, false, false, false];
}

function highlightPermutationDiv(noteInt) {

  let highlightPermutationDiv;
  switch (noteInt) {
    case 1:

      if (!correctNotes[0]) {
        correctNotesCount++;
        highlightPermutationDiv = permDivsElt[0];
        correctNotes[0] = true;
      }

      break;
    case 3:

      if (!correctNotes[1]) {
        correctNotesCount++;
        highlightPermutationDiv = permDivsElt[1];
        correctNotes[1] = true;
      }

      break;
    case 5:

      if (!correctNotes[2]) {
        correctNotesCount++;
        highlightPermutationDiv = permDivsElt[2];
        correctNotes[2] = true;
      }

      break;
    case 7:

      if (!correctNotes[3]) {
        correctNotesCount++;
        highlightPermutationDiv = permDivsElt[3];
        correctNotes[3] = true;
      }

      break;

    default:
      return;
  }

  if (highlightPermutationDiv !== undefined) {
    highlightPermutationDiv.style.background = CORRECT_NOTES_COLOR;
  }
}