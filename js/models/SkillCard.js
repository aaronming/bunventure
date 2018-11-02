export function SkillCard(sObj) {
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