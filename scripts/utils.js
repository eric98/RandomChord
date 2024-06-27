const CORRECT_NOTES_COLOR = "#4CAF50";
const NOTES_COLOR = "#86c8ff";

const DELTA_TIME = 16.67;
const MILLISECONDS_PER_MINUTE = 60000;

const MAX_CORRECT_NOTES_COUNT = 4;

const IMG_ROOT_URL = "resources/img/";

const AUDIO_ROOT_URL = "resources/audio/";
const NOTES_AUDIO = {
  "C3": { url: AUDIO_ROOT_URL + "C3.mp3", semitone: -9 },
  "Cs3": { url: AUDIO_ROOT_URL + "Cs3.mp3", semitone: -8 },
  "D3": { url: AUDIO_ROOT_URL + "D3.mp3", semitone: -7 },
  "Ds3": { url: AUDIO_ROOT_URL + "Ds3.mp3", semitone: -6 },
  "E3": { url: AUDIO_ROOT_URL + "E3.mp3", semitone: -5 },
  "F3": { url: AUDIO_ROOT_URL + "F3.mp3", semitone: -4 },
  "Fs3": { url: AUDIO_ROOT_URL + "Fs3.mp3", semitone: -3 },
  "G3": { url: AUDIO_ROOT_URL + "G3.mp3", semitone: -2 },
  "Gs3": { url: AUDIO_ROOT_URL + "Gs3.mp3", semitone: -1 },
  "A4": { url: AUDIO_ROOT_URL + "A4.mp3", semitone: 0 },
  "As4": { url: AUDIO_ROOT_URL + "As4.mp3", semitone: 1 },
  "B4": { url: AUDIO_ROOT_URL + "B4.mp3", semitone: 2 },
  "C4": { url: AUDIO_ROOT_URL + "C4.mp3", semitone: 3 },
  "Cs4": { url: AUDIO_ROOT_URL + "Cs4.mp3", semitone: 4 },
  "D4": { url: AUDIO_ROOT_URL + "D4.mp3", semitone: 5 },
  "Ds4": { url: AUDIO_ROOT_URL + "Ds4.mp3", semitone: 6 },
  "E4": { url: AUDIO_ROOT_URL + "E4.mp3", semitone: 7 },
  "F4": { url: AUDIO_ROOT_URL + "F4.mp3", semitone: 8 },
  "Fs4": { url: AUDIO_ROOT_URL + "Fs4.mp3", semitone: 9 },
  "G4": { url: AUDIO_ROOT_URL + "G4.mp3", semitone: 10 },
  "Gs4": { url: AUDIO_ROOT_URL + "Gs4.mp3", semitone: 11 },
  "A5": { url: AUDIO_ROOT_URL + "A5.mp3", semitone: 12 },
  "As5": { url: AUDIO_ROOT_URL + "As5.mp3", semitone: 13 },
  "B5": { url: AUDIO_ROOT_URL + "B5.mp3", semitone: 14 }
}

const KLACK_AUDIO = AUDIO_ROOT_URL + "metronom-klack.mp3";
const PLING_AUDIO = AUDIO_ROOT_URL + "metronom-pling.wav";

const INITIAL_CHORDS_COUNT = 3;
const INITIAL_NEXT_CHORD_METHODOLOGY = "random";

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}