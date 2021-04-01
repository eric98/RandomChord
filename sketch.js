class Tonality {
    constructor(_name, _alterationNum) {
      this.name = _name;

      switch (_alterationNum){
        case 0:
            break;
        case 1:
            this.alteration = '♭';
            break;
        case 2:
            this.alteration = '♯';
            break;
      }

      this.chordSize = 32;

      this.setChord();
    }

    setMaj7() {
        this.chord = 'Δ'
    }

    setDominant() {
        this.chord = '7'
    }

    setMinor() {
        this.chord = '-7'
    }

    setSemiDism() {
        this.chord = 'ø'
    }

    setAug() {
        this.chord = '7♯5'
    }

    setMinorMaj7() {
        this.chord = '-Δ9'
    }

    setChord() {

    }

    draw() {
        textSize(64);
        text(this.name, windowWidth/2, windowHeight/2);
        textSize(this.chordSize);
        text(this.chord, windowWidth/2 + 50, windowHeight/2 + 5);
        
        text(this.alteration, windowWidth/2 + 50, windowHeight/2 - 35);
        
        // fill(0, 0, 0);
    }
}

let actualTonality;
let button;
let randomCheck;
let metronomeInput;
let randomChord;

function randomTonality() {
    var characters = 'ABCDEFG';
    actualTonality = new Tonality(characters.charAt(Math.floor(Math.random() * characters.length)),Math.floor(Math.random() * 3));
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    actualTonality = new Tonality('A',2);
    randomTonality();

    button = createButton('Random');
    button.position(windowWidth/2, windowHeight/2 + 100);
    button.mousePressed(randomTonality);

    randomChord = false;
    randomCheck = createCheckbox('Random Chord', randomChord);
    randomCheck.changed(function () {randomChord = !randomChord});
    
    input = createInput();
    input.position(windowWidth/2 - 50, windowHeight/2 + 200);
    input.value('90');
}
  
function draw() {

    background(255);
    textSize(20);
    text('Metronome', input.x - 120, input.y - 50);
    
    actualTonality.draw();
    randomCheck.position(400, 400);
    
}