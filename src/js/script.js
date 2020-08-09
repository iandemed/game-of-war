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
        this.gameOn = true
    }

    addPlayer(newPlayer) {
        if (this.players.length < 2){
            this.players.push(newPlayer)
        }
    }

    playRound(){

        let player1Draw = [this.players[0].deck.draw()]
        let player2Draw = [this.players[1].deck.draw()]
        
        return this.compareCards(player1Draw, player2Draw)

    } 

    /* Currently, I want this function to be as general as possible so that we can reuse it, therefore
    it has to take arrays of cards rather than individual cards */
    compareCards(drawnCards1, drawnCards2)
    {
        /* Have two seperate indexes to account for the case when players have gone to war and have 
        unequal piles of cards */
        let i = drawnCards1.length - 1
        let j = drawnCards2.length - 1

        let compCard1 = drawnCards1[i]
        let compCard2 = drawnCards2[j]

        if (compCard1.score > compCard2.score){
            
            this.players[0].deck.addCards([drawnCards1, drawnCards2].flat())
            
            console.log(`${this.players[0].name} wins with a ${compCard1.rank} of ${compCard1.suit}s`)
            console.log(`${this.players[1].name} drew a ${compCard2.rank} of ${compCard2.suit}s`)

            

        } else if (compCard1.score < compCard2.score){
            
            this.players[1].deck.addCards([drawnCards1, drawnCards2].flat())
            
            console.log(`${this.players[1].name} wins with a ${compCard2.rank} of ${compCard2.suit}s`)
            console.log(`${this.players[0].name} drew a ${compCard1.rank} of ${compCard1.suit}s`)

        } else {
            console.log(`Both players drew a ${compCard1.rank}!`)
            console.log(`THIS MEANS WAR!`)

            
            this.goToWar(drawnCards1, drawnCards2)
        }
    }

    goToWar(card1, card2){
        
        let warPile1 = []
        let warPile2 = []
        
        /* In War, the player uses their last remaining card if they are unable to go to war */
        switch (this.players[0].remainingCards()){
            case 0:
                warPile1.push(...card1)
                break
            case 1:
                warPile1.push(...card1, this.players[0].deck.draw())
                break
            default:
                warPile1.push(...card1, this.players[0].deck.draw(), this.players[0].deck.draw())
        }

        switch(this.players[1].remainingCards()){
            case 0:
                warPile2.push(...card2)
                break
            case 1:
                warPile2.push(...card2, this.players[1].deck.draw())
                break
            default:
                warPile2.push(...card1, this.players[1].deck.draw(), this.players[1].deck.draw())
        }
        
        this.compareCards(warPile1, warPile2)
    }

    play(){

        let msg = ""

        while (this.gameOn){
            this.playRound()

            console.log(`${this.players[0].name} has ${this.players[0].remainingCards()}`)
            console.log(`${this.players[1].name} has ${this.players[1].remainingCards()}`)

            if(!confirm("Are you ready for the next round?")){
                this.gameOn = false;
            }
        }

        console.log("Thank you for playing!")
    }
}


// Initialize the necessary arrays to create the deck
let suits = ['Spade', "Club", "Heart", "Diamond"]

let cardRanks = ['Two', 'Three', 'Four', 'Five', 
                'Six', 'Seven', 'Eight', 'Nine', 
                'Ten', 'Jack', 'Queen','King','Ace']              


let cardArray = [] 
 
// Create an array for a full 52 deck of cards
for (let suit of suits){
    for (let i = 0; i < cardRanks.length; i++){
        cardArray.push(new Card(suit, cardRanks[i], i+2))
    }
}

/* Create the two decks that the players will use */

let deck1 = new Deck(cardArray)
deck1.shuffle()

let deck2 = new Deck(deck1.split())

/* Initialize the game */

let gameOfWar = new Game()

/* Create player 1 and give them the appropriate deck*/
let playerName = prompt("What is your name Player 1?")
let p1 = new Player(playerName, deck1)
gameOfWar.addPlayer(p1)

/* Create player 2 and give them the appropriate deck*/
playerName = prompt("What is your name Player 2?")
let p2 = new Player(playerName, deck2)
gameOfWar.addPlayer(p2)

if (confirm("Are you ready to begin?\nHit cancel at any time to end the match")){
    gameOfWar.play()
} else {
    console.log("Come back when you are ready!")
}