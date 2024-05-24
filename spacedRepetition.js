class Flashcard {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
        this.box = 1;
        this.updateBox = false;
    }

    getAnswer() {
        let userAnswer = prompt(this.question);

        return userAnswer === this.answer;
    }
}

class LeitnerSystem {
    constructor() {
        this.boxes = [[], [], [], [], []];
    }

    addCard(card) {
        this.boxes[0].push(card);
    }

    studyBox(boxArrayIndex) {
        let box = this.boxes[boxArrayIndex];
        for (let i = 0; i < box.length; i++) {
            let card = box[i];

            if (card.getAnswer()) {

                if (card.box < this.boxes.length - 1) {
                    card.updateBox = true;
                    card.box++;
                }
                else {
                    card.updateBox = false;
                }

            } else {
                
                if (card.box != 1) {
                    card.updateBox = true;
                    card.box = 1;
                }
                else {
                    card.updateBox = false;
                }
                
            }
        }

        let correctCards = box.filter(card => card.box !== 1 && card.updateBox);
        let incorrectCards = box.filter(card => card.box === 1 && card.updateBox);
        
        this.boxes[0].push(...incorrectCards);
        if (boxArrayIndex + 1 < this.boxes.length) {
            this.boxes[boxArrayIndex+1].push(...correctCards);
        }

        this.boxes[boxArrayIndex] = box.filter(card => card.box === boxArrayIndex + 1);
    }

    study() {
        const MAX_TRIES = 3;
        for (let i = 0; i < MAX_TRIES; i++) {
            let firstNotEmptyBoxIndex = this.boxes.findIndex(box => box.length > 0);
            this.studyBox(firstNotEmptyBoxIndex);
        }
    }
}

// Usage
let system = new LeitnerSystem();
system.addCard(new Flashcard("What is the capital of Spain?", "Madrid"));
system.addCard(new Flashcard("What is the capital of France?", "Paris"));
system.addCard(new Flashcard("What is the capital of Catalunya?", "Barcelona"));
system.addCard(new Flashcard("What is the capital of Turkey?", "Ankara"));
system.study();
