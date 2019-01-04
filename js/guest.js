import { Player } from './models/Decks/Player.js';
import { SkillCard } from './models/Cards/SkillCard.js';
import { SheetData } from './data/SheetData.js';

window.onload = function() {
    var sheetPublicUrl = "https://docs.google.com/spreadsheets/d/1fg0glSTrSxdri91skmmGsKAysuo5522pTH66HAOfYoU/edit?usp=sharing";
    var ActivitiesData, MonstersData, ShopData, SkillsData, StatsData;

    var Phases = { start: 0, setup: 1, town: 2, world: 3, dungeon: 4, play: 5 }
    var MaxLevel = 5;
    var SkillsCount = 18;
    var StatsDataIndex = function(index) { return index * 5; }
    var SkillsDataIndex = function(index) { return index == 0 ? 0 : ((index - 1) * 20) + 8; }

    var debug = 1;

    function MyApp() {
        var self = this;
        self.isLoading = ko.observable(true);
        var emptyTemplate = {name: "emptyTemplate"};
        self.modalTemplate = ko.observable(emptyTemplate);
        self.showModal = ko.observable(false);
        self.hideModalCallback = null;
        self.playerClass = ko.observable("");
        self.player = ko.observable();

        self.availableClasses = ["Barbarian", "Ranger", "Cleric", "Rogue"]; //, "Wizard", "Bard", "Druid", "Monk", "Paladin"];

        self.cardCount = 0;
        self.generalCards;
        self.guestShopCards = ko.observable();
        self.shop = ko.observable();
        self.oracle = ko.observable();

        self.phase = ko.observable(0);
        self.isStartPhase = ko.observable(true);
        self.isPlayPhase = ko.observable(false);
        self.phase.subscribe(function(newPhase) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            self.isStartPhase(newPhase == Phases.start);
            self.isPlayPhase(newPhase == Phases.play);
        });
        
        /**
         * DATA INITIALIZATION
         */

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
            // Setup basic cards
            self.generalCards = ShopData.slice(1, 26);
            var genSkillCards = self.generalCards.map(function(skill, index) {
                return new SkillCard(skill, -1);
            });
            self.guestShopCards(genSkillCards);

            if (debug) {
                self.playerClass("Barbarian");
                self.onPlayPhase();
                self.showShopDeckModal();
            }
            self.isLoading(false);
        }

        self.onPlayPhase = function() {
            var selectedClass = self.playerClass();
            var classIndex = self.availableClasses.indexOf(selectedClass) + 1; // Base = 0;

            var statsDataIndex = StatsDataIndex(classIndex);
            var statsData = StatsData.slice(statsDataIndex, statsDataIndex + MaxLevel);

            var skillsDataIndex = SkillsDataIndex(classIndex);
            var skillsData = SkillsData.slice(skillsDataIndex, skillsDataIndex + SkillsCount);

            var skillCards = skillsData.map(function(skill) {
                return new SkillCard(skill); 
            });
            var player = new Player(1, selectedClass, statsData, skillCards);
            self.player(player);

            var ply = self.player();
            ply.learnTech(ply.techDeck()[0]);

            // Add basic skills
            var strikes = 3;
            var guards = 3;

            switch(selectedClass) {
                case "Barbarian":
                    strikes = 5;
                    guards = 1;
                    break;
                case "Monk":
                    strikes = 4;
                    guards = 2;
                    break;
                case "Wizard":
                case "Rogue":
                case "Druid":
                case "Ranger":
                    strikes = 3;
                    guards = 3;
                    break;
                case "Paladin":
                case "Bard":
                case "Cleric":
                    strikes = 2;
                    guards = 4;
                    break;
            }

            var ret0 = function() { return 0; };
            var ret1 = function() { return 1; };
            for (var i = 0; i < strikes; i++) {
                self.setupAddSkill(null, null, ret0);
            }
            for (var i = 0; i < guards; i++) {
                self.setupAddSkill(null, null, ret1);
            }

            self.resetBattle();
            self.phase(Phases.play);
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

        self.showDeckModal = function() {
            var dataObject = {
                deck: self.player().allSkills,
                cardClick: function(card, ev) {
                    self.player().removeSkill(card);
                }
            }
            showModal({name: "deckModal", data: dataObject});
        }

        self.showTechDeckModal = function() {
            var dataObject = {
                deck: self.player().techDeck,
                cardClick: function(card, ev) {
                    self.player().learnTech(card);
                }
            }
            showModal({name: "deckModal", data: dataObject});
        }

        self.showShopDeckModal = function() {
            var dataObject = {
                deck: self.guestShopCards(),
                cardClick: function(card, ev, index) {
                    var context = ko.contextFor(event.target);
                    self.setupAddSkill(null, null, context.$index);
                }
            }
            showModal({name: "deckModal", data: dataObject});
        }

        self.showSearchCardModal = function(ethis, ev) {
            var selectedDeck;
            var player = self.player();
            var targetClass = ev.target.className;
            if (!targetClass) targetClass = ev.target.parentElement.className; // in case clicked on span number

            if (targetClass.includes("playerDeckBlock")) selectedDeck = player.activeDeck;
            else if (targetClass.includes("playerDiscardBlock")) selectedDeck = player.activeDiscard;

            if (selectedDeck) {
                var dataObject = {
                    deck: selectedDeck,
                    cardClick: function(card, ev) {
                        var targetDeck;
                        if (targetClass.includes("playerDeckBlock")) targetDeck = "deck";
                        else if (targetClass/includes("playerDiscardBlock")) targetDeck = "discard";
                        self.sendCardStart(card, null, targetDeck);
                        hideModal();
                    }
                }
                showModal({name: "deckModal", data: dataObject});
            }
        }

        /**
         * OTHER FUNCTIONS
         */
        self.resetBattle = function() {
            self.player().prepareDeckForBattle();
        }
        
        self.setupAddSkill = function(tech, ev, index) {
            var player = self.player();
            var cardObject = self.generalCards[index()];
            var card = new SkillCard(cardObject, self.cardCount);
            self.cardCount += 1;

            player.buySkill(card);
        }

        self.currentActiveDeck = ko.observable();
        self.selectedActiveCard = ko.observable();
        self.selectedCardFrom = null;

        self.sendingCard = ko.pureComputed(function() {
            return self.selectedActiveCard();
        });

        self.sendCardStart = function(card, ev, sectionString) {
            self.selectedCardFrom = sectionString;
            self.selectedActiveCard(card);
        }

        self.sendCardEnd = function(overlay, ev) {
            var overlayId = ev.target.id;
            var targetString = null;
            if (overlayId == "discardOverlay") targetString = "discard";
            else if (overlayId == "deckOverlay") targetString = "deck";
            else if (overlayId == "playOverlay") targetString = "play";
            else if (overlayId == "handOverlay") targetString = "hand";
            else if (overlayId == "activeOverlay") targetString = "active";

            if (self.selectedCardFrom != targetString) {
                self.player().sendCard(self.selectedActiveCard(), self.selectedCardFrom, targetString);
            }
            self.selectedCardFrom = null;
            self.selectedActiveCard(null);
        }

        // color value css for class stat rating
        self.cValueCSS = function(val) {
            return "cVal" + val;
        }
        
        self.darkMode = ko.observable(false);
        self.bodyCss = ko.pureComputed(function() {
            return {
                darkMode: self.darkMode()
            }
        });

        self.toggleDarkMode = function() {
            self.darkMode(!self.darkMode());
        }

        // App Initialization
        if (debug) loadStaticData();
        else Tabletop.init({ key: sheetPublicUrl, callback: onSheetLoad });
    }
    
    ko.applyBindings(new MyApp());
}