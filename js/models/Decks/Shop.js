import { Deckable } from './Deckable.js';
import { SkillCard } from '../Cards/SkillCard.js';

export function Shop(shopData) {
    Deckable.call(this);
    var self = this;

    var shopCardCount = 12;
    self.shopCards = ko.observableArray([]);
    self.deck = ko.observableArray([]);
    self.discard = ko.observableArray([]);
    self.playerRef;
    self.availShopCards = null;
    self.playerDeck = null
    self.buyDeck = ko.observableArray([]);
    self.sellDeck = ko.observableArray([]);
    self.buyDeckCost = ko.observable(0);
    self.sellDeckCost = ko.observable(0);

    self.transactionTotal = ko.pureComputed(function() {
        return self.buyDeckCost() + self.sellDeckCost();
    });

    function initializeShop() {
        // get only initial actions for now
        var shopCards = shopData.slice(1, 7);
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
            self.discard([]);
        }

        self.shopCards(self.deck.splice(0, shopCardCount));
    }

    self.setup = function(player) {
        reset();
        if (self.shopCards().length == 0) self.replenishShop();
        self.playerRef = player;
        self.availShopCards = ko.observableArray((Array.from(self.shopCards())));
        self.playerDeck = ko.observableArray((Array.from(self.playerRef.shopSkills())));
    }

    self.buySkill = function(tech, ev, index) {
        self.addCard(tech, self.buyDeck);
        self.buyDeckCost(self.buyDeckCost() - parseInt(tech.price));
        self.availShopCards.splice(index(), 1);
    }

    self.unbuySkill = function(tech, ev, index) {
        self.addCard(tech, self.availShopCards);
        self.buyDeckCost(self.buyDeckCost() + parseInt(tech.price));
        self.buyDeck.splice(index(), 1);
    }

    self.sellSkill = function(tech, ev, index) {
        self.addCard(tech, self.sellDeck);
        self.sellDeckCost(self.sellDeckCost() + Math.floor(parseInt(tech.price)/2));
        self.playerDeck.splice(index(), 1);
    }

    self.unsellSkill = function(tech, ev, index) {
        self.addCard(tech, self.playerDeck);
        self.sellDeckCost(self.sellDeckCost() - Math.floor(parseInt(tech.price)/2));
        self.sellDeck.splice(index(), 1);
    }

    self.confirmTransaction = function() {
        self.shopCards(Array.from(self.availShopCards()));
        self.addCards(self.buyDeck(), self.playerDeck);
        self.discard(self.discard().concat(self.sellDeck()));
        return self.playerDeck();
    }

    function reset() {
        self.playerRef = null;
        self.availShopCards = null;
        self.playerDeck = null;
        self.buyDeck([]);
        self.sellDeck([]);
        self.buyDeckCost(0);
        self.sellDeckCost(0);
    }

    initializeShop();
}