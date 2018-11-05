import { Player } from './models/Player.js';
import { Shop } from './models/Shop.js';
import { SkillCard } from './models/SkillCard.js';
import { Classes, Stats } from './models/Classes.js';

window.onload = function() {
    var sheetPublicUrl = "https://docs.google.com/spreadsheets/d/1fg0glSTrSxdri91skmmGsKAysuo5522pTH66HAOfYoU/edit?usp=sharing";
    var ActivitiesData, MonstersData, ShopData, SkillsData, StatsData;

    var Phases = { start: 0, setup: 1, town: 2, dungeon: 3 }
    var MaxLevel = 5;
    var SkillsCount = 18;
    var StatsDataIndex = function(index) { return index * 5; }
    var SkillsDataIndex = function(index) { return index == 0 ? 0 : ((index - 1) * 19) + 8; }

    function MyApp() {
        var self = this;

        self.isLoading = ko.observable(true);
        self.modalData = ko.observable();
        self.showModal = ko.observable(false);
        self.showStatsModal = ko.observable(false);
        self.showDeckModal = ko.observable(false);
        self.WDM = ko.observable(0);
        self.playersValue = ko.observable(1);
        self.p1Class = ko.observable(""); self.p2Class = ko.observable(""); self.p3Class = ko.observable(""); self.p4Class = ko.observable("");
        self.players = ko.observableArray();

        self.availableClasses = ["Barbarian", "Ranger", "Cleric", "Rogue"]; //, "Wizard", "Bard", "Druid", "Monk", "Paladin"];
        self.classObjects = ko.observableArray();

        self.shop = ko.observable();

        self.phase = ko.observable(0);
        self.isStartPhase = ko.observable(true);
        self.isSetupPhase = ko.observable(false);
        self.isTownPhase = ko.observable(false);
        self.isDungeonPhase = ko.observable(false);
        self.isPlayPhase = ko.pureComputed(function() {return self.isTownPhase() || self.isDungeonPhase();});
        self.phase.subscribe(function(newPhase) {
            self.isStartPhase(newPhase == Phases.start);
            self.isSetupPhase(newPhase == Phases.setup);
            self.isTownPhase(newPhase == Phases.town);
            self.isDungeonPhase(newPhase == Phases.dungeon);
        });
    
        Tabletop.init({ key: sheetPublicUrl, callback: onSheetLoad });
        function onSheetLoad(data, tabletop) {
            ActivitiesData = tabletop.sheets("Activities").elements;
            MonstersData = tabletop.sheets("Monsters").elements;
            ShopData = tabletop.sheets("Shop").elements;
            SkillsData = tabletop.sheets("Skills").elements;
            StatsData = tabletop.sheets("Stats").elements;
            initialize();
        }
        function initialize() {
            // var cObjects = [];
            // for (var i = 0; i < self.availableClasses.length; i++) {
            //     var dIndex = StatsDataIndex(i + 1);
            //     var sData = StatsData.slice(dIndex, dIndex + MaxLevel);

            //     var cObject = new Classes(self.availableClasses[i], sData);

            //     cObjects.push(cObject);
            // }
            // self.classObjects(cObjects);

            self.isLoading(false);

            // Debug skip early states
            self.playersValue(2);
            self.p1Class("Barbarian");
            self.p2Class("Ranger");
            self.onSetupPhase();
            // self.players().forEach(function(ply) {
            //     ply.learnTech(ply.techDeck()[0]);
            //     ply.buySkill(self.shop().deck()[0]);
            //     ply.buySkill(self.shop().deck()[0]);
            //     ply.buySkill(self.shop().deck()[0]);
            //     ply.buySkill(self.shop().deck()[0]);
            //     ply.buySkill(self.shop().deck()[0]);
            //     ply.buySkill(self.shop().deck()[0]);
            //     ply.buySkill(self.shop().deck()[0]);
            //     ply.buySkill(self.shop().deck()[0]);
            //     ply.buySkill(self.shop().deck()[0]);
            //     ply.buySkill(self.shop().deck()[0]);
            // });
            // self.onTownPhase();
        }

        self.onSetupPhase = function() {
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
                setupPhase(selectedClasses);
            }
        }

        function setupPhase(selectedClasses) {
            self.isLoading(true);

            // Setup basic shop
            var shopCards = SkillsData.slice(1, 7);
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
                var statsData = StatsData.slice(statsDataIndex, statsDataIndex + MaxLevel);

                var skillsDataIndex = SkillsDataIndex(classIndex);
                var skillsData = SkillsData.slice(skillsDataIndex, skillsDataIndex + SkillsCount);

                var skillCards = skillsData.map(function(skill) {
                   return new SkillCard(skill); 
                });
                var player = new Player((i+1), selectedClass, statsData, skillCards);
                myPlayers.push(player);
            }
            self.players(myPlayers);

            self.phase(Phases.setup);
            self.isLoading(false);
        }

        function showModal(data) {
            self.modalData(data);
            self.showModal(true);
        }

        self.onModalClick = function(v1, event) {
            if (event.target.className == "modal") {
                self.showModal(false);
                self.showStatsModal(false);
                self.showDeckModal(false);
            }
        }

        self.onStatsClick = function(clickIndex) {
            var player = self.players()[clickIndex()];
            self.showStatsModal(true);
            showModal(player);
        }

        self.onDeckClick = function(clickIndex) {
            var player = self.players()[clickIndex()];
            self.showDeckModal(true);
            showModal(player);
        }

        self.onTownPhase = function() {
            self.players().forEach(function(element) {
                console.log(element);
              });
            self.phase(Phases.town);
        }

        self.onDungeonPhase = function() {
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