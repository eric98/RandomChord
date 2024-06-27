// S'uneix el valor del slider bpmRange amb el text de sota.
var slider = document.getElementById("bpmRange");
var output = document.getElementById("bpmSpan");
output.innerHTML = slider.value;
slider.oninput = function () {
  output.innerHTML = this.value;
}

// S'uneix el valor del slider vol_metronome amb el text de sota.
var metronomeVolumenSlider = document.getElementById("vol_metronome_range");
var metronomeVolumenText = document.getElementById("vol_metronome");
metronomeVolumenText.innerHTML = metronomeVolumenSlider.value;
metronomeVolumenSlider.oninput = function () {
  metronomeVolumenText.innerHTML = this.value;
}

// S'uneix el valor del slider vol_backtrack amb el text de sota.
var backtrackVolumenSlider = document.getElementById("vol_backtrack_range");
var backtrackVolumenText = document.getElementById("vol_backtrack");
backtrackVolumenText.innerHTML = backtrackVolumenSlider.value;
backtrackVolumenSlider.oninput = function () {
  backtrackVolumenText.innerHTML = this.value;
}

// S'uneix el valor del slider beatsRange amb el text de sota.
var sliderBeats = document.getElementById("beatsRange");
var outputBeats = document.getElementById("beatsSpan");
outputBeats.innerHTML = sliderBeats.value;
sliderBeats.oninput = function () {
  outputBeats.innerHTML = this.value;
}