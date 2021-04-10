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

let beatCount = 0;
let nextKlack = 0;
let metronomeActived = false;
let plingActived = true;

let metronomeCheck;
let plingCheck;

let fifthsCheck;
let fifthsActived = true;

let characters ='ABCDEFG';

/*
var notes = {
                "1C": new Howl({
                    urls: ["media/523-C.mp3"]
                }),
                "1Cs": new Howl({
                    urls: ["media/545-C-sharp.mp3"]
                }),
                "1D": new Howl({
                    urls: ["media/587-D.mp3"]
                }),
                "1Ds": new Howl({
                    urls: ["media/622-D-sharp.mp3"]
                }),
                "1E": new Howl({
                    urls: ["media/659-E.mp3"]
                }),
                "1F": new Howl({
                    urls: ["media/698-F.mp3"]
                }),
                "1Fs": new Howl({
                    urls: ["media/698-F-sharp.mp3"]
                }),
                "1G": new Howl({
                    urls: ["media/783-G.mp3"]
                }),
                "1Gs": new Howl({
                    urls: ["media/830-G-sharp.mp3"]
                }),
                "2A": new Howl({
                    urls: ["media/880-A.mp3"]
                }),
                "2As": new Howl({
                    urls: ["media/932-A-sharp.mp3"]
                }),
                "2B": new Howl({
                    urls: ["media/987-B.mp3"]
                }),
                "2C": new Howl({
                    urls: ["media/1046-C.mp3"]
                }),
                "2Cs": new Howl({
                    urls: ["media/1090-C-sharp.mp3"]
                }),
                "2D": new Howl({
                    urls: ["media/1174-D.mp3"]
                }),
                "2Ds": new Howl({
                    urls: ["media/1244-D-sharp.mp3"]
                }),
                "2E": new Howl({
                    urls: ["media/1318-E.mp3"]
                }),
                "2F": new Howl({
                    urls: ["media/1396-F.mp3"]
                }),
                "2Fs": new Howl({
                    urls: ["media/1396-F-sharp.mp3"]
                }),
                "2G": new Howl({
                    urls: ["media/1566-G.mp3"]
                }),
                "2Gs": new Howl({
                    urls: ["media/1660-G-sharp.mp3"]
                }),
                "3A": new Howl({
                    urls: ["media/1760-A.mp3"]
                }),
                "3As": new Howl({
                    urls: ["media/1864-A-sharp.mp3"]
                }),
                "3B": new Howl({
                    urls: ["media/1974-B.mp3"]
                })
            }
*/

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

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
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

    lastTonality.scale = 1;
    nextTonality.scale = 1;
    actualTonality.scale = 2;
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

    button = createButton('Next Chord');
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

    plingCheck = createCheckbox('Pling at 1st beat', plingActived);
    plingCheck.changed(function () {plingActived = !plingActived});
    
    fifthsCheck = createCheckbox('Fifths chords', fifthsActived);
    fifthsCheck.changed(function () {fifthsActived = !fifthsActived});

    
    nextTonality = new Tonality(characters.charAt(Math.floor(Math.random() * characters.length)),Math.floor(Math.random() * 3));
    actualTonality = new Tonality(characters.charAt(Math.floor(Math.random() * characters.length)),Math.floor(Math.random() * 3));
    randomTonality();
    randomTonality();
    randomTonality();

    tempoSlider = createSlider(40, 208, 80);
    tempoSlider.class('slider');

    beatSlider = createSlider(1, 8, 4);
    beatSlider.class('slider');
}
  
function draw() {

    background(255);
    textSize(20);

    let centerX = width/2;
    let centerY = height/2;
    
    let tonalityCenter = centerX - 50;
    lastTonality.draw(tonalityCenter - 150, centerY);
    actualTonality.draw(tonalityCenter, centerY);
    nextTonality.draw(tonalityCenter + 250, centerY);
    
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

    text(`${tempoSlider.value()} bpm`, centerX - 50, centerY + 150);
    text(`${beatSlider.value()} beats`, centerX - 50, centerY + 220);
    
    textSize(64);
    text((beatCount+1), centerX + 190, centerY + 220);


    
    /////
    button.position(centerX - 25, centerY - 75);
    metronomeCheck.position(centerX - 40, centerY + 120);
    plingCheck.position(centerX - 40, centerY + 140);
    fifthsCheck.position(centerX - 40, centerY - 140);
    tempoSlider.position(centerX - 50, centerY + 220);
    beatSlider.position(centerX - 50, centerY + 290);

    let checkX = width * 0.75;
    checkX = centerX + 350;

    majCheck.position(checkX, centerY - 100);
    dominantCheck.position(checkX, centerY - 50);
    minorCheck.position(checkX, centerY);
    semiDismCheck.position(checkX, centerY + 50);
    augCheck.position(checkX, centerY + 100);
    minorMaj7ChordCheck.position(checkX, centerY + 150);
}