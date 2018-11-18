import { Player } from './models/Player.js';
import { Shop } from './models/Shop.js';
import { SkillCard } from './models/SkillCard.js';
import { Classes } from './models/Classes.js';
import { SheetData } from './data/SheetData.js';

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
        var emptyTemplate = {name: "emptyTemplate"};
        self.modalTemplate = ko.observable(emptyTemplate);
        self.showModal = ko.observable(false);
        self.hideModalCallback = null;
        self.WDM = ko.observable(1);
        self.playersValue = ko.observable(1);
        self.p1Class = ko.observable(""); self.p2Class = ko.observable(""); self.p3Class = ko.observable(""); self.p4Class = ko.observable("");
        self.players = ko.observableArray();

        self.availableClasses = ["Barbarian", "Ranger", "Cleric", "Rogue"]; //, "Wizard", "Bard", "Druid", "Monk", "Paladin"];
        self.classObjects = ko.observableArray();

        self.initialShopCards = ko.observable();
        self.shop = ko.observable();

        self.phase = ko.observable(0);
        self.isStartPhase = ko.observable(true);
        self.isSetupPhase = ko.observable(false);
        self.isTownPhase = ko.observable(false);
        self.isDungeonPhase = ko.observable(false);
        self.isPlayPhase = ko.pureComputed(function() {return self.isTownPhase() || self.isDungeonPhase();});
        self.phase.subscribe(function(newPhase) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            self.isStartPhase(newPhase == Phases.start);
            self.isSetupPhase(newPhase == Phases.setup);
            self.isTownPhase(newPhase == Phases.town);
            self.isDungeonPhase(newPhase == Phases.dungeon);
        });
        
        /**
         * DATA INITIALIZATION
         */

        var useHardData = true;
        function loadStaticData() {
            var sheetData = new SheetData();
            ActivitiesData = sheetData.ActivitiesData;
            MonstersData = sheetData.MonstersData;
            ShopData = sheetData.ShopData;
            SkillsData = sheetData.SkillsData;
            StatsData = sheetData.StatsData;
            initialize();
        }

        function onSheetLoad(data, tabletop) {
            ActivitiesData = tabletop.sheets("Activities").elements;
            MonstersData = tabletop.sheets("Monsters").elements;
            ShopData = tabletop.sheets("Shop").elements;
            SkillsData = tabletop.sheets("Skills").elements;
            StatsData = tabletop.sheets("Stats").elements;
            initialize();
        }

        /**
         * GAME PHASES FLOW
         */

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
            self.players().forEach(function(ply) {
                ply.learnTech(ply.techDeck()[0]);
                ply.buySkill(self.initialShopCards()[0]);
                ply.buySkill(self.initialShopCards()[0]);
                ply.buySkill(self.initialShopCards()[0]);
                ply.buySkill(self.initialShopCards()[0]);
                ply.buySkill(self.initialShopCards()[0]);
                ply.buySkill(self.initialShopCards()[0]);
                ply.buySkill(self.initialShopCards()[0]);
                ply.buySkill(self.initialShopCards()[0]);
                ply.buySkill(self.initialShopCards()[0]);
                ply.buySkill(self.initialShopCards()[0]);
            });
            self.onTownPhase();
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
                self.isLoading(true);
    
                // Setup basic cards
                var generalCards = SkillsData.slice(1, 3);
                var genSkillCards = generalCards.map(function(skill) {
                    return new SkillCard(skill);
                });
                self.initialShopCards(genSkillCards);
                
                // Setup shop
                var shopCards = ShopData.slice(1, 7);
                self.shop(new Shop(shopCards));
    
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
        }

        self.onTownPhase = function() {
            self.phase(Phases.town);
        }

        self.onDungeonPhase = function() {
            self.phase(Phases.dungeon);
        }

        /**
         * MODALS
         */

        function showModal(dataObject) {
            self.modalTemplate(dataObject);
            self.showModal(true);
        }

        function hideModal() {
            if (self.hideModalCallback) { 
                self.hideModalCallback();
                self.hideModalCallback = null;
            }
            self.modalTemplate(emptyTemplate);
            self.showModal(false);
        }

        self.hideModal = function(v1, event) {
            if (event.target.className == "modal") {
                hideModal();
            }
        }

        self.showStatsModal = function(clickIndex) {
            var player = self.players()[clickIndex()];
            showModal({name: "statsModal", data: player});
        }

        self.showDeckModal = function(clickIndex) {
            var player = self.players()[clickIndex()];
            showModal({name: "deckModal", data: player});
        }

        self.showItemModal = function(clickIndex) {

        }

        self.showMarketModal = function(clickIndex) {
            var player = self.players()[clickIndex()];
            self.shop().setupMarket(clickIndex(), player.shopSkills());
            //self.hideModalCallback = self.cancelMarketTransaction;
            showModal({name: "marketModal", data: self.shop()});
        }

        self.showSkillChangeModal = function(clickIndex) {

        }

        self.showSkillRandomModal = function(clickIndex) {

        }

        /**
         * TOWN FUNCTIONS
         */
         self.confirmMarketTransaction = function() {
            var updatedPlayerCards = self.shop().confirmTransaction();
            var player = self.players()[self.shop().currentPlayer];
            player.shopSkills(updatedPlayerCards);
            hideModal();
         }

         self.cancelMarketTransaction = function() {

         }

         self.confirmOracleTransaction = function() {
             
         }

        /**
         * OTHER FUNCTIONS
         */

        self.addWDM = function(val) {
            var wdm = self.WDM();
            self.WDM(val + wdm);
        }

        // color value css for class stat rating
        self.cValueCSS = function(val) {
            return "cVal" + val;
        }

        self.onButtonClick = function() {
            if (self.phase() == 1) self.phase(2);
            else self.phase(1);
        }

        // App Initialization
        if (useHardData) loadStaticData();
        else Tabletop.init({ key: sheetPublicUrl, callback: onSheetLoad });
    }
    
    ko.applyBindings(new MyApp());
}
