window.onload = function() {
    var sheetPublicUrl = "https://docs.google.com/spreadsheets/d/1fg0glSTrSxdri91skmmGsKAysuo5522pTH66HAOfYoU/edit?usp=sharing";
    var ActivitiesData, MonstersData, ShopData, SkillsData, StatsData;

    var Phases = { start: 0, setup: 1, town: 2, dungeon: 3 }
    var MaxLevel = 5;
    var SkillsCount = 18;
    var StatsDataIndex = function(index) { return index * 5; }
    var SkillsDataIndex = function(index) { return index == 0 ? 0 : ((index - 1) * 19) + 8; }
    
    function Player(playerClass, stats, skills) {
        this.class = playerClass;
        this.classStats = stats
        this.classSkills = skills;
        this.level = 0;
        this.stats = [];
        this.skillBook = Array.from(skills);
        this.techDeck = [];
        this.learnedTech = [];
        this.deck = [];
        this.playDeck = [];
        this.hand = [];
        this.discard = [];
        this.gold = 10;
        this.inventory = [];

        var updateStats = function() {
            this.stats = this.classStats[this.level - 1];
        }

        var updateTechDeck = function() {
            while (this.skillBook.length != 0 && this.skillBook[0].Level == this.level) {
                var skill = this.skillBook.shift();
                this.techDeck.push(skill);
            }
        }

        this.learnTech = function(tech) {
            this.removeCard(tech, this.techDeck);
            this.addCard(tech, this.learnedTech);
            this.addCard(tech, this.deck);
        }

        this.unlearnTech = function(tech) {
            this.addCard(tech, this.techDeck);
            this.removeCard(tech, this.learnedTech);
            this.removeCard(tech, this.deck);
        }

        this.addCard = function(card, deck) {
            deck.push(card);
        }

        this.removeCard = function(card, deck) {
            for (var i = 0; i < deck.length; i++) {
                if (card.name === deck[i].name) {
                    return deck.splice(i, 1);
                }
            }
        }

        this.prepareDeckForBattle = function() {
            this.playDeck = Array.from(this.deck);
            this.shuffleDeck(this.playDeck);
            this.hand = [];
            this.discard = [];
        }

        this.drawCard = function(num) {
            if (this.playDeck.length < num) {
                this.discard = this.shuffleDeck(this.discard);
                this.playDeck = this.playDeck.concat(this.discard);
                this.discard = [];
            }
            this.hand = this.hand.concat(this.playDeck.splice(0, num));
        }

        this.discardCard = function(card) {
            this.addCard(this.removeCard(card, this.hand), this.discard);
        }

        this.discardHand = function() {
            this.discard = this.discard.concat(this.hand);
            this.hand = [];
        }

        this.shuffleDeck = function(deck) {
            if (deck == undefined) deck = this.deck;
            var j, x, i;
            for (i = deck.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = deck[i];
                deck[i] = deck[j];
                deck[j] = x;
            }
            return deck;
        }

        this.levelUp = function() {
            this.level += 1;
            updateStats.bind(this)();
            updateTechDeck.bind(this)();
        }

        this.addGold = function(amount) {
            this.gold += amount;
            return this.gold;
        }

        this.addInventory = function(item) {
            inventory.push(item);
        }

        this.levelUp();
    }

    function MyApp() {
        var self = this;

        self.isLoading = ko.observable(true);
        self.playersValue = ko.observable(1);
        self.p1Class = ko.observable(""); self.p2Class = ko.observable(""); self.p3Class = ko.observable(""); self.p4Class = ko.observable("");
        self.players = ko.observableArray();

        self.availableClasses = ["Barbarian", "Ranger", "Cleric", "Rogue", "Wizard", "Bard", "Druid", "Monk", "Paladin"];
        self.classObjects = ko.observableArray();

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
                if (selectedClasses.indexOf(self.p2Class()) >= 0) dup = true;
                selectedClasses.push(self.p3Class());
            }
            if (!dup && self.playersValue() >= 4) {
                if (selectedClasses.indexOf(self.p2Class()) >= 0) dup = true;
                selectedClasses.push(self.p4Class());
            }

            if (dup) {
                alert("No duplicate classes, retry...");
            } else {
                for (var i = 0; i < selectedClasses.length; i++) {
                    var selectedClass = selectedClasses[i];
                    var classIndex = self.availableClasses.indexOf(selectedClass) + 1; // Base = 0;

                    var statsDataIndex = StatsDataIndex(classIndex);
                    var statsData = StatsData.elements.slice(statsDataIndex, statsDataIndex + MaxLevel);

                    var skillsDataIndex = SkillsDataIndex(classIndex);
                    var skillsData = SkillsData.elements.slice(skillsDataIndex, skillsDataIndex + SkillsCount);

                    var player = new Player(selectedClass, statsData, skillsData);
                    self.players.push(player);
                }

                self.setupPhase();
            }
        }

        self.setupPhase = function() {
            self.phase(Phases.setup);
        }

        self.onEditDeck = function(player) {
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