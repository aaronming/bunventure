export function Deckable() {
    var self = this;

    // Deck Building
    self.addCard = function(card, deck) {
        deck.push(card);
    }

    self.removeCard = function(card, deck) {
        return deck.remove(card);
    }
}