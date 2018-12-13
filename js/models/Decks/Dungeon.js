import { Deckable } from './Deckable.js';

export function Overworld(monstersData, activitiesData, wdm) {
    var self = this;

    self.dungeons = ko.observableArray([]);
    self.wdm = wdm;

    function initialize() {
        // initialize monsters
        var baseIndex = 0;
        var regIndex = baseIndex + 6;
        var bossIndex = monstersData.length - 11;

        var regulars = monstersData.slice(regIndex + 1, bossIndex);
        var dungeonActivities = new DungeonActivities(regulars, activitiesData);
        var bosses = monstersData.slice(bossIndex + 1);
        var bossDeck = new Bosses(bosses);

        for (var i = 0; i < 5; i++) {
            var boss = bossDeck.deck()[i];
            var startIndex = i * 10;
            var endIndex = startIndex + 10;
            var dungeonCards = dungeonActivities.deck.slice(startIndex, endIndex);
            var dungeon = new Dungeon(boss, dungeonCards, self.wdm);

            self.dungeons.push(dungeon);
        }

    }

    initialize();
}

function Dungeon(boss, deck, wdm) {
    Deckable.call(this);
    var self = this;

    self.boss = boss;
    deck.unshift(boss);
    self.deck = ko.observableArray(deck);
    self.discard = ko.observableArray([]);
    self.wdm = wdm;
    self.diceValue = ko.observable(20);

    self.playerTurn = ko.observable(1);
    self.players = ko.observableArray([]);

    self.activePlayer = ko.pureComputed(function() {
        return self.players()[self.playerTurn() - 1];
    });

    self.drawDungeon = function() {
        if (self.deck().length > 0 ) {
            var card = self.deck.pop();
            if (card.isMonsterCard) card.prepareForBattle(self.wdm);
            self.discard.push(card);
        }
    }

    self.undrawDungeon = function() {
        if (self.discard().length > 0 ) {
            self.deck.push(self.discard.pop());
        }
    }

    self.rollDice = function() {
        var roll = Math.floor(Math.random() * 20) + 1;
        self.diceValue(roll);
    }

    self.selectedPlayerCss = function(index) {
        return index() == (self.playerTurn() - 1);
    }

    self.nextPlayer = function() {
        var nextPlayer = self.playerTurn() + 1;
        if (nextPlayer > self.players().length) nextPlayer = 1;

        self.playerTurn(nextPlayer);
    }
}

function Bosses(bosses) {
    Deckable.call(this);
    var self = this;

    self.deck = ko.observableArray(self.shuffleDeck(bosses));
}

function DungeonActivities(monsters, activities) {
    Deckable.call(this);
    var self = this;

    self.cards = monsters.concat(activities);
    self.deck = ko.observableArray(self.shuffleDeck(self.cards));

}