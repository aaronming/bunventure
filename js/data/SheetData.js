export function SheetData() {
    var self = this;
    self.ActivitiesData = ActivitiesData();
    self.MonstersData = MonstersData();
    self.ShopData = ShopData();
    self.SkillsData = SkillsData();
    self.StatsData = StatsData();
}

function ActivitiesData() {
    return [{"Name":"Gold","Type":"Treasure","Effect":"Gain d20/4 gold"},{"Name":"Item","Type":"Treasure","Effect":"Gain 1 consumable item"},{"Name":"Trap","Type":"Event","Effect":"Receive d4 + W damage"},{"Name":"Rest","Type":"Event","Effect":"Recover d20 health"},{"Name":"Merchant","Type":"Event","Effect":"Set up a merchant shop"},{"Name":"Booth","Type":"Event","Effect":"Set up oracle booth"},{"Name":"Camp","Type":"Event","Effect":"Party recover d20 health"},{"Name":"Boulder trap","Type":"Event","Effect":"Party receive d4 + W damage"},{"Name":"Skill Fairy","Type":"Event","Effect":"Reveal d20/5 from your tech deck. You can add a card to your active, shuffle rest back"},{"Name":"Bad Omen","Type":"Event","Effect":"Increase the world difficulty meter"}];
}

function MonstersData() {
    return [{"Name":"BASE","Level":"","Atk":"","Def":"","HP":"","Skills":""},{"Name":"base 1","Level":"1","Atk":"0 + W","Def":"0 + W","HP":"4 * (1 + W)","Skills":"01 - 10: Do nothing\n11 - 15: Guard; Basic block (def x1)\n16 - 20: Attack"},{"Name":"base 2","Level":"2","Atk":"0 + W","Def":"0 + W","HP":"6 * (1 + W)","Skills":"01 - 08: Do nothing\n09 - 13: Guard; Basic block (def x1)\n14 - 19: Attack\n20 - 20: Heavy attack"},{"Name":"base 3","Level":"3","Atk":"1 + W","Def":"0 + W","HP":"8 * (1 + W)","Skills":"01 - 08: Do nothing\n09 - 14: Guard; Basic block (def x1)\n15 - 19: Attack\n20 - 20: Heavy attack"},{"Name":"base 4","Level":"4","Atk":"1 + W","Def":"1 + W","HP":"10 * (1 + W) ","Skills":"01 - 05: Do nothing\n06 - 11: Guard; Basic block (def x1)\n12 - 17: Attack\n18 - 19: Heal\n20 - 20 : Heavy attack"},{"Name":"base 5","Level":"5","Atk":"2 + W","Def":"2 + W","HP":"15 * (1 + W) ","Skills":"Effect: special effect\n01 - 03: Do nothing\n04 - 10: Guard; Basic block (def x1)\n11 - 17: Attack\n18 - 19: Heal\n20 - 20: Heavy attack"},{"Name":"REGULAR","Level":"","Atk":"","Def":"","HP":"","Skills":""},{"Name":"Bunling","Level":"1","Atk":"1 + W","Def":"1 + W","HP":"4 * (1 + W)","Skills":"01 - 10: grr\n11 - 15: Guard; Basic block (def x1);\n16 - 20: Tackle; Basic hit (atk x1)"},{"Name":"Catun","Level":"1","Atk":"1 + W","Def":"1 + W","HP":"4 * (1 + W)","Skills":"01 - 10: meoww\n11 - 15: Guard; Basic block (def x1);\n16 - 20: Scratch; Basic hit (atk x1)"},{"Name":"Doglo","Level":"1","Atk":"1 + W","Def":"1 + W","HP":"4 * (1 + W)","Skills":"01 - 10: chases tail\n11 - 15: Guard; Basic block (def x1);\n16 - 19: Bite; Basic hit (atk x1)\n20 - 20: Spear thrust: Good hit (atk x1.5)"},{"Name":"Schanoropi","Level":"1","Atk":"0 + W","Def":"0 + W","HP":"4 * (1 + W)","Skills":"01 - 10: Do nothing\n11 - 15: Guard; Basic block (def x1)\n16 - 20: Attack"},{"Name":"Slathoo","Level":"1","Atk":"0 + W","Def":"0 + W","HP":"4 * (1 + W)","Skills":"01 - 10: Do nothing\n11 - 15: Guard; Basic block (def x1)\n16 - 20: Attack"},{"Name":"Peniguni","Level":"1","Atk":"0 + W","Def":"0 + W","HP":"4 * (1 + W)","Skills":"01 - 10: Do nothing\n11 - 15: Guard; Basic block (def x1)\n16 - 20: Attack"},{"Name":"Snelia","Level":"1","Atk":"0 + W","Def":"0 + W","HP":"4 * (1 + W)","Skills":"01 - 10: Do nothing\n11 - 15: Guard; Basic block (def x1)\n16 - 20: Attack"},{"Name":"","Level":"1","Atk":"0 + W","Def":"0 + W","HP":"4 * (1 + W)","Skills":"01 - 10: Do nothing\n11 - 15: Guard; Basic block (def x1)\n16 - 20: Attack"},{"Name":"","Level":"1","Atk":"0 + W","Def":"0 + W","HP":"4 * (1 + W)","Skills":"01 - 10: Do nothing\n11 - 15: Guard; Basic block (def x1)\n16 - 20: Attack"},{"Name":"","Level":"1","Atk":"0 + W","Def":"0 + W","HP":"4 * (1 + W)","Skills":"01 - 10: Do nothing\n11 - 15: Guard; Basic block (def x1)\n16 - 20: Attack"},{"Name":"Shepepe","Level":"2","Atk":"0 + W","Def":"0 + W","HP":"6 * (1 + W)","Skills":"01 - 05: Baaaa\n06 - 10: Wool Guard; Basic block (def x1); Great block (def x2)\n11 - 16: Tackle; Basic hit (atk x1)\n17 - 19: Sweater; Basic heal (def x 1);\n20 - 20; Insulation; Def +2 until your next turn"},{"Name":"Piloga","Level":"2","Atk":"0 + W","Def":"0 + W","HP":"6 * (1 + W)","Skills":"01 - 08: Oink oink\n09 - 10: Sty; Great heal (def x2)\n11 - 15: Guard; Basic block (def x1);\n16 - 20: Charge; Good hit (atk x1.5)"},{"Name":"Owler","Level":"2","Atk":"0 + W","Def":"0 + W","HP":"6 * (1 + W)","Skills":"01 - 08: Do nothing\n09 - 13: Guard; Basic block (def x1)\n14 - 19: Attack\n20 - 20: Heavy attack"},{"Name":"","Level":"2","Atk":"0 + W","Def":"0 + W","HP":"6 * (1 + W)","Skills":"01 - 08: Do nothing\n09 - 13: Guard; Basic block (def x1)\n14 - 19: Attack\n20 - 20: Heavy attack"},{"Name":"","Level":"2","Atk":"0 + W","Def":"0 + W","HP":"6 * (1 + W)","Skills":"01 - 08: Do nothing\n09 - 13: Guard; Basic block (def x1)\n14 - 19: Attack\n20 - 20: Heavy attack"},{"Name":"","Level":"2","Atk":"0 + W","Def":"0 + W","HP":"6 * (1 + W)","Skills":"01 - 08: Do nothing\n09 - 13: Guard; Basic block (def x1)\n14 - 19: Attack\n20 - 20: Heavy attack"},{"Name":"","Level":"2","Atk":"0 + W","Def":"0 + W","HP":"6 * (1 + W)","Skills":"01 - 08: Do nothing\n09 - 13: Guard; Basic block (def x1)\n14 - 19: Attack\n20 - 20: Heavy attack"},{"Name":"Cowa","Level":"3","Atk":"1 + W","Def":"0 + W","HP":"8 * (1 + W)","Skills":"01 - 05: Moooooo...\n06 - 12: Horn charge; Basic hit (atk x1)\n13 - 15: Guard; Basic block (def x1): Basic block (def x1)\n16 - 19: Bow milk; Basic heal (def x1)\n20 - 20: Axe Swing; Super hit (atk x2)"},{"Name":"Hoselar","Level":"3","Atk":"1 + W","Def":"0 + W","HP":"8 * (1 + W)","Skills":"01 - 08: Do nothing\n09 - 14: Guard; Basic block (def x1)\n15 - 19: Attack\n20 - 20: Heavy attack"},{"Name":"","Level":"3","Atk":"1 + W","Def":"0 + W","HP":"8 * (1 + W)","Skills":"01 - 08: Do nothing\n09 - 14: Guard; Basic block (def x1)\n15 - 19: Attack\n20 - 20: Heavy attack"},{"Name":"","Level":"3","Atk":"1 + W","Def":"0 + W","HP":"8 * (1 + W)","Skills":"01 - 08: Do nothing\n09 - 14: Guard; Basic block (def x1)\n15 - 19: Attack\n20 - 20: Heavy attack"},{"Name":"","Level":"3","Atk":"1 + W","Def":"0 + W","HP":"8 * (1 + W)","Skills":"01 - 08: Do nothing\n09 - 14: Guard; Basic block (def x1)\n15 - 19: Attack\n20 - 20: Heavy attack"},{"Name":"Rhondi","Level":"4","Atk":"1 + W","Def":"1 + W","HP":"10 * (1 + W) ","Skills":"01 - 05: Do nothing\n06 - 11: Guard; Basic block (def x1)\n12 - 17: Attack\n18 - 19: Heal\n20 - 20 : Heavy attack"},{"Name":"Pekopacco","Level":"4","Atk":"1 + W","Def":"1 + W","HP":"10 * (1 + W) ","Skills":"01 - 05: Do nothing\n06 - 11: Guard; Basic block (def x1)\n12 - 17: Attack\n18 - 19: Heal\n20 - 20 : Heavy attack"},{"Name":"","Level":"4","Atk":"1 + W","Def":"1 + W","HP":"10 * (1 + W) ","Skills":"01 - 05: Do nothing\n06 - 11: Guard; Basic block (def x1)\n12 - 17: Attack\n18 - 19: Heal\n20 - 20 : Heavy attack"}];
}

function ShopData() {
    return [{"Name":"ACTIONS","Price":"","Type":"","AP":"","Effect":"","Count":""},{"Name":"Strike","Price":"0","Type":"Hit","AP":"2","Effect":"Basic hit (atk x1)","Count":"10"},{"Name":"Guard","Price":"0","Type":"Block","AP":"1","Effect":"Basic block (def x1)","Count":"8"},{"Name":"Critical Strike","Price":"1","Type":"Hit","AP":"2","Effect":"Roll d20; if > 10 critical hit (atk x2); else basic hit (atk x1)","Count":"6"},{"Name":"Parry","Price":"1","Type":"Block","AP":"2","Effect":"Block (atk + def)","Count":"6"},{"Name":"Counter","Price":"1","Type":"Block","AP":"2","Effect":"Basic block (def x1); if blocked deal basic hit (atk x1)","Count":"2"},{"Name":"Dodge","Price":"1","Type":"Block","AP":"2","Effect":"Roll d20; if > 12 enemy attack misses instead","Count":"2"},{"Name":"","Price":"","Type":"","AP":"","Effect":"","Count":""},{"Name":"CONSUMABLES","Price":"","Type":"","AP":"","Effect":"","Count":""},{"Name":"Small HP potion","Price":"1","Type":"Use","AP":"0","Effect":"HP +5","Count":"14"},{"Name":"Large HP potion","Price":"3","Type":"Use","AP":"0","Effect":"HP +20","Count":"6"},{"Name":"Attack potion","Price":"1","Type":"Use","AP":"0","Effect":"Attack +5","Count":"6"},{"Name":"Defense potion","Price":"1","Type":"Use","AP":"0","Effect":"Defense +5","Count":"6"},{"Name":"Hand potion","Price":"1","Type":"Use","AP":"0","Effect":"Draw 2 cards","Count":"6"},{"Name":"AP potion","Price":"3","Type":"Use","AP":"0","Effect":"AP +2","Count":"6"},{"Name":"","Price":"","Type":"","AP":"","Effect":"","Count":""},{"Name":"EQUIPMENT","Price":"","Type":"","AP":"","Effect":"","Count":""},{"Name":"RELIC","Price":"","Type":"","AP":"","Effect":"","Count":""},{"Name":"Ring of might","Price":"3","Type":"Relic","AP":"1","Effect":"Attack +1","Count":""},{"Name":"Bracelet of might","Price":"5","Type":"Relic","AP":"1","Effect":"Attack +3","Count":""},{"Name":"Gauntlet of might","Price":"7","Type":"Relic","AP":"1","Effect":"Attack +5","Count":""},{"Name":"Shield of light","Price":"3","Type":"Relic","AP":"1","Effect":"Defense +1","Count":""},{"Name":"Seal of light","Price":"5","Type":"Relic","AP":"1","Effect":"Defense +3","Count":""},{"Name":"Cube of light","Price":"7","Type":"Relic","AP":"1","Effect":"Defense +5","Count":""},{"Name":"Almighty Cup","Price":"3","Type":"Relic","AP":"1","Effect":"HP +1; Max Health +3","Count":""},{"Name":"Almighty Goblet","Price":"5","Type":"Relic","AP":"1","Effect":"HP +3; Max Health +6","Count":""},{"Name":"Almighty Grail","Price":"7","Type":"Relic","AP":"1","Effect":"HP +5; Max Health +10","Count":""},{"Name":"Shard of Grace","Price":"6","Type":"Relic","AP":"1","Effect":"AP +1","Count":""},{"Name":"Gem of Grace","Price":"10","Type":"Relic","AP":"1","Effect":"AP +2","Count":""},{"Name":"Symbols of Fate","Price":"5","Type":"Relic","AP":"1","Effect":"Hand +1","Count":""},{"Name":"Runes of Fate","Price":"8","Type":"Relic","AP":"1","Effect":"Hand +2","Count":""},{"Name":"ARMOR","Price":"","Type":"","AP":"","Effect":"","Count":""},{"Name":"Dragon Robes","Price":"5","Type":"","AP":"","Effect":"","Count":""},{"Name":"Dragon Cloak","Price":"5","Type":"","AP":"","Effect":"","Count":""}];
}

function SkillsData() {
    return [{"Class":"GENERAL","Level":"","Type":"","Name":"","Cost":"","Effect":""},{"Class":"General","Level":"1","Type":"Hit","Name":"Strike","Cost":"2","Effect":"Basic hit (atk x1)"},{"Class":"General","Level":"1","Type":"Block","Name":"Block","Cost":"1","Effect":"Basic block (def x1)"},{"Class":"General","Level":"2","Type":"Hit","Name":"Critical Strike","Cost":"2","Effect":"Roll d20; if > 10 great hit (atk x2)"},{"Class":"General","Level":"2","Type":"Block","Name":"Parry","Cost":"2","Effect":"Roll d20; if > 10 great block (def x2)"},{"Class":"General","Level":"3","Type":"Block","Name":"Counter","Cost":"2","Effect":"Basic block (def x1); if blocked deal basic hit (atk x1)"},{"Class":"General","Level":"3","Type":"Block","Name":"Dodge","Cost":"2","Effect":"Roll d20; if > 12 enemy attack misses"},{"Class":"BARBARIAN","Level":"","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Barbarian","Level":"1","Type":"Passive","Name":"Intimidate","Cost":"","Effect":"Can skip monster's first turn"},{"Class":"Barbarian","Level":"1","Type":"Buff","Name":"Rage","Cost":"0","Effect":"Atk +1"},{"Class":"Barbarian","Level":"1","Type":"Block","Name":"Protector","Cost":"0","Effect":"Can block for 1 ally with Def +1 (def x1)"},{"Class":"Barbarian","Level":"1","Type":"Hit","Name":"Hammer uppercut","Cost":"2","Effect":"Good hit (atk x1.5)"},{"Class":"Barbarian","Level":"2","Type":"Buff","Name":"Iron body","Cost":"0","Effect":"Def +1; Basic heal (def x1)"},{"Class":"Barbarian","Level":"2","Type":"Hit","Name":"Hammer throw","Cost":"0","Effect":"Frail hit (atk x0.25); cannot block this turn"},{"Class":"Barbarian","Level":"2","Type":"Buff","Name":"Horn of valor","Cost":"2","Effect":"Until your next turn, party Atk +2"},{"Class":"Barbarian","Level":"3","Type":"Passive","Name":"Thick skin","Cost":"","Effect":"End of turn recover 1 HP"},{"Class":"Barbarian","Level":"3","Type":"Hit","Name":"Great swing","Cost":"2","Effect":"Great hit (atk x2)"},{"Class":"Barbarian","Level":"3","Type":"Buff","Name":"War cry","Cost":"2","Effect":"Until your next turn, party Atk +1; Party basic heal (def x1)"},{"Class":"Barbarian","Level":"3","Type":"Block","Name":"Hammer parry","Cost":"1","Effect":"Basic block (atk x1)"},{"Class":"Barbarian","Level":"4","Type":"Hit","Name":"Bludgeon","Cost":"3","Effect":"Strong hit (atk x3)"},{"Class":"Barbarian","Level":"4","Type":"Buff","Name":"Fighting Spirit","Cost":"1","Effect":"Atk +1; Def +1; Basic heal (def x1)"},{"Class":"Barbarian","Level":"4","Type":"Block","Name":"Body blocking","Cost":"1","Effect":"Basic block (def x1); Can block for 1 ally (def x1)"},{"Class":"Barbarian","Level":"5","Type":"Passive","Name":"Bleed","Cost":"","Effect":"If player did damage, end of turn monster takes frail hit (atk x0.25)"},{"Class":"Barbarian","Level":"5","Type":"Hit","Name":"Thunder hammer","Cost":"3","Effect":"Atk +1; basic heal (def x1); great hit (atk x2)"},{"Class":"Barbarian","Level":"5","Type":"Buff","Name":"Restrained Rage","Cost":"0","Effect":"Cannot attack this turn; next turn Atk and Def stat x2"},{"Class":"Barbarian","Level":"5","Type":"Buff","Name":"Rampage","Cost":"1","Effect":"Atk +2; Next hit cost -1 AP"},{"Class":"RANGER","Level":"","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Ranger","Level":"1","Type":"Passive","Name":"Perception","Cost":"","Effect":"Once per dungeon, you can reveal the top three dungeon cards and put them back in any order"},{"Class":"Ranger","Level":"1","Type":"Hit","Name":"Piericing arrow","Cost":"2","Effect":"Atk +1; basic hit (atk x1)"},{"Class":"Ranger","Level":"1","Type":"Buff","Name":"Camouflage","Cost":"2","Effect":"Discard a card; Roll d20; If > 15 skip monster turn; Basic heal (def x1) "},{"Class":"Ranger","Level":"1","Type":"Buff","Name":"Hunting","Cost":"1","Effect":"Draw 2 cards"},{"Class":"Ranger","Level":"2","Type":"Hit","Name":"Double arrow","Cost":"3","Effect":"Great hit (atk x2)"},{"Class":"Ranger","Level":"2","Type":"Hit","Name":"Trap","Cost":"1","Effect":"Weak hit (atk x0.5); draw 1 card"},{"Class":"Ranger","Level":"2","Type":"Buff","Name":"Mulligan","Cost":"0","Effect":"Discard your hand, redraw the amount discarded"},{"Class":"Ranger","Level":"3","Type":"Passive","Name":"Dexterity","Cost":"","Effect":"At the start of your turn, you can discard a card and draw a new one"},{"Class":"Ranger","Level":"3","Type":"Hit","Name":"Love arrow","Cost":"3","Effect":"Choose one:\nTarget monster: Basic hit (atk x1), monster disadvantage rolls\nTarget ally: Basic heal (atk x1)"},{"Class":"Ranger","Level":"3","Type":"Buff","Name":"Supply","Cost":"0","Effect":"Discard a card; Target ally draws an additional 2 cards on their next turn"},{"Class":"Ranger","Level":"3","Type":"Buff","Name":"Aim","Cost":"1","Effect":"Atk + 3"},{"Class":"Ranger","Level":"4","Type":"Hit","Name":"Quick shot","Cost":"4","Effect":"Weak hit (atk x0.5); End you and your monster turn immediately"},{"Class":"Ranger","Level":"4","Type":"Hit","Name":"Ensnare","Cost":"2","Effect":"Weak hit (atk x0.5); draw 2 cards"},{"Class":"Ranger","Level":"4","Type":"Buff","Name":"Reload","Cost":"1","Effect":"Draw 3 cards; Discard 1 card"},{"Class":"Ranger","Level":"5","Type":"Passive","Name":"Final draw","Cost":"","Effect":"Once per turn, if you have no cards in your hand, you may draw 1 card"},{"Class":"Ranger","Level":"5","Type":"Hit","Name":"Shotgun arrow","Cost":"5","Effect":"Great hit (atk x2); For every hit card in your discard pile, deal weak hit (atk x0.5)"},{"Class":"Ranger","Level":"5","Type":"Buff","Name":"Concentration","Cost":"2","Effect":"Draw 2 card; Atk +3"},{"Class":"Ranger","Level":"5","Type":"Buff","Name":"Fire Arrow","Cost":"1","Effect":"Burn; Until next turn, all hits deal an additional frail hit (atk x0.25)"},{"Class":"CLERIC","Level":"","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Cleric","Level":"1","Type":"Passive","Name":"Altruism","Cost":"","Effect":"Inn cost is halved for party"},{"Class":"Cleric","Level":"1","Type":"Buff","Name":"Heal","Cost":"1","Effect":"Target ally great heal (def x2)"},{"Class":"Cleric","Level":"1","Type":"Buff","Name":"Protection","Cost":"0","Effect":"Until your next turn, ally basic blocks (def x1)"},{"Class":"Cleric","Level":"1","Type":"Block","Name":"Shield","Cost":"1","Effect":"Def +1; Basic blocks (def x1)"},{"Class":"Cleric","Level":"2","Type":"Buff","Name":"Strengthen","Cost":"1","Effect":"Until your next turn, target ally Atk +1 and Def +1"},{"Class":"Cleric","Level":"2","Type":"Buff","Name":"Revive","Cost":"2","Effect":"Target dead ally basic heal (def x1)"},{"Class":"Cleric","Level":"2","Type":"Hit","Name":"Grand cross","Cost":"2","Effect":"Good hit (atk x2)"},{"Class":"Cleric","Level":"3","Type":"Passive","Name":"Crisis","Cost":"","Effect":"After you draw cards at the start of yout turn, you may discard two cards to add a \"Heal\" card to your hand from your discard or deck"},{"Class":"Cleric","Level":"3","Type":"Buff","Name":"Grand heal","Cost":"2","Effect":"Party good heal (def x1.5)"},{"Class":"Cleric","Level":"3","Type":"Buff","Name":"Blessing","Cost":"2","Effect":"Until your next turn, target ally Atk +5 and Def +5"},{"Class":"Cleric","Level":"3","Type":"Block","Name":"Grand shield","Cost":"3","Effect":"Until your next turn, party basic blocks (def x1)"},{"Class":"Cleric","Level":"4","Type":"Buff","Name":"Divine protection","Cost":"1","Effect":"Until your next turn, target ally Def +2 and great blocks (def x2)"},{"Class":"Cleric","Level":"4","Type":"Hit","Name":"Holy fire","Cost":"2","Effect":"Great hit (def x2)"},{"Class":"Cleric","Level":"4","Type":"Block","Name":"Divine shield","Cost":"3","Effect":"Strong blocks (def x3); Can block for ally (def x1)"},{"Class":"Cleric","Level":"5","Type":"Passive","Name":"Divinity","Cost":"","Effect":"Healing does an extra weak heal (def x0.5); If blocked deal basic hit (atk x1)"},{"Class":"Cleric","Level":"5","Type":"Buff","Name":"Divine heal","Cost":"3","Effect":"Target ally super heal (def x4)"},{"Class":"Cleric","Level":"5","Type":"Buff","Name":"Holy spirit","Cost":"3","Effect":"Until your next turn, target ally AP +2 and Hand +1"},{"Class":"Cleric","Level":"5","Type":"Hit","Name":"Heaven beam","Cost":"4","Effect":"Revive allies basic heal (def x0.5); Death hit (def x[2 + # revived allies])"},{"Class":"ROGUE","Level":"","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Rogue","Level":"1","Type":"Passive","Name":"Trap disable","Cost":"","Effect":"On trap activation, can pay 1 gold to deactivate"},{"Class":"Rogue","Level":"1","Type":"Hit","Name":"Poison needle","Cost":"1","Effect":"Weak hit (atk x0.5); Poison: if monster attacks, do basic hit (atk x1)"},{"Class":"Rogue","Level":"1","Type":"Hit","Name":"Sneak attack","Cost":"1","Effect":"Roll d20; if > 13 good hit (atk x1.5); else weak hit (atk x0.5)"},{"Class":"Rogue","Level":"1","Type":"Buff","Name":"Booster","Cost":"2","Effect":"Target ally gains 2 AP for their next turn"},{"Class":"Rogue","Level":"2","Type":"Buff","Name":"Sleight of hand","Cost":"","Effect":"This card has the same effect and cost as the previous card"},{"Class":"Rogue","Level":"2","Type":"Buff","Name":"Illusion","Cost":"1","Effect":"Monster has to roll d20 to perform hit; if > 13 skip monster hit"},{"Class":"Rogue","Level":"2","Type":"Block","Name":"Pickpocket","Cost":"1","Effect":"Weak block (def x0.5); Roll d20; if = 20 gain 1 gold;"},{"Class":"Rogue","Level":"3","Type":"Passive","Name":"Loot","Cost":"","Effect":"On monster defeat, party gains additional x0.25 gold (minimum 1)"},{"Class":"Rogue","Level":"3","Type":"Hit","Name":"Toxic gas bomb","Cost":"3","Effect":"Basic hit (atk x1); Until your next turn, inflict Poison: if monster attacks, do rogue basic hit (atk x1)"},{"Class":"Rogue","Level":"3","Type":"Hit","Name":"Lucky strike","Cost":"2","Effect":"Basic hit (atk x1); Draw a card, if it's a hit card, do basic hit (atk x1)"},{"Class":"Rogue","Level":"3","Type":"Buff","Name":"Mystery flask","Cost":"1","Effect":"Target ally and roll d20; if > 8 great heal (def x2); else receive weak hit (atk x0.5)"},{"Class":"Rogue","Level":"4","Type":"Buff","Name":"Jackpot","Cost":"0","Effect":"For every rogue's dice roll, deal weak hit (atk x0.5)"},{"Class":"Rogue","Level":"4","Type":"Buff","Name":"Smokebomb","Cost":"2","Effect":"Until your next turn, monster has to roll d20 to hit; if > 17 skip monster hit"},{"Class":"Rogue","Level":"4","Type":"Block","Name":"Lucky guard","Cost":"1","Effect":"Roll d20;\n01 - 05: Weak block (def x0.5)\n06 - 15: Basic block (def x1)\n16 - 20: Great block (def x3)"},{"Class":"Rogue","Level":"5","Type":"Passive","Name":"Second chance","Cost":"","Effect":"For rogue dice rolls, you can reroll once more"},{"Class":"Rogue","Level":"5","Type":"Hit","Name":"Venom dagger","Cost":"3","Effect":"Great hit (atk x2); Poison: if monster attacks, do basic hit (atk x1)"},{"Class":"Rogue","Level":"5","Type":"Hit","Name":"Assassinate","Cost":"3","Effect":"Atk +2; Roll d20; if > 10 strong hit (atk x3); else weak hit (atk x0.5)"},{"Class":"Rogue","Level":"5","Type":"Buff","Name":"Lottery","Cost":"0","Effect":"Roll d20;\n01 - 08: Inflict self basic hit (atk x1)\n09 - 11: Atk +2\n12 - 15: Def +2\n16 - 19: Good heal (def x1.5)\n20 - 20: Atk +1, Def +1, basic heal (def x1)"},{"Class":"WIZARD","Level":"TODO","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Wizard","Level":"1","Type":"Hit","Name":"Thunderbolt","Cost":"5","Effect":"strong hit (atk x3); Can reroll monster's attack"},{"Class":"Wizard","Level":"1","Type":"Hit","Name":"Zap","Cost":"3","Effect":"Basic hit (atk x1); Can reroll monster's attack"},{"Class":"Wizard","Level":"1","Type":"Block","Name":"Elemental armor","Cost":"1","Effect":"Basic block (atk x1)"},{"Class":"Wizard","Level":"1","Type":"Buff","Name":"Incantation","Cost":"2","Effect":"Atk +5"},{"Class":"Wizard","Level":"1","Type":"Buff","Name":"Rejuvinate","Cost":"5","Effect":"Basic heal (atk x1); cannot attack after"},{"Class":"Wizard","Level":"2","Type":"Passive","Name":"Stat Up","Cost":"","Effect":"Atk +3"},{"Class":"Wizard","Level":"2","Type":"Passive","Name":"Stat Up","Cost":"","Effect":"HP +5"},{"Class":"Wizard","Level":"2","Type":"Passive","Name":"Stat Up","Cost":"","Effect":"AP +1"},{"Class":"Wizard","Level":"2","Type":"Passive","Name":"Stat Up","Cost":"","Effect":"Hand +1"},{"Class":"Wizard","Level":"2","Type":"Passive","Name":"Magical force","Cost":"","Effect":"Once per battle, if you were to die, can come back with 1 HP"},{"Class":"Wizard","Level":"3","Type":"Hit","Name":"Fireball","Cost":"5","Effect":"strong hit (atk x3); Hits deal additional weak hit (atk x0.5)"},{"Class":"Wizard","Level":"3","Type":"Buff","Name":"Arcane magic","Cost":"0","Effect":"Next hit AP cost +1, but deals extra basic hit (atk x1)"},{"Class":"Wizard","Level":"3","Type":"Hit","Name":"Drain","Cost":"3","Effect":"Basic hit (atk x1); Basic heal (atk x1)"},{"Class":"Wizard","Level":"3","Type":"Block","Name":"Teleport ally","Cost":"2","Effect":"Ally may basic block for you but they take damage (def x1)"},{"Class":"Wizard","Level":"3","Type":"Hit","Name":"Embers","Cost":"3","Effect":"Basic hit (atk x1); Hits deal additional weak hit (atk x0.5)"},{"Class":"Wizard","Level":"4","Type":"Passive","Name":"Stat Up","Cost":"","Effect":"Atk +5"},{"Class":"Wizard","Level":"4","Type":"Passive","Name":"Stat Up","Cost":"","Effect":"Def + 3"},{"Class":"Wizard","Level":"4","Type":"Passive","Name":"Stat Up","Cost":"","Effect":"HP +8"},{"Class":"Wizard","Level":"4","Type":"Passive","Name":"Stat Up","Cost":"","Effect":"Hand +1"},{"Class":"Wizard","Level":"4","Type":"Passive","Name":"Elementalist","Cost":"","Effect":"Once per turn can discard a card to add a Hit card to your hand from your deck/discard"},{"Class":"Wizard","Level":"5","Type":"Hit","Name":"Blizzard","Cost":"5","Effect":"strong hit (atk x3); Next hit -2 AP"},{"Class":"Wizard","Level":"5","Type":"Block","Name":"Reflect","Cost":"4","Effect":"Basic block (atk x1); Return damage received"},{"Class":"Wizard","Level":"5","Type":"Hit","Name":"Frost bolt","Cost":"3","Effect":"Basic hit (atk x1); Next hit -2 AP"},{"Class":"Wizard","Level":"5","Type":"Buff","Name":"Alchemy","Cost":"2","Effect":"Discard a card and draw 2 cards"},{"Class":"Wizard","Level":"5","Type":"Block","Name":"Illusion","Cost":"1","Effect":"Dodge, roll d20; if > 10 enemy attack misses"},{"Class":"BARD","Level":"TODO","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Bard","Level":"1","Type":"Hit","Name":"Shriek voice","Cost":"1","Effect":"Good hit (atk x1.5)"},{"Class":"Bard","Level":"1","Type":"Buff","Name":"Hope song","Cost":"4","Effect":"Party heal good heal (def x1.5)"},{"Class":"Bard","Level":"1","Type":"Buff","Name":"Fire song","Cost":"4","Effect":"Until your 2nd turn, party atk +1"},{"Class":"Bard","Level":"1","Type":"Buff","Name":"Water song","Cost":"4","Effect":"For two turns, party def +2"},{"Class":"Bard","Level":"1","Type":"Block","Name":"Disarm voice","Cost":"1","Effect":"Def +1; Basic block (def x1)"},{"Class":"Bard","Level":"2","Type":"Passive","Name":"Stat Up","Cost":"","Effect":"Atk +1"},{"Class":"Bard","Level":"2","Type":"Passive","Name":"Stat Up","Cost":"","Effect":"Def +3"},{"Class":"Bard","Level":"2","Type":"Passive","Name":"Stat Up","Cost":"","Effect":"HP +8"},{"Class":"Bard","Level":"2","Type":"Passive","Name":"Stat Up","Cost":"","Effect":"Hand +1"},{"Class":"Bard","Level":"2","Type":"Passive","Name":"Sheet music","Cost":"","Effect":"Discard a card, add a song card to your hand from your deck"},{"Class":"Bard","Level":"3","Type":"Buff","Name":"Forte","Cost":"0","Effect":"Hits deal extra weak hit (atk x0.5)"},{"Class":"Bard","Level":"3","Type":"Buff","Name":"Hope song","Cost":"4","Effect":"Revive dead ally; basic heal (def x1)"},{"Class":"Bard","Level":"3","Type":"Buff","Name":"Lightning song","Cost":"4","Effect":"For two turns"},{"Class":"Bard","Level":"3","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Bard","Level":"3","Type":"Buff","Name":"Metal song","Cost":"4","Effect":"Until your 2nd turn, party gains basic block (def x1)"},{"Class":"Bard","Level":"4","Type":"Passive","Name":"Stat Up","Cost":"","Effect":"Atk +3"},{"Class":"Bard","Level":"4","Type":"Passive","Name":"Stat Up","Cost":"","Effect":"Def +6"},{"Class":"Bard","Level":"4","Type":"Passive","Name":"Stat Up","Cost":"","Effect":"HP +15"},{"Class":"Bard","Level":"4","Type":"Passive","Name":"Stat Up","Cost":"","Effect":"AP +2"},{"Class":"Bard","Level":"4","Type":"Passive","Name":"Harmony","Cost":"","Effect":"Song cards cost -1 AP"},{"Class":"Bard","Level":"5","Type":"Buff","Name":"Orchestra","Cost":"0","Effect":"Next song stat boosts +1 or modifier +0.5"},{"Class":"Bard","Level":"5","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Bard","Level":"5","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Bard","Level":"5","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Bard","Level":"5","Type":"","Name":"","Cost":"","Effect":""},{"Class":"DRUID","Level":"TODO","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"1","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"1","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"1","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"1","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"1","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"2","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"2","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"2","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"2","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"2","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"3","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"3","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"3","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"3","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"3","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"4","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"4","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"4","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"4","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"4","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"5","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"5","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"5","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"5","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Druid","Level":"5","Type":"","Name":"","Cost":"","Effect":""},{"Class":"MONK","Level":"TODO","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"1","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"1","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"1","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"1","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"1","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"2","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"2","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"2","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"2","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"2","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"3","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"3","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"3","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"3","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"3","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"4","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"4","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"4","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"4","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"4","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"5","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"5","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"5","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"5","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Monk","Level":"5","Type":"","Name":"","Cost":"","Effect":""},{"Class":"PALADIN","Level":"TODO","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"1","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"1","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"1","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"1","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"1","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"2","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"2","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"2","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"2","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"2","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"3","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"3","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"3","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"3","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"3","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"4","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"4","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"4","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"4","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"4","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"5","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"5","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"5","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"5","Type":"","Name":"","Cost":"","Effect":""},{"Class":"Paladin","Level":"5","Type":"","Name":"","Cost":"","Effect":""}];
}

function StatsData() {
    return [{"0":"2","Num":"0","Class":"Base","Lvl":"1","Attack":"2","Defense":"1","HP":"20","AP":"2","Hand":"2","Stat rating":"Atk"},{"0":"2","Num":"0","Class":"Base","Lvl":"2","Attack":"3","Defense":"2","HP":"25","AP":"2","Hand":"2","Stat rating":"Def"},{"0":"2","Num":"0","Class":"Base","Lvl":"3","Attack":"4","Defense":"3","HP":"30","AP":"3","Hand":"3","Stat rating":"HP"},{"0":"2","Num":"0","Class":"Base","Lvl":"4","Attack":"5","Defense":"4","HP":"35","AP":"3","Hand":"3","Stat rating":"AP"},{"0":"2","Num":"0","Class":"Base","Lvl":"5","Attack":"6","Defense":"5","HP":"40","AP":"3","Hand":"4","Stat rating":"Hand"},{"0":"5","Num":"1","Class":"Barbarian","Lvl":"1","Attack":"4","Defense":"1","HP":"25","AP":"2","Hand":"2","Stat rating":"Atk"},{"0":"2","Num":"1","Class":"Barbarian","Lvl":"2","Attack":"7","Defense":"2","HP":"32","AP":"2","Hand":"2","Stat rating":"Def"},{"0":"3","Num":"1","Class":"Barbarian","Lvl":"3","Attack":"10","Defense":"3","HP":"40","AP":"2","Hand":"2","Stat rating":"HP"},{"0":"1","Num":"1","Class":"Barbarian","Lvl":"4","Attack":"13","Defense":"4","HP":"47","AP":"3","Hand":"3","Stat rating":"AP"},{"0":"1","Num":"1","Class":"Barbarian","Lvl":"5","Attack":"16","Defense":"5","HP":"55","AP":"3","Hand":"3","Stat rating":"Hand"},{"0":"3","Num":"2","Class":"Ranger","Lvl":"1","Attack":"3","Defense":"1","HP":"20","AP":"3","Hand":"2","Stat rating":"Atk"},{"0":"1","Num":"2","Class":"Ranger","Lvl":"2","Attack":"4","Defense":"1","HP":"25","AP":"3","Hand":"2","Stat rating":"Def"},{"0":"2","Num":"2","Class":"Ranger","Lvl":"3","Attack":"6","Defense":"2","HP":"30","AP":"3","Hand":"3","Stat rating":"HP"},{"0":"4","Num":"2","Class":"Ranger","Lvl":"4","Attack":"7","Defense":"2","HP":"35","AP":"4","Hand":"3","Stat rating":"AP"},{"0":"2","Num":"2","Class":"Ranger","Lvl":"5","Attack":"9","Defense":"3","HP":"40","AP":"5","Hand":"4","Stat rating":"Hand"},{"0":"1","Num":"3","Class":"Cleric","Lvl":"1","Attack":"2","Defense":"2","HP":"25","AP":"2","Hand":"2","Stat rating":"Atk"},{"0":"3","Num":"3","Class":"Cleric","Lvl":"2","Attack":"2","Defense":"3","HP":"32","AP":"2","Hand":"3","Stat rating":"Def"},{"0":"3","Num":"3","Class":"Cleric","Lvl":"3","Attack":"3","Defense":"5","HP":"40","AP":"3","Hand":"3","Stat rating":"HP"},{"0":"2","Num":"3","Class":"Cleric","Lvl":"4","Attack":"3","Defense":"6","HP":"47","AP":"3","Hand":"3","Stat rating":"AP"},{"0":"3","Num":"3","Class":"Cleric","Lvl":"5","Attack":"4","Defense":"8","HP":"55","AP":"3","Hand":"4","Stat rating":"Hand"},{"0":"2","Num":"4","Class":"Rogue","Lvl":"1","Attack":"2","Defense":"1","HP":"20","AP":"3","Hand":"2","Stat rating":"Atk"},{"0":"1","Num":"4","Class":"Rogue","Lvl":"2","Attack":"3","Defense":"1","HP":"22","AP":"3","Hand":"3","Stat rating":"Def"},{"0":"1","Num":"4","Class":"Rogue","Lvl":"3","Attack":"4","Defense":"2","HP":"25","AP":"4","Hand":"3","Stat rating":"HP"},{"0":"5","Num":"4","Class":"Rogue","Lvl":"4","Attack":"5","Defense":"2","HP":"27","AP":"5","Hand":"3","Stat rating":"AP"},{"0":"3","Num":"4","Class":"Rogue","Lvl":"5","Attack":"6","Defense":"3","HP":"30","AP":"6","Hand":"4","Stat rating":"Hand"},{"0":"3","Num":"5","Class":"Wizard","Lvl":"1","Attack":"3","Defense":"1","HP":"20","AP":"2","Hand":"3","Stat rating":"Atk"},{"0":"0","Num":"5","Class":"Wizard","Lvl":"2","Attack":"4","Defense":"1","HP":"22","AP":"3","Hand":"3","Stat rating":"Def"},{"0":"1","Num":"5","Class":"Wizard","Lvl":"3","Attack":"6","Defense":"1","HP":"25","AP":"3","Hand":"4","Stat rating":"HP"},{"0":"3","Num":"5","Class":"Wizard","Lvl":"4","Attack":"7","Defense":"1","HP":"27","AP":"3","Hand":"4","Stat rating":"AP"},{"0":"5","Num":"5","Class":"Wizard","Lvl":"5","Attack":"9","Defense":"2","HP":"30","AP":"4","Hand":"5","Stat rating":"Hand"},{"0":"0","Num":"6","Class":"Bard","Lvl":"1","Attack":"2","Defense":"1","HP":"20","AP":"3","Hand":"3","Stat rating":"Atk"},{"0":"1","Num":"6","Class":"Bard","Lvl":"2","Attack":"2","Defense":"1","HP":"22","AP":"3","Hand":"3","Stat rating":"Def"},{"0":"1","Num":"6","Class":"Bard","Lvl":"3","Attack":"2","Defense":"2","HP":"25","AP":"4","Hand":"4","Stat rating":"HP"},{"0":"5","Num":"6","Class":"Bard","Lvl":"4","Attack":"2","Defense":"2","HP":"27","AP":"5","Hand":"4","Stat rating":"AP"},{"0":"5","Num":"6","Class":"Bard","Lvl":"5","Attack":"3","Defense":"3","HP":"30","AP":"6","Hand":"5","Stat rating":"Hand"},{"0":"2","Num":"7","Class":"Druid","Lvl":"1","Attack":"2","Defense":"1","HP":"25","AP":"3","Hand":"2","Stat rating":"Atk"},{"0":"1","Num":"7","Class":"Druid","Lvl":"2","Attack":"3","Defense":"1","HP":"32","AP":"3","Hand":"2","Stat rating":"Def"},{"0":"3","Num":"7","Class":"Druid","Lvl":"3","Attack":"4","Defense":"2","HP":"40","AP":"3","Hand":"3","Stat rating":"HP"},{"0":"4","Num":"7","Class":"Druid","Lvl":"4","Attack":"5","Defense":"2","HP":"47","AP":"4","Hand":"3","Stat rating":"AP"},{"0":"2","Num":"7","Class":"Druid","Lvl":"5","Attack":"6","Defense":"3","HP":"55","AP":"5","Hand":"4","Stat rating":"Hand"},{"0":"4","Num":"8","Class":"Monk","Lvl":"1","Attack":"4","Defense":"1","HP":"25","AP":"2","Hand":"2","Stat rating":"Atk"},{"0":"1","Num":"8","Class":"Monk","Lvl":"2","Attack":"6","Defense":"1","HP":"32","AP":"2","Hand":"2","Stat rating":"Def"},{"0":"3","Num":"8","Class":"Monk","Lvl":"3","Attack":"8","Defense":"2","HP":"40","AP":"3","Hand":"3","Stat rating":"HP"},{"0":"2","Num":"8","Class":"Monk","Lvl":"4","Attack":"10","Defense":"2","HP":"47","AP":"3","Hand":"3","Stat rating":"AP"},{"0":"2","Num":"8","Class":"Monk","Lvl":"5","Attack":"12","Defense":"3","HP":"55","AP":"3","Hand":"4","Stat rating":"Hand"},{"0":"3","Num":"9","Class":"Paladin","Lvl":"1","Attack":"3","Defense":"3","HP":"20","AP":"2","Hand":"2","Stat rating":"Atk"},{"0":"5","Num":"9","Class":"Paladin","Lvl":"2","Attack":"4","Defense":"6","HP":"25","AP":"2","Hand":"2","Stat rating":"Def"},{"0":"2","Num":"9","Class":"Paladin","Lvl":"3","Attack":"6","Defense":"9","HP":"30","AP":"2","Hand":"2","Stat rating":"HP"},{"0":"1","Num":"9","Class":"Paladin","Lvl":"4","Attack":"7","Defense":"12","HP":"35","AP":"3","Hand":"3","Stat rating":"AP"},{"0":"1","Num":"9","Class":"Paladin","Lvl":"5","Attack":"9","Defense":"15","HP":"40","AP":"3","Hand":"3","Stat rating":"Hand"}];
}