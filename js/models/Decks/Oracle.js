import { Deckable } from './Deckable.js';

export function Oracle() {
    Deckable.call(this);
    var self = this;

    var cost = -3;
    self.playerRef;
    self.availTechCards = null;
    self.playerTechCards = null
    self.buyDeck = ko.observableArray([]);
    self.sellDeck = ko.observableArray([]);
    self.buyDeckCost = ko.observable(0);
    self.sellDeckCost = ko.observable(0);

    self.transactionTotal = ko.pureComputed(function() {
        return self.buyDeckCost() + self.sellDeckCost();
    });

    self.setup = function(player) {
        reset();
        self.playerRef = player;
        self.availTechCards = ko.observableArray(Array.from(player.techDeck()));
        self.playerTechCards = ko.observableArray(Array.from(player.learnedSkills()));
    }

    self.buySkill = function(tech, ev, index) {
        self.addCard(tech, self.buyDeck);
        self.buyDeckCost(self.buyDeckCost() + cost);
        self.availTechCards.splice(index(), 1);
    }

    self.unbuySkill = function(tech, ev, index) {
        self.addCard(tech, self.availTechCards);
        self.buyDeckCost(self.buyDeckCost() - parseInt(tech.price));
        self.buyDeck.splice(index(), 1);
    }

    self.sellSkill = function(tech, ev, index) {
        self.addCard(tech, self.sellDeck);
        self.sellDeckCost(self.sellDeckCost() + cost);
        self.playerTechCards.splice(index(), 1);
    }

    self.unsellSkill = function(tech, ev, index) {
        self.addCard(tech, self.playerTechCards);
        self.sellDeckCost(self.sellDeckCost() - parseInt(tech.price));
        self.sellDeck.splice(index(), 1);
    }

    self.confirmTransaction = function() {
        self.shopCards(Array.from(self.availTechCards()));
        self.addCards(self.buyDeck(), self.playerTechCards);
        self.discard(self.discard().concat(self.sellDeck()));
        return self.playerTechCards();
    }

    function reset() {
        self.playerRef = null;
        self.availTechCards = null;
        self.playerTechCards = null
        self.buyDeck = ko.observableArray([]);
        self.sellDeck = ko.observableArray([]);
        self.buyDeckCost = ko.observable(0);
        self.sellDeckCost = ko.observable(0);
    }
}