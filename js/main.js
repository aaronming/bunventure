window.onload = function() {
    var sheetPublicUrl = "https://docs.google.com/spreadsheets/d/1fg0glSTrSxdri91skmmGsKAysuo5522pTH66HAOfYoU/edit?usp=sharing";
    var ActivitiesData, MonstersData, ShopData, SkillsData, StatsData;

    var Phases = { start: 0, setup: 1, town: 2, dungeon: 3 }
    var MaxLevel = 5;
    var SkillsCount = 18;
    var StatsDataIndex = function(index) { return index * 5; }
    var SkillsDataIndex = function(index) { return index == 0 ? 0 : ((index - 1) * 19) + 8; }

    function SkillCard(sObj) {
        var self = this;
        
        self.myClass = sObj.Class;
        self.level = sObj.Level;
        self.type = sObj.Type;
        self.name = sObj.Name;
        self.cost = sObj.Cost;
        self.effect = sObj.Effect;

        self.description = ko.pureComputed(function(){
            var description = self.level + " " + self.name + 
                "\n" + self.type;
            if (self.cost) description += " - " + self.cost + " AP";
            description += "\n----------------------" +
                "\n" + self.effect;

            return description;
        });
    }

    function Deckable() {
        var self = this;

        // Deck Building
        self.addCard = function(card, deck) {
            deck.push(card);
        }

        self.removeCard = function(card, deck) {
            return deck.remove(card);
        }
    }
    
    function Player(index, playerClass, stats, skills) {
        Deckable.call(this);
        var self = this;

        self.index = index;
        self.class = playerClass;
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
        self.inventory = ko.observableArray([]);

        var updateStats = function() {
            self.stats = self.classStats[self.level - 1];
        }

        var updateTechDeck = function() {
            while (self.skillBook.length != 0 && self.skillBook[0].level == self.level) {
                var skill = self.skillBook.shift();
                self.techDeck.push(skill);
            }
        }

        self.minDeckSize = ko.pureComputed(function() {
            console.log(self.stats);
            return parseInt(self.stats.Hand) * 3;
        }, this);

        self.buySkill = function(tech, ev) {
            self.addCard(tech, self.deck);
        }

        self.learnTech = function(tech, ev) {
            self.removeCard(tech, self.techDeck);
            self.addCard(tech, self.learnedTech);
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
    }

    function Shop(shopCards) {
        Deckable.call(this);
        var self = this;

        self.shopLevel = 0;
        self.shopCards = ko.observableArray(shopCards);
        self.deck = ko.observableArray([]);

        self.levelUp = function() {
            if (self.shopLevel < 3) {
                self.shopLevel += 1;
                self.updateShopCards();
            }
        }

        self.updateShopCards = function() {
            var availableCards = self.shopCards.remove(function (item) {
                return parseInt(item.level) == self.shopLevel;
            });

            self.deck(self.deck().concat(availableCards));
        }

        self.levelUp();
    }

    function MyApp() {
        var self = this;

        self.isLoading = ko.observable(true);
        self.WDM = ko.observable(0);
        self.playersValue = ko.observable(1);
        self.p1Class = ko.observable(""); self.p2Class = ko.observable(""); self.p3Class = ko.observable(""); self.p4Class = ko.observable("");
        self.players = ko.observableArray();

        self.availableClasses = ["Barbarian", "Ranger", "Cleric", "Rogue", "Wizard", "Bard", "Druid", "Monk", "Paladin"];
        self.classObjects = ko.observableArray();

        self.shop = ko.observable();

        self.phase = ko.observable(0);
        self.isStartPhase = ko.observable(true);
        self.isSetupPhase = ko.observable(false);
        self.isTownPhase = ko.observable(false);
        self.isDungeonPhase = ko.observable(false);
        self.phase.subscribe(function(newPhase) {
            self.isStartPhase(newPhase == Phases.start);
            self.isSetupPhase(newPhase == Phases.setup);
            self.isTownPhase(newPhase == Phases.town);
            self.isDungeonPhase(newPhase == Phases.dungeon);
        });
    
        Tabletop.init({ key: sheetPublicUrl, callback: onSheetLoad });
        function onSheetLoad(data, tabletop) {
            ActivitiesData = tabletop.sheets("Activities");
            MonstersData = tabletop.sheets("Monsters");
            ShopData = tabletop.sheets("Shop");
            SkillsData = tabletop.sheets("Skills");
            StatsData = tabletop.sheets("Stats");

            self.initialize();
        }

        self.initialize = function() {
            var cObjects = [];
            for (var i = 0; i < self.availableClasses.length; i++) {
                var dIndex = StatsDataIndex(i + 1);
                var sData = StatsData.elements.slice(dIndex, dIndex + MaxLevel);
                
                var cObject = {
                    className: self.availableClasses[i],
                    attack: sData[0]["0"],
                    defense: sData[1]["0"],
                    hp: sData[2]["0"],
                    ap: sData[3]["0"],
                    hand: sData[4]["0"],
                }

                cObjects.push(cObject);
            }
            self.classObjects(cObjects);

            self.isLoading(false);

            // Skip to setupPhase
            // self.p1Class("Barbarian");
            // self.onConfirmClasses();
        }

        self.onConfirmClasses = function() {
            // Ensure no duplicates
            var selectedClasses = [];
            var dup = false;
            if (self.playersValue() >= 1) selectedClasses.push(self.p1Class());
            if (self.playersValue() >= 2) {
                if (selectedClasses.indexOf(self.p2Class()) >= 0) dup = true;
                selectedClasses.push(self.p2Class());
            }
            if (!dup && self.playersValue() >= 3) {
                if (selectedClasses.indexOf(self.p3Class()) >= 0) dup = true;
                selectedClasses.push(self.p3Class());
            }
            if (!dup && self.playersValue() >= 4) {
                if (selectedClasses.indexOf(self.p4Class()) >= 0) dup = true;
                selectedClasses.push(self.p4Class());
            }

            if (dup) {
                alert("No duplicate classes, retry...");
            } else {
                self.setupPhase(selectedClasses);
            }
        }

        self.setupPhase = function(selectedClasses) {
            self.isLoading(true);

            // Setup basic shop
            var shopCards = SkillsData.elements.slice(1, 7);
            var shopSkillCards = shopCards.map(function(skill) {
                return new SkillCard(skill);
            });
            self.shop(new Shop(shopSkillCards));

            // Setup players
            var myPlayers = [];
            for (var i = 0; i < selectedClasses.length; i++) {
                var selectedClass = selectedClasses[i];
                var classIndex = self.availableClasses.indexOf(selectedClass) + 1; // Base = 0;

                var statsDataIndex = StatsDataIndex(classIndex);
                var statsData = StatsData.elements.slice(statsDataIndex, statsDataIndex + MaxLevel);

                var skillsDataIndex = SkillsDataIndex(classIndex);
                var skillsData = SkillsData.elements.slice(skillsDataIndex, skillsDataIndex + SkillsCount);

                var skillCards = skillsData.map(function(skill) {
                   return new SkillCard(skill); 
                });
                var player = new Player((i+1), selectedClass, statsData, skillCards);
                console.log(player);
                myPlayers.push(player);
            }
            self.players(myPlayers);

            self.phase(Phases.setup);
            self.isLoading(false);
        }

        self.getShopDeck = function() {
            if (!self.shop()) return;
            var a = self.shop()
            var b = a.deck();
            return a;
        }

        self.onStartTown = function() {
            self.phase(Phases.town);
        }

        self.onStartDungeon = function() {
            self.phase(Phases.dungeon);
        }

        self.cValueCSS = function(val) {
            return "cVal" + val;
        }

        self.onButtonClick = function() {
            if (self.phase() == 1) self.phase(2);
            else self.phase(1);
        }

        // Helper functions
    }
    
    ko.applyBindings(new MyApp());
}