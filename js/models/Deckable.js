export function Deckable() {
    var self = this;

    // Deck Building
    self.addCard = function(card, deck) {
        deck.push(card);
    }

    self.addCards = function(cards, deck) {
        deck.push.apply(deck, cards);
    }

    // Removes ALL instances of card
    self.removeCard = function(card, deck) {
        return deck.remove(card);
    }

    self.shuffleDeck = function(deck) {
        var j, x, i;
        for (i = deck.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = deck[i];
            deck[i] = deck[j];
            deck[j] = x;
        }
        return deck;
    }
}