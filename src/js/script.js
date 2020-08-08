console.log("hello!");




class Card{
    constructor(suit, rank, score){
        this.suit = suit
        this.rank = rank
        this.score = score
    }
}

class Deck{
    constructor(cards){
    this.cards = cards
    this.length = cards.length
    }

    draw(){
        this.length -= 1
        return this.cards.shift()
    }

    // Implement the Fisher-Yates shuffle algorithm
    shuffle(){
        let j, temp = null
  
        for (let i = this.cards.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i+1))
          temp = this.cards[i]
          this.cards[i] = this.cards[j]
          this.cards[j] = temp
        }
    }

    split(){

        /* 
        After some reading on the probability in card games, I found
        that as long as the shuffle was perfectly random, the order in
        which the cards were dealt is irrelevant, for now, I assume a
        naive split of the cards
        */

        let dealtCards = cardArray.splice(this.length/2, this.length/2)
        this.length /= 2

        return dealtCards
    }
}

// Initialize the necessary arrays to create the deck
let suits = ['Spade', "Club", "Heart", "Diamond"]

let cardRanks = ['Two', 'Three', 'Four', 'Five', 
                'Six', 'Seven', 'Eight', 'Nine', 
                'Ten', 'Jack', 'Queen','King','Ace']              


let cardArray = [] 
 
// Create an array for a full 52 deck of cards
for (suit of suits){
    for (let i = 0; i < cardRanks.length; i++){
        cardArray.push(new Card(suit, cardRanks[i], i+2))
    }
}

let deck1 = new Deck(cardArray)
deck1.shuffle()


let testArray = deck1.deal()

console.log(deck1.length)
console.log(testArray)
