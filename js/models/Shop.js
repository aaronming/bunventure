import { Deckable } from './Deckable.js';
import { SkillCard } from './SkillCard.js';

export function Shop(shopCards) {
    Deckable.call(this);
    var self = this;

    var shopCardCount = 12;
    self.shopCards = ko.observableArray([]);
    self.deck = ko.observableArray([]);
    self.discard = ko.observableArray([]);
    self.availShopCards = ko.observableArray([]);
    self.playerDeck = ko.observableArray([]);
    self.buyDeck = ko.observableArray([]);
    self.sellDeck = ko.observableArray([]);
    self.buyDeckCost = ko.observable(0);
    self.sellDeckCost = ko.observable(0);

    self.initializeShop = function() {
        var deck = [];
        for (var i = 0; i < shopCards.length; i++) {
            var shopCard = shopCards[i];
            var count = shopCard.Count;
            for (var j = 0; j < count; j++) {
                deck.push(new SkillCard(shopCard));
            }
        }
        deck = self.shuffleDeck(deck);
        self.addCards(deck, self.deck);
        self.replenishShop();
    }

    self.replenishShop = function() {
        self.addCards(self.shopCards(), self.discard);
        if (self.deck().length < shopCardCount) {
            var discarded = self.shuffleDeck(self.discard());
            self.addCards(discarded, self.deck);
        }

        self.shopCards(self.deck.splice(0, shopCardCount));
    }

    self.setupMarket = function(playerCards) {
        self.availShopCards(self.shopCards());
        self.buyDeck([]);
        self.sellDeck([]);
        self.playerDeck(playerCards);
    }

    self.buySkill = function(tech, ev, index) {
        self.addCard(tech, self.buyDeck);
        self.buyDeckCost(self.buyDeckCost() + parseInt(tech.price));
        self.availShopCards.splice(index(), 1);
    }

    self.unbuySkill = function(tech, ev, index) {
        self.addCard(tech, self.availShopCards);
        self.buyDeckCost(self.buyDeckCost() - parseInt(tech.price));
        self.buyDeck.splice(index(), 1);
    }

    self.sellSkill = function(tech, ev, index) {
        self.addCard(tech, self.sellDeck);
        self.sellDeckCost(self.sellDeckCost() + parseInt(tech.price));
        self.playerDeck.splice(index(), 1);
    }

    self.unsellSkill = function(tech, ev, index) {
        self.addCard(tech, self.playerDeck);
        self.sellDeckCost(self.sellDeckCost() - parseInt(tech.price));
        self.sellDeck.splice(index(), 1);
    }

    self.initializeShop();
}