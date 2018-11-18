import { Deckable } from './Deckable.js';
import { Stats } from './Classes.js';

export function Player(index, playerClass, stats, skills) {
    Deckable.call(this);
    var self = this;

    self.index = index;
    self.myClass = playerClass;
    self.classStats = stats
    self.classSkills = skills;
    self.level = ko.observable(0);
    self.stats = {};
    self.skillBook = Array.from(skills);
    self.techDeck = ko.observableArray([]);
    self.passives = ko.observableArray([]);
    self.learnedTech = ko.observableArray([]);
    self.shopSkills = ko.observableArray([]);
    self.playDeck = ko.observableArray([]);
    self.hand = ko.observableArray([]);
    self.discard = ko.observableArray([]);
    self.gold = ko.observable(10);
    self.curHP = ko.observable(0);
    self.inventory = ko.observableArray([]);

    var updateStats = function() {
        self.stats = new Stats(self.classStats[self.level() - 1]);
    }

    var updateTechDeck = function() {
        while (self.skillBook.length != 0 && self.skillBook[0].level == self.level()) {
            var skill = self.skillBook.shift();
            self.techDeck.push(skill);
        }
    }

    self.allSkills = ko.pureComputed(function() {
        return self.passives().concat(self.deck());
    });

    self.deck = ko.pureComputed(function() {
        return self.learnedTech().concat(self.shopSkills());
    });

    self.minDeckSize = ko.pureComputed(function() {
        return parseInt(self.stats.hand) * 3;
    }, this);

    self.buySkill = function(tech, ev) {
        self.addCard(tech, self.shopSkills);
    }

    self.buySkills = function(techs, ev) {
        self.addCards(techs, self.shopSkills);
    }

    self.removeSkill = function(tech, ev, index) {
        if (tech.myClass == "General") {
            var genIndex = index() - (self.passives().length + self.learnedTech().length);
            self.shopSkills.splice(genIndex, 1);
        } else {
            self.addCard(tech, self.techDeck);
            if (tech.type == "Passive") {
                self.removeCard(tech, self.passives);
            } else {
                self.removeCard(tech, self.learnedTech);
            }
        }
    }

    self.learnTech = function(tech, ev) {
        self.removeCard(tech, self.techDeck);
        if (tech.type == "Passive") {
            self.addCard(tech, self.passives);
        } else {
            self.addCard(tech, self.learnedTech);
        }
    }

    self.buyItem = function(item) {
        self.inventory.push(item);
    }

    self.useItem = function(item) {
        
    }

    self.prepareDeckForBattle = function() {
        self.playDeck(self.deck());
        self.shuffleDeck(self.playDeck());
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

    self.heal = function(amount) {
        var maxHP = self.stats.hp;
        amount = amount == undefined ? maxHP : amount;

        var newHP = self.curHP() + amount;
        if (newHP > maxHP) newHP = maxHP;
        self.curHP(newHP);
    }

    function levelChange(amount) {
        var newLevel = self.level() + amount;
        if (newLevel > 5) newLevel = 5;
        else if (newLevel < 1) newLevel = 1;
        self.level(newLevel);
        updateStats();
        updateTechDeck();
    }

    self.levelUp = function() {
        levelChange(1);
    }
    
    self.levelDown = function() {
        levelChange(-1);
    }

    self.addGold = function(amount) {
        var newGold = self.gold() + amount;
        self.gold(newGold);
        return newGold;
    }

    self.addInventory = function(item) {
        inventory.push(item);
    }

    self.levelUp();
    self.heal();
};