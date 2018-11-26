export function Deckable() {
    var self = this;

    self.addCard = function(card, deckObservable, unshift) {
        if (unshift) deckObservable.unshift(card);
        else deckObservable.push(card);
    }

    self.addCards = function(cards, deckObservable) {
        deckObservable.push.apply(deckObservable, cards);
    }

    self.findCardIndex = function(card, deckObservable) {
        if (card) {
            return deckObservable().findIndex(function(x) {
                if (x.id) return card.id === x.id;
                else return card.name === x.name;
            });
        } else {
            return -1;
        }
    }

    self.removeCard = function(card, deckObservable, shift) {
        if (card) {
            var index = self.findCardIndex(card, deckObservable);
            if (index >= 0) return deckObservable.splice(index, 1)[0];
            else return null;
        } else {
            if (shift) return deckObservable.unshift();
            else return deckObservable.pop();
        }
    }

    self.moveCard = function(card, fromDeck, toDeck, shiftFromDeck, unshiftToDeck) {
        var removedCard = self.removeCard(card, fromDeck, shiftFromDeck);
        if (removedCard) {
            self.addCard(removedCard, toDeck, unshiftToDeck);
            return removedCard;
        }

        return null;
    }

    self.moveAllCards = function(fromDeck, toDeck) {
        var removedCards = fromDeck.removeAll();
        self.addCards(removedCards, toDeck);
    }

    self.shuffleDeck = function(deck) {
        deck = ko.isObservableArray(deck) ? deck() : deck;
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