class LeitnerSystem {
    init() {
        this.boxes = [[], [], [], [], []];
        
        this.currentCard = {};
        this.currentCardIndex = -1;
        this.currentBoxIndex = -1;
    }

    constructor() {
        this.init();
    }

    clearDeck() {
        this.init();
    }

    addCard(card) {
        this.boxes[0].push(card);
    }

    seeNextCard() {

        let nextCard = {};

        let nextCurrentCardIndex = this.currentCardIndex + 1;

        if (nextCurrentCardIndex < this.boxes[this.currentBoxIndex].length) {

            nextCard = this.boxes[this.currentBoxIndex][nextCurrentCardIndex];
        }
        else {

            for (let index = 0; index < this.boxes.length; index++) {
                let box = this.boxes[index];
                
                if (box.length > 0) {
                    // get minimun value 
                    let auxCard = box.find(card => card.box === 1 && card.updateBox);

                    if (auxCard === undefined) {
                        auxCard = box[0];
                    }

                    nextCard = this.boxes[this.currentBoxIndex][this.currentCardIndex];
                    break;
                }
            }
        }

        return nextCard;
    }

    nextCard() {

        this.currentCardStep();

        let nextCurrentCardIndex = this.currentCardIndex + 1;

        if (nextCurrentCardIndex < this.boxes[this.currentBoxIndex].length) {
            
            this.currentCardIndex = nextCurrentCardIndex;
            this.currentCard = this.boxes[this.currentBoxIndex][this.currentCardIndex];
        }
        else {

            this.updateMovingCards();
            this.closeDeck();
        }

        return this.currentCard;
    }

    currentCardStep() {
        console.log(this.boxes[0]);

        if (getAnswer()) {
            this.currentCard.correctAnswer = true;

            if (this.currentCard.box < this.boxes.length - 1) {
                this.currentCard.updateBox = true;
                this.currentCard.box++;
            }
            else {
                this.currentCard.updateBox = false;
            }

        } else {
            
            if (this.currentCard.box != 1) {
                this.currentCard.updateBox = true;
                this.currentCard.box = 1;
            }
            else {
                this.currentCard.updateBox = false;
            }
            
        }
    }

    updateMovingCards() {
        let box = this.boxes[this.currentBoxIndex];

        // 1. Get movingCards
        let correctCards = box.filter(card => card.box !== 1 && card.updateBox);
        let incorrectCards = box.filter(card => card.box === 1 && card.updateBox);
        
        // 2. Copy movingCards to its proper box
        this.boxes[0].push(...incorrectCards);
        const nextBoxArrayIndex = this.currentBoxIndex + 1;
        if (nextBoxArrayIndex < this.boxes.length) {
            this.boxes[nextBoxArrayIndex].push(...correctCards);
        }

        // 3. Erase movingCards from the currentBox
        this.boxes[this.currentBoxIndex] = box.filter(card => card.box === nextBoxArrayIndex);
    }

    closeDeck() {
        this.currentBoxIndex = this.boxes.findIndex(box => box.length > 0);

        this.currentCardIndex = 0;
        this.currentCard = this.boxes[this.currentBoxIndex][0];
    }
}
