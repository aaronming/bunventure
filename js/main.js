import { Player } from './models/Decks/Player.js';
import { Shop } from './models/Decks/Shop.js';
import { SkillCard } from './models/Cards/SkillCard.js';
import { Classes } from './models/Classes.js';
import { SheetData } from './data/SheetData.js';
import { Oracle } from './models/Decks/Oracle.js';
import { Overworld } from './models/Decks/Dungeon.js';
import { MonsterCard } from './models/Cards/MonsterCard.js';

window.onload = function() {
    var sheetPublicUrl = "https://docs.google.com/spreadsheets/d/1fg0glSTrSxdri91skmmGsKAysuo5522pTH66HAOfYoU/edit?usp=sharing";
    var ActivitiesData, MonstersData, ShopData, SkillsData, StatsData;

    var Phases = { start: 0, setup: 1, town: 2, world: 3, dungeon: 4 }
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
        self.oracle = ko.observable();
        self.overworld = ko.observable();
        self.dungeon = ko.observable();

        self.phase = ko.observable(0);
        self.isStartPhase = ko.observable(true);
        self.isSetupPhase = ko.observable(false);
        self.isTownPhase = ko.observable(false);
        self.isWorldPhase = ko.observable(false);
        self.isDungeonPhase = ko.observable(false);
        self.isPlayPhase = ko.pureComputed(function() {
            return self.isTownPhase() || self.isWorldPhase() || self.isDungeonPhase();
        });
        self.phase.subscribe(function(newPhase) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            self.isStartPhase(newPhase == Phases.start);
            self.isSetupPhase(newPhase == Phases.setup);
            self.isTownPhase(newPhase == Phases.town);
            self.isWorldPhase(newPhase == Phases.world);
            self.isDungeonPhase(newPhase == Phases.dungeon);
        });
        
        /**
         * DATA INITIALIZATION
         */

        var useHardData = 1;
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
            self.onWorldPhase();
            self.onDungeonClick(function(){return 0;});
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
                
                // Setup shops
                self.shop(new Shop(ShopData));
                self.oracle(new Oracle());

                // Setup dungeon
                var monsterData = MonstersData.map(function(mon) { return new MonsterCard(mon);});
                // var activitiesData
                self.overworld(new Overworld(monsterData, ActivitiesData));
    
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

        self.onWorldPhase = function() {
            self.phase(Phases.world);
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
            self.shop().setup(player);
            showModal({name: "marketModal", data: self.shop()});
        }

        self.showSkillChangeModal = function(clickIndex) {
            var player = self.players()[clickIndex()];
            self.oracle().setup(player);
            showModal({name: "oracleModal", data: self.oracle()});
        }

        self.showSkillRandomModal = function(clickIndex) {
            var player = self.players()[clickIndex()];
            self.oracle().setup(player);
            showModal({name: "oracleRandomModal", data: self.oracle()});
        }

        /**
         * TOWN FUNCTIONS
         */
         self.confirmMarketTransaction = function() {
            var shop = self.shop();
            var updatedPlayerCards = shop.confirmTransaction();
            var player = shop.playerRef;
            player.shopSkills(updatedPlayerCards);
            hideModal();
         }

         self.confirmOracleTransaction = function() {
            var oracle = self.oracle();
            var player = oracle.playerRef;

            // forget skills
            var sellDeck = oracle.sellDeck();
            for (var i = 0; i < sellDeck.length; i++) {
                var skill = sellDeck[i];
                player.removeSkill(skill);
            }
            // learn skills
            var buyDeck = oracle.buyDeck();
            for (var i = 0; i < buyDeck.length; i++) {
                var skill = buyDeck[i];
                player.learnTech(skill);
            }

            hideModal();
         }

         self.confirmOracleRandomTransaction = function() {
            var oracle = self.oracle();
            var player = oracle.playerRef;

            var sellDeck = oracle.sellDeck();
            if (sellDeck.length > 0) {
                var randomDraw = Math.floor(Math.random() * player.techDeck().length);
                var newSkill = player.techDeck()[randomDraw];

                for (var i = 0; i < sellDeck.length; i++) {
                    var skill = sellDeck[i];
                    player.removeSkill(skill);
                }
                player.learnTech(newSkill)

                hideModal();
            }
         }

        /**
         * WORLD/DUNGEON FUNCTIONS
         */

        self.onDungeonClick = function(index) {
            var dungeon = self.overworld().dungeons()[index()];
            dungeon.players(self.players());
            self.dungeon(dungeon);
            self.onDungeonPhase();
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
