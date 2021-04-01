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
        this.chord = '-Δ'
    }

    canSetChord(_chord) {

        switch(_chord) {
            case 0:
                return majChord;
            case 1:
                return dominantChord;
            case 2:
                return minorChord;
            case 3:
                return semiDismChord;
            case 4:
                return augChord;
            case 5:
                return minorMaj7Chord;
        }
    }

    setChord() {
        
        if (majChord ||
            dominantChord ||
            minorChord ||
            semiDismChord ||
            augChord ||
            minorMaj7Chord 
            ) {

                let randChord;
                do {
                    randChord = Math.floor(Math.random() * 6)
                }
                while(!this.canSetChord(randChord));

                switch(randChord) {
                    case 0:
                        this.setMaj7();
                        break;
                    case 1:
                        this.setDominant();
                        break;
                    case 2:
                        this.setMinor();
                        break;
                    case 3:
                        this.setSemiDism();
                        break;
                    case 4:
                        this.setAug();
                        break;
                    case 5:
                        this.setMinorMaj7();
                        break;
                }

        }
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
let metronomeInput;

// CHECKS
let majCheck;
let majChord;

let dominantCheck;
let dominantChord;

let minorCheck;
let minorChord;

let semiDismCheck;
let semiDismChord;

let augCheck;
let augChord;

let minorMaj7Check;
let minorMaj7Chord;

function randomTonality() {
    var characters = 'ABCDEFG';
    actualTonality = new Tonality(characters.charAt(Math.floor(Math.random() * characters.length)),Math.floor(Math.random() * 3));
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    button = createButton('Random');
    button.position(windowWidth/2, windowHeight/2 + 100);
    button.mousePressed(randomTonality);

    majChord = true;
    majCheck = createCheckbox('Maj7 (major 7)', majChord);
    majCheck.changed(function () {majChord = !majChord});
    
    dominantChord = false;
    dominantCheck = createCheckbox('Δ (dominant)', dominantChord);
    dominantCheck.changed(function () {dominantChord = !dominantChord});
    
    minorChord = false;
    minorCheck = createCheckbox('-7 (minor 7)', minorChord);
    minorCheck.changed(function () {minorChord = !minorChord});
    
    semiDismChord = false;
    semiDismCheck = createCheckbox('ø (semidism)', semiDismChord);
    semiDismCheck.changed(function () {semiDismChord = !semiDismChord});
    
    augChord = false;
    augCheck = createCheckbox('7♯5 (aug 7)', augChord);
    augCheck.changed(function () {augChord = !augChord});
    
    minorMaj7Chord = false;
    minorMaj7ChordCheck = createCheckbox('-Δ (minor maj 7)', minorMaj7Chord);
    minorMaj7ChordCheck.changed(function () {minorMaj7Chord = !minorMaj7Chord});
    
    input = createInput();
    input.position(windowWidth/2 - 50, windowHeight/2 + 200);
    input.value('90');

    randomTonality();
}
  
function draw() {

    background(255);
    textSize(20);
    text('Metronome', input.x - 120, input.y - 50);
    
    actualTonality.draw();
    majCheck.position(windowWidth/2 + 150, windowHeight/2 - 100);
    dominantCheck.position(windowWidth/2 + 150, windowHeight/2 - 50);
    minorCheck.position(windowWidth/2 + 150, windowHeight/2);
    semiDismCheck.position(windowWidth/2 + 150, windowHeight/2 + 50);
    augCheck.position(windowWidth/2 + 150, windowHeight/2 + 100);
    minorMaj7ChordCheck.position(windowWidth/2 + 150, windowHeight/2 + 150);
}