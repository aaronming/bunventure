import { Deckable } from './Deckable.js';
import { Stats } from '../Classes.js';

export function Player(index, playerClass, stats, skills) {
    Deckable.call(this);
    var self = this;

    self.index = index;
    self.myClass = playerClass;
    self.classStats = stats
    self.classSkills = skills;
    self.level = ko.observable(0);
    self.stats = {};
    self.gold = ko.observable(10);
    self.curHP = ko.observable(0);
    self.inventory = ko.observableArray([]);

    // Deck
    self.skillBook = Array.from(skills); // Entire skills
    self.techDeck = ko.observableArray([]); // Available techniques to learn
    self.passives = ko.observableArray([]); // Learned Passives
    self.learnedTech = ko.observableArray([]); // Learn techniques
    self.shopSkills = ko.observableArray([]); // Bought skills from the shop (ie general)

    // Active
    self.activeDeck = ko.observableArray([]); // Player deck
    self.activeHand = ko.observableArray([]); // Player hand
    self.activePlay = ko.observableArray([]); // Player played cards
    self.activeDiscard = ko.observableArray([]); // Player discard
    self.activeExile = ko.observableArray([]); // Player exile

    var updateStats = function() {
        self.stats = new Stats(self.classStats[self.level() - 1]);
    }

    self.allSkills = ko.pureComputed(function() {
        return self.passives().concat(self.deck());
    });

    self.learnedSkills = ko.pureComputed(function() {
        return self.passives().concat(self.learnedTech());
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

    self.fullHeal = function() {
        var maxHP = self.stats.hp;
        self.curHP(maxHP);
    }

    self.heal = function(amount) {
        if (amount == undefined) { 
            self.fullHeal();
        } else {
            var newHP = self.curHP() + amount;
            self.curHP(newHP);
        }
    }

    function levelChange(amount) {
        var newLevel = self.level() + amount;
        if (newLevel > 5) newLevel = 5;
        else if (newLevel < 1) newLevel = 1;

        if (amount > 0) {
            while (self.skillBook.length != 0 && self.skillBook[0].level == newLevel) {
                var skill = self.skillBook.shift();
                self.techDeck.push(skill);
            }
        } else {
            while (self.techDeck().length != 0 && self.techDeck()[self.techDeck().length - 1].level == self.level()) {
                var skill = self.techDeck.pop();
                self.skillBook.unshift(skill);
            }

        }

        self.level(newLevel);
        updateStats();
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

    /**
     * ACTIVE PLAY SECTION
     */

    self.prepareDeckForBattle = function() {
        self.activeDeck(Array.from(self.deck()));
        self.shuffleDeck(self.activeDeck);
        self.activePlay([]);
        self.activeHand([]);
        self.activeDiscard([]);
        self.activeExile([]);
    }

    // generic send function
    var parseDeckType = function(deckString) {
        var deck = null;
        if (deckString == "hand") deck = self.activeHand;
        else if (deckString == "play") deck = self.activePlay;
        else if (deckString == "deck") deck = self.activeDeck;
        else if (deckString == "discard") deck = self.activeDiscard;

        return deck;
    }

    self.sendCard = function(card, from, to) {
        var fromDeck = parseDeckType(from);
        var toDeck = parseDeckType(to);

        if (card && fromDeck && toDeck) {
            self.moveCard(card, fromDeck, toDeck);
        }
    }

    self.drawHand = function() {
        var hand = self.stats.hand;
        for (var i = 0; i < hand; i++) {
            self.drawCard();
        }
    }

    self.cleanUp = function() {
        self.moveAllCards(self.activePlay, self.activeDiscard);
        self.moveAllCards(self.activeHand, self.activeDiscard);
    }

    self.shuffleActiveDeck = function() {
        self.shuffleDeck(self.activeDeck);
    }
    
    // deck to hand
    self.drawCard = function() {
        // replenish deck
        if (self.activeDeck().length < 1) {
            if (self.activeDiscard().length > 0) {
                self.replenishDeck();
                self.shuffleActiveDeck();
            }
        }
        self.moveCard(null, self.activeDeck, self.activeHand);
    }
    // deck to play
    // deck to discard
    self.millCard = function() {
        if (self.activeDeck().length > 0) {

        }
    }

    // hand to deck
    // hand to play
    self.playCard = function(card) {
        self.moveCard(card, self.activeHand, self.activePlay)
    }
    // hand to discard
    self.discardCard = function(card) {
        self.moveCard(card, self.activeHand, self.activeDiscard);
    }
    self.discardHand = function() {
        self.moveCards(self.activeHand, self.activeDiscard);
    }

    // play to hand
    // play to deck
    // play to discard
    self.clearPlayCard = function(card) {
        self.moveCard(card, self.activePlay, self.activeDiscard);
    }
    self.clearPlayCards = function() {
        self.moveCards(self.activePlay, self.activeDiscard);
    }

    // discard to hand
    // discard to deck
    self.replenishCard = function(card) {
        self.moveCard(card, self.activeDiscard, self.activeDeck);
    }
    self.replenishDeck = function() {
        self.moveAllCards(self.activeDiscard, self.activeDeck);
    }
    // discard to play
};