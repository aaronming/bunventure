import { Deckable } from './Deckable.js';

export function Shop(shopCards) {
    Deckable.call(this);
    var self = this;

    self.shopLevel = 0;
    self.shopCards = ko.observableArray(shopCards);
    self.deck = ko.observableArray([]);

    self.levelUp = function() {
        if (self.shopLevel < 3) {
            self.shopLevel += 1;
            self.updateShopCards();
        }
    }

    self.updateShopCards = function() {
        var availableCards = self.shopCards.remove(function (item) {
            return parseInt(item.level) == self.shopLevel;
        });

        self.deck(self.deck().concat(availableCards));
    }

    self.levelUp();
}