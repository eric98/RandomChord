class Tonality {
    constructor(_name, _alterationNum) {
      this.name = _name;

      switch (_alterationNum){
        case 0:
            this.alterationSemiTone = 0;
            break;
        case 1:
            this.alteration = '♭';
            this.alterationSemiTone = -1;
            break;
        case 2:
            this.alteration = '♯';
            this.alterationSemiTone = 1;
            break;
      }

      this.semitone = getSemitone(_name.charAt(0), this.alterationSemiTone);

      this.chordSize = 32;
      this.setChord();

      this.scale = 1;
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
                return p5_maj.elt.checked;
            case 1:
                return p5_dominant.elt.checked;
            case 2:
                return p5_minor.elt.checked;
            case 3:
                return p5_semiDism.elt.checked;
            case 4:
                return p5_aug.elt.checked;
            case 5:
                return p5_minorMaj7Chord.elt.checked;
        }
    }

    setChord() {

        if (p5_maj.elt.checked ||
            p5_dominant.elt.checked ||
            p5_minor.elt.checked ||
            p5_semiDism.elt.checked ||
            p5_aug.elt.checked ||
            p5_minorMaj7Chord.elt.checked 
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

    draw(_x, _y) {
        textSize(64 * this.scale);
        text(this.name, _x, _y);

        textSize(this.chordSize * this.scale);
        text(this.chord, _x + 50 * this.scale, _y + 5 * this.scale);
        text(this.alteration, _x + 50 * this.scale, _y - 35 * this.scale);
    }
}

let nextTonality;
let actualTonality;
let lastTonality;
let metronomeInput;

// CHECKS
let beatCount = 0;
let nextKlack = 0;
let metronomeActived = false;
let plingActived = true;

let metronomeCheck;
let plingCheck;

let fifthsCheck;
let fifthsActived = true;

let characters ='ABCDEFG';

function getSemitone(tone, alter) {

    let result = 0;
    switch (tone) {
        case 'A':
            result = 0;
            break;
        case 'B':
            result = 2;
            break;
        case 'C':
            result = 3;
            break;
        case 'D':
            result = 5;
            break;
        case 'E':
            result = 7;
            break;
        case 'F':
            result = 8;
            break;
        case 'G':
            result = 10;
            break;
    }

    return result + alter;
}

function getTone(semitone) {
    let sem = semitone % 12;

    let ton = 'A';
    let alter = 0;

    switch (sem) {
        case 0:
            ton = 'A';
            alter = 0;
            break;
        case 1:
            ton = 'B';
            alter = 1;
            break;
        case 2:
            ton = 'B';
            alter = 0;
            break;
        case 3:
            ton = 'C';
            alter = 0;
            break;
        case 4:
            ton = 'C';
            alter = 2;
            break;
        case 5:
            ton = 'D';
            alter = 0;
            break;
        case 6:
            ton = 'E';
            alter = 1;
            break;
        case 7:
            ton = 'E';
            alter = 0;
            break;
        case 8:
            ton = 'F';
            alter = 0;
            break;
        case 9:
            ton = 'F';
            alter = 2;
            break;
        case 10:
            ton = 'G';
            alter = 0;
            break;
        case 11:
            ton = 'G';
            alter = 2;
            break;
    }

    return new Tonality(ton, alter);
}

function nextFifth(ton) {
    var nF = getTone(ton.semitone + 5);
    return nF;
}

function randTon() {
    return new Tonality(getTone(Math.floor(Math.random() * 12)));
    // return new Tonality(characters.charAt(Math.floor(Math.random() * characters.length)),Math.floor(Math.random() * 3));
}

function randomTonality() {
    lastTonality = actualTonality;
    actualTonality = nextTonality;

    if (fifthsActived) {
        nextTonality = nextFifth(actualTonality);
    }
    else {
        nextTonality = randTon();
    }

    lastTonality.scale = 1 * scalarToResize;
    nextTonality.scale = 1 * scalarToResize;
    actualTonality.scale = 2 * scalarToResize;
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

function windowResized() {

    let desiredWidth = Math.max(parent.elt.offsetWidth, 600);

    scalarToResize = desiredWidth/600;


    // resizeCanvas(desiredWidth, 200);

    location.reload();

    // console.log(parent.elt.offsetWidth);
}

function setup() {

    parent = select('#sketch-container');
    // console.log(parent.elt.offsetWidth);

    lastWindowWidth = windowWidth;
    console.log(lastWindowWidth);

    // let can = createCanvas(600, 200);
    let can = createCanvas(parent.elt.offsetWidth, 200);
    can.parent('sketch-container');

    if (parent.elt.offsetWidth < 600) {
        scalarToResize = parent.elt.offsetWidth/600;
    }
    else {
        scalarToResize = 1;
    }

    // scalarToResize = 1;


    p5_maj = select('#_maj7');
    p5_dominant = select('#_dom');
    p5_minor = select('#_min7');
    p5_semiDism = select('#_semiDism7');
    p5_aug = select('#_aug7');
    p5_minorMaj7Chord = select('#_minMaj7');

    p5_maj.elt.checked = true;

    metronomeActived = true;

    // button = createButton('Next Chord');
    // button.mousePressed(randomTonality);

    nextTonality = new Tonality(characters.charAt(Math.floor(Math.random() * characters.length)),Math.floor(Math.random() * 3));
    actualTonality = new Tonality(characters.charAt(Math.floor(Math.random() * characters.length)),Math.floor(Math.random() * 3));
    randomTonality();
    randomTonality();
    randomTonality();
    randomTonality();

    tempoSlider = select('#myRange');
    beatSlider = select('#beatsRange');

    beatCounter = select('#myBeats');
    beatCounter.elt.textContent = '1';

    // tempoSlider = createSlider(40, 208, 80);
    // tempoSlider.class('slider');

    // beatSlider = createSlider(1, 8, 4);
    // beatSlider.class('slider');
}
  
function draw() {

    background(255);
    textSize(20);

    let centerX = width/2 - 50 * scalarToResize;
    let centerY = height/2 + 50 * scalarToResize;

    let tonalityCenter = centerX - 50 * scalarToResize;
    lastTonality.draw(tonalityCenter - 150 * scalarToResize, centerY);
    actualTonality.draw(tonalityCenter, centerY);
    nextTonality.draw(tonalityCenter + 250 * scalarToResize, centerY);
    
    let timeNow = millis();
  
    if (timeNow > nextKlack && metronomeActived) {

        nextKlack = timeNow + 60000/tempoSlider.elt.value;
        beatCount++;
        beatCount = beatCount % beatSlider.elt.value;

        beatCounter.elt.textContent = beatCount + 1;

        if (beatCount == 0) {
            randomTonality();

            if (plingActived) {
                // pling.play();
            }
            else  {
                // klack.play();
            }
        }
        else {
            // klack.play();
        }

    }

    // text(`${tempoSlider.value()} bpm`, centerX - 50, centerY + 150);
    // text(`${beatSlider.value()} beats`, centerX - 50, centerY + 220);
    
    // textSize(64);
    // text((beatCount+1), centerX + 190, centerY + 220);
    
}