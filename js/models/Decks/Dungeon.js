import { Deckable } from './Deckable.js';
import { SkillCard } from '../Cards/SkillCard.js';

export function Overworld(monstersData, activitiesData, wdm) {
    var self = this;

    self.dungeons = ko.observableArray([]);
    self.wdm = wdm;

    var dungeonCardCount = 5;

    function initialize() {
        // initialize monsters
        var baseIndex = 0;
        var regIndex = baseIndex + 6;
        var bossIndex = monstersData.length - 11;

        var regulars = monstersData.slice(regIndex + 1, bossIndex);
        var dungeonActivities = new DungeonActivities(regulars, activitiesData);
        var bosses = monstersData.slice(bossIndex + 1);
        var bossDeck = new Bosses(bosses);

        // default dungeon
        var useDefault = 1;
        var defaultMonsters1 = [
            regulars[0],
        ];
        var defaultMonsters2 = [
            regulars[1],
            regulars[10],
        ];
        var defaultMonsters3 = [
            regulars[2],
            regulars[11],
            regulars[17],
        ];
        var defaultDungeon = new Dungeon(monstersData[bossIndex + 1], defaultMonsters1, self.wdm);
        self.dungeons.push(defaultDungeon);
        
        var defaultDungeon = new Dungeon(monstersData[bossIndex + 2], defaultMonsters2, self.wdm);
        self.dungeons.push(defaultDungeon);
        
        var defaultDungeon = new Dungeon(monstersData[bossIndex + 3], defaultMonsters3, self.wdm);
        self.dungeons.push(defaultDungeon);

        for (var i = useDefault ? 3 : 0; i < 5; i++) {
            var boss = bossDeck.deck()[i];
            var startIndex = i * dungeonCardCount;
            var endIndex = startIndex + dungeonCardCount;
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

    self.deck = ko.observableArray(self.shuffleDeck(deck));
    self.boss = boss;
    deck.unshift(boss);
    self.discard = ko.observableArray([]);
    self.wdm = wdm;
    self.diceValue = ko.observable(20);

    self.playerTurn = ko.observable(1);
    self.players = ko.observableArray([]);
    self.dungeonActives = ko.observableArray([]);
    self.dungeonActivesCount = 0;

    self.activePlayer = ko.pureComputed(function() {
        return self.players()[self.playerTurn() - 1];
    });

    self.drawDungeon = function() {
        if (self.deck().length > 0 ) {
            var card = self.deck.pop();
            if (card.isMonsterCard) card.prepareForBattle(self.wdm);
            self.discard.push(card);
            self.dungeonActives([]);
            self.dungeonActiveCount = 0;
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

        self.rollDice();
    }

    self.addDungeonActives = function(c, ev) {
        var card = new SkillCard(null, self.dungeonActivesCount++);
        card.mapping(c);
        card.cardClick = self.removeDungeonCard;
        self.dungeonActives.push(card);
    }

    self.removeDungeonCard = function(card, ev) {
        self.removeCard(card, self.dungeonActives);
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