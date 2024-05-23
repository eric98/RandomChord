// MICROPHONE
// based on code from https://raw.githubusercontent.com/cwilso/PitchDetect/main/js/pitchdetect.js
function autoCorrelate( buf, sampleRate ) {
	// Implements the ACF2+ algorithm
	var SIZE = buf.length;
	var rms = 0;

	for (var i=0;i<SIZE;i++) {
		var val = buf[i];
		rms += val*val;
	}
	rms = Math.sqrt(rms/SIZE);
	if (rms<0.01) // not enough signal
		return -1;

	var r1=0, r2=SIZE-1, thres=0.2;
	for (var i=0; i<SIZE/2; i++)
		if (Math.abs(buf[i])<thres) { r1=i; break; }
	for (var i=1; i<SIZE/2; i++)
		if (Math.abs(buf[SIZE-i])<thres) { r2=SIZE-i; break; }

	buf = buf.slice(r1,r2);
	SIZE = buf.length;

	var c = new Array(SIZE).fill(0);
	for (var i=0; i<SIZE; i++)
		for (var j=0; j<SIZE-i; j++)
			c[i] = c[i] + buf[j]*buf[j+i];

	var d=0; while (c[d]>c[d+1]) d++;
	var maxval=-1, maxpos=-1;
	for (var i=d; i<SIZE; i++) {
		if (c[i] > maxval) {
			maxval = c[i];
			maxpos = i;
		}
	}
	var T0 = maxpos;

	var x1=c[T0-1], x2=c[T0], x3=c[T0+1];
	a = (x1 + x3 - 2*x2)/2;
	b = (x3 - x1)/2;
	if (a) T0 = T0 - b/(2*a);

	return sampleRate/T0;
}

function noteFromPitch( frequency ) {
  const A4_FREQUENCY = 440;
  const SEMITONES_COUNT = 12;
  const A4_MIDI_NUMBER = 69;

  var noteNum = SEMITONES_COUNT * (Math.log( frequency / A4_FREQUENCY )/ Math.log(2) );
  return Math.round( noteNum ) + A4_MIDI_NUMBER;
}

var noteElement = document.getElementById("note");
var noteFrequencyElement = document.getElementById("noteFrequency");

const MILLISECONDS_PLAYING_NOTE_TO_CHECK_INPUT = 100;
var lastNotePlayingInt = {
	note: -1,
	startedPlayingTime: -1
}

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
.then(function(stream) {
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var mediaStreamSource = audioContext.createMediaStreamSource(stream);
    var analyser = audioContext.createAnalyser();
    mediaStreamSource.connect(analyser);

    const NOTE_STRINGS = ["C", "C#", "D", "E♭", "E", "F", "F#", "G", "G#", "A", "B♭", "B"];
    
    // Now you can use the analyser node to perform frequency analysis
    var bufferLength = analyser.frequencyBinCount;
    var buf = new Float32Array( bufferLength );

    function tunerUpdate() {
      analyser.getFloatTimeDomainData( buf );
      var ac = autoCorrelate( buf, audioContext.sampleRate );

      let noteText;
      let noteFrequencyText;
    
	  // 1. CHECK NOTE from microphone
      if (ac > -1) {
        var note =  noteFromPitch( ac );
		var transposedNote = note + parseInt(pitchTone.value);

        noteText = NOTE_STRINGS[transposedNote % 12];
        noteFrequencyText = Math.round( ac ) + ' Hz';

		// 2. CHECK playing time
		currentPlayingNoteInt = note % 12;

		if (currentPlayingNoteInt != lastNotePlayingInt.note) {
			// set new playing time
			lastNotePlayingInt.note = note % 12;
			lastNotePlayingInt.startedPlayingTime = timeNow;
		}
		else {
			// calculate playing time
			if (timeNow - lastNotePlayingInt.startedPlayingTime > MILLISECONDS_PLAYING_NOTE_TO_CHECK_INPUT) {
				
				// 3. CHECK if it's a note of the currentChord

				// translate from C -> semitone 0
				// to A -> semitone 0
				let translatedNote = transposedNote + 3;

				currentChord.checkInputNoteExists(translatedNote);
			}
		}
      } else {

		noteText = "--";
		noteFrequencyText = '-- Hz';

		// 2. RESET playing time
		lastNotePlayingInt.note = -1;
      }

      noteElement.innerHTML = noteText;
      noteFrequencyElement.innerHTML = noteFrequencyText;
    
      if (!window.requestAnimationFrame)
        window.requestAnimationFrame = window.webkitRequestAnimationFrame;

      rafID = window.requestAnimationFrame( tunerUpdate );
    }

    tunerUpdate();
})
.catch(function(err) {
    console.log('An error occurred: ' + err);
});
