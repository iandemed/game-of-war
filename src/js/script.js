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

        /* After some reading on probablity in card games, I found
        that as long as the shuffle was perfectly random, the order
        in which the cards are dealt is irrelevant. For now, I will
        use a naive split of the cards to "deal" them out to a new
        player */

        let dealtCards = cardArray.splice(this.length/2, this.length/2)
        this.length /=2

        return dealtCards

    }
}

class Player{
    constructor(name, deck){
        this.name = name
        this.deck = deck
    }

    remainingCards(){
        return this.deck.length
    }
}

class Game{
    constructor(){
        this.players = []
        war = false
    }

    addPlayer(newPlayer) {
        if (this.players.length < 2){
            this.players.push(newPlayer)
        }
    }

    playRound(){
        let player1Draw = this.players[0].deck.draw()
        let player2Draw = this.players[1].deck.draw()
        
        if (player1Draw.score > player2Draw.score){
            console.log(`${this.players[0].name} wins with a ${player1Draw.rank} of ${player1Draw.suit}s`)
            console.log(`${this.players[1].name} drew a ${player2Draw.rank} of ${player2Draw.suit}s`)
        } else if (player1Draw.score < player2Draw.score){
            console.log(`${this.players[1].name} wins with a ${player2Draw.rank} of ${player2Draw.suit}s`)
            console.log(`${this.players[0].name} drew a ${player1Draw.rank} of ${player1Draw.suit}s`)
        } else {
            console.log(`Both players drew a ${player1Draw.rank} of ${player1Draw.suit}`)
            console.log(`THIS MEANS WAR!`)
        }
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

let gameOfWar = new Game()

let deck1 = new Deck(cardArray)
deck1.shuffle()

let deck2 = new Deck(deck1.split())


let travis = new Player("Travis", deck1)
gameOfWar.addPlayer(travis)

let ian = new Player("Ian", deck2)
gameOfWar.addPlayer(ian)

gameOfWar.playRound()

console.log(ian.deck.length)