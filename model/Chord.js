const notes = "ABCDEFG"; 

class Chord {
    constructor(_elt, _imgElt) {
        this.elt = _elt;
        this.imgElt = _imgElt;

        this.name = "D";
        this.alteration = "♭";
        this.mode = "Δ";
        this.semitone = -8;

        this.semitoneTo3 = 4;
        this.semitoneTo5 = 7;
        this.semitoneTo7 = 11;
    }

    setMaj7() {
        this.mode = 'Δ';
        this.semitoneTo3 = 4;
        this.semitoneTo5 = 7;
        this.semitoneTo7 = 11;
    }

    setDominant() {
        this.mode = '7';
        this.semitoneTo3 = 4;
        this.semitoneTo5 = 7;
        this.semitoneTo7 = 10;
    }

    setMinor() {
        this.mode = '-7';
        this.semitoneTo3 = 3;
        this.semitoneTo5 = 7;
        this.semitoneTo7 = 10;
    }

    setSemiDism() {
        this.mode = 'ø';
        this.semitoneTo3 = 3;
        this.semitoneTo5 = 6;
        this.semitoneTo7 = 10;
    }

    setAug() {
        this.mode = '7♯5';
        this.semitoneTo3 = 4;
        this.semitoneTo5 = 8;
        this.semitoneTo7 = 10;
    }

    setMinorMaj7() {
        this.mode = '-Δ';
        this.semitoneTo3 = 3;
        this.semitoneTo5 = 7;
        this.semitoneTo7 = 11;
    }

    clearAudio() {
        audioNotes[this.semitone].audio.pause();
        audioNotes[this.semitone + this.semitoneTo3].audio.pause();
        audioNotes[this.semitone + this.semitoneTo5].audio.pause();
        audioNotes[this.semitone + this.semitoneTo7].audio.pause();

        audioNotes[this.semitone].audio.currentTime = 0;
        audioNotes[this.semitone + this.semitoneTo3].audio.currentTime = 0;
        audioNotes[this.semitone + this.semitoneTo5].audio.currentTime = 0;
        audioNotes[this.semitone + this.semitoneTo7].audio.currentTime = 0;
    }

    updateVolume() {

        let volume = backtrackVolumenSlider.value / 100;

        audioNotes[this.semitone].audio.volume = volume;
        audioNotes[this.semitone + this.semitoneTo3].audio.volume = volume;
        audioNotes[this.semitone + this.semitoneTo5].audio.volume = volume;
        audioNotes[this.semitone + this.semitoneTo7].audio.volume = volume;

    }

    play() {

        if (backTrack.checked) {

            audioNotes[this.semitone].audio.play();
            audioNotes[this.semitone + this.semitoneTo3].audio.play();
            audioNotes[this.semitone + this.semitoneTo5].audio.play();
            audioNotes[this.semitone + this.semitoneTo7].audio.play();
        }

    }

    setRandomMode() {
        
        if (isThereAnyChordSelected()) {

            let randChord;
            do {
                randChord = Math.floor(Math.random() * 6)
            }
            while(!canSetMode(randChord));

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

    setNote(_name, _alteration) {
        if (_name == 'C' && _alteration == 1) {
            this.name = 'D';
            this.alteration = "♭";
            this.semitone = -8;
            return;
        }

        if (_name == 'D' && _alteration == 1) {
            this.name = 'E';
            this.alteration = "♭"; 
            this.semitone = -6;
            return;
        }

        if (_name == 'G' && _alteration == -1) {
            this.name = 'F';
            this.alteration = "♯";
            this.semitone = -3;
            return;
        }

        if (_name == 'G' && _alteration == 1) {
            this.name = 'A';
            this.alteration = "♭";
            this.semitone = -1;
            return;
        }

        if (_name == 'A' && _alteration == 1) {
            this.name = 'B';
            this.alteration = "♭";
            this.semitone = 1;
            return;
        }

        // semitones E - F && B - C
        if (_name == 'E' && _alteration == 1) {
            this.name = 'F';
            this.alteration = "";
            this.semitone = -4;
            return;
        }
        if (_name == 'F' && _alteration == -1) {
            this.name = 'E';
            this.alteration = ""; 
            this.semitone = -5;
            return;
        }
        if (_name == 'B' && _alteration == 1) {
            this.name = 'C';
            this.alteration = ""; 
            this.semitone = -9;
            return;
        }
        if (_name == 'C' && _alteration == -1) {
            this.name = 'B';
            this.alteration = ""; 
            this.semitone = 2;
            return;
        }

        let semi;
        switch (_name) {
            case "A":
                semi = 0;
                break;
            case "B":
                semi = 2;
                break;
            case "C":
                semi = -9;
                break;
            case "D":
                semi = -7;
                break;
            case "E":
                semi = -5;
                break;
            case "F":
                semi = -4;
                break;
            case "G":
                semi = -2;
                break;
        }

        this.semitone = semi + _alteration;
        
        this.name = _name;
        if (_alteration == 1) {
            this.alteration = "♯"; 
        }
        else if (_alteration == 0) {
            this.alteration = ""; 
        }
        else if (_alteration == -1) {
            this.alteration = "♭"; 
        }
    }

    setRandomNote() {
        this.setNote(
            notes.charAt(Math.floor(Math.random() * notes.length)),
            Math.floor(Math.random() * 3) - 1
        );
    }

    setChord(_chord) {
        if (loadedSounds) {
            this.clearAudio();
        }

        this.name = _chord.name;
        this.alteration = _chord.alteration;
        this.mode = _chord.mode;
        this.semitone = _chord.semitone;

        this.semitoneTo3 = _chord.semitoneTo3;
        this.semitoneTo5 = _chord.semitoneTo5;
        this.semitoneTo7 = _chord.semitoneTo7;
    }

    setRandomChord() {
        this.setRandomNote();
        this.setRandomMode();
    }

    setNextFifthChord() {
        let alterationNum = 0;
        if (this.alteration == "♭") {
            alterationNum = -1;
        }
        else if (this.alteration == "♯") {
            alterationNum = 1;
        }

        let desiredSemitone = getSemitone(this.name, alterationNum) + 5;
        desiredSemitone = desiredSemitone % 12;

        let nextName;
        let nextAlteration;

        switch (desiredSemitone) {
            case 0:
                nextName = 'A';
                nextAlteration = 0;
                break;
            case 1:
                nextName = 'B';
                nextAlteration = -1;
                break;
            case 2:
                nextName = 'B';
                nextAlteration = 0;
                break;
            case 3:
                nextName = 'C';
                nextAlteration = 0;
                break;
            case 4:
                nextName = 'C';
                nextAlteration = 1;
                break;
            case 5:
                nextName = 'D';
                nextAlteration = 0;
                break;
            case 6:
                nextName = 'E';
                nextAlteration = -1;
                break;
            case 7:
                nextName = 'E';
                nextAlteration = 0;
                break;
            case 8:
                nextName = 'F';
                nextAlteration = 0;
                break;
            case 9:
                nextName = 'F';
                nextAlteration = 1;
                break;
            case 10:
                nextName = 'G';
                nextAlteration = 0;
                break;
            case 11:
                nextName = 'G';
                nextAlteration = 1;
                break;
        }

        this.setNote(nextName, nextAlteration);
        this.setRandomMode();
    }

    draw() {
        
        let desiredSemitone = this.semitone + parseInt(pitch.value);
        desiredSemitone += 12;
        desiredSemitone %= 12;
        desiredSemitone -= 12;

        let desiredName;
        let desiredAlteration;

        if (desiredSemitone < -9) {
            desiredSemitone += 12;
        }

        switch (desiredSemitone) {
            case 0:
                desiredName = 'A';
                desiredAlteration = 0;
                break;
            case 1:
                desiredName = 'B';
                desiredAlteration = -1;
                break;
            case 2:
                desiredName = 'B';
                desiredAlteration = 0;
                break;
            case -9:
                desiredName = 'C';
                desiredAlteration = 0;
                break;
            case -8:
                desiredName = 'D';
                desiredAlteration = -1;
                break;
            case -7:
                desiredName = 'D';
                desiredAlteration = 0;
                break;
            case -6:
                desiredName = 'E';
                desiredAlteration = -1;
                break;
            case -5:
                desiredName = 'E';
                desiredAlteration = 0;
                break;
            case -4:
                desiredName = 'F';
                desiredAlteration = 0;
                break;
            case -3:
                desiredName = 'F';
                desiredAlteration = 1;
                break;
            case -2:
                desiredName = 'G';
                desiredAlteration = 0;
                break;
            case -1:
                desiredName = 'A';
                desiredAlteration = -1;
                break;
        }

        let desiredAuxAlteration = "";
        let auxAlteration = "";
        if (desiredAlteration == -1) {
            auxAlteration = "b";
            desiredAuxAlteration = "♭";
        }
        else if (desiredAlteration == 1) {
            auxAlteration = "is";
            desiredAuxAlteration = "♯";
        }

        this.elt.innerHTML = desiredName+"<sup>"+desiredAuxAlteration+"</sup><sub>"+this.mode+"</sub>";

        let auxChord = "";
        if (this.mode == "Δ") {
            auxChord = "maj7";
        }
        else if (this.mode == "7") {
            auxChord = "7";
        }
        else if (this.mode == "-7") {
            auxChord = "m7";
        }
        else if (this.mode == "ø") {
            auxChord = "m7b5";
        }
        else if (this.mode == "7♯5") {
            auxChord = "7k5";
        }
        else if (this.mode == "-Δ") {
            auxChord = "mmaj7";
        }

        let prevName;
        let nextName;

        if (desiredName == "E" && desiredAlteration == -1) {
            prevName = "D";
            nextName = "DisE";
        }
        else if (desiredName == "A" && desiredAlteration == -1) {
            prevName = "G";
            nextName = "GisA";
        }
        else if (desiredName == "B" && desiredAlteration == -1) {
            prevName = "A";
            nextName = "AisB";
        }
        else {
            prevName = desiredName;
            nextName = desiredName;
        }

        let imgChordName = prevName + "/" + nextName + auxAlteration + auxChord + ".gif";
        this.imgElt.src = "https://www.musiklehre.at/all_piano_chords/img/"+imgChordName;
    }
}