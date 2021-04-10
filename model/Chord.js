class Chord {
    constructor(_elt, _imgElt) {
        this.elt = _elt;
        this.imgElt = _imgElt;
        this.name = "C";
        this.alteration = "";
        this.mode = "7♯5";
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

        let imgChordName = this.name + "/" + this.name + auxAlteration + auxChord + ".gif";
        this.imgElt.src = "https://www.musiklehre.at/all_piano_chords/img/"+imgChordName;
    }
}