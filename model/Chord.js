const notes = "ABCDEFG"; 

class Chord {
    constructor(_elt, _imgElt) {
        this.elt = _elt;
        this.imgElt = _imgElt;

        this.name = "D";
        this.alteration = "♭";
        this.mode = "Δ";
    }

    setMaj7() {
        this.mode = 'Δ';
    }

    setDominant() {
        this.mode = '7';
    }

    setMinor() {
        this.mode = '-7';
    }

    setSemiDism() {
        this.mode = 'ø';
    }

    setAug() {
        this.mode = '7♯5';
    }

    setMinorMaj7() {
        this.mode = '-Δ';
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
            return;
        }

        if (_name == 'D' && _alteration == 1) {
            this.name = 'E';
            this.alteration = "♭"; 
            return;
        }

        if (_name == 'G' && _alteration == -1) {
            this.name = 'F';
            this.alteration = "♯"; 
            return;
        }

        if (_name == 'G' && _alteration == 1) {
            this.name = 'A';
            this.alteration = "♭"; 
            return;
        }

        if (_name == 'A' && _alteration == 1) {
            this.name = 'B';
            this.alteration = "♭"; 
            return;
        }

        // semitones E - F && B - C
        if (_name == 'E' && _alteration == 1) {
            this.name = 'F';
            this.alteration = ""; 
            return;
        }
        if (_name == 'F' && _alteration == -1) {
            this.name = 'E';
            this.alteration = ""; 
            return;
        }
        if (_name == 'B' && _alteration == 1) {
            this.name = 'C';
            this.alteration = ""; 
            return;
        }
        if (_name == 'C' && _alteration == -1) {
            this.name = 'B';
            this.alteration = ""; 
            return;
        }

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
        this.name = _chord.name;
        this.alteration = _chord.alteration;
        this.mode = _chord.mode;
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

    }

    draw() {
        this.elt.innerHTML = this.name+"<sup>"+this.alteration+"</sup><sub>"+this.mode+"</sub>";

        let auxAlteration = "";
        if (this.alteration == "♭") {
            auxAlteration = "b";
        }
        else if (this.alteration == "♯") {
            auxAlteration = "is";
        }

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

        if (this.name == "E" && this.alteration == "♭") {
            prevName = "D";
            nextName = "DisE";
        }
        else if (this.name == "A" && this.alteration == "♭") {
            prevName = "G";
            nextName = "GisA";
        }
        else if (this.name == "B" && this.alteration == "♭") {
            prevName = "A";
            nextName = "AisB";
        }
        else {
            prevName = this.name;
            nextName = this.name;
        }

        let imgChordName = prevName + "/" + nextName + auxAlteration + auxChord + ".gif";
        this.imgElt.src = "https://www.musiklehre.at/all_piano_chords/img/"+imgChordName;
    }
}