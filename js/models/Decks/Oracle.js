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

    self.buySkill = function(tech, ev) {
        var card = self.moveCard(tech, self.availTechCards, self.buyDeck);
        if (card) self.buyDeckCost(self.buyDeckCost() + cost);
    }

    self.unbuySkill = function(tech, ev) {
        var card = self.moveCard(tech, self.buyDeck, self.availTechCards);
        if (card) self.buyDeckCost(self.buyDeckCost() - cost);
    }

    self.sellSkill = function(tech, ev) {
        var card = self.moveCard(tech, self.playerTechCards, self.sellDeck);
        if (card) self.sellDeckCost(self.sellDeckCost() + cost);
    }

    self.unsellSkill = function(tech, ev) {
        var card = self.moveCard(tech, self.sellDeck, self.playerTechCards);
        if (card) self.buyDeckCost(self.buyDeckCost() - cost);
    }

    self.confirmTransaction = function() {
        var player = self.playerRef;

        // forget skills
        var sellDeck = self.sellDeck();
        for (var i = 0; i < sellDeck.length; i++) {
            var skill = sellDeck[i];
            player.removeSkill(skill);
        }
        // learn skills
        var buyDeck = self.buyDeck();
        for (var i = 0; i < buyDeck.length; i++) {
            var skill = buyDeck[i];
            player.learnTech(skill);
        }
    }

    function reset() {
        self.playerRef = null;
        self.availTechCards = null;
        self.playerTechCards = null
        self.buyDeck = ko.observableArray([]);
        self.sellDeck = ko.observableArray([]);
        self.buyDeckCost(0);
        self.sellDeckCost(0);
    }
}