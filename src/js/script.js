console.log("hello!");




class Card{
    constructor(suit, rank, score){
        this.suit = suit
        this.rank = rank
        this.score = score
    }
}

class Deck{
    constructor(cards, length){
    this.cards = cards
    this.length = cards.length
    }

    draw(){
        let drawnCard = this.cards.splice(Math.floor(Math.random()*this.length),1)[0]
        this.length -= 1

        return drawnCard
    }
}

// Initialize the necessary arrays
let suits = ['Spade', "Club", "Heart", "Diamond"]

let cardRanks = ['Two', 'Three', 'Four', 'Five', 
                'Six', 'Seven', 'Eight', 'Nine', 
                'Ten', 'Jack', 'Queen','King','Ace']              


let cardArray = [] 
 

for (suit of suits){
    for (i = 0; i < cardRanks.length; i++){
        cardArray.push(new Card(suit, cardRanks[i], i+2))
    }
}