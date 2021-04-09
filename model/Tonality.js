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
