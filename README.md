# Game of War

War is a card game played between two players with a traditional 52 card deck of playing cards. Suits are ignored and aces are high.

## Rules

1. Shuffle the deck and deal 26 cards to each player
1. Each player turns one of their cards face-up, the person with the higher value wins and puts both cards on the bottom of their deck in a random order 
1. If the players have cards of the same value War is declared. The players put the top card of their deck face-down and then turn the next card of their deck face-up. The player with the higher card takes all 6 cards. If the players turn over cards of the same value, War is declared again and the process continues until one player wins.
1. If a player has fewer than three cards remaining in their deck and War is declared, they use the last card in their deck for the purpose of determining the winner
1. A player wins if they have all 52 cards in their deck

## Notes on Randomization

In order to imporve the randomization within the game, I implemented the ["Fisher-Yates shuffle algorithm"](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle) in two instances:

1. When shuffling the deck, and 
1. when new cards are added to the bottom of the deck

Splitting the deck does not decrease randomness and is equivalent to dealing cards to individual players one-by-one, therefore I used a naive split of the deck since a naive split requires very little computation or code. The rules for putting cards on the bottom of the bottom of a players deck after a round is played are fairly ambigious. I decided to randomize the order in order to prevent a cyclic pattern from being formed and having the game stuck in an infinite loop. It is not computationally burdensome to implement the Fisher-Yates shuffle on cards being added and it ensures that the games are purely random.


## [License](LICENSE)

All software code is licensed under GNU GPLv3
