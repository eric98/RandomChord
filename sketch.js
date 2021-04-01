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

let nextKlack = 0;
let metronomeActived = false;
let plingActived = true;

let metronomeCheck;
let plingCheck;

function randomTonality() {
    var characters = 'ABCDEFG';
    actualTonality = new Tonality(characters.charAt(Math.floor(Math.random() * characters.length)),Math.floor(Math.random() * 3));
}

function activeMetronome() {
    metronomeActived = !metronomeActived;
}

function preload() {
    klack = new Audio('metronom-klack.mp3');
    pling = new Audio('metronom-pling.mp3');

    // Sound recording by Mirko Horstmann via freesound.org
    // https://freesound.org/people/m1rk0/sounds/50070/
    // https://freesound.org/people/m1rk0/sounds/50071/
  }

function setup() {
    createCanvas(windowWidth, windowHeight);

    button = createButton('Random Chord');
    button.position(width/2 - 25, height/2 - 75);
    button.mousePressed(randomTonality);

    majChord = true;
    majCheck = createCheckbox('Δ (major 7)', majChord);
    majCheck.changed(function () {majChord = !majChord});
    
    dominantChord = false;
    dominantCheck = createCheckbox('7 (dominant)', dominantChord);
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
    
    metronomeCheck = createCheckbox('Metronome on/off', metronomeActived);
    metronomeCheck.changed(activeMetronome);
    metronomeCheck.position(width/2 - 40, height/2 + 120);

    plingCheck = createCheckbox('Pling at 1st beat', plingActived);
    plingCheck.changed(function () {plingActived = !plingActived});
    plingCheck.position(width/2 - 40, height/2 + 140);
    

    randomTonality();

    tempoSlider = createSlider(40, 208, 80);
    tempoSlider.class('slider');
    tempoSlider.position(width/2 - 50, height/2 + 220);

    beatSlider = createSlider(1, 8, 4);
    beatSlider.class('slider');
    beatSlider.position(width/2 - 50, height/2 + 290);

    majCheck.position(width/2 + 150, height/2 - 100);
    dominantCheck.position(width/2 + 150, height/2 - 50);
    minorCheck.position(width/2 + 150, height/2);
    semiDismCheck.position(width/2 + 150, height/2 + 50);
    augCheck.position(width/2 + 150, height/2 + 100);
    minorMaj7ChordCheck.position(width/2 + 150, height/2 + 150);
}

let beatCount = 0;
  
function draw() {

    background(255);
    textSize(20);
    
    actualTonality.draw();
    
    let timeNow = millis();
  
    if (timeNow > nextKlack && metronomeActived) {

        nextKlack = timeNow + 60000/tempoSlider.value();
        beatCount++;
        beatCount = beatCount % beatSlider.value();

        if (beatCount == 0) {
            randomTonality();

            if (plingActived) {
                pling.play();
            }
            else  {
                klack.play();
            }
        }
        else {
            klack.play();
        }

    }

    text(`${tempoSlider.value()} bpm`, width/2 - 50, height/2 + 150);
    text(`${beatSlider.value()} beats`, width/2 - 50, height/2 + 220);
    
    textSize(64);
    text((beatCount+1), width/2 + 190, height/2 + 220);
}