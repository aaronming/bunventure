export function SkillCard(sObj, id) {
    var self = this;
    
    self.id = id;
    self.myClass = sObj.Class || "General";
    self.level = parseInt(sObj.Level);
    self.cost = parseInt(sObj.Cost || sObj.AP) || 0;
    self.type = sObj.Type;
    self.name = sObj.Name;
    self.level = parseInt(sObj.Level) || 1;
    self.effect = sObj.Effect;
    self.price = parseInt(sObj.Price) || 0;

    self.description = ko.pureComputed(function() {
        var description = self.level + " " + self.name + 
            "\n" + self.type + " - " + self.cost + " AP" + 
            "\n----------------------" +
            "\n" + self.effect;

        return description;
    });
}