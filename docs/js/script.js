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

    /* Allow for the drawing of multiple cards in order to consolidate
    code and to prevent working with large temporary arrays throughout the
    entire program */
    draws(n=1){
        this.length -= n
        return this.cards.splice(0,n)
    }

    addCards(newCards){
        this.length += newCards.length

        let j, temp = null

        // Implement the Fisher-Yates shuffle algorithm
        for (let i = newCards.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i+1))
            temp = newCards[i]
            newCards[i] = newCards[j]
            newCards[j] = temp
        }

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

    getScore(ind = 0){
        return this.deck.cards[ind].score
    }

    getSuit(ind=0){
        return this.deck.cards[ind].suit
    }

    getRank(ind=0){
        return this.deck.cards[ind].rank
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

    playRound(ind1 = 0, ind2 = 0){
        
        return this.compareCards(ind1,ind2)

    } 

    /* Currently, I want this function to be as general as possible so that we can reuse it, therefore
    it has to take arrays of cards rather than individual cards */
    compareCards(ind1, ind2)
    {

        /* Have two seperate indexes to account for the case when players have gone to war and have 
        unequal piles of cards */
        let p1Score = this.players[0].getScore(ind1)
        let p2Score = this.players[1].getScore(ind2)

        if (p1Score > p2Score){
            
            console.log(`${this.players[0].name} wins with a ${this.players[0].getRank(ind1)} of ${this.players[0].getSuit(ind1)}s`)
            console.log(`${this.players[1].name} drew a ${this.players[1].getRank(ind2)} of ${this.players[1].getSuit(ind2)}s`)

            this.players[0].deck.addCards([this.players[0].deck.draws(ind1+1), 
                                           this.players[1].deck.draws(ind2+1)].flat())
            
            

            

        } else if (p1Score < p2Score){
            
            console.log(`${this.players[1].name} wins with a ${this.players[1].getRank(ind2)} of ${this.players[1].getSuit(ind2)}s`)
            console.log(`${this.players[0].name} drew a ${this.players[0].getRank(ind1)} of ${this.players[0].getSuit(ind1)}s`)

            this.players[1].deck.addCards([this.players[0].deck.draws(ind1+1), 
                                           this.players[1].deck.draws(ind2+1)].flat())
                               

        } else {
            console.log(`Both players drew a ${this.players[0].getRank()}!`)
            console.log(`THIS MEANS WAR!`)

            
           this.goToWar(ind1, ind2)
        }
    }

    goToWar(ind1, ind2){

        /* In War, the player uses their last remaining card if they are unable to go to war */
        /* Adding 1 to the index represents the number of cards we are attempting to draw */
        if (this.players[0].remainingCards() - (ind1+1) === 1){
            ind1 += 1;
        } else if (this.players[0].remainingCards() - (ind1+1) >= 2){
            ind1 += 2;
        }

        if (this.players[1].remainingCards() - (ind2+1) === 1){
            ind2 += 1;
        } else if (this.players[1].remainingCards() - (ind2+1) >= 2){
            ind2 += 2;
        }

        this.compareCards(ind1, ind2)
    }

    play(){

        while (this.gameOn){
            
            this.playRound()

            console.log(`${this.players[0].name} has ${this.players[0].remainingCards()} cards remaining`)
            console.log(`${this.players[1].name} has ${this.players[1].remainingCards()} cards remaining`)
            
            if(!confirm("Are you ready for the next round?")){
                this.gameOn = false;
            }

            if(this.players[0].remainingCards() === 0){
                console.log(`${this.players[1].name} wins!`)
                this.gameOn = false;
            }

            if(this.players[1].remainingCards() === 0){
                console.log(`${this.players[0].name} wins!`)
                this.gameOn = false;
            }
        }

        console.log("Thank you for playing! Refresh the page to play again!")
    }
}


// Initialize the necessary arrays to create the deck
let suits = ['Spade', "Club", "Heart", "Diamond"]

cardRanks = ['Two', 'Three', 'Four', 'Five', 
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
//let playerName = "Ian"
let p1 = new Player(playerName, deck1)
gameOfWar.addPlayer(p1)

/* Create player 2 and give them the appropriate deck*/
 playerName = prompt("What is your name Player 2?")
//playerName = "Dillon"
let p2 = new Player(playerName, deck2)
gameOfWar.addPlayer(p2)


if (confirm("Are you ready to begin?\nHit cancel at any time to end the match")){
    gameOfWar.play()
} else {
    console.log("Come back when you are ready!")
}