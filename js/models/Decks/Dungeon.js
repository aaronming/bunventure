import { Deckable } from './Deckable.js';

export function Overworld(monstersData, activitiesData) {
    var self = this;

    self.dungeons = ko.observableArray([]);

    function initialize() {
        // initialize monsters
        var baseIndex = 0;
        var regIndex = baseIndex + 6;
        var bossIndex = monstersData.length - 11;

        var regulars = monstersData.slice(regIndex + 1, bossIndex);
        var monsterDeck = new Monsters(regulars);
        var bosses = monstersData.slice(bossIndex + 1);
        var bossDeck = new Bosses(bosses);

        for (var i = 0; i < 5; i++) {
            var boss = bossDeck.deck()[i];
            var monsters = monsterDeck.deck.slice(i, i + 5);
            var dungeon = new Dungeon(boss, monsters);

            self.dungeons.push(dungeon);
        }

    }

    initialize();
}

function Dungeon(boss, deck) {
    Deckable.call(this);
    var self = this;

    self.boss = boss;
    deck.unshift(boss);
    self.deck = ko.observableArray(deck);
    self.discard = ko.observableArray([]);

    self.playerTurn = 1;
    self.players = ko.observableArray([]);

    self.activePlayer = ko.pureComputed(function() {
        return self.players()[self.playerTurn - 1];
    });

    self.drawDungeon = function() {
        if (self.deck().length > 0 ) {
            self.discard.push(self.deck.pop());
        }
    }

    self.undrawDungeon = function() {
        if (self.discard().length > 0 ) {
            self.deck.push(self.discard.pop());
        }
    }
}

function Bosses(bosses) {
    Deckable.call(this);
    var self = this;

    self.deck = ko.observableArray(self.shuffleDeck(bosses));
}

function Monsters(monsters) {
    Deckable.call(this);
    var self = this;

    self.deck = ko.observableArray(self.shuffleDeck(monsters));

}