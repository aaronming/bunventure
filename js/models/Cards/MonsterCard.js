export function MonsterCard(obj) {
    var self = this;
    
    self.isMonsterCard = true;
    self.name = obj.Name;
    self.level = obj.Level;
    self.attack = obj.Atk;
    self.defense = obj.Def;
    self.hp = obj.HP;

    self.activeAttack = ko.observable();
    self.activeDefense = ko.observable();
    self.activeCurHp = ko.observable();
    self.activeMaxHp = ko.observable();

    var skills = obj.Skills;
    if (skills.indexOf("\n") >= 0) skills = skills.split("\n");
    self.skills = skills;

    // self.description = ko.pureComputed(function() {
    //     var description = self.level + " " + self.name + 
    //         "\n" + self.type;
    //     if (self.cost) description += " - " + self.cost + " AP";
    //     description += "\n----------------------" +
    //         "\n" + self.effect;

    //     return description;
    // });

    self.prepareForBattle = function(wdm) {
        self.activeAttack(evalWDM(self.attack, wdm()));
        self.activeDefense(evalWDM(self.defense, wdm()));
        var hp = evalWDM(self.hp, wdm());
        self.activeCurHp(hp);
        self.activeMaxHp(hp);
    }

    self.heal = function(amount) {
        var val = self.activeCurHp() + amount;
        self.activeCurHp(val);
    }

    self.statUpdate = function(stat, amount) {
        switch (stat) {
            case "attack":
                self.activeAttack(self.activeAttack() + amount);
                break;
            case "defense":
                self.activeDefense(self.activeDefense() + amount);
                break;
            case "curHP":
            default:
                self.activeCurHp(self.activeCurHp() + amount);
                break;
        }
        
    }

    function evalWDM(input, wdm) {
        if (typeof input != "string") return input;
        if (wdm === undefined) wdm = 1;
        input = input.replace('(', '\(');
        input = input.replace(')', '\)');
        input = input.replace('x', '*');
        
        var formula = input.replace('W', wdm);
        return Math.floor(eval(formula));
    }
}