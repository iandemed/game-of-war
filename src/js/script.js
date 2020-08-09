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

    addCards(newCards){
        this.length += newCards.length
        this.cards.push(...newCards)
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
    }

    addPlayer(newPlayer) {
        if (this.players.length < 2){
            this.players.push(newPlayer)
        }
    }

    playRound(){
        let player1Draw = this.players[0].deck.draw()
        let player2Draw = this.players[1].deck.draw()
        
        this.compareCards(player1Draw, player2Draw)

    } 

    compareCards(card1, card2){
        if (card1.score > card2.score){
            console.log(`${this.players[0].name} wins with a ${card1.rank} of ${card1.suit}s`)
            console.log(`${this.players[1].name} drew a ${card2.rank} of ${card2.suit}s`)

            this.players[0].deck.addCards([card1, card2])

        } else if (card1.score < card2.score){
            console.log(`${this.players[1].name} wins with a ${card2.rank} of ${card2.suit}s`)
            console.log(`${this.players[0].name} drew a ${card1.rank} of ${card1.suit}s`)

            this.players[1].deck.addCards([card1, card2])
        } else {
            console.log(`Both players drew a ${card1.rank} of ${card1.suit}`)
            console.log(`THIS MEANS WAR!`)
        }
    }

    goToWar(card1, card2){
        let warPile1 = [card1, this.players[0].deck.draw, this.players[0].deck.draw]
        let warPile2 = [card, this.players[1].deck.draw, this.players[1].deck.draw]

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