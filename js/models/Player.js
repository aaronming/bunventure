import { Deckable } from './Deckable.js';
import { Classes, Stats } from './Classes.js';

export function Player(index, playerClass, stats, skills) {
    Deckable.call(this);
    var self = this;

    self.index = index;
    self.myClass = playerClass;
    self.classStats = stats
    self.classSkills = skills;
    self.level = 0;
    self.stats = {};
    self.skillBook = Array.from(skills);
    self.techDeck = ko.observableArray([]);
    self.learnedTech = ko.observableArray([]);
    self.deck = ko.observableArray([]);
    self.playDeck = ko.observableArray([]);
    self.hand = ko.observableArray([]);
    self.discard = ko.observableArray([]);
    self.gold = 10;
    self.curHP = 0;
    self.inventory = ko.observableArray([]);

    var updateStats = function() {
        self.stats = new Stats(self.classStats[self.level - 1]);
    }

    var updateTechDeck = function() {
        while (self.skillBook.length != 0 && self.skillBook[0].level == self.level) {
            var skill = self.skillBook.shift();
            self.techDeck.push(skill);
        }
    }

    self.minDeckSize = ko.pureComputed(function() {
        return parseInt(self.stats.hand) * 3;
    }, this);

    self.buySkill = function(tech, ev) {
        self.addCard(tech, self.deck);
    }

    self.removeSkill = function(tech, ev, index) {
        if (tech.myClass != "General") {
            self.addCard(tech, self.techDeck);
            self.removeCard(tech, self.learnedTech);
            self.removeCard(tech, self.deck);
        } else {
            self.deck.splice(index(), 1);
        }
    }

    self.learnTech = function(tech, ev) {
        self.removeCard(tech, self.techDeck);
        self.addCard(tech, self.learnedTech);
        self.addCard(tech, self.deck);
    }

    self.buyItem = function(item) {
        self.inventory.push(item);
    }

    self.useItem = function(item) {
        
    }

    self.prepareDeckForBattle = function() {
        self.playDeck(self.deck());
        self.shuffleDeck(self.playDeck);
        self.hand([]);
        self.discard([]);
    }

    self.drawCard = function(num) {
        var pDeck = self.playDeck();
        var dDeck = self.discard();
        var hDeck = self.hand();

        if (pDeck.length < num) {
            self.shuffleDeck(dDeck);
            self.playDeck(pDeck.concat(dDeck));
            self.discard([]);
        }

        self.hand(hDeck.concat(self.playDeck.splice(0, num)));
    }

    self.discardCard = function(card) {
        self.discard.push(self.hand.remove(card));
    }

    self.discardHand = function() {
        self.discard.push(self.hand.removeAll());
    }

    self.shuffleDeck = function(deck) {
        if (deck == undefined) deck = self.deck;
        var j, x, i;
        for (i = deck.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = deck[i];
            deck[i] = deck[j];
            deck[j] = x;
        }
        return deck;
    }

    self.heal = function(amount) {
        var maxHP = self.stats.hp;
        amount = amount == undefined ? maxHP : amount;

        if (amount + self.curHP > maxHP) self.curHP = maxHP;
        else self.curHP += amount;
    }

    self.levelUp = function() {
        self.level += 1;
        updateStats();
        updateTechDeck();
    }

    self.addGold = function(amount) {
        self.gold += amount;
        return self.gold;
    }

    self.addInventory = function(item) {
        inventory.push(item);
    }

    self.levelUp();
    self.heal();
};