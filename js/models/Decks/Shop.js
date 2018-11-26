import { Deckable } from './Deckable.js';
import { SkillCard } from '../Cards/SkillCard.js';

export function Shop(shopData, cardCount) {
    Deckable.call(this);
    var self = this;

    var shopCardCount = 12;
    self.cardCount = cardCount;
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
                deck.push(new SkillCard(shopCard, self.cardCount));
                self.cardCount += 1;
            }
        }
        deck = self.shuffleDeck(deck);
        self.addCards(deck, self.deck);
        self.replenishShop();
    }

    self.replenishShop = function() {
        self.addCards(self.shopCards(), self.discard);
        if (self.deck().length < shopCardCount) {
            var discarded = self.shuffleDeck(self.discard);
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

    self.buySkill = function(tech, ev) {
        var card = self.moveCard(tech, self.availShopCards, self.buyDeck);
        if (card) self.buyDeckCost(self.buyDeckCost() - parseInt(card.price));
    }

    self.unbuySkill = function(tech, ev) {
        var card = self.moveCard(tech, self.buyDeck, self.availShopCards);
        if (card) self.buyDeckCost(self.buyDeckCost() + parseInt(card.price));
    }

    self.sellSkill = function(tech, ev) {
        var card = self.moveCard(tech, self.playerDeck, self.sellDeck);
        if (card) self.sellDeckCost(self.sellDeckCost() + Math.floor(parseInt(card.price)/2));
    }

    self.unsellSkill = function(tech, ev) {
        var card = self.moveCard(tech, self.sellDeck, self.playerDeck);
        if (card) self.sellDeckCost(self.sellDeckCost() - Math.floor(parseInt(card.price)/2));
    }

    self.confirmTransaction = function() {
        self.shopCards(Array.from(self.availShopCards()));
        self.addCards(self.buyDeck(), self.playerDeck);
        self.discard(self.discard().concat(self.sellDeck()));
        self.playerRef.shopSkills(self.playerDeck());
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