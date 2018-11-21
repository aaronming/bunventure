export function MonsterCard(obj) {
    var self = this;
    
    self.name = obj.Name;
    self.level = obj.Level;
    self.attack = obj.Atk;
    self.defense = obj.Def;
    self.hp = obj.HP;

    var skills = obj.Skills;
    if (skills.indexOf("\n") >= 0) skills = skills.split("\n");
    self.skills = skills;

    self.description = ko.pureComputed(function() {
        var description = self.level + " " + self.name + 
            "\n" + self.type;
        if (self.cost) description += " - " + self.cost + " AP";
        description += "\n----------------------" +
            "\n" + self.effect;

        return description;
    });

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