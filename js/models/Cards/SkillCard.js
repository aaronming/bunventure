export function SkillCard(sObj, id) {
    var self = this;
    
    self.id = id;
    self.myClass = sObj.Class || "General";
    self.level = parseInt(sObj.Level);
    self.cost = parseInt(sObj.Cost || sObj.AP) || 0;
    self.type = sObj.Type;
    self.name = sObj.Name;
    self.level = isNaN(parseInt(sObj.Level)) ? 1 : parseInt(sObj.Level);
    self.effect = sObj.Effect;
    self.price = parseInt(sObj.Price) || 0;

    function effectSplit() {
        var split = self.effect.split("; ")
        return split.join("\n");
    }

    self.description = ko.pureComputed(function() {
        var description = "Lv." + self.level + " " + self.name + 
            "\n" + self.type + " - " + self.cost + " AP" + 
            "\n----------------------" +
            "\n" + effectSplit();

        return description;
    });
}