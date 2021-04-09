
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